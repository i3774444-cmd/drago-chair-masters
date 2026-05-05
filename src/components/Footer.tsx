import { Link } from "@tanstack/react-router";
import { Phone, MapPin, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-accent flex items-center justify-center font-mono font-bold text-accent-foreground">D</div>
            <span className="font-bold text-xl">DRAGO</span>
          </div>
          <p className="text-muted-foreground text-sm max-w-sm">
            Ремонт и перетяжка офисных и компьютерных кресел в Минске. С 2013 года возвращаем креслам вторую жизнь.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-muted-foreground">Разделы</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/peretyazhka" className="hover:text-accent transition-colors">Перетяжка</Link></li>
            <li><Link to="/remont" className="hover:text-accent transition-colors">Ремонт</Link></li>
            <li><Link to="/ceny" className="hover:text-accent transition-colors">Цены</Link></li>
            <li><Link to="/kejsy" className="hover:text-accent transition-colors">Кейсы</Link></li>
            <li><Link to="/blog" className="hover:text-accent transition-colors">Блог</Link></li>
            <li><Link to="/kontakty" className="hover:text-accent transition-colors">Контакты</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-muted-foreground">Контакты</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="tel:+375291234567" className="flex items-center gap-2 font-mono hover:text-accent transition-colors">
                <Phone className="w-4 h-4 text-accent" /> +375 29 123-45-67
              </a>
            </li>
            <li className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
              г. Минск, ул. Притыцкого, 62, цех 4
            </li>
            <li>
              <a href="https://t.me/drago_minsk" target="_blank" rel="noreferrer" className="btn-ghost text-xs px-3 py-2 mt-2">
                <Send className="w-4 h-4" /> Telegram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground font-mono">
          <span>© 2013–2026 DRAGO</span>
          <span>УНП 191234567 · ИП Драгун А.В.</span>
        </div>
      </div>
    </footer>
  );
}
