"use client";

/* ============================================================
   SectionAvantApres, V2 PRO « Avant / Après »
   THEMEABLE : toutes les couleurs passent par les tokens --v2-*
   hérités de .v2p (dark/light/mixte + contrast). Aucune couleur
   en dur. Préfixe CSS « v2aa- ».
   Colonne « Avant » discrète (surface) / « Après » accentuée.
   Section statique, pas de hooks.
   ============================================================ */

type CompareRow = { avant: string; apres: string };

const COMPARE_ROWS: CompareRow[] = [
  {
    avant: "Le téléphone sonne sans arrêt pendant la consultation.",
    apres: "Rendez-vous organisés, reçus tranquillement.",
  },
  {
    avant: "Agenda papier, raturé et difficile à lire.",
    apres: "Agenda numérique clair, toujours disponible.",
  },
  {
    avant: "Rendez-vous manqués imprévus, sans prévenir.",
    apres: "Rappels automatiques « bientôt » pour réduire les absences.",
  },
  {
    avant: "Nouveaux patients qui ne vous trouvent pas en ligne.",
    apres: "Profil vérifié, visible sur 16 spécialités.",
  },
];

function IconCross() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
      <path
        d="M6 6 L18 18 M18 6 L6 18"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
      <path
        d="M5 12.5 L10 17.5 L19 6.5"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function SectionAvantApres() {
  return (
    <section
      className="v2aa-section"
      id="v2aa-compare"
      aria-labelledby="v2aa-compare-title"
    >
      <style>{`
        .v2aa-section, .v2aa-section * { box-sizing: border-box; }

        .v2aa-section {
          --v2aa-shell: 1200px;
          --v2aa-radius: 18px;
          --v2aa-mono: ui-monospace, "SF Mono", Menlo, monospace;
          position: relative;
          padding-block: clamp(72px, 10vh, 120px);
          background: var(--v2-bg-2);
          color: var(--v2-text-body);
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
          line-height: 1.5;
          overflow: hidden;
        }
        .v2aa-section::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(60% 50% at 15% 0%, var(--v2-mesh-a), transparent 60%),
            radial-gradient(55% 50% at 90% 100%, var(--v2-mesh-b), transparent 60%);
        }

        .v2aa-shell {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: var(--v2aa-shell);
          margin-inline: auto;
          padding-inline: clamp(16px, 4vw, 24px);
        }

        /* ── Reveal cascade ── */
        @keyframes v2aa-reveal {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .v2aa-reveal {
          opacity: 0;
          animation: v2aa-reveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* ── Eyebrow ── */
        .v2aa-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--v2aa-mono);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--v2-eyebrow);
          line-height: 1;
        }
        .v2aa-eyebrow span {
          height: 1px;
          width: 38px;
          background: linear-gradient(90deg, transparent, var(--v2-accent));
        }

        /* ── Section head ── */
        .v2aa-sechead { max-width: 640px; margin-bottom: 44px; }
        .v2aa-sectitle {
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: clamp(28px, 4vw, 44px);
          line-height: 1.08;
          letter-spacing: -0.02em;
          color: var(--v2-text);
          margin: 16px 0 0;
          text-transform: none;
        }
        .v2aa-secsub {
          font-size: 16px;
          line-height: 1.6;
          color: var(--v2-text-muted);
          margin: 14px 0 0;
        }

        /* ── AVANT / APRÈS ── */
        .v2aa-compare__wrap { position: relative; }
        .v2aa-compare {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
          align-items: stretch;
        }
        .v2aa-col {
          position: relative;
          border-radius: var(--v2aa-radius);
          padding: 30px;
          overflow: hidden;
          background: var(--v2-surface);
          border: 1px solid var(--v2-border);
          box-shadow: var(--v2-shadow);
        }
        .v2aa-col--antes {
          opacity: 0.92;
        }
        .v2aa-col--depois {
          border-color: var(--v2-accent);
          box-shadow:
            var(--v2-shadow),
            0 0 0 1px var(--v2-accent) inset;
        }
        .v2aa-col--depois::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(80% 60% at 80% 0%, var(--v2-mesh-b), transparent 60%);
        }
        .v2aa-col__tag {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--v2aa-mono);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 6px 12px;
          border-radius: 999px;
          line-height: 1;
          border: 1px solid var(--v2-border);
        }
        .v2aa-col--antes .v2aa-col__tag {
          color: var(--v2-text-muted);
          background: var(--v2-surface-2);
        }
        .v2aa-col--depois .v2aa-col__tag {
          color: var(--v2-accent-ink);
          background: var(--v2-accent);
          border-color: var(--v2-accent);
        }
        .v2aa-col__title {
          position: relative;
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: 26px;
          margin: 16px 0 22px;
          text-transform: none;
          line-height: 1.1;
        }
        .v2aa-col--antes .v2aa-col__title { color: var(--v2-text-muted); }
        .v2aa-col--depois .v2aa-col__title { color: var(--v2-text); }
        .v2aa-col__list {
          position: relative;
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 14px;
        }
        .v2aa-col__item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 15px;
          line-height: 1.5;
        }
        .v2aa-col__ico {
          flex-shrink: 0;
          width: 26px;
          height: 26px;
          border-radius: 8px;
          display: grid;
          place-items: center;
          margin-top: 1px;
        }
        .v2aa-col--antes .v2aa-col__item { color: var(--v2-text-muted); }
        .v2aa-col--antes .v2aa-col__ico {
          background: var(--v2-surface-2);
          color: var(--v2-text-muted);
        }
        .v2aa-col--depois .v2aa-col__item {
          color: var(--v2-text-body);
          font-weight: 500;
        }
        .v2aa-col--depois .v2aa-col__ico {
          background: var(--v2-accent);
          color: var(--v2-accent-ink);
        }

        /* ── Badge VS ── */
        .v2aa-compare__vs {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 3;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: var(--v2-accent);
          color: var(--v2-accent-ink);
          font-family: var(--v2aa-mono);
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.06em;
          box-shadow: var(--v2-shadow);
          border: 3px solid var(--v2-bg-2);
        }

        /* ── Responsive ── */
        @media (max-width: 720px) {
          .v2aa-compare { grid-template-columns: 1fr; gap: 16px; }
          .v2aa-compare__vs {
            position: static;
            transform: none;
            margin: 4px auto;
          }
          .v2aa-col { padding: 24px; }
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .v2aa-section *,
          .v2aa-reveal {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <div className="v2aa-shell">
        <div className="v2aa-sechead">
          <span className="v2aa-eyebrow">
            <span aria-hidden="true" />
            Avant · Après
          </span>
          <h2 className="v2aa-sectitle" id="v2aa-compare-title">
            La même journée, vécue autrement.
          </h2>
          <p className="v2aa-secsub">
            À gauche, le quotidien que vous connaissez. À droite, ce qui change
            quand votre agenda se met à travailler pour vous.
          </p>
        </div>

        <div className="v2aa-compare__wrap">
          <div className="v2aa-compare">
            <div
              className="v2aa-col v2aa-col--antes v2aa-reveal"
              style={{ animationDelay: "0ms" }}
            >
              <span className="v2aa-col__tag">Avant</span>
              <h3 className="v2aa-col__title">Sans DocAgora</h3>
              <ul className="v2aa-col__list">
                {COMPARE_ROWS.map((row) => (
                  <li className="v2aa-col__item" key={`avant-${row.avant}`}>
                    <span className="v2aa-col__ico">
                      <IconCross />
                    </span>
                    <span>{row.avant}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="v2aa-col v2aa-col--depois v2aa-reveal"
              style={{ animationDelay: "120ms" }}
            >
              <span className="v2aa-col__tag">Après</span>
              <h3 className="v2aa-col__title">Avec DocAgora</h3>
              <ul className="v2aa-col__list">
                {COMPARE_ROWS.map((row) => (
                  <li className="v2aa-col__item" key={`apres-${row.apres}`}>
                    <span className="v2aa-col__ico">
                      <IconCheck />
                    </span>
                    <span>{row.apres}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="v2aa-compare__vs" aria-hidden="true">
            VS
          </div>
        </div>
      </div>
    </section>
  );
}
