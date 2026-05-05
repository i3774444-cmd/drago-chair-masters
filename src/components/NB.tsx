import { nbsp } from "@/lib/nbsp";

/** Рендерит текст с автоматически расставленными неразрывными пробелами
 *  после коротких предлогов/союзов и между числом и следующим словом. */
export function NB({ children, as: Tag = "span", className }: {
  children: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}) {
  // @ts-expect-error - dynamic tag
  return <Tag className={className}>{nbsp(children)}</Tag>;
}
