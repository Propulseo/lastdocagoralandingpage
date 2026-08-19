import type { ContactCopy } from "./contactCopy";

/** /contact — anglais. Registre britannique, cohérent avec un site édité depuis
 *  le Portugal et lu surtout par des Européens. */
export const CONTACT_COPY_EN: ContactCopy = {
  pageTitle: {
    title: "Contact",
    crumb: "Contact",
  },

  hero: {
    eyebrow: "Contact",
    titleLead: "We reply,",
    titleEmphasis: "in PT · FR · EN.",
    lead: "A question about the platform, a listing to correct, a partnership? Write to us. To book an appointment with a practitioner, search is still the fastest route.",
    email: "hello@docagora.com",
    formCta: "Write a message",
    mailPrefix: "or directly:",
  },

  info: [
    {
      icon: "fi flaticon-location-1",
      title: "Where we are",
      lines: ["Lisbon, Portugal"],
    },
    {
      icon: "fi flaticon-email",
      title: "Write to us",
      lines: ["hello@docagora.com"],
    },
    {
      icon: "fi flaticon-24-7",
      title: "Everything happens online",
      lines: ["Search and booking open", "24 hours a day, with no phone call"],
    },
  ],

  intro: {
    title: "A question?",
    lede: "Write to us. We reply in Portuguese, French or English. To book an appointment with a practitioner, use the search instead: it is immediate.",
  },

  form: {
    placeholderName: "Your name",
    placeholderEmail: "Your email",
    placeholderPhone: "Your phone (optional)",
    subjectLabel: "Subject",
    subjects: [
      "A question about the platform",
      "A problem with a booking",
      "I am a healthcare professional",
      "Report an error on a listing",
      "Press and partnerships",
      "Other",
    ],
    placeholderMessage: "Your message",
    submit: "Send",
    errorName: "Name is required",
    errorEmailRequired: "Email is required",
    errorEmailInvalid: "This email address is not valid",
    errorSubject: "Choose a subject",
    errorMessage: "Message is required",
    successTitle: "Thank you, your message is complete.",
    successText: "Prototype: sending is not wired up yet. In the meantime, write to us at",
  },

  map: {
    title: "Map of Lisbon, Portugal",
    caption: "DocAgora — Lisbon, Portugal",
  },
};
