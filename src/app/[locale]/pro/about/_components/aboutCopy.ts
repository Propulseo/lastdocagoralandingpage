import { defaultLocale } from "@/i18n/config";
import { ABOUT_COPY_PT } from "./aboutCopy.pt";
import { ABOUT_COPY_FR } from "./aboutCopy.fr";
import { ABOUT_COPY_EN } from "./aboutCopy.en";

/* ============================================================
   Textes de /pro/about — direction « la preuve par le produit » :
   la page raconte DocAgora à travers l'interface. Trois langues,
   une par fichier (aboutCopy.<lg>) ; ce module ne porte que la
   forme et le sélecteur. PT-PT est la locale par défaut.
   Le chiffre no-shows est ILLUSTRATIF et signalé comme tel
   (footnote de la barre de métriques) — aucun chiffre réel.
   ============================================================ */

export type SlotKind = "base" | "online" | "free";

export interface MockSlot {
  time?: string;
  label: string;
  kind: SlotKind;
}

export interface MockDay {
  name: string;
  slots: MockSlot[];
}

export interface StepItem {
  num: string;
  title: string;
  text: string;
  chip?: string;
}

/**
 * Métrique de la barre « ce que cela change pour un cabinet ».
 * Deux formes : chiffrée (`to`, animée au compteur partagé de la home) ou
 * littérale (`text`, pour ce qui n'est pas un nombre — « 24/7 »).
 */
export interface MetricFigure {
  prefix?: string;
  to?: number;
  decimals?: number;
  suffix?: string;
  text?: string;
  sup?: string;
  label: string;
}

export interface AboutCopy {
  hero: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    lead: string;
    ctaPrimary: string;
    ctaGhost: string;
    badges: string[];
  };
  mock: {
    title: string;
    live: string;
    floatVerified: string;
    floatReminder: string;
    days: MockDay[];
  };
  steps: {
    title: string;
    sub: string;
    items: StepItem[];
  };
  bento: {
    title: string;
    reminders: { title: string; text: string; smsIn: string; smsOut: string };
    verified: { title: string; text: string; checks: string[] };
    languages: { title: string; text: string; rows: { code: string; label: string }[] };
    gdpr: { title: string; text: string; checks: string[] };
  };
  metrics: {
    title: string;
    footnote: string;
    figures: MetricFigure[];
  };
}

const COPY: Record<string, AboutCopy> = {
  pt: ABOUT_COPY_PT,
  fr: ABOUT_COPY_FR,
  en: ABOUT_COPY_EN,
};

/** Textes de la page pour la locale, avec repli sur `defaultLocale` (pt). */
export function getAboutCopy(locale: string): AboutCopy {
  return COPY[locale] ?? COPY[defaultLocale];
}
