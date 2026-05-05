import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHeading } from "@/components/PageShell";
import { POSTS } from "@/data/posts";
import { Calendar, ArrowRight, Clock } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Блог о ремонте и перетяжке кресел | DRAGO" },
      { name: "description", content: "Полезные статьи о ремонте, перетяжке и выборе офисных кресел. Опыт мастеров DRAGO с 2013 года." },
      { property: "og:title", content: "Блог DRAGO — всё о креслах, ремонте и комфорте" },
      { property: "og:description", content: "Статьи про газлифты, материалы обивки, признаки износа и уход за креслом." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <PageShell>
      <PageHeading
        kicker="Блог"
        title="Блог DRAGO — всё о креслах, ремонте и комфорте"
        subtitle="Опыт мастеров без воды: что менять, на чём не экономить и как продлить креслу жизнь."
      />

      <section className="mx-auto max-w-7xl px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {POSTS.map((p) => (
            <article
              key={p.slug}
              className="group bg-surface border-2 border-border hover:border-accent transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_oklch(0.7_0.18_40_/_0.5)] flex flex-col"
            >
              {/* Cover placeholder */}
              <div className="relative aspect-[16/10] bg-[oklch(0.28_0.04_40)] overflow-hidden border-b-2 border-border">
                <div className="absolute inset-0 grid-bg opacity-20" />
                <div className="absolute top-4 left-4 bg-accent text-accent-foreground font-bold px-3 py-1 text-[10px] uppercase tracking-[0.2em]">
                  {p.tag}
                </div>
                <div className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  // 0{POSTS.indexOf(p) + 1}
                </div>
                <div className="absolute inset-0 flex items-center justify-center font-mono text-6xl lg:text-8xl font-bold text-accent/15 group-hover:text-accent/30 transition-colors">
                  D
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono mb-3">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {p.dateLabel}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {p.readingTime}</span>
                </div>
                <h2 className="text-xl font-bold tracking-tight leading-tight group-hover:text-accent transition-colors">
                  <Link to="/blog/$slug" params={{ slug: p.slug }} className="after:absolute after:inset-0">
                    {p.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground text-sm mt-3 flex-1">{p.excerpt}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-wider">
                  Читать <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
