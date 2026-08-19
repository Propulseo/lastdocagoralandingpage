import type { ContactCopy } from "@/app/[locale]/(patient)/contact/_medically/contactCopy";

/**
 * ContactHero — hero d'accueil de /contact (thème clair patient), même famille
 * que les autres pages. Rendu HORS `.med`. Centré : eyebrow + titre + accroche
 * + bouton mailto vers l'adresse de contact. Statique, reveals CSS.
 *
 * Composant serveur : il reçoit sa copie de la page, qui a déjà la locale —
 * pas d'appel au getter ici, pour que la page reste la seule à la résoudre.
 */
export default function ContactHero({ copy }: { copy: ContactCopy["hero"] }) {
  return (
    <section className="pch" aria-label={copy.eyebrow}>
      <style>{`
        .pch, .pch * { box-sizing: border-box; }
        .pch {
          position: relative;
          overflow: hidden;
          padding: clamp(30px, 4.2vw, 58px) clamp(20px, 5vw, 48px) clamp(44px, 5vw, 68px);
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
        }
        .pch::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background:
            radial-gradient(54% 50% at 88% 4%, rgba(var(--color-teal-rgb), 0.18), transparent 60%),
            radial-gradient(44% 44% at 6% 80%, rgba(var(--color-cobalt-rgb), 0.10), transparent 60%),
            linear-gradient(180deg, var(--color-light-1) 0%, var(--color-light-2) 42%, var(--color-light-2) 62%, var(--color-light-1) 100%);
        }
        .pch__inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 720px;
          margin-inline: auto;
          text-align: center;
        }
        /* Surtitre « filet + capitales » (choix A) — cf. AboutHero. Hero centré. */
        .pch__eyebrow {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: 13px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(var(--color-navy-rgb), 0.58);
          line-height: 1;
        }
        .pch__eyebrow::before {
          content: "";
          width: 46px;
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, var(--color-teal), var(--color-cobalt));
        }
        .pch__title {
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: clamp(2.1rem, 4.4vw, 3.2rem);
          line-height: 1.05;
          letter-spacing: -0.015em;
          color: var(--color-navy);
          margin: 14px 0 0;
          text-wrap: balance;
        }
        .pch__em { color: var(--color-accent-ink); font-style: normal; }
        .pch__desc {
          color: #40506a;
          font-size: clamp(15px, 1.3vw, 17px);
          line-height: 1.6;
          max-width: 50ch;
          margin: 16px auto 0;
        }
        .pch__cta { margin-top: 28px; }
        .pch__btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 26px;
          border-radius: 999px;
          background: var(--color-navy);
          color: #fff;
          font-size: 14.5px;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.22s ease, transform 0.18s ease;
        }
        .pch__btn:hover { background: var(--color-cobalt); transform: translateY(-1px); }
        .pch__btn svg { width: 16px; height: 16px; }
        .pch__mail {
          margin: 12px 0 0;
          font-size: 13.5px;
          color: rgba(var(--color-navy-rgb), 0.72);
        }
        .pch__mail a {
          color: var(--color-accent-ink);
          font-weight: 600;
          text-decoration: none;
        }
        .pch__mail a:hover { text-decoration: underline; }

        .pch-reveal {
          opacity: 0;
          transform: translateY(16px);
          animation: pch-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .pch-d1 { animation-delay: 0.05s; }
        .pch-d2 { animation-delay: 0.15s; }
        .pch-d3 { animation-delay: 0.25s; }
        .pch-d4 { animation-delay: 0.35s; }
        @keyframes pch-rise { to { opacity: 1; transform: translateY(0); } }

        @media (prefers-reduced-motion: reduce) {
          .pch-reveal { opacity: 1 !important; transform: none !important; animation: none !important; }
          .pch__btn:hover { transform: none; }
        }
      `}</style>

      <div className="pch__inner">
        <span className="pch__eyebrow pch-reveal pch-d1">{copy.eyebrow}</span>
        <h1 className="pch__title pch-reveal pch-d2">
          {copy.titleLead} <span className="pch__em">{copy.titleEmphasis}</span>
        </h1>
        <p className="pch__desc pch-reveal pch-d3">{copy.lead}</p>
        {/* CTA principal : descend vers le formulaire de la page (#contact-form,
            défilement doux via tokens.css). Le mailto devient un lien secondaire
            discret — il ne court-circuite plus le formulaire. */}
        <div className="pch__cta pch-reveal pch-d4">
          <a href="#contact-form" className="pch__btn">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" />
              <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{copy.formCta}</span>
          </a>
          <p className="pch__mail">
            {copy.mailPrefix}{" "}
            <a href={`mailto:${copy.email}`}>{copy.email}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
