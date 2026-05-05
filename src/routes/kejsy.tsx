import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHeading } from "@/components/PageShell";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Armchair, X } from "lucide-react";
import { useEffect } from "react";

export const Route = createFileRoute("/kejsy")({
  head: () => ({
    meta: [
      { title: "Наши работы — DRAGO Минск" },
      { name: "description", content: "Кейсы по ремонту и перетяжке офисных кресел: до и после, тип работы и материалы." },
      { property: "og:title", content: "Кейсы — DRAGO" },
      { property: "og:description", content: "Реальные работы: до / после." },
    ],
  }),
  component: Page,
});

type Case = {
  id: string;
  client: string;
  work: string;
  material: string;
  tone: "warm" | "cool" | "neutral";
};

const cases: Case[] = [
  { id: "1", client: "БелАЗ · 42 кресла", work: "Перетяжка операторских кресел", material: "Антивандальная ткань", tone: "warm" },
  { id: "2", client: "МТС · контакт-центр", work: "Ремонт механики 28 шт", material: "Газлифты, ролики", tone: "cool" },
  { id: "3", client: "Частный заказ", work: "Перетяжка Herman Miller Aeron", material: "Оригинальная сетка mesh", tone: "neutral" },
  { id: "4", client: "Белпочта · 16 кресел", work: "Перетяжка + ремонт", material: "Экокожа премиум", tone: "warm" },
  { id: "5", client: "DXRacer", work: "Восстановление после кота", material: "Экокожа, ремонт каркаса", tone: "cool" },
  { id: "6", client: "Belshina · офис", work: "Перетяжка кресел руководителей", material: "Натуральная кожа", tone: "neutral" },
  { id: "7", client: "IT-компания", work: "Ремонт 20 кресел Comfort Seating", material: "Замена сетки и качания", tone: "warm" },
  { id: "8", client: "Юр. фирма", work: "Перетяжка приёмной", material: "Экокожа Antara", tone: "cool" },
  { id: "9", client: "Частная квартира", work: "Перетяжка геймерского кресла", material: "Ткань + контрастная строчка", tone: "neutral" },
];

function Tile({ tone, label }: { tone: Case["tone"]; label: string }) {
  const bg =
    tone === "warm"
      ? "bg-[oklch(0.3_0.05_40)]"
      : tone === "cool"
        ? "bg-[oklch(0.25_0_0)]"
        : "bg-[oklch(0.28_0.02_60)]";
  const color = label === "ПОСЛЕ" ? "text-accent" : "text-muted-foreground";
  return (
    <div className={`relative aspect-square ${bg} flex flex-col items-center justify-center gap-2 overflow-hidden`}>
      <div className="absolute inset-0 grid-bg opacity-15" />
      <Armchair className={`w-12 h-12 lg:w-16 lg:h-16 ${color} relative`} strokeWidth={1.3} />
      <div className={`font-mono text-[10px] uppercase tracking-[0.25em] ${color} relative`}>// {label}</div>
    </div>
  );
}

function Page() {
  const [open, setOpen] = useState<Case | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <PageShell>
      <PageHeading
        kicker="Портфолио"
        title="Наши работы"
        subtitle="Нажмите на карточку — откроется крупное сравнение «До / После»."
      />

      <section className="mx-auto max-w-7xl px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {cases.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setOpen(c)}
              className="group text-left bg-surface border-2 border-border hover:border-accent transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_oklch(0.7_0.18_40_/_0.5)] overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-px bg-border">
                <Tile tone="cool" label="ДО" />
                <Tile tone={c.tone} label="ПОСЛЕ" />
              </div>
              <div className="p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-2">
                  Кейс № {String(c.id).padStart(2, "0")}
                </div>
                <h3 className="font-bold text-lg leading-tight group-hover:text-accent transition-colors">
                  {c.work}
                </h3>
                <div className="text-sm text-muted-foreground mt-1">{c.client}</div>
                <div className="font-mono text-xs text-muted-foreground mt-3 border-t border-border pt-3">
                  {c.material}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur p-4 lg:p-8 overflow-y-auto"
          onClick={() => setOpen(null)}
        >
          <div
            className="relative max-w-5xl mx-auto bg-surface border-2 border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(null)}
              aria-label="Закрыть"
              className="absolute -top-3 -right-3 z-10 w-10 h-10 bg-accent text-accent-foreground flex items-center justify-center hover:rotate-90 transition-transform"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 lg:p-8 border-b border-border">
              <div className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-2">
                // Кейс № {String(open.id).padStart(2, "0")}
              </div>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">{open.work}</h2>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-muted-foreground font-mono">
                <span>👤 {open.client}</span>
                <span>🧵 {open.material}</span>
              </div>
            </div>

            <div className="p-6 lg:p-8">
              <BeforeAfter />
              <p className="text-xs text-muted-foreground mt-4 text-center font-mono uppercase tracking-wider">
                Перетащите ползунок, чтобы сравнить
              </p>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
