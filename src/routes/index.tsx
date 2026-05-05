import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Home, ArrowRight, Wrench, Scissors, Phone } from "lucide-react";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DRAGO — ремонт и перетяжка офисных кресел в Минске" },
      { name: "description", content: "Ремонт и перетяжка офисных и компьютерных кресел в Минске с 2013 года. Работаем с компаниями и частными лицами. Гарантия, выезд, честные цены." },
      { property: "og:title", content: "DRAGO — ремонт и перетяжка кресел в Минске" },
      { property: "og:description", content: "Возвращаем креслам вторую жизнь. 100+ перетянутых, 200+ отремонтированных кресел." },
    ],
  }),
  component: Index,
});

const stats = [
  { value: "100+", label: "кресел перетянуто" },
  { value: "200+", label: "отремонтировано" },
  { value: "50%", label: "клиентов по рекомендации" },
  { value: "2013", label: "год основания" },
];

const clients = ["БелАЗ", "Белпочта", "МТС", "Белтелеком", "Белшина"];

function Index() {
  return (
    <PageShell>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8 pt-16 pb-12">
          <div className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-6">
            // Минск · с 2013 года
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] max-w-5xl">
            Ремонтируем кресла, <br/>
            <span className="text-accent">а не выбрасываем</span> их.
          </h1>
          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl">
            Перетяжка и ремонт офисных и компьютерных кресел. Честно говорим, что можно починить, а что — нет.
          </p>
        </div>

        {/* TWO BIG CARDS */}
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8 pb-20">
          <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
            <Link
              to="/peretyazhka"
              className="group relative bg-surface border-2 border-border hover:border-accent transition-all p-8 lg:p-12 overflow-hidden"
            >
              <div className="absolute top-4 right-4 font-mono text-xs text-muted-foreground">01</div>
              <Building2 className="w-16 h-16 text-accent mb-8 group-hover:scale-110 transition-transform origin-left" strokeWidth={1.5} />
              <div className="text-2xl md:text-3xl font-bold mb-2">Я — БИЗНЕС</div>
              <p className="text-muted-foreground mb-8 max-w-sm">
                Ремонт и перетяжка для компаний. Выезжаем, считаем, договор, отсрочка платежа.
              </p>
              <div className="flex items-center gap-2 text-accent font-bold uppercase text-sm tracking-wider">
                Услуги для компаний
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>

            <Link
              to="/remont"
              className="group relative bg-surface border-2 border-border hover:border-accent transition-all p-8 lg:p-12 overflow-hidden"
            >
              <div className="absolute top-4 right-4 font-mono text-xs text-muted-foreground">02</div>
              <Home className="w-16 h-16 text-accent mb-8 group-hover:scale-110 transition-transform origin-left" strokeWidth={1.5} />
              <div className="text-2xl md:text-3xl font-bold mb-2">Я — ЧАСТНОЕ ЛИЦО</div>
              <p className="text-muted-foreground mb-8 max-w-sm">
                Ремонт и перетяжка для дома. Заберём из квартиры, вернём как новое.
              </p>
              <div className="flex items-center gap-2 text-accent font-bold uppercase text-sm tracking-wider">
                Услуги для дома
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-16 lg:py-24">
          <div className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-10">// Цифры</div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {stats.map((s) => (
              <div key={s.label} className="bg-background p-6 lg:p-8">
                <div className="font-mono text-4xl lg:text-6xl font-bold text-accent">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-3 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-16 lg:py-24 grid md:grid-cols-2 gap-8">
          <div className="bg-surface p-8 border border-border">
            <Scissors className="w-10 h-10 text-accent mb-4" />
            <h3 className="text-2xl font-bold mb-3">Перетяжка</h3>
            <p className="text-muted-foreground mb-6">
              Меняем обивку: экокожа, ткань, сетка. Подбираем материал под нагрузку и интерьер. Срок — 2–5 дней.
            </p>
            <Link to="/peretyazhka" className="btn-ghost">Подробнее</Link>
          </div>
          <div className="bg-surface p-8 border border-border">
            <Wrench className="w-10 h-10 text-accent mb-4" />
            <h3 className="text-2xl font-bold mb-3">Ремонт механики</h3>
            <p className="text-muted-foreground mb-6">
              Газлифт, крестовина, ролики, пиастра, качание. Восстанавливаем то, что в магазине считают «одноразовым».
            </p>
            <Link to="/remont" className="btn-ghost">Подробнее</Link>
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-16 lg:py-20">
          <div className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-10">// Нам доверяют</div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-border">
            {clients.map((c) => (
              <div key={c} className="bg-background h-24 flex items-center justify-center hover:bg-surface transition-colors">
                <span className="font-bold text-lg tracking-wider text-muted-foreground hover:text-foreground transition-colors">
                  {c}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALLBACK CTA */}
      <section id="callback" className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-16 lg:py-24 grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Не уверены, что чинить?<br/>
              <span className="text-accent">Пришлите фото — оценим бесплатно.</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl">
              Ответим за 15 минут в рабочее время. Скажем честно: ремонтировать или проще купить новое.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a href="tel:+375291234567" className="btn-accent text-base px-6 py-4">
              <Phone className="w-5 h-5" /> +375 29 123-45-67
            </a>
            <a href="https://t.me/drago_minsk" target="_blank" rel="noreferrer" className="btn-ghost text-base px-6 py-4">
              Написать в Telegram
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
