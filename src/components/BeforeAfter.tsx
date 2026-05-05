import { useRef, useState, useCallback, useEffect } from "react";
import { Armchair, MoveHorizontal } from "lucide-react";

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      e.preventDefault();
      updateFromClientX(e.clientX);
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [updateFromClientX]);

  return (
    <div
      ref={ref}
      className="relative w-full aspect-[16/10] select-none overflow-hidden border-2 border-border bg-surface cursor-ew-resize touch-none"
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        updateFromClientX(e.clientX);
      }}
    >
      {/* AFTER (full background) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[oklch(0.3_0.05_40)]">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <Armchair className="w-32 h-32 md:w-44 md:h-44 text-accent relative" strokeWidth={1.2} />
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent relative">// после</div>
        <div className="absolute top-4 right-4 bg-accent text-accent-foreground font-bold px-3 py-1 text-xs uppercase tracking-wider">
          новое
        </div>
      </div>

      {/* BEFORE (clipped) */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[oklch(0.22_0_0)]"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <div className="absolute inset-0 grid-bg opacity-10" />
        <Armchair className="w-32 h-32 md:w-44 md:h-44 text-muted-foreground relative" strokeWidth={1.2} />
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground relative">// до</div>
        <div className="absolute top-4 left-4 bg-muted text-foreground font-bold px-3 py-1 text-xs uppercase tracking-wider border border-border">
          было
        </div>
      </div>

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-accent pointer-events-none"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg">
          <MoveHorizontal className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
