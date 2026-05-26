import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeading } from "@/components/PageShell";
import { ContactForm } from "@/components/ContactForm";
import { Faq, SERVICE_FAQ } from "@/components/Faq";
import { Shield, Star, Sparkles, Check, Clock, Scissors, Frown, Wind, Palette, Sofa, Building } from "lucide-react";
import { MaterialQuiz } from "@/components/MaterialQuiz";
import { RecommendationLetters } from "@/components/RecommendationLetters";
import { ProblemsBlock, type Problem } from "@/components/ProblemsBlock";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { QuickContacts } from "@/components/QuickContacts";

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Перетяжка офисных и компьютерных кресел",
  provider: { "@type": "LocalBusiness", name: "DRAGO", "@id": "https://drago.by/#business" },
  areaServed: "Минск",
  offers: { "@type": "Offer", priceCurrency: "BYN", price: "120", url: "https://drago.by/peretyazhka" },
};

export const Route = createFileRoute("/peretyazhka")({
  head: () => ({
    meta: [
      { title: "Перетяжка кресел в Минске — от 120 BYN | DRAGO" },
      { name: "description", content: "Перетяжка кресел в Минске: экокожа от 160 BYN, ткань от 120 BYN, натуральная кожа от 250 BYN. Гарантия 12 месяцев." },
      { property: "og:title", content: "Перетяжка кресел — DRAGO" },
      { property: "og:description", content: "Вернём креслу вид и комфорт. Подбор материала под любой бюджет." },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(serviceLd) }],
  }),
  component: Page,
});

const problems: Problem[] = [
  {
    icon: Scissors,
    problem: "Обивка протёрлась или порвалась",
    solution: "Полная замена обивки. Подбираем плотный материал — экокожа 1.2 мм или ткань 600+ г/м².",
    meta: "от 120 BYN",
  },
  {
    icon: Sofa,
    problem: "Поролон продавлен, сидеть жёстко",
    solution: "Меняем наполнитель на ППУ-35 (плотность как в новых креслах). Сиденье снова упругое.",
    meta: "входит в перетяжку",
  },
  {
    icon: Wind,
    problem: "Запах от старой обивки",
    solution: "Снимаем всё до каркаса, чистим, антибактериальная обработка, новая обивка с нуля.",
  },
  {
    icon: Palette,
    problem: "Не вписывается в новый интерьер",
    solution: "Каталог из 200+ цветов и фактур. Привезём образцы к вам бесплатно.",
    meta: "выезд с каталогом — 0 BYN",
  },
  {
    icon: Building,
    problem: "Партия офисных кресел потеряла вид",
    solution: "Перетяжка партиями 10–50 шт. без остановки работы офиса. Договор, НДС, закрывающие.",
    meta: "скидка от 10 шт.",
  },
  {
    icon: Frown,
    problem: "Жалко выбрасывать любимое кресло",
    solution: "Восстановим премиальное кресло (Herman Miller, Steelcase, Chairman). Это в 3–4× дешевле нового.",
  },
];

const materials = [
  {
    icon: Shield,
    name: "ЭКОКОЖА",
    price: "от 160 BYN",
    pros: ["Износостойкая, легко моется", "Не выгорает на солнце", "Имитация натуральной кожи"],
    cons: ["Может скрипеть в первые недели"],
    badge: "Популярно",
  },
  {
    icon: Sparkles,
    name: "ТКАНЬ",
    price: "от 120 BYN",
    pros: ["Дышит, не потеешь летом", "Большой выбор расцветок", "Самый бюджетный вариант"],
    cons: ["Хуже отмывается", "Срок службы 3–5 лет"],
    badge: "Бюджетно",
  },
  {
    icon: Star,
    name: "НАТУРАЛЬНАЯ КОЖА",
    price: "от 250 BYN",
    pros: ["Срок службы 10+ лет", "Премиальный вид и тактильность", "Со временем становится мягче"],
    cons: ["Боится острых предметов", "Требует ухода кремом 2 раза в год"],
    badge: "Премиум",
  },
];

const includes = [
  "Снятие и замена обивки",
  "Замена / добавление наполнителя (поролон ППУ-35)",
  "Перетяжка подлокотников",
  "Чистка и обработка каркаса антикором",
  "Профилактика механики",
  "Усиление швов двойной строчкой",
];

function Page() {
  return (
    <PageShell>
      <PageHeading
        kicker="Услуга 01"
        title="Перетяжка офисных и компьютерных кресел в Минске"
        subtitle="Вернём креслу вид и комфорт. Выберите материал под любой бюджет."
      />

      {/* 1. PROBLEMS */}
      <ProblemsBlock
        kicker="// С чем приходят"
        title="Узнайте свою ситуацию"
        subtitle="Шесть типовых причин, по которым кресло отправляют на перетяжку. Каждую решаем по своему сценарию."
        items={problems}
      />

      {/* 2. SOLUTION — что входит + сроки */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-16 lg:py-20 grid lg:grid-cols-2 gap-10">
          <div>
            <div className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-4">// Что входит</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Полный цикл, без доплат</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {includes.map((i) => (
                <li key={i} className="flex items-start gap-3 bg-background border border-border p-4 hover:border-accent transition-colors">
                  <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm">{i}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-4">// Сроки</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">2–6 рабочих дней</h2>
            <div className="space-y-3">
              {[
                { d: "2 дня", t: "1–2 кресла, ткань или экокожа в наличии" },
                { d: "3–4 дня", t: "Партия 3–10 кресел или нестандартный материал" },
                { d: "5–6 дней", t: "Натуральная кожа или партия 10+ кресел" },
              ].map((s) => (
                <div key={s.d} className="flex items-start gap-4 bg-background border border-border p-4 hover:border-accent transition-colors">
                  <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <div className="font-mono font-bold text-accent">{s.d}</div>
                    <div className="text-sm text-muted-foreground">{s.t}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOCIAL PROOF — letters + reviews */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-16 lg:py-20">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <div>
              <div className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-4">// Юр. лицам</div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Рекомендательные письма на бланке</h2>
              <p className="text-muted-foreground mt-4 max-w-xl">
                С печатями и&nbsp;подписями от&nbsp;наших корпоративных клиентов. Можем выслать сканы и&nbsp;дать прямой контакт ответственного лица.
              </p>
            </div>
          </div>
          <RecommendationLetters />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 lg:px-8 py-16 lg:py-20">
        <div className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-4">// Отзывы</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-10">Что говорят клиенты</h2>
        <ReviewsCarousel />
      </section>

      {/* 4. PRICES — материалы + квиз */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-16 lg:py-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 flex items-baseline gap-3">
            <span className="font-mono text-accent text-base">//</span> Материалы и цены
          </h2>

          <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
            {materials.map((m) => (
              <article
                key={m.name}
                className="group relative bg-background border-2 border-border p-6 lg:p-8 transition-all duration-200 hover:border-accent hover:shadow-[0_20px_50px_-20px_oklch(0.7_0.18_40_/_0.5)]"
              >
                <div className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-wider text-accent border border-accent px-2 py-0.5">
                  {m.badge}
                </div>
                <m.icon className="w-12 h-12 text-accent mb-6 transition-transform group-hover:scale-110 group-hover:rotate-[-6deg]" strokeWidth={1.5} />
                <h3 className="font-bold text-2xl tracking-tight">{m.name}</h3>
                <div className="font-mono text-accent font-bold text-xl mt-1 mb-6">{m.price}</div>

                <div className="mb-4">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Плюсы</div>
                  <ul className="space-y-1.5 text-sm">
                    {m.pros.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Минусы</div>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {m.cons.map((c) => (
                      <li key={c} className="flex items-start gap-2">
                        <span className="text-destructive mt-0.5">—</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <MaterialQuiz />
          </div>
        </div>
      </section>

      {/* 5. FORM */}
      <section id="zayavka" className="mx-auto max-w-7xl px-4 lg:px-8 py-16 lg:py-20 grid lg:grid-cols-[1fr_1fr] gap-10 scroll-mt-24">
        <div>
          <div className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-4">// Заявка</div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Оставьте заявку — посчитаем за 15 минут</h2>
          <p className="text-muted-foreground max-w-md">
            Перезвоним и попросим прислать фото кресла. Дальше — точная смета и сроки.
          </p>
        </div>
        <ContactForm source="peretyazhka" />
      </section>

      {/* 6. CONTACTS */}
      <QuickContacts />

      <Faq items={SERVICE_FAQ} />
    </PageShell>
  );
}
