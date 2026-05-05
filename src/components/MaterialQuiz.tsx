import { useState } from "react";
import { Wand2, X, ArrowRight, RotateCcw, Check } from "lucide-react";

type Choice = { label: string; score: { fabric: number; eco: number; leather: number } };
type Question = { id: string; q: string; choices: Choice[] };

const QUESTIONS: Question[] = [
  {
    id: "use",
    q: "Как часто используется кресло?",
    choices: [
      { label: "Каждый день, 8+ часов", score: { fabric: 0, eco: 2, leather: 3 } },
      { label: "Несколько часов в день", score: { fabric: 2, eco: 2, leather: 1 } },
      { label: "Редко, по выходным", score: { fabric: 3, eco: 1, leather: 0 } },
    ],
  },
  {
    id: "kids",
    q: "Дети или животные дома?",
    choices: [
      { label: "Да, активно пользуются", score: { fabric: 0, eco: 3, leather: 1 } },
      { label: "Бывают иногда", score: { fabric: 1, eco: 2, leather: 2 } },
      { label: "Нет", score: { fabric: 2, eco: 2, leather: 3 } },
    ],
  },
  {
    id: "budget",
    q: "Какой бюджет на перетяжку?",
    choices: [
      { label: "До 150 BYN — экономно", score: { fabric: 3, eco: 1, leather: 0 } },
      { label: "150–250 BYN — оптимум", score: { fabric: 2, eco: 3, leather: 1 } },
      { label: "От 250 BYN — премиум", score: { fabric: 0, eco: 1, leather: 3 } },
    ],
  },
  {
    id: "feel",
    q: "Что важнее в ощущениях?",
    choices: [
      { label: "Дышит, не потею летом", score: { fabric: 3, eco: 1, leather: 1 } },
      { label: "Легко протереть от пятен", score: { fabric: 0, eco: 3, leather: 3 } },
      { label: "Премиум-вид и тактильность", score: { fabric: 0, eco: 1, leather: 3 } },
    ],
  },
];

const RESULTS = {
  fabric: {
    name: "Ткань",
    price: "от 120 BYN",
    why: "Бюджетно, дышит, большой выбор расцветок. Подходит при умеренной нагрузке.",
  },
  eco: {
    name: "Экокожа",
    price: "от 160 BYN",
    why: "Лучший баланс цены и практичности. Легко моется, износостойкая, хорошо смотрится.",
  },
  leather: {
    name: "Натуральная кожа",
    price: "от 250 BYN",
    why: "Премиум на 10+ лет. Лучше всего при ежедневном использовании и желании «дорого».",
  },
} as const;

export function MaterialQuiz() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({ fabric: 0, eco: 0, leather: 0 });
  const [done, setDone] = useState(false);

  const reset = () => {
    setStep(0);
    setScores({ fabric: 0, eco: 0, leather: 0 });
    setDone(false);
  };

  const pick = (c: Choice) => {
    const next = {
      fabric: scores.fabric + c.score.fabric,
      eco: scores.eco + c.score.eco,
      leather: scores.leather + c.score.leather,
    };
    setScores(next);
    if (step + 1 < QUESTIONS.length) setStep(step + 1);
    else setDone(true);
  };

  const winnerKey = (Object.keys(scores) as Array<keyof typeof scores>).reduce((a, b) =>
    scores[a] >= scores[b] ? a : b,
  );
  const winner = RESULTS[winnerKey];
  const total = scores.fabric + scores.eco + scores.leather || 1;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          reset();
          setOpen(true);
        }}
        className="inline-flex items-center gap-3 border-2 border-accent text-accent px-6 py-4 font-bold uppercase tracking-wider text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        <Wand2 className="w-5 h-5" />
        Подобрать материал за 1 минуту
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Подбор материала"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 animate-in fade-in"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="bg-background border-2 border-accent w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <div className="font-mono text-xs uppercase tracking-wider text-accent">
                {done ? "Результат" : `Шаг ${step + 1} из ${QUESTIONS.length}`}
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Закрыть"
                className="w-8 h-8 flex items-center justify-center hover:text-accent"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!done && (
              <>
                <div className="h-1 bg-border">
                  <div
                    className="h-full bg-accent transition-all"
                    style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-6">{QUESTIONS[step].q}</h3>
                  <div className="flex flex-col gap-3">
                    {QUESTIONS[step].choices.map((c) => (
                      <button
                        key={c.label}
                        type="button"
                        onClick={() => pick(c)}
                        className="group flex items-center justify-between gap-3 text-left border-2 border-border hover:border-accent hover:text-accent px-4 py-4 transition-colors"
                      >
                        <span className="font-medium">{c.label}</span>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {done && (
              <div className="p-6">
                <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Вам подойдёт
                </div>
                <h3 className="text-3xl font-bold mb-1">{winner.name}</h3>
                <div className="font-mono text-accent font-bold text-xl mb-4">{winner.price}</div>
                <p className="text-muted-foreground mb-6">{winner.why}</p>

                <div className="space-y-2 mb-6">
                  {(Object.keys(RESULTS) as Array<keyof typeof RESULTS>).map((k) => (
                    <div key={k} className="flex items-center gap-3">
                      <div className="w-28 text-sm font-medium">{RESULTS[k].name}</div>
                      <div className="flex-1 h-2 bg-border overflow-hidden">
                        <div
                          className={`h-full ${k === winnerKey ? "bg-accent" : "bg-muted-foreground/40"}`}
                          style={{ width: `${(scores[k] / total) * 100}%` }}
                        />
                      </div>
                      <div className="w-10 text-right font-mono text-xs text-muted-foreground">
                        {Math.round((scores[k] / total) * 100)}%
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="/kontakty#form"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground font-bold px-5 py-3 uppercase tracking-wider text-sm hover:brightness-110 transition-all"
                  >
                    <Check className="w-4 h-4" /> Оставить заявку
                  </a>
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center justify-center gap-2 border-2 border-border hover:border-accent px-5 py-3 font-bold uppercase tracking-wider text-sm"
                  >
                    <RotateCcw className="w-4 h-4" /> Пройти заново
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
