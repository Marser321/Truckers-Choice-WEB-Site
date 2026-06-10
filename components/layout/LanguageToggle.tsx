"use client";

import { usePathname, useRouter } from "@/navigation";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();

  const handleLanguageChange = (newLocale: "en" | "es") => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="inline-flex rounded-xl p-1 glass gap-1 items-center">
      <button
        onClick={() => handleLanguageChange("en")}
        aria-label="Change language to English"
        className={cn(
          "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer select-none",
          currentLocale === "en"
            ? "bg-accent text-background shadow-glow-amber font-bold"
            : "text-text-muted hover:text-text hover:bg-white/5"
        )}
      >
        EN
      </button>
      <button
        onClick={() => handleLanguageChange("es")}
        aria-label="Cambiar idioma a Español"
        className={cn(
          "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer select-none",
          currentLocale === "es"
            ? "bg-accent text-background shadow-glow-amber font-bold"
            : "text-text-muted hover:text-text hover:bg-white/5"
        )}
      >
        ES
      </button>
    </div>
  );
}
