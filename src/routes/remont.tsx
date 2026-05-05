import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeading } from "@/components/PageShell";
import { ContactForm } from "@/components/ContactForm";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/remont")({
  head: () => ({
    meta: [
      { title: "Ремонт офисных и компьютерных кресел в Минске — DRAGO" },
      { name: "description", content: "Ремонт кресел в Минске день в день. Газлифт от 45 BYN, крестовина от 35 BYN. Диагностика и выезд — бесплатно." },
      { property: "og:title", content: "Ремонт кресел — DRAGO" },
      { property: "og:description", content: "День в день или на следующий. С выездом к вам. Гарантия на все работы." },
    ],
  }),
  component: Page,
});

const prices: { name: string; price: string; free?: boolean }[] = [
  { name: "Замена газлифта", price: "от 45 BYN" },
  { name: "Замена крестовины", price: "от 35 BYN" },
  { name: "Замена механизма качания", price: "от 58 BYN" },
  { name: "Замена роликов (комплект)", price: "от 15 BYN" },
  { name: "Замена подлокотников", price: "от 28 BYN" },
  { name: "Ремонт обивки", price: "от 100 BYN" },
  { name: "Диагностика", price: "бесплатно", free: true },
  { name: "Выезд мастера", price: "бесплатно", free: true },
];

function Page() {
  return (
    <PageShell>
      <PageHeading
        kicker="Услуга 02"
        title="Ремонт офисных и компьютерных кресел в Минске"
        subtitle="День в день или на следующий. С выездом к вам."
      />

      {/* PRICE TABLE */}
      <section className="mx-auto max-w-7xl px-4 lg:px-8 py-16 lg:py-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 flex items-baseline gap-3">
          <span className="font-mono text-accent text-base">//</span> Цены на ремонт
        </h2>

        <div className="border-2 border-border bg-surface overflow-hidden">
          {/* head */}
          <div className="hidden sm:grid grid-cols-[1fr_auto] gap-4 px-6 py-3 border-b border-border bg-background font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>Работа</span>
            <span>Стоимость</span>
          </div>

          {prices.map((p) => (
            <div
              key={p.name}
              className="grid grid-cols-[1fr_auto] gap-4 px-6 py-4 border-b border-border last:border-b-0 transition-all duration-150 hover:bg-background hover:pl-8 hover:border-l-2 hover:border-l-accent group"
            >
              <span className="font-medium group-hover:text-accent transition-colors">{p.name}</span>
              <span className={`font-mono font-bold whitespace-nowrap ${p.free ? "text-accent uppercase text-sm" : "text-foreground"}`}>
                {p.price}
              </span>
            </div>
          ))}
        </div>

        {/* Honest note */}
        <div className="mt-8 flex items-start gap-4 bg-accent text-accent-foreground p-6 lg:p-8 border-2 border-accent">
          <ShieldCheck className="w-8 h-8 shrink-0 mt-1" strokeWidth={2} />
          <div>
            <div className="font-bold text-lg uppercase tracking-wide mb-1">Оплата по факту</div>
            <p className="text-sm leading-relaxed">
              Никаких скрытых платежей и предоплат. Сначала чиним — потом считаем. Гарантия на все работы до 12 месяцев.
            </p>
          </div>
        </div>
      </section>

      {/* WHY US strip */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-12 grid sm:grid-cols-3 gap-px bg-border">
          {[
            { v: "1 день", l: "средний срок ремонта" },
            { v: "12 мес", l: "гарантия на работы" },
            { v: "0 BYN", l: "выезд и диагностика" },
          ].map((s) => (
            <div key={s.l} className="bg-surface p-6 text-center">
              <div className="font-mono text-3xl md:text-4xl font-bold text-accent">{s.v}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mt-2">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FORM */}
      <section className="mx-auto max-w-7xl px-4 lg:px-8 py-16 lg:py-20 grid lg:grid-cols-[1fr_1fr] gap-10">
        <div>
          <div className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-4">// Заявка</div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Вызвать мастера</h2>
          <p className="text-muted-foreground max-w-md">
            Опишите проблему — приедем сегодня или завтра. По Минску выезд бесплатно.
          </p>
        </div>
        <ContactForm source="remont" />
      </section>
    </PageShell>
  );
}
