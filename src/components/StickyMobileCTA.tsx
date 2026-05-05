import { useEffect, useState } from "react";
import { Phone, Send, ArrowUp } from "lucide-react";

export function StickyMobileCTA() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Mobile: phone + telegram bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 grid grid-cols-2 border-t-2 border-accent shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.5)]">
        <a
          href="tel:+375291234567"
          className="bg-accent text-accent-foreground flex items-center justify-center gap-2 py-4 font-bold uppercase text-sm tracking-wider active:translate-y-px"
          aria-label="Позвонить"
        >
          <Phone className="w-5 h-5" /> Позвонить
        </a>
        <a
          href="https://t.me/drago_minsk"
          target="_blank"
          rel="noreferrer"
          className="bg-background border-l-2 border-accent text-foreground flex items-center justify-center gap-2 py-4 font-bold uppercase text-sm tracking-wider active:translate-y-px"
          aria-label="Написать в Telegram"
        >
          <Send className="w-5 h-5 text-accent" /> Telegram
        </a>
      </div>

      {/* Spacer so mobile bar doesn't cover footer content */}
      <div className="md:hidden h-16" aria-hidden="true" />

      {/* Back-to-top */}
      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Наверх"
          className="fixed right-4 z-40 w-12 h-12 bg-surface border-2 border-accent text-accent flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors animate-in fade-in slide-in-from-bottom-2 motion-reduce:animate-none bottom-20 md:bottom-6"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
}
