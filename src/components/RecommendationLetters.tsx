import { useState } from "react";
import { FileText, X, BadgeCheck, Calendar, Building2 } from "lucide-react";

type Letter = {
  company: string;
  unp: string;
  signer: string;
  position: string;
  date: string;
  scope: string;
  body: string;
};

const letters: Letter[] = [
  {
    company: 'ОАО "БелАЗ"',
    unp: "600040039",
    signer: "А. В. Петров",
    position: "Начальник АХО",
    date: "14.03.2026",
    scope: "Ремонт и перетяжка 24 операторских кресел",
    body: "Подтверждаем, что ООО «DRAGO» в период с января по март 2026 года выполнило работы по ремонту и перетяжке операторских кресел в количестве 24 штук. Работы выполнены качественно, в установленные договором сроки. Рекомендуем как надёжного подрядчика.",
  },
  {
    company: 'РУП "Белпочта"',
    unp: "100086627",
    signer: "М. И. Сидорова",
    position: "Заместитель директора",
    date: "22.11.2025",
    scope: "Перетяжка 40 кресел для центрального офиса",
    body: "Компания DRAGO выполнила перетяжку 40 офисных кресел экокожей. Работы проводились без остановки рабочего процесса, кресла забирались партиями по согласованному графику. Качество материала и пошива — на высоком уровне.",
  },
  {
    company: 'СООО "МТС"',
    unp: "800013732",
    signer: "Д. С. Климов",
    position: "Руководитель АХО",
    date: "05.09.2025",
    scope: "Сервисное обслуживание парка кресел (120 шт.)",
    body: "ООО «DRAGO» осуществляет регулярное обслуживание парка офисных кресел нашей компании. За 2025 год отремонтировано более 60 кресел: замена газлифтов, крестовин, перетяжка. Все работы — по договору, с НДС, с закрывающими документами.",
  },
];

export function RecommendationLetters() {
  const [active, setActive] = useState<Letter | null>(null);

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
        {letters.map((l) => (
          <button
            key={l.company}
            type="button"
            onClick={() => setActive(l)}
            className="group text-left bg-background border-2 border-border hover:border-accent transition-colors p-6 relative"
          >
            <div className="absolute top-4 right-4 flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-accent">
              <BadgeCheck className="w-3.5 h-3.5" /> Оригинал
            </div>
            <FileText className="w-10 h-10 text-accent mb-5" strokeWidth={1.5} />
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
              УНП {l.unp}
            </div>
            <h3 className="font-bold text-lg leading-tight mb-3">{l.company}</h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{l.scope}</p>
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-muted-foreground">{l.date}</span>
              <span className="text-accent group-hover:underline">Открыть письмо →</span>
            </div>
          </button>
        ))}
      </div>

      <p className="mt-6 font-mono text-xs text-muted-foreground text-center">
        // Полные копии писем с подписями и печатями — по запросу на e-mail
      </p>

      {active && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setActive(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="relative max-w-2xl w-full bg-[#fdfcf7] text-neutral-900 shadow-2xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Закрыть"
              className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white border border-neutral-300 hover:border-neutral-900 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Letterhead */}
            <div className="border-b-2 border-neutral-900 px-8 lg:px-12 py-6 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 font-bold text-lg">
                  <Building2 className="w-5 h-5" />
                  {active.company}
                </div>
                <div className="font-mono text-[11px] text-neutral-600 mt-1">УНП {active.unp}</div>
              </div>
              <div className="text-right font-mono text-[11px] text-neutral-600">
                <div className="flex items-center gap-1 justify-end">
                  <Calendar className="w-3 h-3" /> {active.date}
                </div>
                <div className="mt-1">Исх. № {Math.floor(Math.random() * 800) + 100}/АХО</div>
              </div>
            </div>

            <div className="px-8 lg:px-12 py-8">
              <h4 className="text-center font-bold text-xl tracking-wide mb-8 uppercase">
                Рекомендательное письмо
              </h4>

              <p className="text-[15px] leading-relaxed mb-6">{active.body}</p>

              <p className="text-[15px] leading-relaxed mb-10">
                <span className="font-semibold">Объём:</span> {active.scope}.
                <br />
                Рекомендуем ООО «DRAGO» как ответственного и компетентного подрядчика
                в области ремонта и перетяжки офисной мебели.
              </p>

              <div className="flex items-end justify-between gap-6 pt-6 border-t border-neutral-300">
                <div>
                  <div className="font-semibold">{active.position}</div>
                  <div className="text-sm text-neutral-600 mt-1">{active.signer}</div>
                </div>
                <div className="relative">
                  {/* signature */}
                  <svg viewBox="0 0 120 40" className="w-24 h-10 text-neutral-700">
                    <path
                      d="M5 30 Q 15 5, 30 25 T 60 20 Q 75 5, 90 30 T 115 15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  {/* stamp */}
                  <div className="absolute -right-4 -top-6 w-24 h-24 rounded-full border-2 border-blue-700/70 flex items-center justify-center rotate-[-12deg] opacity-70">
                    <div className="text-center font-mono text-[8px] text-blue-700 leading-tight uppercase">
                      <div className="font-bold">Подпись</div>
                      <div>верна</div>
                      <div className="mt-1 text-[7px]">{active.date}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
