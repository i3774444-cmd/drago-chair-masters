import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const PHONE_RE = /^\+375\s?\(?\d{2}\)?\s?\d{3}-?\d{2}-?\d{2}$/;

const PhotoSchema = z.object({
  name: z.string().max(200),
  type: z.string().regex(/^image\//, "Только изображения"),
  // base64 (no data: prefix), max ~7MB encoded (~5MB binary)
  data: z.string().min(1).max(7_500_000),
});

const InputSchema = z.object({
  source: z.string().min(1).max(60),
  clientType: z.enum(["private", "company"]),
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().regex(PHONE_RE, "Неверный формат телефона"),
  comment: z.string().trim().max(500).optional().default(""),
  company: z.string().trim().max(120).optional().default(""),
  unn: z.string().trim().max(15).optional().default(""),
  website: z.string().max(0).optional().default(""), // honeypot
  photos: z.array(PhotoSchema).max(5).default([]),
}).superRefine((d, ctx) => {
  if (d.clientType === "company") {
    if (!d.company || d.company.length < 2)
      ctx.addIssue({ code: "custom", path: ["company"], message: "Укажите название" });
    if (!d.unn || !/^\d{9}$/.test(d.unn))
      ctx.addIssue({ code: "custom", path: ["unn"], message: "УНН — 9 цифр" });
  }
});

function b64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function notifyTelegram(text: string, photoUrls: string[]) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return;
  try {
    if (photoUrls.length === 0) {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chat, text, parse_mode: "HTML" }),
      });
    } else if (photoUrls.length === 1) {
      await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chat, photo: photoUrls[0], caption: text, parse_mode: "HTML" }),
      });
    } else {
      const media = photoUrls.slice(0, 10).map((u, i) => ({
        type: "photo",
        media: u,
        ...(i === 0 ? { caption: text, parse_mode: "HTML" } : {}),
      }));
      await fetch(`https://api.telegram.org/bot${token}/sendMediaGroup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chat, media }),
      });
    }
  } catch (e) {
    console.error("[telegram] notify failed", e);
  }
}

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true }; // honeypot

    // Upload photos
    const photoUrls: string[] = [];
    for (const p of data.photos) {
      const ext = p.type.split("/")[1]?.replace(/[^a-z0-9]/gi, "") || "jpg";
      const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext}`;
      const bytes = b64ToBytes(p.data);
      const { error } = await supabaseAdmin.storage
        .from("lead-photos")
        .upload(path, bytes, { contentType: p.type, upsert: false });
      if (error) {
        console.error("[leads] upload error", error);
        continue;
      }
      const { data: signed } = await supabaseAdmin.storage
        .from("lead-photos")
        .createSignedUrl(path, 60 * 60 * 24 * 30); // 30 days
      if (signed?.signedUrl) photoUrls.push(signed.signedUrl);
    }

    const { error } = await supabaseAdmin.from("leads").insert({
      source: data.source,
      client_type: data.clientType,
      name: data.name,
      phone: data.phone,
      comment: data.comment || null,
      company: data.clientType === "company" ? data.company || null : null,
      unn: data.clientType === "company" ? data.unn || null : null,
      photo_urls: photoUrls,
    });

    if (error) {
      console.error("[leads] insert error", error);
      return { ok: false, error: "Не удалось сохранить заявку" };
    }

    const lines = [
      `<b>Новая заявка</b> — ${data.source}`,
      `<b>Тип:</b> ${data.clientType === "company" ? "Компания" : "Частное лицо"}`,
      data.clientType === "company" ? `<b>Организация:</b> ${data.company} (УНН ${data.unn})` : "",
      `<b>Имя:</b> ${data.name}`,
      `<b>Телефон:</b> ${data.phone}`,
      data.comment ? `<b>Комментарий:</b> ${data.comment}` : "",
    ].filter(Boolean).join("\n");
    await notifyTelegram(lines, photoUrls);

    return { ok: true };
  });
