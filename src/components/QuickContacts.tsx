import { Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function QuickContacts() {
  return (
    <section className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-14 lg:py-16">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end">
          <div>
            <div className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-4">
              // Контакты
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Не любите формы? Напишите напрямую
            </h2>

            <div className="grid sm:grid-cols-2 gap-px bg-border border-2 border-border">
              <a
                href="tel:+375291234567"
                className="bg-background p-5 flex items-center gap-3 hover:bg-accent hover:text-accent-foreground transition-colors group"
              >
                <Phone className="w-5 h-5 text-accent group-hover:text-accent-foreground shrink-0" />
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground group-hover:text-accent-foreground/70">
                    Телефон
                  </div>
                  <div className="font-mono font-bold">+375 29 123-45-67</div>
                </div>
              </a>

              <a
                href="https://wa.me/375291234567"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background p-5 flex items-center gap-3 hover:bg-accent hover:text-accent-foreground transition-colors group"
              >
                <MessageCircle className="w-5 h-5 text-accent group-hover:text-accent-foreground shrink-0" />
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground group-hover:text-accent-foreground/70">
                    WhatsApp
                  </div>
                  <div className="font-mono font-bold">Ответим за 5 мин</div>
                </div>
              </a>

              <a
                href="https://t.me/drago_by"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background p-5 flex items-center gap-3 hover:bg-accent hover:text-accent-foreground transition-colors group"
              >
                <Send className="w-5 h-5 text-accent group-hover:text-accent-foreground shrink-0" />
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground group-hover:text-accent-foreground/70">
                    Telegram
                  </div>
                  <div className="font-mono font-bold">@drago_by</div>
                </div>
              </a>

              <div className="bg-background p-5 flex items-center gap-3">
                <Clock className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    График
                  </div>
                  <div className="font-mono font-bold text-sm">Пн–Сб 9:00–20:00</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:max-w-xs">
            <div className="border-2 border-border p-5 bg-background">
              <MapPin className="w-5 h-5 text-accent mb-3" />
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                Мастерская
              </div>
              <div className="font-bold">г. Минск, ул. Притыцкого, 62</div>
              <div className="text-sm text-muted-foreground mt-1">Цех 4, въезд с торца</div>
              <Link
                to="/kontakty"
                className="mt-4 inline-block font-mono text-xs text-accent hover:underline"
              >
                Карта и схема проезда →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
