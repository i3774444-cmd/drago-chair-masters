import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

type Review = {
  name: string;
  role: string;
  text: string;
  rating: number;
};

const reviews: Review[] = [
  {
    name: "Андрей К.",
    role: "Руководитель отдела, IT-компания",
    rating: 5,
    text: "Перетянули 12 кресел за неделю. Цена — как и обговаривали, никаких сюрпризов. Кресла как новые, разница только в надписи на бирке.",
  },
  {
    name: "Марина В.",
    role: "Офис-менеджер, БелАЗ",
    rating: 5,
    text: "Заказывали ремонт операторских кресел. Мастер приехал в назначенное время, всё разобрал, диагностику сделал на месте. Через 2 дня вернули — работают тише, чем новые.",
  },
  {
    name: "Сергей П.",
    role: "Частный заказ",
    rating: 5,
    text: "Спас любимое кресло DXRacer после кота. Думал, выбрасывать. В DRAGO перетянули за 200 рублей и поменяли газлифт. Сижу второй год — отлично.",
  },
  {
    name: "Ольга Ш.",
    role: "Бухгалтер, Белпочта",
    rating: 5,
    text: "Работали по безналу, договор и акт привезли в офис. Ребята грамотные, без воды. Рекомендовала уже трём знакомым.",
  },
  {
    name: "Игорь Р.",
    role: "Директор студии",
    rating: 5,
    text: "Оценили по фото в Telegram за 10 минут, согласовали и забрали кресло на следующий день. Это и есть нормальный сервис.",
  },
];

export function ReviewsCarousel() {
  const [idx, setIdx] = useState(0);
  const total = reviews.length;
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % total), 7000);
    return () => clearInterval(id);
  }, [total]);

  const go = (n: number) => setIdx((n + total) % total);

  return (
    <div className="relative">
      <div className="overflow-hidden border-2 border-border bg-surface">
        <div
          ref={trackRef}
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {reviews.map((r, i) => (
            <article
              key={i}
              className="w-full shrink-0 p-8 lg:p-12"
              aria-hidden={i !== idx}
            >
              <Quote className="w-10 h-10 text-accent mb-6" strokeWidth={1.5} />
              <p className="text-lg lg:text-2xl leading-relaxed mb-8 max-w-3xl">
                «{r.text}»
              </p>
              <div className="flex items-center justify-between flex-wrap gap-4 border-t border-border pt-5">
                <div>
                  <div className="font-bold">{r.name}</div>
                  <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground mt-1">
                    {r.role}
                  </div>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: r.rating }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-5">
        <div className="flex gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Отзыв ${i + 1}`}
              className={`h-1.5 transition-all ${
                i === idx ? "w-8 bg-accent" : "w-3 bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(idx - 1)}
            aria-label="Предыдущий отзыв"
            className="w-10 h-10 flex items-center justify-center border-2 border-border hover:border-accent hover:text-accent transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => go(idx + 1)}
            aria-label="Следующий отзыв"
            className="w-10 h-10 flex items-center justify-center border-2 border-border hover:border-accent hover:text-accent transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
