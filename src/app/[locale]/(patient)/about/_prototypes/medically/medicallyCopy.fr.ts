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
      "Pas d'appel, pas d'attente d'un rappel. La recherche et la réservation sont gratuites pour les patients, et l'interface existe en portugais, en français et en anglais.",
    ],
    badgeValue: 3,
    badgeSuffix: "",
    badgeLabel: "Langues disponibles",
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
      image: "/medically/images/work/1.jpg",
      title: "Cherchez",
      text: "Par spécialité, par ville ou par langue parlée. Les résultats montrent qui exerce près de chez vous.",
    },
    {
      number: "02",
      image: "/medically/images/work/2.jpg",
      title: "Comparez",
      text: "Chaque praticien est examiné et approuvé avant sa mise en ligne. Vous savez à qui vous vous adressez.",
    },
    {
      number: "03",
      image: "/medically/images/work/3.jpg",
      title: "Réservez",
      text: "Vous choisissez un créneau réellement libre et vous confirmez en ligne, à toute heure.",
    },
    {
      number: "04",
      image: "/medically/images/work/4.jpg",
      title: "Venez au rendez-vous",
      text: "Un rappel automatique vous est envoyé avant l'heure. Vous n'avez rien à retenir.",
    },
  ],

  facts: [
    { icon: "flaticon-doctor", count: 100, suffix: " %", label: "Praticiens vérifiés" },
    { icon: "flaticon-businesswoman", count: 3, label: "Langues : PT, FR, EN" },
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
      image: "/medically/images/team/1.png",
      title: "Vous vivez au Portugal",
      subtitle: "Résidents",
    },
    {
      id: "expatries",
      image: "/medically/images/team/2.png",
      title: "Vous venez de vous installer",
      subtitle: "Expatriés",
    },
    {
      id: "voyageurs",
      image: "/medically/images/team/3.png",
      title: "Vous êtes de passage",
      subtitle: "Voyageurs",
    },
  ],
};
