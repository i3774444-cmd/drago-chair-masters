import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { PageShell, PageHeading } from "@/components/PageShell";
import { ContactForm } from "@/components/ContactForm";
import { Phone, Mail, MapPin, Send, Clock, MapPinned } from "lucide-react";

export const Route = createFileRoute("/kontakty")({
  head: () => ({
    meta: [
      { title: "Контакты DRAGO — ремонт кресел в Минске" },
      { name: "description", content: "Минск, ул. Притыцкого, 62. Телефон, Telegram, email. Пн–Сб." },
      { property: "og:title", content: "Контакты — DRAGO" },
      { property: "og:description", content: "Адрес мастерской, телефон, Telegram." },
    ],
  }),
  component: Page,
});

const items = [
  { icon: Phone, label: "Телефон", value: "+375 29 123-45-67", href: "tel:+375291234567" },
  { icon: Send, label: "Telegram", value: "@drago_minsk", href: "https://t.me/drago_minsk" },
  { icon: Mail, label: "Email", value: "hello@drago.by", href: "mailto:hello@drago.by" },
  { icon: MapPin, label: "Адрес мастерской", value: "г. Минск, ул. Притыцкого, 62, цех 4" },
  { icon: Clock, label: "График", value: "Пн–Пт 9:00–19:00, Сб 10:00–16:00" },
];

function Page() {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.location.hash === "#form") {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <PageShell>
      <PageHeading
        kicker="Контакты"
        title="Напишите — ответим за 15 минут"
        subtitle="Telegram быстрее всего: туда удобно прислать фото кресла."
      />

      <section className="mx-auto max-w-7xl px-4 lg:px-8 py-12 lg:py-16 grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-10">
        {/* Contact list */}
        <div>
          <div className="grid sm:grid-cols-2 gap-px bg-border border border-border">
            {items.map(({ icon: Icon, label, value, href }) => {
              const Tag = href ? "a" : "div";
              return (
                <Tag
                  key={label}
                  {...(href ? { href, target: href.startsWith("http") ? "_blank" : undefined, rel: "noreferrer" } : {})}
                  className="bg-surface p-6 flex items-start gap-4 hover:bg-surface-elevated transition-colors group"
                >
                  <Icon className="w-5 h-5 text-accent mt-1 shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</div>
                    <div className={href ? "font-mono font-bold" : "font-medium"}>{value}</div>
                  </div>
                </Tag>
              );
            })}
          </div>

          <button
            type="button"
            onClick={scrollToForm}
            className="btn-accent w-full mt-6 text-base py-4"
          >
            <Phone className="w-5 h-5" /> Вызвать мастера
          </button>

          {/* Map placeholder */}
          <div className="mt-8">
            <div className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-3">// Где найти</div>
            <div className="relative aspect-[16/10] bg-surface border-2 border-border overflow-hidden">
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <MapPinned className="w-12 h-12 text-accent" strokeWidth={1.5} />
                <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  // Яндекс.Карта
                </div>
                <div className="text-sm text-foreground font-medium">ул. Притыцкого, 62, цех 4</div>
              </div>
              <div className="absolute bottom-3 right-3 font-mono text-[10px] text-muted-foreground">
                53.9023° N · 27.4489° E
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div ref={formRef} id="form" className="scroll-mt-24">
          <div className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-3">// Заявка</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Оставьте заявку</h2>
          <ContactForm source="kontakty" />
        </div>
      </section>
    </PageShell>
  );
}
