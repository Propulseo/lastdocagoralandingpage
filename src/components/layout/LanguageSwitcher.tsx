"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales } from "@/i18n/config";

const localeLabels: Record<string, string> = {
  pt: "PT",
  en: "EN",
  fr: "FR",
};

/**
 * Sélecteur de langue de la barre de navigation.
 *
 * Le menu s'ouvrait uniquement au survol de la souris : ni le clavier ni le
 * tactile n'y avaient accès. Or sous 680px la barre utilitaire du haut est
 * masquée et ce composant devient le SEUL moyen de changer de langue — donc
 * un visiteur sur téléphone, ou naviguant au clavier, restait bloqué dans la
 * langue servie par défaut.
 *
 * Le survol reste, en confort. Le clic et le clavier sont désormais les
 * mécanismes de référence.
 */
export default function LanguageSwitcher() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("topbar");

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const otherLocales = locales.filter((l) => l !== currentLocale);

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  function handleSwitch(newLocale: string) {
    router.replace(pathname, { locale: newLocale as "pt" | "en" | "fr" });
    setOpen(false);
  }

  /* Au doigt il n'existe pas d'équivalent du « mouseleave » : sans ça, un
     menu ouvert par un appui ne se refermerait jamais. */
  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  /* À l'ouverture au clavier, le focus doit entrer dans le menu — sinon la
     touche Tab emmène le visiteur derrière le panneau ouvert. */
  function openAndFocusFirst() {
    setOpen(true);
    window.requestAnimationFrame(() => itemRefs.current[0]?.focus());
  }

  function handleTriggerKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openAndFocusFirst();
    }
  }

  function handleItemKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const next =
        event.key === "ArrowDown"
          ? (index + 1) % otherLocales.length
          : (index - 1 + otherLocales.length) % otherLocales.length;
      itemRefs.current[next]?.focus();
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape" && open) {
      event.stopPropagation();
      close(true);
    }
  }

  return (
    <div
      ref={wrapperRef}
      style={{ position: "relative", fontSize: 13 }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        onKeyDown={handleTriggerKeyDown}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={t("langAria")}
        style={{
          background: "none",
          border: "none",
          padding: "2px 6px",
          cursor: "pointer",
          color: "inherit",
          fontWeight: 700,
          fontSize: 13,
          fontFamily: "inherit",
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        {localeLabels[currentLocale]}
        <span style={{ fontSize: 10, opacity: 0.7 }} aria-hidden="true">
          &#9662;
        </span>
      </button>
      {open && (
        <div
          role="menu"
          aria-label={t("langAria")}
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
          {otherLocales.map((locale, index) => (
            <button
              key={locale}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              type="button"
              role="menuitem"
              onClick={() => handleSwitch(locale)}
              onKeyDown={(event) => handleItemKeyDown(event, index)}
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
                e.currentTarget.style.color = "var(--color-link)";
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                e.currentTarget.style.background = "none";
              }}
              onFocus={(e) => {
                e.currentTarget.style.color = "var(--color-link)";
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                e.currentTarget.style.background = "none";
              }}
              aria-label={t("langSwitchTo", { lang: localeLabels[locale] })}
            >
              {localeLabels[locale]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
