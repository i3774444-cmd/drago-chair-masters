import { useState } from "react";
import { z } from "zod";
import { Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2, "Имя слишком короткое").max(80, "Слишком длинное имя"),
  phone: z
    .string()
    .trim()
    .min(7, "Введите корректный телефон")
    .max(20, "Телефон слишком длинный")
    .regex(/^[+\d\s\-()]+$/, "Только цифры, пробелы и + - ( )"),
  comment: z.string().trim().max(500, "Не больше 500 символов").optional(),
});

type FormState = { name: string; phone: string; comment: string };
type Errors = Partial<Record<keyof FormState, string>>;

export function ContactForm({ source }: { source: string }) {
  const [values, setValues] = useState<FormState>({ name: "", phone: "", comment: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(values);
    if (!result.success) {
      const errs: Errors = {};
      for (const issue of result.error.issues) {
        const k = issue.path[0] as keyof FormState;
        if (!errs[k]) errs[k] = issue.message;
      }
      setErrors(errs);
      return;
    }
    // Stub submission — log only validated, non-sensitive snapshot
    console.log("[DRAGO form]", { source, ...result.data });
    toast.success("Заявка принята. Перезвоним в течение 15 минут.");
    setDone(true);
    setValues({ name: "", phone: "", comment: "" });
  };

  if (done) {
    return (
      <div className="bg-surface border-2 border-accent p-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-accent mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Заявка принята</h3>
        <p className="text-muted-foreground mb-6">Перезвоним в течение 15 минут в рабочее время.</p>
        <button onClick={() => setDone(false)} className="btn-ghost">Отправить ещё одну</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-surface border border-border p-6 lg:p-8 space-y-5">
      <div>
        <label className="block font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
          Имя
        </label>
        <input
          type="text"
          value={values.name}
          onChange={set("name")}
          maxLength={80}
          autoComplete="name"
          className="w-full bg-background border border-border focus:border-accent focus:outline-none px-4 py-3 transition-colors"
          placeholder="Александр"
        />
        {errors.name && <p className="text-destructive text-xs mt-1 font-mono">{errors.name}</p>}
      </div>

      <div>
        <label className="block font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
          Телефон
        </label>
        <input
          type="tel"
          value={values.phone}
          onChange={set("phone")}
          maxLength={20}
          autoComplete="tel"
          inputMode="tel"
          className="w-full bg-background border border-border focus:border-accent focus:outline-none px-4 py-3 font-mono transition-colors"
          placeholder="+375 29 123-45-67"
        />
        {errors.phone && <p className="text-destructive text-xs mt-1 font-mono">{errors.phone}</p>}
      </div>

      <div>
        <label className="block font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
          Комментарий
        </label>
        <textarea
          value={values.comment}
          onChange={set("comment")}
          maxLength={500}
          rows={4}
          className="w-full bg-background border border-border focus:border-accent focus:outline-none px-4 py-3 transition-colors resize-none"
          placeholder="Что с креслом? Сколько штук?"
        />
        <div className="flex justify-between mt-1">
          {errors.comment ? (
            <p className="text-destructive text-xs font-mono">{errors.comment}</p>
          ) : <span />}
          <span className="text-xs font-mono text-muted-foreground">{values.comment.length}/500</span>
        </div>
      </div>

      <button type="submit" className="btn-accent w-full text-base py-4">
        <Send className="w-4 h-4" /> Отправить заявку
      </button>
      <p className="text-xs text-muted-foreground text-center">
        Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.
      </p>
    </form>
  );
}
