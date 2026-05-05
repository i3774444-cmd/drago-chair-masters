import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHeading } from "@/components/PageShell";

export const Route = createFileRoute("/remont")({
  head: () => ({
    meta: [
      { title: "Ремонт офисных кресел в Минске — DRAGO" },
      { name: "description", content: "Ремонт офисных и игровых кресел: газлифт, крестовина, ролики, механизм качания. Минск, выезд мастера." },
      { property: "og:title", content: "Ремонт кресел — DRAGO" },
      { property: "og:description", content: "Меняем газлифт, крестовину, ролики, пиастру за 1 день." },
    ],
  }),
  component: Page,
});

const works = [
  { name: "Замена газлифта", price: "45 BYN", time: "15 минут", desc: "Кресло опускается, не держит высоту — это газлифт. Меняем на усиленный класса 4." },
  { name: "Замена крестовины", price: "от 60 BYN", time: "20 минут", desc: "Треснула или скрипит. Ставим металлическую — выдерживает до 150 кг." },
  { name: "Замена роликов (комплект 5 шт)", price: "35 BYN", time: "10 минут", desc: "Полиуретановые ролики не царапают паркет и ламинат." },
  { name: "Ремонт механизма качания", price: "от 50 BYN", time: "30 минут", desc: "Перманент-контакт, топ-ган, мультиблок. Перебираем или меняем." },
  { name: "Замена пиастры (подъёмник под сиденьем)", price: "55 BYN", time: "20 минут", desc: "Кресло наклонилось или не качается — лопнула пиастра." },
  { name: "Ремонт подлокотников", price: "от 30 BYN", time: "15 минут", desc: "3D / 4D подлокотники: замена накладок, креплений, регулировок." },
];

function Page() {
  return (
    <PageShell>
      <PageHeading
        kicker="Услуга 02"
        title="Ремонт механики кресел"
        subtitle="Кресло проседает, скрипит, наклонилось вбок? В 90% случаев это решается за 30 минут и 50 рублей."
      />

      <section className="mx-auto max-w-7xl px-4 lg:px-8 py-16 lg:py-20">
        <h2 className="text-3xl font-bold mb-8">Что делаем и сколько стоит</h2>
        <div className="grid gap-px bg-border">
          {works.map((w) => (
            <div key={w.name} className="bg-background p-6 grid md:grid-cols-[1fr_auto_auto] gap-4 md:gap-8 items-start hover:bg-surface transition-colors">
              <div>
                <h3 className="font-bold text-lg">{w.name}</h3>
                <p className="text-muted-foreground text-sm mt-1">{w.desc}</p>
              </div>
              <div className="font-mono text-sm text-muted-foreground md:text-right">⏱ {w.time}</div>
              <div className="font-mono text-accent font-bold text-lg md:text-right whitespace-nowrap">{w.price}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-16 lg:py-20 grid md:grid-cols-2 gap-12">
          <div>
            <div className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-4">// Где ремонтируем</div>
            <h2 className="text-3xl font-bold mb-4">В мастерской или у вас в офисе</h2>
            <p className="text-muted-foreground">
              Мелкий ремонт (газлифт, ролики, крестовина) делаем на месте — выезд мастера по Минску от 25 BYN, бесплатно при ремонте 5+ кресел.
            </p>
          </div>
          <div>
            <div className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-4">// Гарантия</div>
            <h2 className="text-3xl font-bold mb-4">6 месяцев на детали и работу</h2>
            <p className="text-muted-foreground mb-6">
              Используем оригинальные комплектующие: ChairTech, Donati, Samurai. Не китайский noname с рынка.
            </p>
            <Link to="/kontakty" className="btn-accent">Вызвать мастера</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
