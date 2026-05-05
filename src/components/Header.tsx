import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import { Phone, Menu, X, Send, MessageCircle } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { to: "/peretyazhka", label: "Перетяжка" },
  { to: "/remont", label: "Ремонт" },
  { to: "/ceny", label: "Цены" },
  { to: "/kejsy", label: "Кейсы" },
  { to: "/blog", label: "Блог" },
  { to: "/kontakty", label: "Контакты" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group" aria-label="DRAGO — главная">
          <div className="w-8 h-8 bg-accent flex items-center justify-center font-mono font-bold text-accent-foreground text-lg group-hover:rotate-12 transition-transform motion-reduce:transition-none motion-reduce:group-hover:rotate-0">
            D
          </div>
          <span className="font-display font-bold text-xl tracking-tight">DRAGO</span>
        </Link>

        <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-medium" aria-label="Главная навигация">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="hover:text-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 whitespace-nowrap"
              activeProps={{ className: "text-accent" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="tel:+375291234567"
            className="hidden md:flex items-center gap-2 font-mono text-sm font-bold hover:text-accent transition-colors whitespace-nowrap"
            aria-label="Позвонить +375 29 123-45-67"
          >
            <Phone className="w-4 h-4 text-accent" aria-hidden="true" />
            <span className="hidden lg:inline">+375&nbsp;29&nbsp;123-45-67</span>
            <span className="lg:hidden">Звонок</span>
          </a>
          <div className="hidden md:flex items-center gap-1">
            <a href="https://wa.me/375291234567" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="w-9 h-9 flex items-center justify-center border border-border hover:border-accent hover:text-accent transition-colors">
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
            </a>
            <a href="https://t.me/drago_minsk" target="_blank" rel="noreferrer" aria-label="Telegram" className="w-9 h-9 flex items-center justify-center border border-border hover:border-accent hover:text-accent transition-colors">
              <Send className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
          <a
            href="/kontakty#form"
            className="hidden xl:inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground font-bold px-3 py-2 uppercase tracking-wider text-xs border-2 border-accent hover:brightness-110 transition-all whitespace-nowrap"
          >
            Заказать&nbsp;звонок
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="md:hidden w-10 h-10 flex items-center justify-center border border-border hover:border-accent hover:text-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            aria-label="Открыть меню"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Menu className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile menu — rendered via portal so backdrop-blur on header doesn't trap fixed positioning */}
      {open && typeof document !== "undefined" && createPortal(
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Меню"
          className="fixed inset-0 z-[100] overflow-y-auto bg-background"
        >
          <div className="flex items-center justify-between h-16 px-4 border-b border-border">
            <span className="font-display font-bold text-xl">Меню</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-10 h-10 flex items-center justify-center border border-border hover:border-accent hover:text-accent"
              aria-label="Закрыть меню"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
          <nav className="p-4 flex flex-col gap-1" aria-label="Мобильная навигация">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-4 py-4 text-lg font-bold border border-border hover:border-accent hover:text-accent transition-colors"
                activeProps={{ className: "text-accent border-accent" }}
              >
                {l.label}
              </Link>
            ))}
            <a
              href="tel:+375291234567"
              className="mt-4 btn-accent text-base py-4"
              onClick={() => setOpen(false)}
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              +375 29 123-45-67
            </a>
          </nav>
        </div>,
        document.body
      )}
    </header>
  );
}
