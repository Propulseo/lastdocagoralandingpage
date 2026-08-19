import RevealCascade from "@/components/shared/RevealCascade";
import type { PricingCopy } from "./pricingCopy";
import { pricingFaqCss } from "./pricingFaq.styles";

/* ============================================================
   FAQ courte de /pro/pricing (details/summary natifs, sans JS).

   La carte CTA finale qui suivait a été retirée : la page portait
   trois appels à l'action d'affilée — un par plan, celui-ci, puis
   la bande du footer partagé (ft2__cta, présente sur toutes les
   pages). La FAQ referme donc la page, et la conversion est
   assurée par les plans au-dessus et par le footer en dessous.
   ============================================================ */

export default function PricingFaq({ faq }: { faq: PricingCopy["faq"] }) {
  return (
    <section className="pp1-shell pp1-faq" aria-labelledby="pp1-faq-title">
      <style>{pricingFaqCss}</style>

      <RevealCascade>
        <h2 className="pp1-h2" id="pp1-faq-title">
          {faq.title}
        </h2>
        {faq.items.map((item) => (
          <details key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </RevealCascade>
    </section>
  );
}
