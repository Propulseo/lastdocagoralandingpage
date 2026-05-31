"use client";

import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────────────────────────────────
   Données des étapes, tout est ILLUSTRATIF (exemple).
   Anti-survente : recherche gratuite de professionnels vérifiés ;
   la prise de rendez-vous est « bientôt ».
   ────────────────────────────────────────────────────────────────────────── */
type StepId = "search" | "compare" | "slot";

interface Step {
  id: StepId;
  num: string;
  icon: string;
  title: string;
  desc: string;
}

const STEPS: Step[] = [
  {
    id: "search",
    num: "01",
    icon: "fas fa-magnifying-glass",
    title: "Décrivez votre besoin",
    desc:
      "Filtrez gratuitement par spécialité, ville et langue. Les résultats se précisent au fil de vos choix.",
  },
  {
    id: "compare",
    num: "02",
    icon: "fas fa-user-doctor",
    title: "Comparez les profils",
    desc:
      "Spécialité, zone d’exercice et langues parlées (PT · FR · EN), chaque professionnel est vérifié par notre équipe.",
  },
  {
    id: "slot",
    num: "03",
    icon: "fas fa-calendar-check",
    title: "Choisissez votre créneau",
    desc:
      "La prise de rendez-vous en ligne arrive bientôt. Pour l’instant, repérez le bon professionnel et contactez-le directement.",
  },
];

const AUTOPLAY_MS = 4200;

export default function SectionCommentCaMarche() {
  const [active, setActive] = useState<StepId>("search");
  const [paused, setPaused] = useState(false);
  const reducedRef = useRef(false);

  /* Auto-avancement doux, nettoyé, stoppé au survol et en reduced-motion. */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = mq.matches;
    if (mq.matches || paused) return;

    const order: StepId[] = STEPS.map((s) => s.id);
    const timer = window.setInterval(() => {
      setActive((current) => {
        const idx = order.indexOf(current);
        return order[(idx + 1) % order.length];
      });
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [paused]);

  const activeIndex = STEPS.findIndex((s) => s.id === active);

  return (
    <section
      className="vphw-section"
      aria-labelledby="vphw-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{`
        .vphw-section, .vphw-section * { box-sizing: border-box; }
        .vphw-section {
          position: relative;
          overflow: hidden;
          padding-block: clamp(64px, 8vw, 108px);
          background:
            radial-gradient(78% 64% at 88% -8%, rgba(var(--color-teal-rgb), 0.16), transparent 70%),
            radial-gradient(64% 58% at 4% 108%, rgba(var(--color-cobalt-rgb), 0.10), transparent 72%),
            linear-gradient(180deg, var(--color-light-1) 0%, var(--color-light-2) 100%);
          color: var(--color-dark-1);
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        /* Grain léger pour la profondeur */
        .vphw-section::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.5;
          background-image: radial-gradient(rgba(var(--color-navy-rgb), 0.045) 1px, transparent 1px);
          background-size: 4px 4px;
          z-index: 0;
        }
        .vphw-shell {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1180px;
          margin-inline: auto;
          padding-inline: clamp(16px, 4vw, 40px);
        }

        /* ── En-tête ── */
        .vphw-head { max-width: 56ch; margin-bottom: clamp(34px, 4vw, 52px); }
        .vphw-kicker {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-mint);
        }
        .vphw-kicker-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--color-teal);
          box-shadow: 0 0 0 4px rgba(var(--color-teal-rgb), 0.18);
        }
        .vphw-h2 {
          margin: 14px 0 0;
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: clamp(1.8rem, 4vw, 2.85rem);
          line-height: 1.06;
          letter-spacing: -0.02em;
          color: var(--color-navy);
        }
        .vphw-h2 em {
          font-style: italic;
          color: var(--color-mint);
        }
        .vphw-sub {
          margin: 16px 0 0;
          font-size: clamp(0.95rem, 1.4vw, 1.05rem);
          line-height: 1.6;
          color: rgba(var(--color-navy-rgb), 0.74);
          max-width: 54ch;
        }

        /* ── Grille principale : étapes ↔ aperçu ── */
        .vphw-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
          gap: clamp(24px, 4vw, 52px);
          align-items: center;
        }

        /* ── Étapes cliquables ── */
        .vphw-steps {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .vphw-step {
          position: relative;
          width: 100%;
          text-align: left;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 16px;
          align-items: start;
          padding: 18px 20px;
          border-radius: 18px;
          border: 1px solid rgba(var(--color-navy-rgb), 0.10);
          background: var(--color-light-1);
          cursor: pointer;
          font-family: inherit;
          color: inherit;
          box-shadow: 0 1px 0 rgba(var(--color-navy-rgb), 0.04);
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }
        .vphw-step:hover {
          transform: translateY(-2px);
          border-color: rgba(var(--color-teal-rgb), 0.5);
          box-shadow: 0 16px 34px -22px rgba(var(--color-navy-rgb), 0.4);
        }
        .vphw-step:focus-visible {
          outline: none;
          border-color: var(--color-teal);
          box-shadow: 0 0 0 4px rgba(var(--color-teal-rgb), 0.28);
        }
        .vphw-step.is-active {
          border-color: rgba(var(--color-teal-rgb), 0.65);
          background:
            linear-gradient(180deg, rgba(var(--color-teal-rgb), 0.07), rgba(var(--color-teal-rgb), 0.02));
          box-shadow: 0 20px 44px -26px rgba(var(--color-navy-rgb), 0.5);
        }
        .vphw-step-badge {
          position: relative;
          width: 46px; height: 46px;
          border-radius: 13px;
          display: grid;
          place-items: center;
          font-size: 1rem;
          color: var(--color-mint);
          background: rgba(var(--color-teal-rgb), 0.12);
          transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease;
        }
        .vphw-step.is-active .vphw-step-badge {
          color: var(--color-light-1);
          background: linear-gradient(135deg, var(--color-cobalt), var(--color-teal));
          transform: scale(1.04);
        }
        .vphw-step-num {
          position: absolute;
          top: -8px; right: -8px;
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          padding: 2px 6px;
          border-radius: 999px;
          color: var(--color-navy);
          background: var(--color-light-1);
          border: 1px solid rgba(var(--color-navy-rgb), 0.12);
        }
        .vphw-step-title {
          margin: 2px 0 0;
          font-size: 1.02rem;
          font-weight: 700;
          color: var(--color-navy);
          font-family: inherit;
        }
        .vphw-step-desc {
          margin: 6px 0 0;
          font-size: 0.86rem;
          line-height: 1.55;
          color: rgba(var(--color-navy-rgb), 0.7);
        }
        .vphw-step-bar {
          position: absolute;
          left: 0; bottom: 0;
          height: 3px;
          width: 0;
          border-radius: 0 0 18px 18px;
          background: linear-gradient(90deg, var(--color-cobalt), var(--color-teal));
        }
        .vphw-step.is-active .vphw-step-bar { animation: vphw-progress var(--vphw-ms, 4200ms) linear forwards; }

        /* ── Aperçu produit (device) ── */
        .vphw-stage { position: relative; }
        .vphw-stage-glow {
          position: absolute;
          inset: -8% -4% -12%;
          background: radial-gradient(60% 60% at 50% 30%, rgba(var(--color-teal-rgb), 0.22), transparent 72%);
          filter: blur(8px);
          z-index: 0;
          pointer-events: none;
        }
        .vphw-device {
          position: relative;
          z-index: 1;
          border-radius: 26px;
          background: var(--color-light-1);
          border: 1px solid rgba(var(--color-navy-rgb), 0.10);
          box-shadow:
            0 40px 80px -34px rgba(var(--color-navy-rgb), 0.45),
            0 4px 14px -8px rgba(var(--color-navy-rgb), 0.18);
          overflow: hidden;
        }
        .vphw-topbar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px 18px;
          border-bottom: 1px solid rgba(var(--color-navy-rgb), 0.08);
          background: var(--color-light-2);
        }
        .vphw-dots { display: inline-flex; gap: 6px; }
        .vphw-dots span {
          width: 9px; height: 9px; border-radius: 50%;
          background: rgba(var(--color-navy-rgb), 0.16);
        }
        .vphw-dots span:first-child { background: rgba(var(--color-teal-rgb), 0.7); }
        .vphw-url {
          flex: 1;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.72rem;
          font-weight: 600;
          color: rgba(var(--color-navy-rgb), 0.6);
          padding: 5px 11px;
          border-radius: 8px;
          background: var(--color-light-1);
          border: 1px solid rgba(var(--color-navy-rgb), 0.08);
        }
        .vphw-url i { color: var(--color-teal); font-size: 0.66rem; }
        .vphw-illus {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-mint);
          padding: 3px 8px;
          border-radius: 999px;
          background: rgba(var(--color-teal-rgb), 0.12);
        }
        .vphw-screen {
          position: relative;
          min-height: 360px;
          padding: 20px;
        }
        .vphw-panel {
          animation: vphw-enter 0.45s cubic-bezier(0.22, 0.61, 0.36, 1) both;
        }
        .vphw-panel-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 14px;
        }
        .vphw-panel-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--color-navy);
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
        }
        .vphw-tag {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 4px 9px;
          border-radius: 999px;
          color: var(--color-navy);
          background: rgba(var(--color-navy-rgb), 0.06);
          border: 1px solid rgba(var(--color-navy-rgb), 0.08);
        }

        /* Écran 1 : recherche */
        .vphw-searchbar {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 11px 14px;
          border-radius: 13px;
          border: 1px solid rgba(var(--color-teal-rgb), 0.45);
          background: var(--color-light-1);
          box-shadow: 0 0 0 4px rgba(var(--color-teal-rgb), 0.10);
          color: var(--color-navy);
          font-weight: 600;
          font-size: 0.85rem;
        }
        .vphw-searchbar i { color: var(--color-teal); }
        .vphw-caret {
          display: inline-block;
          width: 2px; height: 15px;
          margin-left: auto;
          background: var(--color-cobalt);
          animation: vphw-blink 1.1s steps(1) infinite;
        }
        .vphw-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
        .vphw-chip {
          font-size: 0.76rem;
          font-weight: 600;
          padding: 7px 13px;
          border-radius: 999px;
          color: var(--color-navy);
          background: var(--color-light-2);
          border: 1px solid rgba(var(--color-navy-rgb), 0.1);
        }
        .vphw-chip.is-on {
          color: var(--color-light-1);
          background: var(--color-navy);
          border-color: var(--color-navy);
        }
        .vphw-chip.is-on i { color: var(--color-teal); }
        .vphw-hint {
          margin-top: 16px;
          font-size: 0.74rem;
          color: rgba(var(--color-navy-rgb), 0.6);
        }
        .vphw-hint b { color: var(--color-navy); }

        /* Écran 2 : comparaison de profils */
        .vphw-cards { display: flex; flex-direction: column; gap: 11px; }
        .vphw-card {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 12px;
          align-items: center;
          padding: 13px 14px;
          border-radius: 14px;
          border: 1px solid rgba(var(--color-navy-rgb), 0.1);
          background: var(--color-light-1);
          transition: border-color 0.25s ease, transform 0.25s ease;
        }
        .vphw-card.is-top {
          border-color: rgba(var(--color-teal-rgb), 0.55);
          box-shadow: 0 14px 30px -20px rgba(var(--color-navy-rgb), 0.4);
        }
        .vphw-avatar {
          width: 42px; height: 42px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          color: var(--color-light-1);
          font-size: 0.95rem;
          background: linear-gradient(135deg, var(--color-cobalt), var(--color-mint));
        }
        .vphw-card-name {
          font-size: 0.86rem;
          font-weight: 700;
          color: var(--color-navy);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .vphw-verified { color: var(--color-teal); font-size: 0.78rem; }
        .vphw-card-meta {
          margin-top: 3px;
          font-size: 0.72rem;
          color: rgba(var(--color-navy-rgb), 0.62);
          display: flex;
          flex-wrap: wrap;
          gap: 4px 10px;
        }
        .vphw-langs { display: inline-flex; gap: 4px; margin-top: 6px; }
        .vphw-lang {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 2px 6px;
          border-radius: 6px;
          color: var(--color-mint);
          background: rgba(var(--color-teal-rgb), 0.12);
        }
        .vphw-card-cta {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--color-cobalt);
          display: inline-flex;
          align-items: center;
          gap: 5px;
          white-space: nowrap;
        }

        /* Écran 3 : créneau « bientôt » */
        .vphw-cal {
          padding: 4px 2px;
        }
        .vphw-week { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; }
        .vphw-day {
          text-align: center;
          padding: 9px 4px;
          border-radius: 11px;
          border: 1px solid rgba(var(--color-navy-rgb), 0.1);
          background: var(--color-light-1);
        }
        .vphw-day.is-sel {
          border-color: rgba(var(--color-teal-rgb), 0.6);
          background: rgba(var(--color-teal-rgb), 0.08);
        }
        .vphw-day-dow { font-size: 0.62rem; color: rgba(var(--color-navy-rgb), 0.55); text-transform: uppercase; letter-spacing: 0.06em; }
        .vphw-day-n { font-size: 0.95rem; font-weight: 700; color: var(--color-navy); margin-top: 2px; }
        .vphw-slots { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 14px; }
        .vphw-slot {
          text-align: center;
          padding: 9px 4px;
          border-radius: 10px;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--color-navy);
          background: var(--color-light-2);
          border: 1px solid rgba(var(--color-navy-rgb), 0.1);
        }
        .vphw-soon {
          margin-top: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          border-radius: 13px;
          background: linear-gradient(100deg, rgba(var(--color-cobalt-rgb), 0.1), rgba(var(--color-teal-rgb), 0.12));
          border: 1px dashed rgba(var(--color-teal-rgb), 0.5);
          font-size: 0.78rem;
          color: var(--color-navy);
        }
        .vphw-soon i { color: var(--color-teal); }
        .vphw-soon b { font-weight: 700; }

        /* ── Foot note illustratif ── */
        .vphw-foot {
          margin-top: clamp(28px, 3vw, 40px);
          font-size: 0.74rem;
          color: rgba(var(--color-navy-rgb), 0.55);
          text-align: center;
        }

        /* ── Reveals en cascade ── */
        .vphw-reveal { opacity: 0; transform: translateY(18px); animation: vphw-reveal 0.7s cubic-bezier(0.22, 0.61, 0.36, 1) forwards; }
        .vphw-d1 { animation-delay: 0.05s; }
        .vphw-d2 { animation-delay: 0.16s; }
        .vphw-d3 { animation-delay: 0.27s; }
        .vphw-d4 { animation-delay: 0.38s; }

        @keyframes vphw-reveal { to { opacity: 1; transform: translateY(0); } }
        @keyframes vphw-enter { from { opacity: 0; transform: translateY(10px) scale(0.99); } to { opacity: 1; transform: none; } }
        @keyframes vphw-progress { from { width: 0; } to { width: 100%; } }
        @keyframes vphw-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }

        /* ── Responsive ── */
        @media (max-width: 980px) {
          .vphw-grid { grid-template-columns: 1fr; gap: 28px; }
          .vphw-screen { min-height: 340px; }
        }
        @media (max-width: 520px) {
          .vphw-step { padding: 15px 16px; gap: 13px; }
          .vphw-step-badge { width: 42px; height: 42px; }
          .vphw-week { grid-template-columns: repeat(5, 1fr); gap: 6px; }
          .vphw-card { grid-template-columns: auto 1fr; }
          .vphw-card-cta { grid-column: 2; justify-content: flex-end; }
        }

        @media (prefers-reduced-motion: reduce) {
          .vphw-reveal, .vphw-panel, .vphw-step-bar, .vphw-caret, .vphw-section *,
          .vphw-step-badge, .vphw-step {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <div className="vphw-shell">
        <header className="vphw-head">
          <span className="vphw-kicker vphw-reveal vphw-d1">
            <span className="vphw-kicker-dot" aria-hidden="true" />
            Comment ça marche
          </span>
          <h2 id="vphw-title" className="vphw-h2 vphw-reveal vphw-d2">
            De la recherche au bon professionnel, <em>en trois temps</em>.
          </h2>
          <p className="vphw-sub vphw-reveal vphw-d3">
            {"Tout ce qu’il vous faut pour trouver un professionnel vérifié, clair, rapide et gratuit. La prise de rendez-vous en ligne arrive bientôt."}
          </p>
        </header>

        <div className="vphw-grid">
          {/* Étapes cliquables, pilotent l’aperçu */}
          <ol className="vphw-steps vphw-reveal vphw-d3" aria-label="Étapes de la recherche">
            {STEPS.map((step) => {
              const isActive = step.id === active;
              return (
                <li key={step.id}>
                  <button
                    type="button"
                    className={`vphw-step${isActive ? " is-active" : ""}`}
                    aria-pressed={isActive}
                    aria-label={`Étape ${step.num} : ${step.title}`}
                    onClick={() => setActive(step.id)}
                    onMouseEnter={() => setActive(step.id)}
                    onFocus={() => setActive(step.id)}
                    style={{ ["--vphw-ms" as string]: `${AUTOPLAY_MS}ms` }}
                  >
                    <span className="vphw-step-badge" aria-hidden="true">
                      <i className={step.icon} />
                      <span className="vphw-step-num">{step.num}</span>
                    </span>
                    <span>
                      <span className="vphw-step-title">{step.title}</span>
                      <span className="vphw-step-desc">{step.desc}</span>
                    </span>
                    <span className="vphw-step-bar" aria-hidden="true" />
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Aperçu produit app-like, réagit à l’étape active */}
          <div className="vphw-stage vphw-reveal vphw-d4">
            <span className="vphw-stage-glow" aria-hidden="true" />
            <div className="vphw-device">
              <div className="vphw-topbar">
                <span className="vphw-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="vphw-url">
                  <i className="fas fa-lock" aria-hidden="true" />
                  docagora.pt
                </span>
                <span className="vphw-illus">Exemple</span>
              </div>

              <div
                className="vphw-screen"
                role="group"
                aria-live="polite"
                aria-label={`Aperçu, étape ${activeIndex + 1} sur ${STEPS.length}`}
              >
                {/* key force la transition entre écrans */}
                <PreviewScreen key={active} step={active} />
              </div>
            </div>
          </div>
        </div>

        <p className="vphw-foot">
          {"*Profils, créneaux et chiffres présentés à titre illustratif. La prise de rendez-vous en ligne sera disponible bientôt."}
        </p>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Écrans de l’aperçu, mockups 100 % CSS/SVG, contenu ILLUSTRATIF.
   ────────────────────────────────────────────────────────────────────────── */
function PreviewScreen({ step }: { step: StepId }) {
  if (step === "search") {
    return (
      <div className="vphw-panel" aria-hidden="true">
        <div className="vphw-panel-head">
          <span className="vphw-panel-title">Trouver un professionnel</span>
          <span className="vphw-tag">Recherche gratuite</span>
        </div>
        <div className="vphw-searchbar">
          <i className="fas fa-magnifying-glass" />
          Cardiologue · Lisbonne
          <span className="vphw-caret" />
        </div>
        <div className="vphw-chips">
          <span className="vphw-chip is-on">
            <i className="fas fa-user-doctor" /> Spécialité
          </span>
          <span className="vphw-chip">
            <i className="fas fa-location-dot" /> Ville
          </span>
          <span className="vphw-chip">
            <i className="fas fa-language" /> Langue
          </span>
        </div>
        <p className="vphw-hint">
          <b>24 professionnels</b> correspondent à votre recherche*.
        </p>
      </div>
    );
  }

  if (step === "compare") {
    return (
      <div className="vphw-panel" aria-hidden="true">
        <div className="vphw-panel-head">
          <span className="vphw-panel-title">Comparez les profils vérifiés</span>
          <span className="vphw-tag">PT · FR · EN</span>
        </div>
        <div className="vphw-cards">
          <article className="vphw-card is-top">
            <span className="vphw-avatar">
              <i className="fas fa-user-doctor" />
            </span>
            <div>
              <span className="vphw-card-name">
                Dr. A. Marques
                <i className="fas fa-circle-check vphw-verified" title="Vérifié" />
              </span>
              <span className="vphw-card-meta">
                <span>Cardiologie</span>
                <span>· Lisbonne</span>
              </span>
              <span className="vphw-langs">
                <span className="vphw-lang">PT</span>
                <span className="vphw-lang">FR</span>
                <span className="vphw-lang">EN</span>
              </span>
            </div>
            <span className="vphw-card-cta">
              Voir <i className="fas fa-arrow-right" />
            </span>
          </article>

          <article className="vphw-card">
            <span className="vphw-avatar">
              <i className="fas fa-user-doctor" />
            </span>
            <div>
              <span className="vphw-card-name">
                Dr. S. Costa
                <i className="fas fa-circle-check vphw-verified" title="Vérifié" />
              </span>
              <span className="vphw-card-meta">
                <span>Cardiologie</span>
                <span>· Cascais</span>
              </span>
              <span className="vphw-langs">
                <span className="vphw-lang">PT</span>
                <span className="vphw-lang">EN</span>
              </span>
            </div>
            <span className="vphw-card-cta">
              Voir <i className="fas fa-arrow-right" />
            </span>
          </article>
        </div>
        <p className="vphw-hint">
          Chaque profil est <b>vérifié par notre équipe</b> avant publication.
        </p>
      </div>
    );
  }

  // step === "slot"
  return (
    <div className="vphw-panel" aria-hidden="true">
      <div className="vphw-panel-head">
        <span className="vphw-panel-title">Choisir un créneau</span>
        <span className="vphw-tag">Bientôt</span>
      </div>
      <div className="vphw-cal">
        <div className="vphw-week">
          <div className="vphw-day">
            <div className="vphw-day-dow">Lun</div>
            <div className="vphw-day-n">12</div>
          </div>
          <div className="vphw-day is-sel">
            <div className="vphw-day-dow">Mar</div>
            <div className="vphw-day-n">13</div>
          </div>
          <div className="vphw-day">
            <div className="vphw-day-dow">Mer</div>
            <div className="vphw-day-n">14</div>
          </div>
          <div className="vphw-day">
            <div className="vphw-day-dow">Jeu</div>
            <div className="vphw-day-n">15</div>
          </div>
          <div className="vphw-day">
            <div className="vphw-day-dow">Ven</div>
            <div className="vphw-day-n">16</div>
          </div>
        </div>
        <div className="vphw-slots">
          <span className="vphw-slot">09:30</span>
          <span className="vphw-slot">11:00</span>
          <span className="vphw-slot">14:15</span>
        </div>
      </div>
      <div className="vphw-soon">
        <i className="fas fa-calendar-check" aria-hidden="true" />
        <span>
          <b>Prise de rendez-vous en ligne bientôt disponible.</b> En attendant, contactez directement le professionnel.
        </span>
      </div>
    </div>
  );
}
