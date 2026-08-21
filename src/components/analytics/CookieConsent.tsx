"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { useConsent } from "@/components/analytics/ConsentProvider";

/**
 * Bandeau de consentement aux traceurs.
 *
 * Deux règles guident ce composant :
 *
 *  1. Rien ne part avant l'accord. La mesure d'audience n'est montée qu'une
 *     fois « Accepter » choisi.
 *  2. Refuser doit être aussi facile qu'accepter. Les deux boutons ont le
 *     même poids visuel : un « Refuser » discret ou grisé rendrait le
 *     consentement invalide au sens du RGPD.
 *
 * Sans identifiant de mesure configuré, le bandeau ne s'affiche pas du tout :
 * il n'y aurait rien à consentir.
 */
export default function CookieConsent({ gaId }: { gaId?: string }) {
  const t = useTranslations("cookies");
  const { consent, ready, decide } = useConsent();
  const panelRef = useRef<HTMLDivElement>(null);

  const asking = Boolean(gaId) && ready && consent === null;

  /* Le focus se pose sur le bandeau à son apparition : sinon quelqu'un au
     clavier devrait traverser toute la page pour atteindre le choix. */
  useEffect(() => {
    if (asking) panelRef.current?.focus();
  }, [asking]);

  return (
    <>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}

      {asking ? (
        <div
          ref={panelRef}
          className="cc"
          role="dialog"
          aria-modal="false"
          aria-label={t("title")}
          tabIndex={-1}
        >
          <style>{`
            .cc {
              position: fixed;
              left: clamp(12px, 3vw, 24px);
              right: clamp(12px, 3vw, 24px);
              bottom: clamp(12px, 3vw, 24px);
              z-index: 4000;
              max-width: 760px;
              margin-inline: auto;
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              gap: 16px 20px;
              padding: 18px clamp(18px, 3vw, 24px);
              border-radius: 16px;
              background: #fff;
              border: 1px solid var(--border-default, #E5E8EA);
              box-shadow: 0 24px 60px -24px rgba(var(--color-navy-rgb), 0.42);
              font-family: var(--font-montserrat), "Montserrat", sans-serif;
            }
            .cc:focus { outline: none; }
            .cc:focus-visible { outline: 2px solid var(--color-teal); outline-offset: 3px; }
            .cc__text { flex: 1 1 320px; margin: 0; font-size: 13.5px; line-height: 1.55; color: #40506a; }
            .cc__title { display: block; font-weight: 700; color: var(--color-navy); margin-bottom: 3px; font-size: 14.5px; }
            .cc__text a { color: inherit; text-decoration: underline; }
            .cc__actions { display: flex; gap: 10px; flex: 0 0 auto; }
            .cc__btn {
              padding: 11px 22px;
              border-radius: 999px;
              font-size: 13.5px;
              font-weight: 600;
              font-family: inherit;
              cursor: pointer;
              border: 1.5px solid var(--color-navy);
              transition: background 0.2s ease, color 0.2s ease;
            }
            /* Accepter et Refuser ont volontairement le meme poids visuel. */
            .cc__btn--accept { background: var(--color-navy); color: #fff; }
            .cc__btn--accept:hover { background: var(--color-cobalt); border-color: var(--color-cobalt); }
            .cc__btn--decline { background: #fff; color: var(--color-navy); }
            .cc__btn--decline:hover { background: rgba(var(--color-navy-rgb), 0.06); }
            .cc__btn:focus-visible { outline: 2px solid var(--color-teal); outline-offset: 2px; }
            @media (max-width: 560px) {
              .cc__actions { width: 100%; }
              .cc__btn { flex: 1; }
            }
          `}</style>

          <p className="cc__text">
            <span className="cc__title">{t("title")}</span>
            {t("text")}{" "}
            <Link href="/privacy-policy">{t("privacyLink")}</Link>.
          </p>

          <div className="cc__actions">
            <button
              type="button"
              className="cc__btn cc__btn--decline"
              onClick={() => decide("denied")}
            >
              {t("decline")}
            </button>
            <button
              type="button"
              className="cc__btn cc__btn--accept"
              onClick={() => decide("granted")}
            >
              {t("accept")}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
