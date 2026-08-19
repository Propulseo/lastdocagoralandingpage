import type { ResourcesCopy } from "./resourcesCopy";

/* Français — texte d'origine de la page, conservé tel quel. */

export const RESOURCES_COPY_FR: ResourcesCopy = {
  hero: {
    eyebrow: "Centre d'aide · Espace pro",
    titleLine1: "Une question ?",
    titleLine2Lead: "La réponse est ",
    titleLine2Accent: "déjà là",
    lead: "Guides, FAQ et conseils pratiques pour tirer le meilleur de DocAgora — de la première connexion aux réglages fins.",
    searchLabel: "Filtrer les réponses rapides",
    searchPlaceholder: "Filtrer les réponses (ex. : rappels, congés…)",
    clearLabel: "Effacer la recherche",
    popularLabel: "Recherches fréquentes :",
    popular: ["rappels", "congés", "profil", "données", "langues"],
  },
  quick: {
    heading: "Réponses rapides",
    emptyLead: "Aucune réponse ne correspond à",
    emptyHint:
      "Essayez un autre mot — ou écrivez-nous, une vraie personne vous répond.",
    items: [
      {
        id: "verification",
        q: "Comment mon profil professionnel est-il vérifié ?",
        a: "Chaque professionnel est contrôlé avant la publication de son profil. Le badge « Vérifié » n'apparaît qu'une fois la vérification terminée — c'est ce que les patients voient en premier.",
      },
      {
        id: "conges",
        q: "Puis-je bloquer des créneaux pour mes congés ?",
        a: "Oui. Bloquez une plage ou une période entière depuis l'agenda : les créneaux disparaissent aussitôt de la réservation en ligne.",
      },
      {
        id: "rappels",
        q: "Les rappels sont-ils envoyés automatiquement ?",
        a: "Oui. Une fois activés, ils partent avant chaque rendez-vous, sans aucune action de votre part.",
      },
      {
        id: "donnees",
        q: "Les données de mes patients sont-elles protégées ?",
        a: "Le traitement des données respecte le RGPD. Vous gardez la maîtrise des informations de vos patients, à tout moment.",
      },
      {
        id: "langues",
        q: "Dans quelles langues mes patients peuvent-ils réserver ?",
        a: "En portugais, en français et en anglais — l'interface s'adapte à la langue de chaque patient.",
      },
    ],
  },
  featured: {
    badge: "Guide vedette",
    title: "Réduire les no-shows avec les rappels automatiques",
    lead: "Le réflexe des cabinets bien remplis : des rappels réglés au bon moment, envoyés sans aucune action de votre part.",
    points: [
      "Choisir le délai d'envoi adapté à votre patientèle",
      "Rédiger un message clair, en PT, FR ou EN",
      "Suivre l'effet sur vos créneaux honorés",
    ],
    meta: ["10 min de lecture", "Guide pratique", "PT · FR · EN"],
  },
  themes: {
    heading: "Explorer par thème",
    lead: "Guides pratiques, réponses de la FAQ et articles conseils, classés par sujet.",
    items: [
      {
        id: "demarrer",
        icon: "compass",
        title: "Démarrer",
        desc: "Créer son profil vérifié, configurer son agenda, recevoir son premier rendez-vous.",
      },
      {
        id: "agenda",
        icon: "calendar",
        title: "Agenda & réservation",
        desc: "Disponibilités, réservation en ligne 24/7, absences et congés.",
      },
      {
        id: "rappels",
        icon: "bell",
        title: "Rappels & no-shows",
        desc: "Réglages des rappels automatiques et bonnes pratiques de suivi.",
      },
      {
        id: "profil",
        icon: "shield",
        title: "Profil & RGPD",
        desc: "Visibilité, langues parlées, protection des données patients.",
      },
    ],
  },
};
