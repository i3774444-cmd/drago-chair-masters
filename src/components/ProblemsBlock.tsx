import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

export type Problem = {
  icon: LucideIcon;
  problem: string;
  solution: string;
  meta?: string;
};

export function ProblemsBlock({
  kicker = "// Проблемы",
  title,
  subtitle,
  items,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  items: Problem[];
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 lg:px-8 py-16 lg:py-20">
      <div className="max-w-3xl mb-10">
        <div className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-4">{kicker}</div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{title}</h2>
        {subtitle && <p className="text-muted-foreground mt-4 text-lg">{subtitle}</p>}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border-2 border-border">
        {items.map((it) => (
          <article key={it.problem} className="bg-background p-6 lg:p-7 flex flex-col">
            <it.icon className="w-9 h-9 text-accent mb-5" strokeWidth={1.5} />
            <div className="font-mono text-[10px] uppercase tracking-wider text-destructive mb-2">
              Проблема
            </div>
            <h3 className="font-bold text-lg leading-snug mb-4">{it.problem}</h3>

            <div className="mt-auto pt-4 border-t border-dashed border-border">
              <div className="font-mono text-[10px] uppercase tracking-wider text-accent mb-2 flex items-center gap-1">
                <ArrowRight className="w-3 h-3" /> Решение
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{it.solution}</p>
              {it.meta && (
                <div className="mt-3 font-mono text-xs text-accent font-bold">{it.meta}</div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
