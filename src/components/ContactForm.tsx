import { useState, useEffect, useRef } from "react";
import { z } from "zod";
import { Send, CheckCircle2, Building2, User, ImagePlus, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { submitLead } from "@/server/leads.functions";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onerror = () => reject(r.error);
    r.onload = () => {
      const s = String(r.result ?? "");
      const i = s.indexOf("base64,");
      resolve(i >= 0 ? s.slice(i + 7) : s);
    };
    r.readAsDataURL(file);
  });
}

// +375 (XX) XXX-XX-XX
const PHONE_RE = /^\+375\s?\(?\d{2}\)?\s?\d{3}-?\d{2}-?\d{2}$/;

const baseSchema = z.object({
  clientType: z.enum(["private", "company"]),
  name: z.string().trim().min(2, "Имя слишком короткое").max(80),
  phone: z
    .string()
    .trim()
    .regex(PHONE_RE, "Формат: +375 (XX) XXX-XX-XX"),
  comment: z.string().trim().max(500).optional(),
  company: z.string().trim().max(120).optional(),
  unn: z.string().trim().max(15).optional(),
  // Honeypot
  website: z.string().max(0).optional(),
});

const schema = baseSchema.superRefine((data, ctx) => {
  if (data.clientType === "company") {
    if (!data.company || data.company.length < 2) {
      ctx.addIssue({ code: "custom", path: ["company"], message: "Укажите название" });
    }
    if (!data.unn || !/^\d{9}$/.test(data.unn)) {
      ctx.addIssue({ code: "custom", path: ["unn"], message: "УНН — 9 цифр" });
    }
  }
});

type FormState = {
  clientType: "private" | "company";
  name: string;
  phone: string;
  comment: string;
  company: string;
  unn: string;
  website: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initial: FormState = {
  clientType: "private",
  name: "",
  phone: "+375 (",
  comment: "",
  company: "",
  unn: "",
  website: "",
};

function formatPhone(input: string): string {
  // Keep only digits, ensure 375 prefix
  let digits = input.replace(/\D/g, "");
  if (digits.startsWith("8")) digits = "375" + digits.slice(1);
  if (!digits.startsWith("375")) digits = "375" + digits;
  digits = digits.slice(0, 12); // 375 + 9
  const rest = digits.slice(3);

  let out = "+375";
  if (rest.length === 0) return out + " (";
  out += " (" + rest.slice(0, 2);
  if (rest.length < 2) return out;
  out += ")";
  if (rest.length > 2) out += " " + rest.slice(2, 5);
  if (rest.length > 5) out += "-" + rest.slice(5, 7);
  if (rest.length > 7) out += "-" + rest.slice(7, 9);
  return out;
}

export function ContactForm({ source }: { source: string }) {
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [photos, setPhotos] = useState<{ file: File; url: string }[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const submit = useServerFn(submitLead);

  const onPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const valid: { file: File; url: string }[] = [];
    for (const f of files) {
      if (!f.type.startsWith("image/")) {
        toast.error("Только изображения", { description: f.name });
        continue;
      }
      if (f.size > 5 * 1024 * 1024) {
        toast.error("Файл больше 5 МБ", { description: f.name });
        continue;
      }
      valid.push({ file: f, url: URL.createObjectURL(f) });
    }
    setPhotos((p) => [...p, ...valid].slice(0, 5));
    if (fileRef.current) fileRef.current.value = "";
  };

  const removePhoto = (idx: number) => {
    setPhotos((p) => {
      URL.revokeObjectURL(p[idx].url);
      return p.filter((_, i) => i !== idx);
    });
  };

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setDone(false), 8000);
    return () => clearTimeout(t);
  }, [done]);

  const set =
    (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const val = k === "phone" ? formatPhone(e.target.value) : e.target.value;
      setValues((v) => ({ ...v, [k]: val }));
      if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
    };

  const setType = (t: "private" | "company") => {
    setValues((v) => ({ ...v, clientType: t }));
    setErrors({});
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(values);
    if (!result.success) {
      const errs: Errors = {};
      for (const issue of result.error.issues) {
        const k = issue.path[0] as keyof FormState;
        if (!errs[k]) errs[k] = issue.message;
      }
      setErrors(errs);
      const first = Object.values(errs)[0];
      toast.error("Проверьте форму", { description: first ?? "Не все поля заполнены корректно." });
      return;
    }
    if (result.data.website) return; // honeypot trip
    const { website, ...payload } = result.data;
    void website;
    console.log("[DRAGO form]", { source, ...payload, photos: photos.map((p) => p.file.name) });
    toast.success("Заявка отправлена!", {
      description: "Мастер свяжется в течение часа.",
    });
    setDone(true);
    setValues(initial);
  };

  if (done) {
    return (
      <div className="bg-surface border-2 border-accent p-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-accent mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Заявка отправлена!</h3>
        <p className="text-muted-foreground mb-6">Мастер свяжется в течение часа.</p>
        <button onClick={() => setDone(false)} className="btn-ghost">Отправить ещё одну</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-surface border border-border p-6 lg:p-8 space-y-5">
      {/* Client type toggle */}
      <div className="grid grid-cols-2 gap-2 border border-border p-1">
        {([
          { id: "private", label: "Частное лицо", Icon: User },
          { id: "company", label: "Компания", Icon: Building2 },
        ] as const).map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setType(id)}
            className={`flex items-center justify-center gap-2 px-3 py-3 text-sm font-bold uppercase tracking-wider transition-all ${
              values.clientType === id
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 w-px h-px overflow-hidden">
        <label>
          Сайт
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={set("website")}
          />
        </label>
      </div>

      {/* Company-only fields */}
      {values.clientType === "company" && (
        <div className="grid sm:grid-cols-[1fr_auto] gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <Field
            label="Название организации"
            value={values.company}
            onChange={set("company")}
            error={errors.company}
            placeholder="ООО «Ромашка»"
            maxLength={120}
          />
          <Field
            label="УНН"
            value={values.unn}
            onChange={set("unn")}
            error={errors.unn}
            placeholder="123456789"
            maxLength={9}
            mono
            inputMode="numeric"
          />
        </div>
      )}

      <Field
        label="Имя"
        value={values.name}
        onChange={set("name")}
        error={errors.name}
        placeholder="Александр"
        maxLength={80}
        autoComplete="name"
      />

      <Field
        label="Телефон *"
        value={values.phone}
        onChange={set("phone")}
        error={errors.phone}
        placeholder="+375 (29) 123-45-67"
        maxLength={20}
        autoComplete="tel"
        inputMode="tel"
        type="tel"
        mono
      />

      <div>
        <label className="block font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
          Комментарий
        </label>
        <textarea
          value={values.comment}
          onChange={set("comment")}
          maxLength={500}
          rows={4}
          className="w-full bg-background border border-border focus:border-accent focus:outline-none px-4 py-3 transition-colors resize-none"
          placeholder="Что с креслом? Сколько штук?"
        />
        <div className="flex justify-between mt-1">
          {errors.comment ? (
            <p className="text-destructive text-xs font-mono">{errors.comment}</p>
          ) : <span />}
          <span className="text-xs font-mono text-muted-foreground">{values.comment.length}/500</span>
        </div>
      </div>

      {/* Photo upload */}
      <div>
        <label className="block font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
          Фото кресла (до 5 шт., 5 МБ)
        </label>
        <div className="flex flex-wrap gap-3">
          {photos.map((p, i) => (
            <div key={i} className="relative w-20 h-20 border border-border overflow-hidden group">
              <img src={p.url} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(i)}
                aria-label="Удалить фото"
                className="absolute top-1 right-1 w-6 h-6 bg-background/80 border border-border flex items-center justify-center hover:border-destructive hover:text-destructive"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          {photos.length < 5 && (
            <label className="w-20 h-20 border-2 border-dashed border-border hover:border-accent hover:text-accent flex flex-col items-center justify-center cursor-pointer text-muted-foreground transition-colors">
              <ImagePlus className="w-5 h-5" />
              <span className="text-[10px] font-mono mt-1">Добавить</span>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                onChange={onPhotos}
                className="sr-only"
              />
            </label>
          )}
        </div>
      </div>

      <button type="submit" className="btn-accent w-full text-base py-4">
        <Send className="w-4 h-4" /> Отправить заявку
      </button>
      <p className="text-xs text-muted-foreground text-center">
        Нажимая кнопку, вы соглашаетесь с{" "}
        <Link to="/privacy" className="text-accent hover:underline">политикой конфиденциальности</Link>.
      </p>
    </form>
  );
}

function Field({
  label, value, onChange, error, placeholder, maxLength, autoComplete, inputMode, type = "text", mono,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  maxLength?: number;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  type?: string;
  mono?: boolean;
}) {
  return (
    <div>
      <label className="block font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        className={`w-full bg-background border border-border focus:border-accent focus:outline-none px-4 py-3 transition-colors ${mono ? "font-mono" : ""}`}
      />
      {error && <p className="text-destructive text-xs mt-1 font-mono">{error}</p>}
    </div>
  );
}
