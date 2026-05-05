import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHeading } from "@/components/PageShell";
import { Check } from "lucide-react";

export const Route = createFileRoute("/peretyazhka")({
  head: () => ({
    meta: [
      { title: "Перетяжка офисных кресел в Минске — DRAGO" },
      { name: "description", content: "Перетяжка офисных и компьютерных кресел в Минске. Экокожа, ткань, сетка. От 1 дня. Гарантия 12 месяцев." },
      { property: "og:title", content: "Перетяжка кресел — DRAGO" },
      { property: "og:description", content: "Меняем обивку кресел: экокожа, ткань, сетка. Минск." },
    ],
  }),
  component: Page,
});

const materials = [
  { name: "Экокожа", desc: "Износостойкая, легко моется. Для руководителей и приёмных.", price: "от 180 BYN" },
  { name: "Натуральная кожа", desc: "Для статусных кресел. Срок службы 10+ лет.", price: "от 450 BYN" },
  { name: "Мебельная ткань", desc: "Антивандальная, антистатичная. Для open-space.", price: "от 140 BYN" },
  { name: "Сетка (mesh)", desc: "Для эргономичных кресел: Herman Miller, Steelcase, Comfort Seating.", price: "от 220 BYN" },
];

const steps = [
  "Присылаете фото кресла в Telegram или на почту",
  "Считаем стоимость и сроки в течение часа",
  "Забираем кресло (по Минску — бесплатно от 3 шт.)",
  "Снимаем старую обивку, чистим и обрабатываем каркас",
  "Устанавливаем новую обивку с усиленным поролоном",
  "Возвращаем кресло. Гарантия 12 месяцев на работы",
];

function Page() {
  return (
    <PageShell>
      <PageHeading
        kicker="Услуга 01"
        title="Перетяжка офисных и компьютерных кресел"
        subtitle="Старое кресло за 1500 рублей не стоит выбрасывать ради нового за 300. Мы вернём ему вид и комфорт за 2–5 рабочих дней."
      />

      <section className="mx-auto max-w-7xl px-4 lg:px-8 py-16 lg:py-20">
        <h2 className="text-3xl font-bold mb-8">Материалы и цены</h2>
        <div className="grid md:grid-cols-2 gap-px bg-border">
          {materials.map((m) => (
            <div key={m.name} className="bg-background p-6 hover:bg-surface transition-colors">
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <h3 className="text-xl font-bold">{m.name}</h3>
                <span className="font-mono text-accent font-bold whitespace-nowrap">{m.price}</span>
              </div>
              <p className="text-muted-foreground text-sm">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-16 lg:py-20">
          <h2 className="text-3xl font-bold mb-8">Как работаем</h2>
          <ol className="grid md:grid-cols-2 gap-4">
            {steps.map((s, i) => (
              <li key={i} className="flex gap-4 bg-background border border-border p-5">
                <span className="font-mono text-accent font-bold text-2xl">{String(i + 1).padStart(2, "0")}</span>
                <span className="pt-1">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 lg:px-8 py-16 lg:py-20">
        <div className="bg-surface border-2 border-accent p-8 lg:p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Кресло у вас на руках?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl">
            Пришлите 3 фото: общий вид, сиденье, спинка. Дадим точную смету за 15 минут.
          </p>
          <ul className="grid sm:grid-cols-2 gap-2 mb-8">
            {["Гарантия 12 месяцев", "Усиленный поролон в подарок", "Бесплатный вывоз от 3 кресел", "Договор и закрывающие документы"].map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-accent" /> {p}
              </li>
            ))}
          </ul>
          <Link to="/kontakty" className="btn-accent">Получить смету</Link>
        </div>
      </section>
    </PageShell>
  );
}
