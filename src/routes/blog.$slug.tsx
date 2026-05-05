import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { getPost, getRelated, POSTS, type BlogPost } from "@/data/posts";
import { Calendar, Clock, ChevronRight, ArrowLeft, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }): { post: BlogPost; related: BlogPost[] } => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    const related = getRelated(params.slug);
    return { post, related };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Статья не найдена | DRAGO" }] };
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} | DRAGO` },
        { name: "description", content: post.description },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        { property: "og:type", content: "article" },
        { property: "article:published_time", content: post.date },
        { property: "article:section", content: post.tag },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            author: { "@type": "Organization", name: "DRAGO" },
            publisher: { "@type": "Organization", name: "DRAGO" },
            articleSection: post.tag,
          }),
        },
      ],
    };
  },
  notFoundComponent: NotFound,
  errorComponent: ({ error }) => (
    <PageShell>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Что-то пошло не так</h1>
        <p className="text-muted-foreground mb-6">{error.message}</p>
        <Link to="/blog" className="btn-accent">К блогу</Link>
      </div>
    </PageShell>
  ),
  component: PostPage,
});

function NotFound() {
  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <div className="font-mono text-6xl text-accent mb-4">404</div>
        <h1 className="text-3xl font-bold mb-4">Статья не найдена</h1>
        <Link to="/blog" className="btn-accent">К списку статей</Link>
      </div>
    </PageShell>
  );
}

function PostPage() {
  const { post, related } = Route.useLoaderData();

  return (
    <PageShell>
      <article>
        {/* Breadcrumbs */}
        <nav aria-label="Хлебные крошки" className="border-b border-border">
          <ol className="mx-auto max-w-4xl px-4 lg:px-8 py-4 flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
            <li><Link to="/" className="hover:text-accent">Главная</Link></li>
            <ChevronRight className="w-3 h-3" />
            <li><Link to="/blog" className="hover:text-accent">Блог</Link></li>
            <ChevronRight className="w-3 h-3" />
            <li className="text-foreground truncate max-w-[40ch]" aria-current="page">{post.title}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="border-b border-border">
          <div className="mx-auto max-w-4xl px-4 lg:px-8 py-12 lg:py-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-accent text-accent-foreground font-bold px-3 py-1 text-[10px] uppercase tracking-[0.2em]">
                {post.tag}
              </span>
              <time dateTime={post.date} className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                <Calendar className="w-3.5 h-3.5" /> {post.dateLabel}
              </time>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                <Clock className="w-3.5 h-3.5" /> {post.readingTime}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
              {post.title}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">{post.excerpt}</p>
          </div>
        </header>

        {/* Body */}
        <section className="mx-auto max-w-3xl px-4 lg:px-8 py-12 lg:py-16">
          <div className="space-y-6 text-base lg:text-lg leading-relaxed">
            {post.body.map((block: BlogPost["body"][number], i: number) => {
              if (block.type === "h2") return <h2 key={i} className="text-2xl md:text-3xl font-bold tracking-tight mt-10 mb-2">{block.text}</h2>;
              if (block.type === "h3") return <h3 key={i} className="text-xl md:text-2xl font-bold tracking-tight mt-8 mb-2">{block.text}</h3>;
              if (block.type === "ul") return (
                <ul key={i} className="space-y-2 pl-0">
                  {block.items?.map((it: string, j: number) => (
                    <li key={j} className="flex gap-3 border-l-2 border-accent pl-4 text-muted-foreground">
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              );
              return <p key={i} className="text-muted-foreground">{block.text}</p>;
            })}
          </div>

          <div className="flex justify-between items-center mt-16 pt-8 border-t border-border">
            <Link to="/blog" className="btn-ghost">
              <ArrowLeft className="w-4 h-4" /> Все статьи
            </Link>
            <Link to="/kontakty" className="btn-accent">
              Заказать ремонт <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="border-t border-border bg-surface">
            <div className="mx-auto max-w-4xl px-4 lg:px-8 py-12 lg:py-16">
              <div className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-4">// Читайте также</div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Похожие статьи</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((p: BlogPost) => (
                  <Link
                    key={p.slug}
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="group bg-background border border-border p-6 hover:border-accent hover:-translate-y-0.5 transition-all"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">{p.tag} · {p.dateLabel}</div>
                    <h3 className="font-bold text-lg group-hover:text-accent transition-colors">{p.title}</h3>
                    <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{p.excerpt}</p>
                  </Link>
                ))}
              </div>
              <div className="mt-6 text-center text-xs font-mono text-muted-foreground">
                Всего статей в блоге: {POSTS.length}
              </div>
            </div>
          </section>
        )}
      </article>
    </PageShell>
  );
}
