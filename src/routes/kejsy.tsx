import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeading } from "@/components/PageShell";

export const Route = createFileRoute("/kejsy")({
  head: () => ({
    meta: [
      { title: "Кейсы — DRAGO" },
      { name: "description", content: "Реальные проекты по ремонту и перетяжке кресел: БелАЗ, Белпочта, МТС, частные клиенты." },
      { property: "og:title", content: "Кейсы — DRAGO" },
      { property: "og:description", content: "Что делали: объём, материалы, сроки, бюджет." },
    ],
  }),
  component: Page,
});

const cases = [
  {
    client: "БелАЗ",
    task: "Перетяжка 42 кресел в административном корпусе",
    material: "Антивандальная ткань, замена поролона",
    time: "9 рабочих дней",
    budget: "8 400 BYN",
    note: "Забирали партиями по 14 шт., чтобы не останавливать работу отделов.",
  },
  {
    client: "МТС, контакт-центр",
    task: "Ремонт 28 кресел операторов: газлифты, ролики, механизмы",
    material: "Газлифты класса 4, полиуретановые ролики",
    time: "2 дня (на месте)",
    budget: "1 960 BYN",
    note: "Выезд бригадой из 2 мастеров. Простой кресел — 0 минут.",
  },
  {
    client: "Юридическая фирма, частный заказ",
    task: "Перетяжка кресла руководителя Herman Miller Aeron",
    material: "Замена сетки на оригинальную (поставка из Германии)",
    time: "21 день (с учётом доставки)",
    budget: "1 250 BYN",
    note: "Магазин предлагал купить новое за 7 500 USD. Сэкономили клиенту ~22 000 BYN.",
  },
  {
    client: "Белпочта",
    task: "Ремонт + частичная перетяжка 16 кресел",
    material: "Экокожа премиум, замена крестовин и пиастр",
    time: "6 дней",
    budget: "3 100 BYN",
    note: "Договор, оплата по факту, ЭСЧФ.",
  },
  {
    client: "Частный клиент, геймер",
    task: "Восстановление DXRacer после кота",
    material: "Экокожа, восстановление каркаса спинки",
    time: "3 дня",
    budget: "340 BYN",
    note: "Кресло выглядит лучше, чем из коробки. Кот всё ещё опасен.",
  },
];

function Page() {
  return (
    <PageShell>
      <PageHeading
        kicker="Кейсы"
        title="Что делали — без приукрашиваний"
        subtitle="Реальные проекты: с цифрами, сроками и тем, что пошло не по плану."
      />

      <section className="mx-auto max-w-7xl px-4 lg:px-8 py-16 grid gap-px bg-border">
        {cases.map((c, i) => (
          <article key={i} className="bg-background p-6 lg:p-10 grid lg:grid-cols-[200px_1fr] gap-6 hover:bg-surface transition-colors">
            <div>
              <div className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-2">№ {String(i + 1).padStart(2, "0")}</div>
              <div className="font-bold text-2xl">{c.client}</div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Задача</div>
                <div className="font-medium">{c.task}</div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Материал</div>
                  <div className="text-sm">{c.material}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Срок</div>
                  <div className="font-mono text-sm">{c.time}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Бюджет</div>
                  <div className="font-mono text-accent font-bold">{c.budget}</div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground border-l-2 border-accent pl-4">
                {c.note}
              </div>
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
