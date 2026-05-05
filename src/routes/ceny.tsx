import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeading } from "@/components/PageShell";

export const Route = createFileRoute("/ceny")({
  head: () => ({
    meta: [
      { title: "Цены на ремонт и перетяжку кресел — DRAGO Минск" },
      { name: "description", content: "Прайс на перетяжку и ремонт офисных кресел в Минске. Без скрытых платежей." },
      { property: "og:title", content: "Цены — DRAGO" },
      { property: "og:description", content: "Прайс на перетяжку и ремонт кресел в Минске." },
    ],
  }),
  component: Page,
});

const sections = [
  {
    title: "Перетяжка",
    items: [
      ["Стандартное офисное кресло, ткань", "от 140 BYN"],
      ["Стандартное офисное кресло, экокожа", "от 180 BYN"],
      ["Кресло руководителя, экокожа", "от 260 BYN"],
      ["Кресло руководителя, натуральная кожа", "от 450 BYN"],
      ["Игровое (геймерское) кресло", "от 220 BYN"],
      ["Эргономичное кресло, сетка (mesh)", "от 220 BYN"],
    ],
  },
  {
    title: "Ремонт механики",
    items: [
      ["Замена газлифта (стандарт)", "45 BYN"],
      ["Замена газлифта усиленного (до 150 кг)", "65 BYN"],
      ["Замена крестовины пластиковой", "60 BYN"],
      ["Замена крестовины металлической", "95 BYN"],
      ["Комплект роликов (5 шт), полиуретан", "35 BYN"],
      ["Замена пиастры", "55 BYN"],
      ["Ремонт механизма качания", "от 50 BYN"],
      ["Ремонт / замена подлокотников", "от 30 BYN"],
    ],
  },
  {
    title: "Дополнительно",
    items: [
      ["Замена / добавление поролона", "от 25 BYN"],
      ["Чистка обивки химией", "от 35 BYN"],
      ["Выезд мастера по Минску", "25 BYN"],
      ["Выезд при заказе от 5 кресел", "0 BYN"],
      ["Доставка кресел в мастерскую и обратно (от 3 шт)", "0 BYN"],
    ],
  },
];

function Page() {
  return (
    <PageShell>
      <PageHeading
        kicker="Прайс"
        title="Цены без звёздочек"
        subtitle="Все цены окончательные. Точная стоимость — после фото или осмотра. Скидки от объёма обсуждаются индивидуально."
      />

      <section className="mx-auto max-w-7xl px-4 lg:px-8 py-16 space-y-16">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-baseline gap-4">
              <span className="font-mono text-accent text-lg">//</span>
              {s.title}
            </h2>
            <div className="grid gap-px bg-border">
              {s.items.map(([name, price]) => (
                <div key={name} className="bg-background p-5 flex items-center justify-between gap-4 hover:bg-surface transition-colors">
                  <span>{name}</span>
                  <span className="font-mono font-bold text-accent whitespace-nowrap">{price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-surface border border-border p-6 text-sm text-muted-foreground">
          <p>
            * Цены указаны на материалы и работы по состоянию на 2026 год. Для корпоративных клиентов
            работаем по договору с отсрочкой платежа до 30 дней. Закрывающие документы (акт, ЭСЧФ) предоставляем.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
