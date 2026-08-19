import type { AboutCopy } from "./aboutCopy";

/* Français — texte d'origine de la page, conservé tel quel. */

export const ABOUT_COPY_FR: AboutCopy = {
  hero: {
    eyebrow: "À propos · DocAgora Pro",
    titleLead: "Qui nous sommes se voit dans",
    titleAccent: "ce que nous construisons.",
    lead: "Plutôt qu'un long discours : DocAgora est une plateforme portugaise, en ligne aujourd'hui, qui relie les patients aux professionnels de santé vérifiés. Voici l'outil, tel qu'il travaille pour un cabinet.",
    ctaPrimary: "Ouvrir mon agenda",
    ctaGhost: "Voir la plateforme",
    badges: ["Réservation 24/7", "Rappels automatiques", "PT · FR · EN"],
  },
  mock: {
    title: "Agenda — semaine en cours",
    live: "En ligne",
    floatVerified: "Profil vérifié",
    floatReminder: "Rappel envoyé · SMS",
    days: [
      {
        name: "Lun",
        slots: [
          { time: "09:00", label: "Consultation", kind: "base" },
          { time: "10:30", label: "Réservé en ligne", kind: "online" },
          { time: "14:00", label: "Suivi", kind: "base" },
        ],
      },
      {
        name: "Mar",
        slots: [
          { time: "09:30", label: "Consultation", kind: "base" },
          { label: "Libre", kind: "free" },
          { time: "15:00", label: "Réservé · 23:12", kind: "online" },
        ],
      },
      {
        name: "Mer",
        slots: [
          { time: "08:30", label: "Réservé en ligne", kind: "online" },
          { time: "11:00", label: "Consultation", kind: "base" },
          { time: "16:30", label: "Bilan", kind: "base" },
        ],
      },
      {
        name: "Jeu",
        slots: [
          { label: "Libre", kind: "free" },
          { time: "10:00", label: "Réservé en ligne", kind: "online" },
          { time: "14:30", label: "Consultation", kind: "base" },
        ],
      },
      {
        name: "Ven",
        slots: [
          { time: "09:00", label: "Consultation", kind: "base" },
          { time: "11:30", label: "Réservé en ligne", kind: "online" },
          { label: "Libre", kind: "free" },
        ],
      },
    ],
  },
  steps: {
    title: "De l'inscription aux premières réservations",
    sub: "Notre histoire avec chaque cabinet commence de la même façon : un parcours court, contrôlé, sans surprise.",
    items: [
      {
        num: "1",
        title: "Création du compte",
        text: "Vous renseignez votre activité et vos spécialités, en quelques minutes.",
      },
      {
        num: "2",
        title: "Vérification",
        text: "Diplômes et inscription professionnelle contrôlés avant toute publication.",
        chip: "Badge « Vérifié »",
      },
      {
        num: "3",
        title: "Agenda en ligne",
        text: "Vos disponibilités, vos règles : vous gardez la main sur chaque créneau.",
      },
      {
        num: "4",
        title: "Réservations 24/7",
        text: "Les patients réservent seuls, les rappels partent automatiquement.",
      },
    ],
  },
  bento: {
    title: "Ce que la plateforme fait, concrètement",
    reminders: {
      title: "Rappels automatiques",
      text: "Chaque rendez-vous déclenche un rappel avant la consultation. Moins d'oublis, moins de créneaux perdus — sans que votre secrétariat ne décroche le téléphone.",
      smsIn: "Rappel — votre rendez-vous a lieu demain à 14:30. Répondez OUI pour confirmer.",
      smsOut: "OUI",
    },
    verified: {
      title: "Profil vérifié",
      text: "Le badge que voient les patients repose sur un contrôle réel, effectué avant la mise en ligne.",
      checks: ["Diplômes contrôlés", "Inscription à l'ordre professionnel", "Identité confirmée"],
    },
    languages: {
      title: "Trois langues",
      text: "Vos patients réservent dans leur langue ; votre profil existe dans les trois.",
      rows: [
        { code: "PT", label: "Marcar consulta" },
        { code: "FR", label: "Prendre rendez-vous" },
        { code: "EN", label: "Book an appointment" },
      ],
    },
    gdpr: {
      title: "RGPD, par conception",
      text: "Les données de votre cabinet et de vos patients sont traitées dans le cadre du RGPD. Les droits sont respectés, pas contournés.",
      checks: ["Consentement explicite", "Droit d'accès et de suppression", "Aucune revente de données"],
    },
  },
  metrics: {
    title: "Ce que cela change pour un cabinet",
    footnote:
      "* Chiffre illustratif : l'effet des rappels dépend de votre activité et de votre patientèle.",
    figures: [
      {
        prefix: "−",
        to: 40,
        decimals: 0,
        suffix: " %",
        sup: "*",
        label: "de rendez-vous non honorés grâce aux rappels",
      },
      { text: "24/7", label: "réservation en ligne, même cabinet fermé" },
      { to: 3, decimals: 0, label: "langues — PT · FR · EN — pour vos patients" },
    ],
  },
};
