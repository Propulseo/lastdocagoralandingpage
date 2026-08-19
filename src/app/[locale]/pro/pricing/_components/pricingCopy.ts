import { defaultLocale } from "@/i18n/config";
import { PRICING_COPY_PT } from "./pricingCopy.pt";
import { PRICING_COPY_FR } from "./pricingCopy.fr";
import { PRICING_COPY_EN } from "./pricingCopy.en";

/* ============================================================
   Textes de /pro/pricing (V1 « Grille premium »), dans les trois
   langues du site — une par fichier (pricingCopy.<lg>) ; ce
   module ne porte que la forme et le sélecteur. PT-PT est la
   locale par défaut.

   IMPORTANT : l'offre commerciale existe mais les montants ne
   sont PAS connus — tous les prix restent des placeholders
   « — € » avec mention « montants à confirmer ». Aucun chiffre
   inventé, dans aucune langue. Périmètre fonctionnel = les
   revendications réelles du produit (agenda, résa 24/7, rappels,
   profil vérifié, RGPD, PT/FR/EN) + des niveaux de service
   commerciaux génériques.
   ============================================================ */

export const PRICING_CONTACT_HREF = "/contact";

/** Périodicité de facturation pilotée par le toggle du hero. */
export type Billing = "monthly" | "yearly";

export interface PlanCopy {
  id: string;
  name: string;
  tagline: string;
  priceLabel: string;
  priceUnit?: string;
  priceSub: string;
  /** Sous-titre par périodicité (absent = priceSub fixe, ex. « Sur mesure »). */
  priceSubByBilling?: Readonly<Record<Billing, string>>;
  priceTbc: string;
  customPrice?: boolean;
  featured?: boolean;
  flag?: string;
  leadFeature?: string;
  features: string[];
  ctaLabel: string;
  ctaKind: "primary" | "ghost";
}

export type CompareCell =
  | { type: "check" }
  | { type: "dash" }
  | { type: "text"; value: string };

export interface CompareRowCopy {
  label: string;
  cells: [CompareCell, CompareCell, CompareCell];
}

export interface AssureItemCopy {
  id: "rgpd" | "verified" | "langs";
  title: string;
  desc: string;
}

export interface PricingCopy {
  hero: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    titleEnd: string;
    lead: string;
    toggleAria: string;
    toggleMonthly: string;
    toggleYearly: string;
    toggleSave: string;
    noteStrong: string;
    noteRest: string;
  };
  plans: PlanCopy[];
  plansFootnote: string;
  compare: {
    title: string;
    subtitle: string;
    headers: string[];
    rows: CompareRowCopy[];
  };
  assure: AssureItemCopy[];
  faq: {
    title: string;
    items: { q: string; a: string }[];
  };
}

const COPY: Record<string, PricingCopy> = {
  pt: PRICING_COPY_PT,
  fr: PRICING_COPY_FR,
  en: PRICING_COPY_EN,
};

/** Textes de la page pour la locale, avec repli sur `defaultLocale` (pt). */
export function getPricingCopy(locale: string): PricingCopy {
  return COPY[locale] ?? COPY[defaultLocale];
}
