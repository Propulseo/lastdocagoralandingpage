import type { MedicallyCopy } from "./medicallyCopy";

/** /about — français. Textes d'origine de la page, inchangés. */
export const MEDICALLY_COPY_FR: MedicallyCopy = {
  pageTitle: {
    title: "À propos",
    crumbHome: "Accueil",
    crumbCurrent: "À propos",
  },

  hero: {
    eyebrow: "À propos de DocAgora",
    titleLead: "Améliorer l'accès aux soins au Portugal,",
    titleEmphasis: "pour tous.",
    lead: "Résidents, expatriés ou voyageurs : chacun mérite de trouver un praticien vérifié, qui parle sa langue et a des disponibilités réelles.",
    ctaPrimary: "Trouver un praticien",
    ctaGhost: "Nos spécialités",
    badgeTitle: "Praticiens vérifiés",
    badgeSub: "examinés avant mise en ligne",
    card: {
      specialtyKey: "generalPractice",
      specialty: "Médecine générale",
      city: "Lisboa",
      languages: ["PT", "FR", "EN"],
    },
  },

  closing: {
    eyebrow: "Prendre rendez-vous",
    title: "Trouvez un praticien qui parle votre langue",
    sub: "Recherche par spécialité, ville et langue. Disponibilités réelles, réservation en ligne, gratuit pour les patients.",
    cta: "Lancer une recherche",
  },

  about: {
    eyebrow: "À propos de DocAgora",
    title: "Trouver le bon praticien sans y passer la journée",
    paragraphs: [
      "DocAgora met en relation les patients — résidents, expatriés et voyageurs — avec des professionnels de santé vérifiés partout au Portugal. Vous cherchez par spécialité, par ville ou par langue parlée, vous voyez les disponibilités réelles, et vous réservez en ligne.",
      "Pas d'appel, pas d'attente d'un rappel. La recherche et la réservation sont gratuites pour les patients. Et vous filtrez les praticiens sur la langue qu'ils parlent en consultation : portugais, français, anglais ou espagnol.",
    ],
    badgeValue: 16,
    badgeSuffix: "",
    badgeLabel: "Spécialités couvertes",
    avatars: [
      "/medically/images/doctors/1.jpg",
      "/medically/images/doctors/4.jpg",
      "/medically/images/team/1.png",
      "/medically/images/team/2.png",
    ],
    verifiedMark: "✓",
    verifiedLabel: "Praticiens vérifiés",
    signerName: "L'équipe DocAgora",
    signerRole: "Lisbonne, Portugal",
  },

  processTitle: {
    title: "Comment ça marche",
    subtitle: "Quatre étapes, aucun appel",
  },

  process: [
    {
      number: "01",
      image: "/assets/images/client-photos/letzai-b0d6cab1-c167-4986-ae8e-b17ad1da0795.png",
      title: "Cherchez",
      text: "Par spécialité, par ville ou par langue parlée. Les résultats montrent qui exerce près de chez vous.",
    },
    {
      number: "02",
      image: "/assets/images/client-photos/letzai-d3733e8a-fe69-4925-8065-75355ad747c2.png",
      title: "Comparez",
      text: "Chaque praticien est examiné et approuvé avant sa mise en ligne. Vous savez à qui vous vous adressez.",
    },
    {
      number: "03",
      image: "/assets/images/client-photos/letzai-bb4ae54c-83a1-4f18-be69-787025d6dfbf.png",
      title: "Réservez",
      text: "Vous choisissez un créneau réellement libre et vous confirmez en ligne, à toute heure.",
    },
    {
      number: "04",
      image: "/assets/images/client-photos/letzai-dd3badce-0587-421b-9402-85ab2f9ee8bb.png",
      title: "Venez au rendez-vous",
      text: "Un rappel automatique vous est envoyé avant l'heure. Vous n'avez rien à retenir.",
    },
  ],

  facts: [
    { icon: "flaticon-doctor", count: 100, suffix: " %", label: "Praticiens vérifiés" },
    { icon: "flaticon-deadline", count: 4, label: "Étapes jusqu'à votre rendez-vous" },
    { icon: "flaticon-award", count: 0, suffix: " €", label: "Pour les patients" },
    { icon: "flaticon-customer-care", text: "24/7", label: "Réservation en ligne" },
  ],

  audienceTitle: {
    title: "Pour qui",
    subtitle: "Trois façons d'utiliser DocAgora",
  },

  audience: [
    {
      id: "residents",
      image: "/assets/images/client-photos/letzai-124ecce0-307e-4bd4-bf4b-8a24ade74635.png",
      title: "Vous vivez au Portugal",
      subtitle: "Résidents",
    },
    {
      id: "expatries",
      image: "/assets/images/client-photos/letzai-f53a8f6e-e6e6-419c-82b1-f541306c5a26.png",
      title: "Vous venez de vous installer",
      subtitle: "Expatriés",
    },
    {
      id: "voyageurs",
      image: "/assets/images/client-photos/letzai-edfaa96a-4276-488a-b6bc-183e0cf168ff.png",
      title: "Vous êtes de passage",
      subtitle: "Voyageurs",
    },
  ],
};
