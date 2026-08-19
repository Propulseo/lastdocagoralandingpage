import RevealCascade from "@/components/shared/RevealCascade";
import type { AboutCopy } from "./aboutCopy";
import { BellIcon, CheckIcon, GlobeIcon, LockIcon, ShieldIcon } from "./aboutIcons";
import { aboutBentoCss } from "./aboutBento.styles";

/* ============================================================
   « Ce que la plateforme fait » de /pro/about.

   Composition ASYMÉTRIQUE (chantier 01) : les quatre cartes de
   même poids ne donnaient aucune hiérarchie — l'œil survolait.
   Les rappels automatiques, seul point qui se démontre à l'écran,
   prennent une grande carte avec sa mise en scène SMS ; les trois
   autres redeviennent des lignes séparées par des filets. Rien
   n'est retiré, la hiérarchie est rendue.

   Les pictos sortent de leur carré arrondi (chantier 02) : ils
   sont posés directement sur le canvas, un cran plus grands.
   ============================================================ */

function Row({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="pa2-row">
      <span className="pa2-row-ico" aria-hidden="true">
        {icon}
      </span>
      <div>
        <h3 className="pa2-row-title">{title}</h3>
        <p className="pa2-row-text">{text}</p>
      </div>
    </div>
  );
}

export default function AboutBento({ bento }: { bento: AboutCopy["bento"] }) {
  return (
    <section className="pa2-section pa2-section--line" aria-labelledby="pa2-bento-title">
      <style>{aboutBentoCss}</style>

      <RevealCascade>
        <h2 className="pa2-h2" id="pa2-bento-title">
          {bento.title}
        </h2>
      </RevealCascade>

      {/* La cellule porte la cascade, la carte porte le survol : jamais les
          deux transform sur le même nœud (socle motion.css). */}
      <RevealCascade className="pa2-bento" baseDelayMs={120}>
        <div className="pa2-cell pa2-cell--lead">
          <div className="pa2-card mo-premium-card">
            <span className="pa2-card-ico" aria-hidden="true">
              <BellIcon />
            </span>
            <h3 className="pa2-card-title">{bento.reminders.title}</h3>
            <p className="pa2-card-text">{bento.reminders.text}</p>
            <div className="pa2-sms" aria-hidden="true">
              <span className="pa2-sms-in">{bento.reminders.smsIn}</span>
              <span className="pa2-sms-out">{bento.reminders.smsOut}</span>
            </div>
          </div>
        </div>

        <div className="pa2-cell">
          <Row
            icon={<ShieldIcon />}
            title={bento.verified.title}
            text={bento.verified.checks.join(" · ")}
          />
        </div>

        <div className="pa2-cell">
          <Row
            icon={<GlobeIcon />}
            title={bento.languages.title}
            text={bento.languages.text}
          />
        </div>

        <div className="pa2-cell">
          <Row
            icon={<LockIcon />}
            title={bento.gdpr.title}
            text={bento.gdpr.checks.join(" · ")}
          />
        </div>
      </RevealCascade>

      {/* Les trois langues restent démontrées, mais sous la liste plutôt que
          dans une carte : c'est une preuve, pas une rubrique. */}
      <RevealCascade className="pa2-langs" baseDelayMs={220}>
        {bento.languages.rows.map((row) => (
          <span className="pa2-lang" key={row.code}>
            <b>{row.code}</b>
            {row.label}
          </span>
        ))}
      </RevealCascade>

      <RevealCascade baseDelayMs={300}>
        <p className="pa2-bento-note">
          <CheckIcon />
          {bento.verified.text}
        </p>
      </RevealCascade>
    </section>
  );
}
