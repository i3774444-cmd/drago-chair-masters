import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const KEY = "drago-theme";

function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  if (theme === "light") root.classList.add("light");
  else root.classList.remove("light");
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(KEY) as "light" | "dark" | null;
    const initial = saved ?? (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    localStorage.setItem(KEY, next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Переключить тему"
      className="w-10 h-10 flex items-center justify-center border border-border hover:border-accent hover:text-accent transition-colors"
    >
      {mounted && theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
