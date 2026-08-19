import type { ResourcesCopy } from "./resourcesCopy";

/* English. */

export const RESOURCES_COPY_EN: ResourcesCopy = {
  hero: {
    eyebrow: "Help centre · Professional area",
    titleLine1: "Got a question?",
    titleLine2Lead: "The answer is ",
    titleLine2Accent: "already here",
    lead: "Guides, FAQs and practical advice to get the most out of DocAgora — from your first login to the finer settings.",
    searchLabel: "Filter the quick answers",
    searchPlaceholder: "Filter the answers (e.g. reminders, time off…)",
    clearLabel: "Clear the search",
    popularLabel: "Common searches:",
    popular: ["reminders", "time off", "profile", "data", "languages"],
  },
  quick: {
    heading: "Quick answers",
    emptyLead: "No answer matches",
    emptyHint: "Try another word — or write to us, a real person will reply.",
    items: [
      {
        id: "verification",
        q: "How is my professional profile verified?",
        a: "Every professional is checked before their profile goes live. The “Verified” badge only appears once that check is complete — it is the first thing patients see.",
      },
      {
        id: "conges",
        q: "Can I block time slots for my holidays?",
        a: "Yes. Block a range or a whole period from the calendar: those slots immediately disappear from online booking.",
      },
      {
        id: "rappels",
        q: "Are reminders sent automatically?",
        a: "Yes. Once switched on, they go out before every appointment, with nothing to do on your side.",
      },
      {
        id: "donnees",
        q: "Is my patients' data protected?",
        a: "Data is processed in line with the GDPR. You stay in control of your patients' information at all times.",
      },
      {
        id: "langues",
        q: "Which languages can my patients book in?",
        a: "Portuguese, French and English — the interface follows each patient's language.",
      },
    ],
  },
  featured: {
    badge: "Featured guide",
    title: "Cutting no-shows with automatic reminders",
    lead: "The habit of well-booked practices: reminders set at the right moment, sent without any action on your part.",
    points: [
      "Choose the lead time that suits your patients",
      "Write a clear message, in PT, FR or EN",
      "Track the effect on appointments actually kept",
    ],
    meta: ["10 min read", "Practical guide", "PT · FR · EN"],
  },
  themes: {
    heading: "Browse by topic",
    lead: "Practical guides, FAQ answers and advice articles, sorted by subject.",
    items: [
      {
        id: "demarrer",
        icon: "compass",
        title: "Getting started",
        desc: "Create your verified profile, set up your calendar, take your first booking.",
      },
      {
        id: "agenda",
        icon: "calendar",
        title: "Calendar & booking",
        desc: "Availability, 24/7 online booking, absences and holidays.",
      },
      {
        id: "rappels",
        icon: "bell",
        title: "Reminders & no-shows",
        desc: "Automatic reminder settings and good follow-up practice.",
      },
      {
        id: "profil",
        icon: "shield",
        title: "Profile & GDPR",
        desc: "Visibility, languages spoken, patient data protection.",
      },
    ],
  },
};
