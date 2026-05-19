"use client";

import { useState } from "react";
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
  const [open, setOpen] = useState(false);

  function handleSwitch(newLocale: string) {
    router.replace(pathname, { locale: newLocale as "pt" | "en" | "fr" });
    setOpen(false);
  }

  const otherLocales = locales.filter((l) => l !== currentLocale);

  return (
    <div
      style={{ position: "relative", fontSize: 13 }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        style={{
          background: "none",
          border: "none",
          padding: "2px 6px",
          cursor: "pointer",
          color: "var(--color-accent)",
          fontWeight: 700,
          fontSize: 13,
          fontFamily: "inherit",
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
        aria-label="Change language"
      >
        {localeLabels[currentLocale]}
        <span style={{ fontSize: 10, opacity: 0.7 }}>&#9662;</span>
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            background: "var(--color-dark-1)",
            borderRadius: 6,
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            padding: "4px 0",
            minWidth: 52,
            zIndex: 1000,
          }}
        >
          {otherLocales.map((locale) => (
            <button
              key={locale}
              onClick={() => handleSwitch(locale)}
              style={{
                display: "block",
                width: "100%",
                background: "none",
                border: "none",
                padding: "6px 12px",
                cursor: "pointer",
                color: "rgba(255,255,255,0.8)",
                fontWeight: 400,
                fontSize: 13,
                fontFamily: "inherit",
                textAlign: "left",
                transition: "color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-accent)";
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                e.currentTarget.style.background = "none";
              }}
              aria-label={`Switch to ${localeLabels[locale]}`}
            >
              {localeLabels[locale]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
