import RevealCascade from "@/components/shared/RevealCascade";
import type { AboutCopy } from "./aboutCopy";
import { aboutStepsCss } from "./aboutSteps.styles";

/* ============================================================
   Timeline d'onboarding de /pro/about — 4 étapes (compte →
   vérification → agenda → réservations 24/7) reliées par un
   filet dégradé. Textes aboutCopy.ts. Reveals au scroll via le
   socle partagé (RevealCascade + motion.css) : tête de section
   puis cascade des 4 étapes.
   ============================================================ */

export default function AboutSteps({ steps }: { steps: AboutCopy["steps"] }) {
  return (
    <section className="pa2-section pa2-section--line" aria-labelledby="pa2-steps-title">
      <style>{aboutStepsCss}</style>

      {/* Tête de section alignée à gauche (chantier 03) : le centrage était
          appliqué même au texte qu'on lit vraiment. Il reste réservé aux
          moments d'accroche, c'est-à-dire au hero. */}
      <RevealCascade>
        <h2 className="pa2-h2" id="pa2-steps-title">
          {steps.title}
        </h2>
        <p className="pa2-sub">{steps.sub}</p>
      </RevealCascade>

      <RevealCascade as="ol" className="pa2-steps" baseDelayMs={120}>
        {steps.items.map((step) => (
          <li className="pa2-step" key={step.num}>
            <span className="pa2-step-dot" aria-hidden="true">
              {step.num}
            </span>
            <h3 className="pa2-step-title">{step.title}</h3>
            <p className="pa2-step-text">{step.text}</p>
            {step.chip && <span className="pa2-step-chip">{step.chip}</span>}
          </li>
        ))}
      </RevealCascade>
    </section>
  );
}
