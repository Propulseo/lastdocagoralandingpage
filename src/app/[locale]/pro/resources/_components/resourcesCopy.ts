import { defaultLocale } from "@/i18n/config";
import { RESOURCES_COPY_PT } from "./resourcesCopy.pt";
import { RESOURCES_COPY_FR } from "./resourcesCopy.fr";
import { RESOURCES_COPY_EN } from "./resourcesCopy.en";

/* ============================================================
   Textes de /pro/resources — direction « Centre d'aide » (V3),
   dans les trois langues du site. PT-PT est la locale par défaut
   et la référence : c'est elle que voit un visiteur portugais.
   Une copie par langue dans un fichier dédié (resourcesCopy.<lg>)
   pour rester lisible ; ce module ne porte que la forme et le
   sélecteur. Contenu d'aide générique et honnête : aucun
   webinaire, chiffre ni témoignage inventé.
   ============================================================ */

export interface QuickAnswer {
  id: string;
  q: string;
  a: string;
}

export type ThemeIcon = "compass" | "calendar" | "bell" | "shield";

export interface ThemeCard {
  id: string;
  icon: ThemeIcon;
  title: string;
  desc: string;
}

export interface ResourcesCopy {
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2Lead: string;
    titleLine2Accent: string;
    lead: string;
    searchLabel: string;
    searchPlaceholder: string;
    clearLabel: string;
    popularLabel: string;
    popular: string[];
  };
  quick: {
    heading: string;
    emptyLead: string;
    emptyHint: string;
    items: QuickAnswer[];
  };
  featured: {
    badge: string;
    title: string;
    lead: string;
    points: string[];
    meta: string[];
  };
  themes: {
    heading: string;
    lead: string;
    items: ThemeCard[];
  };
}

const COPY: Record<string, ResourcesCopy> = {
  pt: RESOURCES_COPY_PT,
  fr: RESOURCES_COPY_FR,
  en: RESOURCES_COPY_EN,
};

/** Textes de la page pour la locale, avec repli sur `defaultLocale` (pt). */
export function getResourcesCopy(locale: string): ResourcesCopy {
  return COPY[locale] ?? COPY[defaultLocale];
}
