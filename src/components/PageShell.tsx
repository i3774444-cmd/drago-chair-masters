import { Header } from "./Header";
import { Footer } from "./Footer";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeading({ kicker, title, subtitle }: { kicker: string; title: string; subtitle?: string }) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-16 lg:py-24">
        <div className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-4">// {kicker}</div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-4xl">{title}</h1>
        {subtitle && <p className="text-muted-foreground mt-6 max-w-2xl text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}
