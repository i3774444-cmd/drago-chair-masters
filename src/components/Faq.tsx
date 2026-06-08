import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export type FaqItem = { q: string; a: string };

export function Faq({ items, title = "Частые вопросы" }: { items: FaqItem[]; title?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-4xl px-4 lg:px-8 py-16 lg:py-20">
        <div className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-4">// FAQ</div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-10">{title}</h2>

        <div className="border-2 border-border bg-surface">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-border last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 hover:bg-background hover:text-accent transition-colors group"
                >
                  <span className="font-bold text-base md:text-lg">{it.q}</span>
                  <span className="shrink-0 w-8 h-8 border-2 border-border group-hover:border-accent flex items-center justify-center transition-colors">
                    {isOpen ? <Minus className="w-4 h-4 text-accent" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-muted-foreground leading-relaxed">{it.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export const SERVICE_FAQ: FaqItem[] = [
  { q: "Сколько времени занимает ремонт?", a: "От нескольких часов до 1–2 дней — зависит от объёма работ и наличия запчастей." },
  { q: "Даёте ли гарантию?", a: "Да, гарантия на все работы и запчасти — 6 месяцев." },
  { q: "Выезжаете ли в офис/на дом?", a: "Да, выезд мастера по Минску — бесплатный." },
  { q: "Какие запчасти используете?", a: "Оригинальные комплектующие от проверенных поставщиков: ChairTech, Donati, Samurai." },
  { q: "Можно ли оплатить по безналу?", a: "Да, работаем с юрлицами: договор, счёт, акт выполненных работ, ЭСЧФ." },
  { q: "Что делать, если кресло снова сломалось?", a: "Приезжаем и решаем вопрос в пользу клиента: либо переделываем, либо возвращаем деньги." },
  { q: "Нужна ли предоплата?", a: "Нет, оплата только по факту выполненных работ. Цена фиксируется до начала." },
];
