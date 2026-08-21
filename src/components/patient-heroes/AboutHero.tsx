import VerifiedRecordCard from "@/components/home/VerifiedRecordCard";
import { Link } from "@/i18n/navigation";
import type { MedicallyCopy } from "@/app/[locale]/(patient)/about/_prototypes/medically/medicallyCopy";
import { SPECIALTY_ICON, searchLoginUrl } from "@/lib/specialties";

/**
 * AboutHero — hero « éditorial split » de /about (thème clair patient).
 * Rendu HORS du conteneur `.med` : il n'utilise aucune classe du template
 * Medically, donc `medically.css` (générée) ne le concerne pas. Statique
 * (server component), reveals au chargement en CSS pur. Tokens de marque
 * (--color-*) chargés globalement via tokens.css.
 */
export default function AboutHero({
  copy,
}: {
  copy: MedicallyCopy["hero"];
}) {
  return (
    <section className="pah" aria-label={copy.eyebrow}>
      <style>{`
        .pah, .pah * { box-sizing: border-box; }
        .pah {
          position: relative;
          overflow: hidden;
          padding: clamp(28px, 4vw, 56px) clamp(20px, 5vw, 48px) clamp(48px, 6vw, 88px);
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
        }
        .pah::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background:
            radial-gradient(58% 50% at 88% 6%, rgba(var(--color-teal-rgb), 0.20), transparent 60%),
            radial-gradient(44% 44% at 4% 80%, rgba(var(--color-cobalt-rgb), 0.12), transparent 60%),
            linear-gradient(180deg, var(--color-light-1) 0%, var(--color-light-2) 42%, var(--color-light-2) 62%, var(--color-light-1) 100%);
        }
        .pah__inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1180px;
          margin-inline: auto;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: clamp(28px, 4vw, 64px);
          align-items: center;
        }
        /* Surtitre « filet + capitales » (choix A) — même langage que les pages
           pro, décliné en clair : filet teal→cobalt, libellé en navy adouci. */
        .pah__eyebrow {
          display: inline-flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 13px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(var(--color-navy-rgb), 0.58);
          line-height: 1;
        }
        .pah__eyebrow::before {
          content: "";
          width: 46px;
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, var(--color-teal), var(--color-cobalt));
        }
        .pah__title {
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: clamp(2rem, 4vw, 3.15rem);
          line-height: 1.06;
          letter-spacing: -0.015em;
          color: var(--color-navy);
          margin: 16px 0 0;
          text-wrap: balance;
        }
        .pah__em { color: var(--color-accent-ink); font-style: normal; }
        .pah__desc {
          color: #40506a;
          font-size: clamp(15px, 1.3vw, 17px);
          line-height: 1.62;
          max-width: 46ch;
          margin: 18px 0 0;
        }
        .pah__cta { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 30px; }
        .pah__btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 24px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          border: 1.5px solid transparent;
          transition: transform 0.18s ease, background 0.22s ease, box-shadow 0.22s ease;
        }
        .pah__btn--primary { background: var(--color-navy); color: #fff; }
        .pah__btn--primary:hover { background: var(--color-cobalt); transform: translateY(-1px); }
        .pah__btn--ghost {
          background: #fff;
          color: var(--color-navy);
          border-color: var(--border-default);
        }
        .pah__btn--ghost:hover { border-color: rgba(var(--color-teal-rgb), 0.55); transform: translateY(-1px); }
        .pah__btn svg { width: 15px; height: 15px; }

        /* Colonne droite : la fiche vérifiée VIVANTE de la home (thème clair)
           remplace l'aplat dégradé vide, qui se lisait comme un placeholder.
           Le halo garde l'énergie couleur de l'ancien aplat sans son cadre. */
        .pah__media {
          position: relative;
          display: grid;
          place-items: center;
          padding: 10px 0 26px;
        }
        .pah__stage {
          position: absolute;
          inset: 4% 3% 8%;
          z-index: 0;
          border-radius: 28px;
          pointer-events: none;
          background:
            radial-gradient(58% 54% at 22% 14%, rgba(var(--color-teal-rgb), 0.34), transparent 62%),
            radial-gradient(64% 60% at 84% 88%, rgba(var(--color-cobalt-rgb), 0.24), transparent 64%);
          filter: blur(8px);
        }
        .pah__card {
          position: relative;
          z-index: 1;
          width: min(100%, 384px);
          animation: pah-levitate 6.5s ease-in-out infinite;
        }
        @keyframes pah-levitate {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        /* Re-skin clair de la VerifiedRecordCard (même traitement que le hero
           de la home patient) — le composant est neutre, la peau est locale. */
        .pah__card .da-record {
          background: rgba(255, 255, 255, 0.86) !important;
          border: 1px solid rgba(var(--color-navy-rgb), 0.12) !important;
          backdrop-filter: blur(18px) saturate(1.15);
          -webkit-backdrop-filter: blur(18px) saturate(1.15);
          box-shadow: 0 36px 80px -30px rgba(var(--color-navy-rgb), 0.45) !important;
          color: var(--color-dark-1) !important;
        }
        .pah__card .da-record__name { color: var(--color-navy) !important; }
        .pah__card .da-record__meta,
        .pah__card .da-record__langs-label { color: rgba(var(--color-navy-rgb), 0.66) !important; }
        .pah__card .da-record__verified { color: var(--color-accent-ink) !important; }
        .pah__card .da-record__mono {
          background: rgba(var(--color-teal-rgb), 0.18) !important;
          color: var(--color-accent-ink) !important;
        }
        .pah__card .da-lang-chip {
          background: rgba(var(--color-navy-rgb), 0.06) !important;
          color: rgba(var(--color-navy-rgb), 0.6) !important;
          border-color: rgba(var(--color-navy-rgb), 0.14) !important;
        }
        .pah__card .da-lang-chip.is-match {
          background: rgba(var(--color-teal-rgb), 0.22) !important;
          color: var(--color-accent-ink) !important;
          border-color: rgba(var(--color-teal-rgb), 0.45) !important;
        }
        .pah__card .da-record__badge {
          background: rgba(var(--color-navy-rgb), 0.1) !important;
          color: rgba(var(--color-navy-rgb), 0.82) !important;
        }
        .pah__badge {
          position: absolute;
          left: -14px;
          bottom: -16px;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(var(--color-navy-rgb), 0.10);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 20px 42px -18px rgba(var(--color-navy-rgb), 0.5);
        }
        .pah__badge-tick {
          flex: none;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(var(--color-teal-rgb), 0.18);
          color: var(--color-accent-ink);
          display: grid;
          place-items: center;
        }
        .pah__badge-tick svg { width: 18px; height: 18px; }
        .pah__badge-title { display: block; font-weight: 700; font-size: 13.5px; color: var(--color-navy); line-height: 1.2; }
        .pah__badge-sub { display: block; font-size: 12px; color: var(--text-muted); margin-top: 2px; }

        .pah-reveal {
          opacity: 0;
          transform: translateY(16px);
          animation: pah-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .pah-d1 { animation-delay: 0.05s; }
        .pah-d2 { animation-delay: 0.15s; }
        .pah-d3 { animation-delay: 0.25s; }
        .pah-d4 { animation-delay: 0.35s; }
        .pah-d5 { animation-delay: 0.45s; }
        @keyframes pah-rise { to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 820px) {
          .pah__inner { grid-template-columns: 1fr; gap: 40px; }
          .pah__badge { left: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pah-reveal { opacity: 1 !important; transform: none !important; animation: none !important; }
          .pah__card { animation: none !important; }
          .pah__btn:hover { transform: none; }
        }
      `}</style>

      <div className="pah__inner">
        <div>
          <span className="pah__eyebrow pah-reveal pah-d1">{copy.eyebrow}</span>
          <h1 className="pah__title pah-reveal pah-d2">
            {copy.titleLead} <span className="pah__em">{copy.titleEmphasis}</span>
          </h1>
          <p className="pah__desc pah-reveal pah-d3">{copy.lead}</p>
          <div className="pah__cta pah-reveal pah-d4">
            <a href={searchLoginUrl({})} className="pah__btn pah__btn--primary">
              <span>{copy.ctaPrimary}</span>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            {/* Lien interne : `Link` ajoute le prefixe de langue quand il en
                faut un, et evite le rechargement complet de la page qu'un
                `<a>` provoquait. Le CTA principal juste au-dessus reste un
                `<a>` : il sort vers la plateforme. */}
            <Link href="/specialties" className="pah__btn pah__btn--ghost">
              <span>{copy.ctaGhost}</span>
            </Link>
          </div>
        </div>

        <div className="pah__media pah-reveal pah-d5">
          <span className="pah__stage" aria-hidden="true"></span>
          <div className="pah__card">
            <VerifiedRecordCard
              icon={SPECIALTY_ICON[copy.card.specialtyKey] ?? "icon-doctor"}
              specialty={copy.card.specialty}
              city={copy.card.city}
              languages={copy.card.languages}
              illustrative
            />
            <div className="pah__badge">
              <span className="pah__badge-tick" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" />
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>
                <span className="pah__badge-title">{copy.badgeTitle}</span>
                <span className="pah__badge-sub">{copy.badgeSub}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
