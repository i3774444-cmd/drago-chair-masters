import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell, PageHeading } from "@/components/PageShell";
import { Wrench, Scissors, Search, Truck, Gift } from "lucide-react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Link } from "@tanstack/react-router";
import { PriceCalculator } from "@/components/PriceCalculator";

const searchSchema = z.object({
  tab: fallback(z.enum(["remont", "peretyazhka"]), "remont").default("remont"),
});

export const Route = createFileRoute("/ceny")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Цены на ремонт и перетяжку кресел | DRAGO Минск" },
      { name: "description", content: "Прайс на ремонт и перетяжку офисных и компьютерных кресел в Минске. Без скрытых платежей." },
      { property: "og:title", content: "Цены — DRAGO" },
      { property: "og:description", content: "Прайс на ремонт и перетяжку кресел." },
    ],
  }),
  component: Page,
});

type Repair = { name: string; price: string; cat: "mech" | "oboi" | "service"; free?: boolean };

const repairs: Repair[] = [
  { name: "Замена газлифта", price: "от 45 BYN", cat: "mech" },
  { name: "Замена крестовины", price: "от 35 BYN", cat: "mech" },
  { name: "Замена механизма качания", price: "от 58 BYN", cat: "mech" },
  { name: "Замена роликов (комплект)", price: "от 15 BYN", cat: "mech" },
  { name: "Замена подлокотников", price: "от 28 BYN", cat: "mech" },
  { name: "Замена пиастры", price: "от 40 BYN", cat: "mech" },
  { name: "Ремонт обивки", price: "от 100 BYN", cat: "oboi" },
  { name: "Замена поролона", price: "от 25 BYN", cat: "oboi" },
  { name: "Чистка обивки химией", price: "от 35 BYN", cat: "oboi" },
  { name: "Диагностика", price: "бесплатно", cat: "service", free: true },
  { name: "Выезд мастера по Минску", price: "бесплатно", cat: "service", free: true },
];

const filters = [
  { id: "all", label: "Все" },
  { id: "mech", label: "Механика" },
  { id: "oboi", label: "Обивка" },
  { id: "service", label: "Сервис" },
] as const;

const upholstery = [
  { type: "Компьютерное кресло", econom: "от 120 BYN", eco: "от 160 BYN", leather: "от 250 BYN" },
  { type: "Офисное кресло", econom: "от 140 BYN", eco: "от 180 BYN", leather: "от 270 BYN" },
  { type: "Кресло руководителя", econom: "от 180 BYN", eco: "от 220 BYN", leather: "от 320 BYN" },
];

function Page() {
  const { tab } = Route.useSearch();
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");

  const filtered = useMemo(
    () => (filter === "all" ? repairs : repairs.filter((r) => r.cat === filter)),
    [filter],
  );

  return (
    <PageShell>
      <PageHeading
        kicker="Прайс"
        title="Цены без звёздочек"
        subtitle="Все цены окончательные. Точная стоимость — после фото или диагностики."
      />

      <section className="mx-auto max-w-7xl px-4 lg:px-8 py-12">
        {/* Tabs */}
        <div className="inline-grid grid-cols-2 border-2 border-border bg-surface p-1 mb-10">
          <Link
            from={Route.fullPath}
            search={{ tab: "remont" }}
            className={`flex items-center justify-center gap-2 px-6 py-3 font-bold uppercase tracking-wider text-sm transition-all ${
              tab === "remont" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Wrench className="w-4 h-4" /> Ремонт
          </Link>
          <Link
            from={Route.fullPath}
            search={{ tab: "peretyazhka" }}
            className={`flex items-center justify-center gap-2 px-6 py-3 font-bold uppercase tracking-wider text-sm transition-all ${
              tab === "peretyazhka" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Scissors className="w-4 h-4" /> Перетяжка
          </Link>
        </div>

        {tab === "remont" ? (
          <>
            {/* Repair filter */}
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <Search className="w-4 h-4 text-accent" />
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground mr-2">
                Фильтр:
              </span>
              {filters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`px-3 py-1.5 text-sm border-2 transition-colors ${
                    filter === f.id
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border hover:border-accent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="border-2 border-border bg-surface">
              {filtered.map((p) => (
                <div
                  key={p.name}
                  className="grid grid-cols-[1fr_auto] gap-4 px-6 py-4 border-b border-border last:border-b-0 hover:bg-background hover:pl-8 hover:border-l-2 hover:border-l-accent transition-all group"
                >
                  <span className="font-medium group-hover:text-accent transition-colors">{p.name}</span>
                  <span className={`font-mono font-bold whitespace-nowrap ${p.free ? "text-accent uppercase text-sm" : ""}`}>
                    {p.price}
                  </span>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">Ничего не найдено</div>
              )}
            </div>
          </>
        ) : (
          <div className="border-2 border-border bg-surface overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead className="bg-background border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Тип кресла</th>
                  <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Эконом / ткань</th>
                  <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Экокожа</th>
                  <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Натуральная кожа</th>
                </tr>
              </thead>
              <tbody>
                {upholstery.map((row) => (
                  <tr key={row.type} className="border-b border-border last:border-b-0 hover:bg-background transition-colors group">
                    <td className="px-6 py-5 font-bold group-hover:text-accent transition-colors">{row.type}</td>
                    <td className="px-6 py-5 font-mono">{row.econom}</td>
                    <td className="px-6 py-5 font-mono">{row.eco}</td>
                    <td className="px-6 py-5 font-mono text-accent font-bold">{row.leather}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Highlight bar */}
        <div className="mt-10 grid sm:grid-cols-2 gap-px bg-border border-2 border-accent">
          <div className="bg-accent text-accent-foreground p-6 flex items-start gap-4">
            <Truck className="w-7 h-7 shrink-0 mt-1" strokeWidth={2} />
            <div>
              <div className="font-bold uppercase tracking-wide">Бесплатная доставка</div>
              <p className="text-sm">Заберём кресло из дома или офиса по Минску&nbsp;— бесплатно.</p>
            </div>
          </div>
          <div className="bg-accent text-accent-foreground p-6 flex items-start gap-4">
            <Gift className="w-7 h-7 shrink-0 mt-1" strokeWidth={2} />
            <div>
              <div className="font-bold uppercase tracking-wide">Колёсики в подарок</div>
              <p className="text-sm">Комплект полиуретановых роликов при заказе перетяжки.</p>
            </div>
          </div>
        </div>

        {/* Calculator */}
        <div className="mt-16">
          <div className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-4">// Прикинуть стоимость</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Калькулятор за&nbsp;30&nbsp;секунд</h2>
          <PriceCalculator />
        </div>
      </section>
    </PageShell>
  );
}
