import { useMemo, useState } from "react";
import { Calculator, ArrowRight, Send } from "lucide-react";

const types = [
  { id: "computer", label: "Компьютерное", base: { fabric: 120, eco: 160, leather: 250 } },
  { id: "office", label: "Офисное", base: { fabric: 140, eco: 180, leather: 270 } },
  { id: "exec", label: "Руководителя", base: { fabric: 180, eco: 220, leather: 320 } },
] as const;

const materials = [
  { id: "fabric", label: "Ткань" },
  { id: "eco", label: "Экокожа" },
  { id: "leather", label: "Натуральная кожа" },
] as const;

const extras = [
  { id: "foam", label: "Замена поролона", price: 25 },
  { id: "gas", label: "Замена газлифта", price: 45 },
  { id: "wheels", label: "Новые ролики", price: 15 },
  { id: "mech", label: "Ремонт качания", price: 58 },
] as const;

type TypeId = (typeof types)[number]["id"];
type MatId = (typeof materials)[number]["id"];
type ExtraId = (typeof extras)[number]["id"];

export function PriceCalculator() {
  const [type, setType] = useState<TypeId>("office");
  const [mat, setMat] = useState<MatId>("eco");
  const [ext, setExt] = useState<Set<ExtraId>>(new Set());

  const total = useMemo(() => {
    const base = types.find((t) => t.id === type)!.base[mat];
    const addons = extras
      .filter((e) => ext.has(e.id))
      .reduce((sum, e) => sum + e.price, 0);
    return base + addons;
  }, [type, mat, ext]);

  const toggle = (id: ExtraId) =>
    setExt((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div className="border-2 border-accent bg-surface">
      <div className="bg-accent text-accent-foreground px-6 py-4 flex items-center gap-3">
        <Calculator className="w-5 h-5" />
        <h3 className="font-bold uppercase tracking-wider">Калькулятор стоимости</h3>
      </div>

      <div className="p-6 lg:p-8 grid lg:grid-cols-[1fr_auto] gap-8">
        <div className="space-y-6">
          {/* Type */}
          <Group label="1. Тип кресла">
            {types.map((t) => (
              <Choice
                key={t.id}
                active={type === t.id}
                onClick={() => setType(t.id)}
                label={t.label}
              />
            ))}
          </Group>

          {/* Material */}
          <Group label="2. Материал обивки">
            {materials.map((m) => (
              <Choice
                key={m.id}
                active={mat === m.id}
                onClick={() => setMat(m.id)}
                label={m.label}
              />
            ))}
          </Group>

          {/* Extras */}
          <Group label="3. Доп. услуги (можно несколько)">
            {extras.map((e) => (
              <Choice
                key={e.id}
                active={ext.has(e.id)}
                onClick={() => toggle(e.id)}
                label={`${e.label} +${e.price} BYN`}
              />
            ))}
          </Group>
        </div>

        {/* Result */}
        <div className="lg:w-72 lg:border-l-2 lg:border-border lg:pl-8 flex flex-col justify-between gap-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Итого, ориентир
            </div>
            <div className="font-mono text-5xl lg:text-6xl font-bold text-accent leading-none">
              {total}
              <span className="text-2xl text-muted-foreground ml-1">BYN</span>
            </div>
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
              Точная цена&nbsp;— после диагностики или фото. Гарантия до&nbsp;12&nbsp;месяцев.
            </p>
          </div>
          <a href="/kontakty#form" className="btn-accent w-full text-base py-4">
            <Send className="w-4 h-4" /> Заказать
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
        {label}
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Choice({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`px-4 py-2.5 text-sm font-medium border-2 transition-all ${
        active
          ? "border-accent bg-accent text-accent-foreground"
          : "border-border text-muted-foreground hover:border-accent hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}
