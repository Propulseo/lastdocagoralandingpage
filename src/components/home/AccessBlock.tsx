"use client";

import { useTranslations } from "next-intl";
import RevealCascade from "@/components/shared/RevealCascade";

/**
 * Bloc « Accès & disponibilité » (patient) — 3 cartes :
 *   1. Urgence (blanc, accent rouge + 112)
 *   2. Réservez à tout moment (vert teal-ink, lignes de statut + CTA)
 *   3. Toujours disponible (sombre navy, 3 lignes)
 * Remplace l'ancien duo ReassuranceBand + ContactInfoBoxes.
 */
export default function AccessBlock() {
  const t = useTranslations("accessBlock");

  return (
    <section className="acc" aria-label={t("ariaLabel")}>
      <style>{`
        .acc, .acc * { box-sizing: border-box; }
        .acc {
          background: var(--color-light-1);
          padding: clamp(72px, 8vw, 120px) 0;
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
        }
        .acc__inner {
          max-width: 1340px;
          margin-inline: auto;
          padding-inline: clamp(16px, 4vw, 24px);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(16px, 1.8vw, 24px);
          align-items: stretch;
        }
        .acc-card {
          display: flex;
          flex-direction: column;
          border-radius: 20px;
          padding: clamp(24px, 2vw, 32px);
          min-height: 308px;
        }
        .acc-card__title {
          font-family: var(--font-fraunces), Georgia, serif;
          font-weight: 600;
          font-size: clamp(20px, 1.6vw, 24px);
          line-height: 1.15;
          margin: 0 0 10px;
        }
        .acc-card__desc {
          font-size: 14.5px;
          line-height: 1.55;
          margin: 0;
        }

        /* ── Carte 1 : Urgence (blanc) ── */
        .acc-card--urgent {
          background: #fff;
          border: 1px solid var(--border-default, #E5E8EA);
          box-shadow: 0 18px 40px -28px rgba(var(--color-navy-rgb), 0.25);
        }
        .acc-card--urgent .acc-card__title { color: var(--color-navy); }
        .acc-card--urgent .acc-card__desc { color: var(--text-muted, #6B7280); }
        .acc-badge {
          align-self: flex-start;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #D64545;
          border: 1px solid rgba(214, 69, 69, 0.5);
          border-radius: 999px;
          padding: 5px 13px;
          margin-bottom: 18px;
        }
        .acc-112 {
          margin-top: auto;
          padding-top: 20px;
          font-family: var(--font-fraunces), Georgia, serif;
          font-weight: 700;
          font-size: clamp(34px, 3vw, 44px);
          line-height: 1;
          color: #D64545;
          text-decoration: none;
          letter-spacing: 0.01em;
        }

        /* ── Carte 2 : Réservez (vert) ── */
        .acc-card--book {
          background: linear-gradient(150deg, #1E6E68 0%, #134B47 100%);
          color: #fff;
          box-shadow: 0 22px 50px -26px rgba(19, 75, 71, 0.6);
        }
        .acc-card--book .acc-card__title { color: #fff; }
        .acc-card--book .acc-card__desc { color: rgba(255, 255, 255, 0.82); }

        /* ── Carte 3 : Toujours disponible (sombre) ── */
        .acc-card--always {
          background: linear-gradient(150deg, #0C121E 0%, #172543 100%);
          color: #fff;
          box-shadow: 0 22px 50px -26px rgba(12, 18, 30, 0.6);
        }
        .acc-card--always .acc-card__title { color: #fff; }
        .acc-card--always .acc-card__desc { color: rgba(255, 255, 255, 0.7); }

        /* ── Lignes de statut ── */
        .acc-rows { list-style: none; margin: 18px 0 0; padding: 0; }
        .acc-rows li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 13px 0;
          font-size: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.14);
        }
        .acc-card--book .acc-rows li > span:first-child { color: rgba(255, 255, 255, 0.82); }
        .acc-card--always .acc-rows li > span:first-child { color: rgba(255, 255, 255, 0.62); }
        .acc-val { font-weight: 700; color: #fff; white-space: nowrap; }

        /* ── Mobile : les 3 cartes pleine hauteur fusionnent en une seule
           carte, chaque bloc devenant une ligne compacte (retour client —
           « prend trop de place » — même traitement que la fusion /contact). */
        @media (max-width: 860px) {
          .acc__inner {
            grid-template-columns: 1fr;
            gap: 0;
            background: #fff;
            border-radius: 20px;
            box-shadow: 0 18px 40px -28px rgba(var(--color-navy-rgb), 0.25);
            overflow: hidden;
          }
          .acc-card {
            min-height: auto;
            border: 0;
            border-radius: 0;
            box-shadow: none;
            background: transparent;
            padding: 18px clamp(20px, 5vw, 28px);
            color: var(--color-navy);
          }
          .acc-card + .acc-card { border-top: 1px solid rgba(var(--color-navy-rgb), 0.08); }
          .acc-card__title { font-size: 17px; }
          .acc-card--urgent .acc-card__title { color: var(--color-navy); }
          .acc-card--book .acc-card__title,
          .acc-card--always .acc-card__title { color: var(--color-navy); }
          .acc-card--book .acc-card__desc,
          .acc-card--always .acc-card__desc { color: var(--text-muted, #6B7280); }
          .acc-badge { margin-bottom: 10px; }
          .acc-112 {
            display: inline-block;
            margin-top: 8px;
            padding-top: 0;
            font-size: 22px;
          }
          .acc-rows { margin-top: 10px; }
          .acc-rows li { padding: 9px 0; font-size: 13px; border-top-color: rgba(var(--color-navy-rgb), 0.08); }
          .acc-card--book .acc-rows li > span:first-child,
          .acc-card--always .acc-rows li > span:first-child { color: var(--text-muted, #6B7280); }
          .acc-val { color: var(--color-navy); }
        }
      `}</style>

      <RevealCascade className="acc__inner" stepMs={85}>
        {/* Urgence */}
        <div className="acc-card acc-card--urgent mo-premium-card">
          <span className="acc-badge">{t("emergencyBadge")}</span>
          <h3 className="acc-card__title">{t("emergencyTitle")}</h3>
          <p className="acc-card__desc">{t("emergencyDesc")}</p>
          <a href="tel:112" className="acc-112">{t("emergencyNumber")}</a>
        </div>

        {/* Réservez à tout moment */}
        <div className="acc-card acc-card--book mo-premium-card">
          <h3 className="acc-card__title">{t("bookingTitle")}</h3>
          <p className="acc-card__desc">{t("bookingDesc")}</p>
          <ul className="acc-rows">
            <li>
              <span>{t("bookingRow1")}</span>
              <span className="acc-val">{t("bookingRow1Value")}</span>
            </li>
            <li>
              <span>{t("bookingRow2")}</span>
              <span className="acc-val">{t("bookingRow2Value")}</span>
            </li>
          </ul>
        </div>

        {/* Toujours disponible */}
        <div className="acc-card acc-card--always mo-premium-card">
          <h3 className="acc-card__title">{t("availableTitle")}</h3>
          <p className="acc-card__desc">{t("availableDesc")}</p>
          <ul className="acc-rows">
            <li>
              <span>{t("availableRow1")}</span>
              <span className="acc-val">{t("availableRow1Value")}</span>
            </li>
            <li>
              <span>{t("availableRow2")}</span>
              <span className="acc-val">{t("availableRow2Value")}</span>
            </li>
            <li>
              <span>{t("availableRow3")}</span>
              <span className="acc-val">{t("availableRow3Value")}</span>
            </li>
          </ul>
        </div>
      </RevealCascade>
    </section>
  );
}
