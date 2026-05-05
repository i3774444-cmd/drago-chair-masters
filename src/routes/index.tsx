import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2, Home, ArrowRight, Wrench, Scissors, Phone, Send,
  Cog, Disc3, RotateCw, Hand, Shirt, CircleDot,
  ClipboardList, Search, Truck, CheckCircle2, Camera,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { BeforeAfter } from "@/components/BeforeAfter";

const breakdowns = [
  { icon: Cog, name: "Замена газлифта", desc: "Кресло перестало держать высоту" },
  { icon: Disc3, name: "Замена крестовины", desc: "Треснула или скрипит при нагрузке" },
  { icon: RotateCw, name: "Ремонт механизма качания", desc: "Перманент-контакт, топ-ган, мультиблок" },
  { icon: Hand, name: "Замена подлокотников", desc: "2D / 3D / 4D, накладки и крепления" },
  { icon: Shirt, name: "Перетяжка обивки", desc: "Экокожа, ткань, сетка, натуральная кожа" },
  { icon: CircleDot, name: "Замена роликов", desc: "Полиуретан — не царапает паркет" },
];

const steps = [
  { icon: ClipboardList, title: "Оставляете заявку", desc: "Telegram, телефон или форма на сайте — как удобнее" },
  { icon: Search, title: "Бесплатная диагностика", desc: "По фото за 15 минут или с выездом мастера" },
  { icon: Truck, title: "Забираем кресло", desc: "Мастер приезжает к вам или вывозим в цех" },
  { icon: CheckCircle2, title: "Готово за 1–2 дня", desc: "Возвращаем кресло с гарантией до 12 месяцев" },
];

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

      {/* BEFORE / AFTER */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-10 items-end mb-10">
            <div>
              <div className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-4">// До / После</div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Перетащите ползунок</h2>
            </div>
            <p className="text-muted-foreground max-w-xl lg:text-right lg:ml-auto">
              Так выглядит типичное офисное кресло до и после нашей работы. Каркас тот же — обивка, поролон и механика новые.
            </p>
          </div>
          <BeforeAfter />
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            <span>← потёртая ткань, провисший поролон</span>
            <span className="text-accent">экокожа, новый поролон, гарантия 12 мес →</span>
          </div>
        </div>
      </section>

      {/* BREAKDOWNS */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-16 lg:py-24">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <div>
              <div className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-4">// Поломки</div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Что устраняем
              </h2>
            </div>
            <Link to="/remont" className="btn-ghost">Все услуги</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {breakdowns.map((b) => (
              <div
                key={b.name}
                className="group bg-background p-6 lg:p-8 transition-all duration-200 hover:bg-surface-elevated hover:scale-[1.02] hover:shadow-[0_10px_40px_-10px_oklch(0.7_0.18_40_/_0.4)] hover:z-10 relative cursor-default"
              >
                <b.icon className="w-10 h-10 text-accent mb-5 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-[-6deg]" strokeWidth={1.5} />
                <h3 className="font-bold text-lg mb-1">{b.name}</h3>
                <p className="text-muted-foreground text-sm">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <a
              href="https://t.me/drago_bot"
              target="_blank"
              rel="noreferrer"
              className="btn-accent text-base px-8 py-5 group"
            >
              <Camera className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Получить оценку по фото
              <Send className="w-4 h-4 opacity-70" />
            </a>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-16 lg:py-24">
          <div className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-4">// Процесс</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-12">Как мы работаем</h2>

          <div className="md:hidden -mx-4 px-4 overflow-x-auto pb-4 scrollbar-thin">
            <ol className="flex gap-4 snap-x snap-mandatory">
              {steps.map((s, i) => (
                <li key={s.title} className="snap-start shrink-0 w-[78%] bg-surface border border-border p-6 relative">
                  <div className="font-mono text-5xl font-bold text-accent/30 absolute top-3 right-4">{String(i + 1).padStart(2, "0")}</div>
                  <s.icon className="w-9 h-9 text-accent mb-4" strokeWidth={1.5} />
                  <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm">{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>

          <ol className="hidden md:grid md:grid-cols-4 gap-px bg-border">
            {steps.map((s, i) => (
              <li key={s.title} className="bg-background p-8 relative group hover:bg-surface transition-colors">
                <div className="font-mono text-6xl font-bold text-accent/20 absolute top-4 right-4 group-hover:text-accent/40 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <s.icon className="w-10 h-10 text-accent mb-6 transition-transform group-hover:scale-110" strokeWidth={1.5} />
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block w-5 h-5 text-accent absolute top-1/2 -right-3 -translate-y-1/2 z-10 bg-background p-0.5 box-content" />
                )}
              </li>
            ))}
          </ol>
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
