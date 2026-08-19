import { defaultLocale } from "@/i18n/config";
import { CONTACT_COPY_PT } from "./contactCopy.pt";
import { CONTACT_COPY_FR } from "./contactCopy.fr";
import { CONTACT_COPY_EN } from "./contactCopy.en";

/* ============================================================
   Textes DocAgora de la page /contact, portée de ContactPage du
   template. Trois langues, une par fichier (contactCopy.<lg>) ;
   ce module ne porte que la forme et le sélecteur. PT-PT est la
   locale par défaut.

   Coordonnées : uniquement ce que le site revendique déjà
   (hello@docagora.com, Lisbonne). Le template affichait une
   adresse dans l'Indiana et deux numéros de téléphone
   américains ; DocAgora n'a pas de standard téléphonique, et son
   argument est justement qu'on n'a plus à appeler. Le bloc
   « Call Now » devient donc un bloc sur le fonctionnement en
   ligne plutôt qu'un numéro inventé.
   ============================================================ */

export interface ContactInfoItem {
  icon: string;
  title: string;
  lines: string[];
}

export interface ContactCopy {
  pageTitle: {
    title: string;
    crumb: string;
  };
  /** Hero (registre « accueil / joignable », distinct du titre « Une
   *  question ? » qui coiffe le formulaire plus bas). Le CTA principal descend
   *  vers le formulaire (#contact-form) ; le mailto passe en lien secondaire —
   *  le hero ne court-circuite plus la page. */
  hero: {
    eyebrow: string;
    titleLead: string;
    titleEmphasis: string;
    lead: string;
    email: string;
    formCta: string;
    mailPrefix: string;
  };
  info: ContactInfoItem[];
  intro: {
    title: string;
    lede: string;
  };
  form: {
    placeholderName: string;
    placeholderEmail: string;
    placeholderPhone: string;
    subjectLabel: string;
    subjects: string[];
    placeholderMessage: string;
    submit: string;
    errorName: string;
    errorEmailRequired: string;
    errorEmailInvalid: string;
    errorSubject: string;
    errorMessage: string;
    /** Panneau de confirmation — factuel : la maquette n'envoie rien, on le dit
     *  et on donne l'adresse e-mail comme solution immédiate. */
    successTitle: string;
    successText: string;
  };
  map: {
    title: string;
    caption: string;
  };
}

/** L'URL de la carte n'est pas de la copie : une seule valeur pour les trois
 *  langues, et centrée sur Lisbonne — pas sur New York comme dans le template. */
export const CONTACT_MAP_SRC = "https://www.google.com/maps?q=Lisboa,+Portugal&output=embed";

const COPY: Record<string, ContactCopy> = {
  pt: CONTACT_COPY_PT,
  fr: CONTACT_COPY_FR,
  en: CONTACT_COPY_EN,
};

/** Textes de la page pour la locale, avec repli sur `defaultLocale` (pt). */
export function getContactCopy(locale: string): ContactCopy {
  return COPY[locale] ?? COPY[defaultLocale];
}
