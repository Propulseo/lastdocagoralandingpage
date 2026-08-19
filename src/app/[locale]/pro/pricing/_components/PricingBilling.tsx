"use client";

import { useState } from "react";
import PricingHero from "./PricingHero";
import PricingPlans from "./PricingPlans";
import type { Billing, PricingCopy } from "./pricingCopy";

/* ============================================================
   PricingBilling — orchestrateur client de /pro/pricing : porte
   l'état de périodicité partagé entre le toggle du hero et les
   sous-titres de prix de la grille de plans (même pattern que
   ResourcesExplorer côté /pro/resources).
   ============================================================ */

export default function PricingBilling({
  hero,
  plans,
  plansFootnote,
}: {
  hero: PricingCopy["hero"];
  plans: PricingCopy["plans"];
  plansFootnote: string;
}) {
  const [billing, setBilling] = useState<Billing>("yearly");

  return (
    <>
      <PricingHero copy={hero} billing={billing} onBillingChange={setBilling} />
      <PricingPlans plans={plans} footnote={plansFootnote} billing={billing} />
    </>
  );
}
