import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeading } from "@/components/PageShell";
import { Phone, Mail, MapPin, Send, Clock } from "lucide-react";

export const Route = createFileRoute("/kontakty")({
  head: () => ({
    meta: [
      { title: "Контакты DRAGO — ремонт кресел в Минске" },
      { name: "description", content: "Адрес мастерской в Минске, телефон, Telegram. Работаем с понедельника по субботу." },
      { property: "og:title", content: "Контакты — DRAGO" },
      { property: "og:description", content: "Минск, ул. Притыцкого, 62. +375 29 123-45-67." },
    ],
  }),
  component: Page,
});

const contacts = [
  { icon: Phone, label: "Телефон", value: "+375 29 123-45-67", href: "tel:+375291234567" },
  { icon: Send, label: "Telegram", value: "@drago_minsk", href: "https://t.me/drago_minsk" },
  { icon: Mail, label: "Почта", value: "hello@drago.by", href: "mailto:hello@drago.by" },
  { icon: MapPin, label: "Мастерская", value: "г. Минск, ул. Притыцкого, 62, цех 4" },
  { icon: Clock, label: "График", value: "Пн–Пт 9:00–19:00, Сб 10:00–16:00" },
];

function Page() {
  return (
    <PageShell>
      <PageHeading
        kicker="Контакты"
        title="Напишите — ответим за 15 минут"
        subtitle="Telegram быстрее всего: туда же удобно прислать фото кресла."
      />

      <section className="mx-auto max-w-7xl px-4 lg:px-8 py-16 grid lg:grid-cols-2 gap-12">
        <div className="grid gap-px bg-border">
          {contacts.map(({ icon: Icon, label, value, href }) => {
            const Tag = href ? "a" : "div";
            return (
              <Tag
                key={label}
                {...(href ? { href, target: href.startsWith("http") ? "_blank" : undefined, rel: "noreferrer" } : {})}
                className="bg-background p-6 flex items-start gap-4 hover:bg-surface transition-colors"
              >
                <Icon className="w-5 h-5 text-accent mt-1 shrink-0" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</div>
                  <div className={href ? "font-mono font-bold" : "font-medium"}>{value}</div>
                </div>
              </Tag>
            );
          })}
        </div>

        <div className="bg-surface border border-border p-8">
          <h2 className="text-2xl font-bold mb-2">Реквизиты</h2>
          <p className="text-muted-foreground text-sm mb-6">Для договоров и счетов</p>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-b border-border pb-2">
              <dt className="text-muted-foreground">Наименование</dt>
              <dd className="font-mono text-right">ИП Драгун А.В.</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-border pb-2">
              <dt className="text-muted-foreground">УНП</dt>
              <dd className="font-mono">191234567</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-border pb-2">
              <dt className="text-muted-foreground">Банк</dt>
              <dd className="font-mono text-right">ОАО «Приорбанк»</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-border pb-2">
              <dt className="text-muted-foreground">BIC</dt>
              <dd className="font-mono">PJCBBY2X</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Расчётный счёт</dt>
              <dd className="font-mono text-right text-xs">BY00 PJCB 0000 0000 0000 0000 0000</dd>
            </div>
          </dl>

          <a href="tel:+375291234567" className="btn-accent w-full mt-8">
            <Phone className="w-4 h-4" /> Позвонить сейчас
          </a>
        </div>
      </section>
    </PageShell>
  );
}
