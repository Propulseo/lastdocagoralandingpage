import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/page-metadata";
import ProBackdrop from "@/app/[locale]/pro/_ui/ProBackdrop";
import PricingBilling from "./_components/PricingBilling";
import PricingCompare from "./_components/PricingCompare";
import PricingFaq from "./_components/PricingFaq";
import { getPricingCopy } from "./_components/pricingCopy";
import { pricingBaseCss } from "./_components/pricingBase.styles";

/* ============================================================
   /pro/pricing — page tarifs pro (V1 « Grille premium »).
   Corps seul : header/footer pro fournis par pro/layout.tsx
   (ProChrome). Thème dark autonome via le wrapper .pp1 (canvas
   #080C14) + calques fixes partagés ProBackdrop, alignés sur la
   DA de la home /pro. Hero + plans orchestrés par PricingBilling
   (toggle de périodicité). Montants NON connus : « — € » partout.
   ============================================================ */

/* Même correctif que /pro/about : la page héritait du titre générique de /pro.
   Les traductions dédiées (metadata.proPricing) existaient déjà, inutilisées. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, path: "/pro/pricing", namespace: "metadata.proPricing" });
}

export default async function ProPricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = getPricingCopy(locale);

  return (
    <main className="pp1">
      <style>{pricingBaseCss}</style>
      <ProBackdrop />

      <PricingBilling
        hero={copy.hero}
        plans={copy.plans}
        plansFootnote={copy.plansFootnote}
      />
      <PricingCompare compare={copy.compare} assure={copy.assure} />
      <PricingFaq faq={copy.faq} />
    </main>
  );
}
