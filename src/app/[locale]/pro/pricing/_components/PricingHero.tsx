"use client";

import type { CSSProperties } from "react";
import { useRevealInView } from "@/components/shared/useRevealInView";
import type { Billing, PricingCopy } from "./pricingCopy";
import { pricingHeroCss } from "./pricingHero.styles";

/* ============================================================
   Hero de /pro/pricing — eyebrow, titre serif, lead, toggle
   Mensuel/Annuel contrôlé (état porté par PricingBilling,
   aria-pressed + thumb coulissant) et note « montants à
   confirmer ». Reveals via le socle partagé (motion.css
   mo-reveal + useRevealInView), plus de keyframes locales.
   ============================================================ */

interface PricingHeroProps {
  copy: PricingCopy["hero"];
  billing: Billing;
  onBillingChange: (billing: Billing) => void;
}

export default function PricingHero({
  copy,
  billing,
  onBillingChange,
}: PricingHeroProps) {
  const { ref, revealed } = useRevealInView<HTMLElement>(0.1);
  const revealCls = `mo-reveal${revealed ? " mo-in" : ""}`;

  return (
    <header ref={ref} className="pp1-shell pp1-hero" aria-labelledby="pp1-title">
      <style>{pricingHeroCss}</style>

      <span className={`pp1-eyebrow ${revealCls}`} style={{ "--i": 0 } as CSSProperties}>
        <span className="pp1-eyebrow-dot" aria-hidden="true" />
        {copy.eyebrow}
      </span>

      <h1
        className={`pp1-h1 ${revealCls}`}
        id="pp1-title"
        style={{ "--i": 1 } as CSSProperties}
      >
        {copy.titleLead}
        <em>{copy.titleAccent}</em>
        {copy.titleEnd}
      </h1>

      <p className={`pp1-lead ${revealCls}`} style={{ "--i": 2 } as CSSProperties}>
        {copy.lead}
      </p>

      <div
        className={`pp1-toggle-wrap ${revealCls}`}
        style={{ "--i": 3 } as CSSProperties}
      >
        <div
          className="pp1-toggle"
          role="group"
          aria-label={copy.toggleAria}
          data-billing={billing}
        >
          <span className="pp1-toggle-thumb" aria-hidden="true" />
          <button
            type="button"
            aria-pressed={billing === "monthly"}
            onClick={() => onBillingChange("monthly")}
          >
            {copy.toggleMonthly}
          </button>
          <button
            type="button"
            aria-pressed={billing === "yearly"}
            onClick={() => onBillingChange("yearly")}
          >
            {copy.toggleYearly}
            <span className="pp1-toggle-save">{copy.toggleSave}</span>
          </button>
        </div>
        <span className="pp1-note">
          <b>{copy.noteStrong}</b>
          {copy.noteRest}
        </span>
      </div>
    </header>
  );
}
