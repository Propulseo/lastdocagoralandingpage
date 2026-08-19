import { defaultLocale } from "@/i18n/config";
import type { Lang } from "@/components/home/VerifiedRecordCard";
import { MEDICALLY_COPY_PT } from "./medicallyCopy.pt";
import { MEDICALLY_COPY_FR } from "./medicallyCopy.fr";
import { MEDICALLY_COPY_EN } from "./medicallyCopy.en";

/* ============================================================
   Textes DocAgora des sections /about (template Medically).
   Trois langues, une par fichier (medicallyCopy.<lg>) ; ce
   module ne porte que la forme et le sélecteur. PT-PT est la
   locale par défaut.

   Règle appliquée partout : aucune affirmation qui ne soit déjà
   revendiquée par le site (praticiens vérifiés, recherche par
   spécialité/ville/langue, disponibilités en temps réel,
   réservation en ligne, rappels automatiques, PT/FR/EN, gratuit
   pour les patients).

   Ce qui a été écarté du template, faute d'être vrai :
    - « 25+ Years Of Experience », « 250 Qualified Doctors »,
      « 3020 Satisfied Clients », « 25 Award Winning » : chiffres
      inventés.
    - « 95+ Available Doctors » : DocAgora est un annuaire, il ne
      salarie pas de médecins.
    - La signature manuscrite d'un PDG fictif.
    - Le numéro de téléphone (208) 555-0112 : DocAgora n'a pas de
      standard, et l'argument du produit est justement de ne plus
      avoir à appeler.
    - La section « Our Team » : aucune équipe de praticiens à
      montrer. Le bloc est réemployé pour les trois profils de
      patients, ce qui rend les portraits pertinents.

   ATTENTION — les chemins d'images (avatars, étapes, profils)
   sont répétés dans les trois fichiers de langue, comme le veut
   le pattern des pages pro : changer une photo, c'est la changer
   TROIS fois. Ne pas en sortir une seule, sous peine de voir /fr
   garder l'ancienne.
   ============================================================ */

export interface MedStep {
  number: string;
  image: string;
  title: string;
  text: string;
}

export interface MedFact {
  icon: string;
  /** Valeur animée au défilement. Absente si le fait n'est pas un nombre. */
  count?: number;
  /** Texte fixe, pour les faits qui ne sont pas un nombre (ex. « 24/7 »). */
  text?: string;
  suffix?: string;
  label: string;
}

export interface MedAudienceCard {
  id: string;
  image: string;
  title: string;
  subtitle: string;
}

export interface MedicallyCopy {
  pageTitle: {
    title: string;
    crumbHome: string;
    crumbCurrent: string;
  };
  /** Hero éditorial (registre « mission », distinct du titre opérationnel de
   *  `about` juste en dessous). */
  hero: {
    eyebrow: string;
    titleLead: string;
    titleEmphasis: string;
    lead: string;
    ctaPrimary: string;
    ctaGhost: string;
    badgeTitle: string;
    badgeSub: string;
    /**
     * Fiche d'exemple du hero : la VerifiedRecordCard de la home, re-skinnée en
     * clair. Elle porte déjà son propre badge « illustratif », donc aucune
     * promesse n'est faite. L'icône vient de la source unique lib/specialties
     * (jamais redéclarer la liste) ; seul le libellé reste dans cette copie.
     */
    card: {
      specialtyKey: string;
      specialty: string;
      city: string;
      languages: Lang[];
    };
  };
  /** Clôture conversion — la page finissait sans appel à l'action (retour
   *  d'audit A6/T4). Même langage que la bande finale de la home. */
  closing: {
    eyebrow: string;
    title: string;
    sub: string;
    cta: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    badgeValue: number;
    badgeSuffix: string;
    badgeLabel: string;
    /**
     * Vignettes de la pile d'avatars. Le paquet du template ne livrait que des
     * placeholders gris ; ces quatre fichiers sont les seules photos réellement
     * récupérées pour ce bloc, d'où le mélange doctors/ et team/.
     */
    avatars: string[];
    verifiedMark: string;
    verifiedLabel: string;
    signerName: string;
    signerRole: string;
  };
  processTitle: {
    title: string;
    subtitle: string;
  };
  process: MedStep[];
  facts: MedFact[];
  audienceTitle: {
    title: string;
    subtitle: string;
  };
  audience: MedAudienceCard[];
}

const COPY: Record<string, MedicallyCopy> = {
  pt: MEDICALLY_COPY_PT,
  fr: MEDICALLY_COPY_FR,
  en: MEDICALLY_COPY_EN,
};

/** Textes de la page pour la locale, avec repli sur `defaultLocale` (pt). */
export function getMedicallyCopy(locale: string): MedicallyCopy {
  return COPY[locale] ?? COPY[defaultLocale];
}
