"use client";

import RevealCascade from "@/components/shared/RevealCascade";

/* NOTE: the live "comment ça marche" section is hardcoded French (no i18n
   keys exist for it). This preview mirrors that. TODO before prod:
   externalize this copy to the i18n locale files (pt/fr/en). */
const COPY = {
  eyebrow: "Comment ça marche",
  title: "Du besoin au bon professionnel, en trois temps.",
  lede:
    "Tout ce qu'il faut pour trouver un professionnel vérifié, clairement et gratuitement. La réservation en ligne arrive bientôt.",
  steps: [
    {
      icon: "fas fa-magnifying-glass",
      title: "Recherchez",
      desc: "Indiquez une spécialité, une ville et votre langue. Gratuit, sans création de compte.",
    },
    {
      icon: "fas fa-user-doctor",
      title: "Comparez",
      desc: "Parcourez des professionnels vérifiés : langues parlées, ville et informations clés.",
    },
    {
      icon: "fas fa-calendar-check",
      title: "Réservez",
      soon: "Bientôt",
      desc: "La réservation en ligne arrive prochainement. Inscrivez-vous pour être prévenu au lancement.",
    },
  ],
};

export default function HowItWorks() {
  return (
    <section className="vnp-section vnp-section--tint vnhw" aria-labelledby="vnhw-title">
      <style>{`
        .vnhw__rail { position: relative; display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(20px, 3vw, 40px); }
        /* connector line behind the nodes (desktop) */
        .vnhw__rail::before {
          content: ""; position: absolute; top: 27px; left: 12%; right: 12%; height: 2px;
          background: linear-gradient(90deg, rgba(var(--color-navy-rgb),0.18), rgba(var(--color-teal-rgb),0.5), rgba(var(--color-navy-rgb),0.18));
          z-index: 0;
        }
        .vnhw__step { position: relative; z-index: 1; }
        .vnhw__node {
          width: 56px; height: 56px; border-radius: 16px; margin-bottom: 22px;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; color: #fff; position: relative;
          background: linear-gradient(135deg, var(--color-navy), var(--color-cobalt));
          box-shadow: 0 12px 26px -12px rgba(var(--color-navy-rgb), 0.6);
        }
        .vnhw__step:nth-child(2) .vnhw__node { background: linear-gradient(135deg, var(--color-cobalt), var(--color-mint)); }
        .vnhw__step:nth-child(3) .vnhw__node { background: linear-gradient(135deg, var(--color-mint), var(--color-teal)); }
        .vnhw__num {
          position: absolute; top: -8px; right: -8px;
          width: 24px; height: 24px; border-radius: 50%; font-size: 12px; font-weight: 800;
          display: flex; align-items: center; justify-content: center;
          background: #fff; color: var(--vnp-ink); box-shadow: var(--shadow-sm);
        }
        .vnhw__step-title { display: flex; align-items: center; gap: 10px; font-family: var(--font-fraunces), Georgia, serif; font-weight: 600; font-size: clamp(19px, 1.9vw, 24px); color: var(--vnp-ink); margin: 0 0 10px; }
        .vnhw__soon { font-family: var(--font-montserrat), sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--vnp-accent); background: var(--vnp-accent-soft); padding: 4px 10px; border-radius: 999px; }
        .vnhw__step-desc { font-size: 14.5px; line-height: 1.6; color: var(--vnp-body); margin: 0; max-width: 34ch; }
        @media (max-width: 760px) {
          .vnhw__rail { grid-template-columns: 1fr; gap: 32px; }
          .vnhw__rail::before { display: none; }
        }
      `}</style>
      <div className="vnp-shell">
        <div className="vnp-head">
          <span className="vnp-eyebrow">{COPY.eyebrow}</span>
          <h2 className="vnp-title" id="vnhw-title">{COPY.title}</h2>
          <p className="vnp-lede">{COPY.lede}</p>
        </div>
        <RevealCascade className="vnhw__rail" stepMs={90}>
          {COPY.steps.map((s, i) => (
            <div className="vnhw__step" key={s.title}>
              <div className="vnhw__node">
                <i className={s.icon} aria-hidden="true" />
                <span className="vnhw__num">{i + 1}</span>
              </div>
              <h3 className="vnhw__step-title">
                {s.title}
                {s.soon ? <span className="vnhw__soon">{s.soon}</span> : null}
              </h3>
              <p className="vnhw__step-desc">{s.desc}</p>
            </div>
          ))}
        </RevealCascade>
      </div>
    </section>
  );
}
