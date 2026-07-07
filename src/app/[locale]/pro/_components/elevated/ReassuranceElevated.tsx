import AnimatedSection from "@/components/shared/AnimatedSection";
import { useTranslations } from "next-intl";

/* ============================================================
   ReassuranceElevated — bande de réassurance élevée du Pro
   (variant « D2 » validé : ligne ultra-fine, 4 points alignés
   sur une seule rangée, filets fins entre chaque). Bande de
   réassurance de la home pro (/pro).

   Bande honnête : zéro logo tiers, zéro témoignage, zéro chiffre
   inventé — uniquement des faits vérifiables (programme early
   access, RGPD, hébergement Portugal, support direct). Trilingue
   via le namespace « pro.reassurance ». Couleurs via tokens
   --v2-* hérités du .v2p. Préfixe CSS « rea- ».
   ============================================================ */

type ReassuranceItem = { id: string; icon: React.ReactNode; hasSub: boolean };

function IconEarlyAccess() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.9 6.8 19l1-5.8L3.6 9.1l5.8-.8z" />
    </svg>
  );
}

function IconRgpd() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l7 3v5c0 4.4-3 8.3-7 9-4-.7-7-4.6-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function IconPortugal() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="6" rx="1.6" />
      <rect x="3" y="14" width="18" height="6" rx="1.6" />
      <path d="M7 7h.01M7 17h.01" />
    </svg>
  );
}

function IconSupport() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <rect x="2.5" y="12.5" width="4" height="6.5" rx="1.4" />
      <rect x="17.5" y="12.5" width="4" height="6.5" rx="1.4" />
      <path d="M20 19a3 3 0 0 1-3 3h-2.5" />
    </svg>
  );
}

const ITEMS: ReassuranceItem[] = [
  { id: "earlyAccess", icon: <IconEarlyAccess />, hasSub: true },
  { id: "rgpd", icon: <IconRgpd />, hasSub: true },
  { id: "portugal", icon: <IconPortugal />, hasSub: false },
  { id: "support", icon: <IconSupport />, hasSub: true },
];

export default function ReassuranceElevated() {
  const t = useTranslations("pro.reassurance");

  return (
    <section className="rea" aria-label={t("aria")}>
      <style>{`
        .rea, .rea * { box-sizing: border-box; }

        .rea {
          position: relative;
          padding-block: clamp(var(--spacing-lg, 32px), 4.5vh, var(--spacing-xl, 48px));
          border-top: 1px solid var(--v2-border);
          border-bottom: 1px solid var(--v2-border);
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
        }

        .rea__shell {
          width: 100%;
          margin-inline: auto;
          padding-inline: clamp(var(--spacing-sm, 16px), 3vw, var(--spacing-lg, 32px));
        }

        /* Une seule rangée, jamais de retour à la ligne : le 4e point
           reste aligné avec les 3 autres (au lieu de décrocher dessous). */
        .rea__row {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          align-items: center;
        }

        .rea__it {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-width: 0;
          padding: 3px clamp(12px, 1.8vw, 26px);
        }
        .rea__it + .rea__it { border-left: 1px solid var(--v2-border); }

        .rea__ic { flex-shrink: 0; display: inline-flex; color: var(--v2-accent); }
        .rea__ic svg { width: 17px; height: 17px; display: block; }

        .rea__label {
          color: var(--v2-text);
          font-size: 13.5px;
          font-weight: 700;
          letter-spacing: -0.01em;
          white-space: nowrap;
        }
        .rea__sub {
          color: var(--v2-text-muted);
          font-size: 12.5px;
          white-space: nowrap;
        }
        /* Séparateur décoratif généré en CSS : non vocalisé par les
           lecteurs d'écran, et pas de glyphe en dur dans le JSX. */
        .rea__sub::before { content: "·"; margin-right: 5px; }

        /* Largeurs intermédiaires : on GARDE la rangée fine des 4 points,
           mais on masque la micro-précision décorative pour que les 4
           libellés tiennent sur une seule ligne — même forme partout,
           jamais de chevauchement. */
        @media (max-width: 1180px) {
          .rea__sub { display: none; }
          .rea__it { padding: 3px clamp(10px, 1.6vw, 22px); }
        }

        /* Mobile réel : plus assez de largeur pour 4 colonnes → on
           empile proprement (filets en séparateurs horizontaux) et on
           réaffiche la micro-précision (la verticale a de la place). */
        @media (max-width: 740px) {
          .rea__row { grid-template-columns: 1fr; }
          .rea__it { padding: 12px 4px; }
          .rea__it + .rea__it { border-left: none; border-top: 1px solid var(--v2-border); }
          .rea__sub { display: inline; }
        }

        @media (prefers-reduced-motion: reduce) {
          .rea * { animation: none !important; transition: none !important; }
        }
      `}</style>

      <div className="rea__shell">
        <AnimatedSection>
          <ul className="rea__row">
            {ITEMS.map((item) => (
              <li className="rea__it" key={item.id}>
                <span className="rea__ic">{item.icon}</span>
                <span className="rea__label">{t(`${item.id}.label`)}</span>
                {item.hasSub && <span className="rea__sub">{t(`${item.id}.sub`)}</span>}
              </li>
            ))}
          </ul>
        </AnimatedSection>
      </div>
    </section>
  );
}
