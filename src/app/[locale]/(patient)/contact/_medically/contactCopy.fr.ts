import type { ContactCopy } from "./contactCopy";

/** /contact — français. Textes d'origine de la page, inchangés. */
export const CONTACT_COPY_FR: ContactCopy = {
  pageTitle: {
    title: "Contact",
    crumb: "Contact",
  },

  hero: {
    eyebrow: "Contact",
    titleLead: "On vous répond,",
    titleEmphasis: "en PT · FR · EN.",
    lead: "Une question sur la plateforme, une fiche à corriger, un partenariat ? Écrivez-nous. Pour prendre rendez-vous avec un praticien, la recherche reste le plus rapide.",
    email: "hello@docagora.com",
    formCta: "Écrire un message",
    mailPrefix: "ou directement :",
  },

  info: [
    {
      icon: "fi flaticon-location-1",
      title: "Où nous sommes",
      lines: ["Lisbonne, Portugal"],
    },
    {
      icon: "fi flaticon-email",
      title: "Nous écrire",
      lines: ["hello@docagora.com"],
    },
    {
      icon: "fi flaticon-24-7",
      title: "Tout se fait en ligne",
      lines: ["Recherche et réservation ouvertes", "24 h/24, sans appel téléphonique"],
    },
  ],

  intro: {
    title: "Une question ?",
    lede: "Écrivez-nous. Nous répondons en portugais, en français ou en anglais. Pour prendre rendez-vous avec un praticien, passez plutôt par la recherche : c'est immédiat.",
  },

  form: {
    placeholderName: "Votre nom",
    placeholderEmail: "Votre e-mail",
    placeholderPhone: "Votre téléphone (facultatif)",
    subjectLabel: "Sujet",
    subjects: [
      "Une question sur la plateforme",
      "Un problème avec une réservation",
      "Je suis professionnel de santé",
      "Signaler une erreur sur une fiche",
      "Presse et partenariats",
      "Autre",
    ],
    placeholderMessage: "Votre message",
    submit: "Envoyer",
    errorName: "Le nom est obligatoire",
    errorEmailRequired: "L'e-mail est obligatoire",
    errorEmailInvalid: "Cette adresse e-mail n'est pas valide",
    errorSubject: "Choisissez un sujet",
    errorMessage: "Le message est obligatoire",
    labelName: "Votre nom",
    labelEmail: "Votre e-mail",
    labelPhone: "Votre téléphone (facultatif)",
    labelSubject: "Sujet de votre message",
    labelMessage: "Votre message",
    requiredNote: "Les champs marqués d'un astérisque (*) sont obligatoires.",
    successTitle: "Message envoyé, merci.",
    successText: "Nous vous répondons sous deux jours ouvrés. Une urgence ? Écrivez directement à",
    sending: "Envoi en cours…",
    errorSendTitle: "Le message n'a pas pu être envoyé.",
    errorSendText: "Réessayez dans un instant, ou écrivez-nous directement à",
    privacyNotice: "En envoyant ce formulaire, vos données sont utilisées uniquement pour répondre à votre demande.",
    privacyLinkLabel: "Voir notre politique de confidentialité",
  },

  map: {
    title: "Carte de Lisbonne, Portugal",
    caption: "DocAgora — Lisbonne, Portugal",
  },
};
