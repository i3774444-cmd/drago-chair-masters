import { createElement, type ElementType } from "react";
import { nbsp } from "@/lib/nbsp";

/** Рендерит текст с автоматически расставленными неразрывными пробелами. */
export function NB({
  children,
  as = "span",
  className,
}: {
  children: string;
  as?: ElementType;
  className?: string;
}) {
  return createElement(as, { className }, nbsp(children));
}
