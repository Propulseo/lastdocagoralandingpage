import type { CSSProperties } from "react";
import { Link } from "@/i18n/navigation";
import RevealCascade from "@/components/shared/RevealCascade";
import PointerTilt from "@/components/shared/PointerTilt";
import { ArrowIcon, CheckIcon } from "./PricingIcons";
import { PRICING_CONTACT_HREF, type Billing, type PlanCopy } from "./pricingCopy";
import { pricingPlansCss } from "./pricingPlans.styles";

/* ============================================================
   Grille de plans de /pro/pricing — 3 cartes glass dark dont
   « Cabinet » mise en avant (anneau + halo signature .pro-ring).
   Prix en placeholders « — € » / « Sur mesure », jamais de
   chiffre réel ; le sous-titre de prix suit la périodicité du
   toggle (crossfade 150ms via remontage keyé). Cascade au
   scroll via RevealCascade (socle motion.css). Rendu dans
   l'arbre client de PricingBilling.
   ============================================================ */

function PlanCard({
  plan,
  billing,
  className,
  style,
}: {
  plan: PlanCopy;
  billing: Billing;
  className?: string;
  style?: CSSProperties;
}) {
  // Remontage keyé uniquement pour les plans dont le sous-titre suit la
  // périodicité (l'offre « Sur mesure » ne rejoue pas l'animation).
  const priceKey = plan.priceSubByBilling ? billing : "static";
  const swapCls = plan.priceSubByBilling ? " pp1-swap" : "";
  const priceSub = plan.priceSubByBilling?.[billing] ?? plan.priceSub;

  return (
    <article
      className={[
        "pp1-plan",
        plan.featured ? "pp1-plan--star pro-ring pro-ring--halo" : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {plan.flag ? <span className="pp1-plan-flag">{plan.flag}</span> : null}
      <h2 className="pp1-plan-name">{plan.name}</h2>
      <p className="pp1-plan-for">{plan.tagline}</p>

      <div className={`pp1-price${swapCls}`} key={`price-${priceKey}`}>
        <span
          className={[
            "pp1-price-num",
            plan.customPrice ? "pp1-price-num--custom" : "",
            !plan.featured && !plan.customPrice ? "pp1-price-num--soft" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {plan.priceLabel}
        </span>
        {plan.priceUnit ? <span className="pp1-price-unit">{plan.priceUnit}</span> : null}
      </div>
      <p className={`pp1-price-sub${swapCls}`} key={`sub-${priceKey}`}>
        {priceSub}
      </p>
      <span className="pp1-tbc">{plan.priceTbc}</span>

      <hr className="pp1-plan-hr" />

      {/* --fi : rang de la coche, pour que les traits se dessinent l'un
          après l'autre quand la grille entre dans le viewport. */}
      <ul className="pp1-feats">
        {plan.leadFeature ? (
          <li className="pp1-feat-plus" style={{ "--fi": 0 } as CSSProperties}>
            <CheckIcon className="pp1-feat-check" />
            {plan.leadFeature}
          </li>
        ) : null}
        {plan.features.map((feature, i) => (
          <li
            key={feature}
            style={{ "--fi": plan.leadFeature ? i + 1 : i } as CSSProperties}
          >
            <CheckIcon className="pp1-feat-check" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="pp1-plan-cta">
        <Link
          className={`pp1-btn pp1-btn--${plan.ctaKind}`}
          href={PRICING_CONTACT_HREF}
        >
          {plan.ctaLabel}
          {plan.ctaKind === "primary" ? <ArrowIcon /> : null}
        </Link>
      </div>
    </article>
  );
}

export default function PricingPlans({
  plans,
  footnote,
  billing,
}: {
  plans: PlanCopy[];
  footnote: string;
  billing: Billing;
}) {
  return (
    <div className="pp1-shell">
      <style>{pricingPlansCss}</style>
      {/* La cellule porte la cascade, la carte porte l'échelle et l'entrée en
          perspective de la vedette : deux transform sur le même nœud se
          neutraliseraient (socle motion.css). */}
      <RevealCascade className="pp1-plans" stepMs={110}>
        {plans.map((plan) =>
          plan.featured ? (
            // Objet signature de la page : il s'incline vers le pointeur.
            // Un seul par page (cf. PointerTilt).
            <PointerTilt className="pp1-cell pp1-cell--star" key={plan.id}>
              <PlanCard plan={plan} billing={billing} />
            </PointerTilt>
          ) : (
            <div className="pp1-cell" key={plan.id}>
              <PlanCard plan={plan} billing={billing} />
            </div>
          ),
        )}
      </RevealCascade>
      <RevealCascade baseDelayMs={200}>
        <p className="pp1-plans-foot">{footnote}</p>
      </RevealCascade>
    </div>
  );
}
