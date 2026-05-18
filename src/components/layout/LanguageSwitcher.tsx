"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales } from "@/i18n/config";

const localeLabels: Record<string, string> = {
  pt: "PT",
  en: "EN",
  fr: "FR",
};

export default function LanguageSwitcher() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function handleSwitch(newLocale: string) {
    router.replace(pathname, { locale: newLocale as "pt" | "en" | "fr" });
  }

  return (
    <div className="d-flex align-items-center gap-1" style={{ fontSize: 13 }}>
      {locales.map((locale, i) => (
        <span key={locale} className="d-flex align-items-center gap-1">
          {i > 0 && (
            <span style={{ color: "rgba(255,255,255,0.3)", userSelect: "none" }}>|</span>
          )}
          <button
            onClick={() => handleSwitch(locale)}
            style={{
              background: "none",
              border: "none",
              padding: "2px 4px",
              cursor: locale === currentLocale ? "default" : "pointer",
              color: locale === currentLocale ? "#21cdc0" : "rgba(255,255,255,0.7)",
              fontWeight: locale === currentLocale ? 700 : 400,
              fontSize: 13,
              fontFamily: "inherit",
              transition: "color 0.2s",
              textDecoration: "none",
            }}
            aria-label={`Switch to ${localeLabels[locale]}`}
            aria-current={locale === currentLocale ? "true" : undefined}
          >
            {localeLabels[locale]}
          </button>
        </span>
      ))}
    </div>
  );
}
