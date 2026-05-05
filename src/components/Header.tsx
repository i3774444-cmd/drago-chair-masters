import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-accent flex items-center justify-center font-mono font-bold text-accent-foreground text-lg group-hover:rotate-12 transition-transform">
            D
          </div>
          <span className="font-display font-bold text-xl tracking-tight">DRAGO</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/peretyazhka" className="hover:text-accent transition-colors" activeProps={{ className: "text-accent" }}>Перетяжка</Link>
          <Link to="/remont" className="hover:text-accent transition-colors" activeProps={{ className: "text-accent" }}>Ремонт</Link>
          <Link to="/ceny" className="hover:text-accent transition-colors" activeProps={{ className: "text-accent" }}>Цены</Link>
          <Link to="/kejsy" className="hover:text-accent transition-colors" activeProps={{ className: "text-accent" }}>Кейсы</Link>
          <Link to="/kontakty" className="hover:text-accent transition-colors" activeProps={{ className: "text-accent" }}>Контакты</Link>
        </nav>

        <div className="flex items-center gap-3">
          <a href="tel:+375291234567" className="hidden sm:flex items-center gap-2 font-mono text-sm hover:text-accent transition-colors">
            <Phone className="w-4 h-4" />
            +375 29 123-45-67
          </a>
          <a href="/kontakty#form" className="btn-accent text-xs px-3 py-2 hidden sm:inline-flex">Заказать звонок</a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
