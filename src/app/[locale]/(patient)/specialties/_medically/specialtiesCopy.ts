import { defaultLocale } from "@/i18n/config";
import { SPECIALTIES_COPY_PT } from "./specialtiesCopy.pt";
import { SPECIALTIES_COPY_FR } from "./specialtiesCopy.fr";
import { SPECIALTIES_COPY_EN } from "./specialtiesCopy.en";

/* ============================================================
   Textes DocAgora de la page /specialties, portée de
   ServiceSinglePage. Trois langues, une par fichier
   (specialtiesCopy.<lg>) ; ce module ne porte que la forme et le
   sélecteur. PT-PT est la locale par défaut.

   Le template destinait cette mise en page à UN service
   (/service-single/:slug). Ici elle présente l'ensemble des
   spécialités couvertes ; la grille « Related Service » devient
   donc le cœur de la page plutôt qu'un appendice.

   Ce fichier ne décrit QUE les textes propres à cette page. Les
   spécialités elles-mêmes — intitulés, descriptions, icônes,
   slugs — viennent de `lib/specialties.ts` et des traductions
   `specialties.items.*`, déjà écrites dans les trois langues.
   Une liste locale divergerait de la page d'accueil dès la
   première modification.
   ============================================================ */

export interface SpecialtiesCopy {
  pageTitle: {
    title: string;
    crumb: string;
  };
  /** Hero « recherche intégrée » (registre action, distinct du titre d'intro
   *  « Toutes les spécialités… » qui suit). */
  hero: {
    eyebrow: string;
    titleLead: string;
    titleEmphasis: string;
    lead: string;
    /** Repli si les exemples i18n qui défilent ne sont pas chargés. */
    specialtyPlaceholder: string;
    cityPlaceholder: string;
    cta: string;
    labelSpecialty: string;
    labelCity: string;
    labelLang: string;
    chipsLabel: string;
  };
  /**
   * Intro dégonflée (retour d'audit S4). Le template imposait trois photos : la
   * grande `about.jpg` — déjà utilisée telle quelle sur /about, donc le même
   * visuel deux fois sur le site — et un diptyque work/2 + work/4 repris du bloc
   * « Comment ça marche ». Les trois sont retirées : la page a désormais une
   * vraie console en hero, et le seul visuel du corps est fait maison (le
   * panneau des filtres). Aucune image stock ici.
   */
  intro: {
    title: string;
    paragraphs: string[];
  };
  /**
   * « Le fil de la recherche » : le bloc n'énumère plus cinq critères, il fait
   * suivre UNE recherche. Trois stations qui accumulent leurs filtres —
   * spécialité, puis ville, puis langue — et au bout du fil ce qu'on obtient.
   * La section apprend la méthode du croisement à qui découvre le système de
   * santé portugais, au lieu de lister des arguments.
   */
  capabilities: {
    title: string;
    lede: string;
    /** Une légende par station, dans l'ordre du fil. Exactement trois. */
    steps: string[];
    /** La langue montrée en pastille à la troisième station (« Français »). */
    langWord: string;
    /** Ce qui reste au bout du fil, sous la fiche. */
    destCap: string;
  };
  /** Le pavé d'un seul tenant se lisait comme un mur de texte : même contenu,
   *  coupé en deux idées (la vérification, puis la langue). */
  approach: {
    title: string;
    paragraphs: string[];
  };
  listTitle: string;
  marqueeLabel: string;
  /** L'ancienne colonne « newsletter » (champ e-mail jamais branché) est devenue
   *  un CTA réel vers la création de compte sur la plateforme : pas de faux
   *  formulaire sur un produit santé. */
  sidebar: {
    ctaEyebrow: string;
    ctaTitle: string;
    ctaLede: string;
    ctaButton: string;
    accountEyebrow: string;
    accountTitle: string;
    accountLede: string;
    accountButton: string;
  };
}

const COPY: Record<string, SpecialtiesCopy> = {
  pt: SPECIALTIES_COPY_PT,
  fr: SPECIALTIES_COPY_FR,
  en: SPECIALTIES_COPY_EN,
};

/** Textes de la page pour la locale, avec repli sur `defaultLocale` (pt). */
export function getSpecialtiesCopy(locale: string): SpecialtiesCopy {
  return COPY[locale] ?? COPY[defaultLocale];
}
