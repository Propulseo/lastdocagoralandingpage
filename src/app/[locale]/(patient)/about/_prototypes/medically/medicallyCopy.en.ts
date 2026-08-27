import type { MedicallyCopy } from "./medicallyCopy";

/** /about — anglais. Registre britannique (« travellers », « practises »),
 *  cohérent avec un site édité depuis le Portugal et lu surtout par des
 *  Européens. */
export const MEDICALLY_COPY_EN: MedicallyCopy = {
  pageTitle: {
    title: "About",
    crumbHome: "Home",
    crumbCurrent: "About",
  },

  hero: {
    eyebrow: "About DocAgora",
    titleLead: "Improving access to healthcare in Portugal,",
    titleEmphasis: "for everyone.",
    lead: "Residents, expats or travellers: everyone deserves to find a verified practitioner who speaks their language and has real availability.",
    ctaPrimary: "Find a practitioner",
    ctaGhost: "Our specialties",
    badgeTitle: "Verified practitioners",
    badgeSub: "reviewed before going live",
    card: {
      specialtyKey: "generalPractice",
      specialty: "General practice",
      city: "Lisboa",
      languages: ["PT", "FR", "EN"],
    },
  },

  closing: {
    eyebrow: "Book an appointment",
    title: "Find a practitioner who speaks your language",
    sub: "Search by specialty, city and language. Real availability, online booking, free for patients.",
    cta: "Start a search",
  },

  about: {
    eyebrow: "About DocAgora",
    title: "Finding the right practitioner without losing a day to it",
    paragraphs: [
      "DocAgora connects patients — residents, expats and travellers — with verified healthcare professionals across Portugal. Search by specialty, by city or by spoken language, see real availability, and book online.",
      "No phone call, no waiting for someone to call back. Search and booking are free for patients. And you filter practitioners by the language they speak in consultation: Portuguese, French, English or Spanish.",
    ],
    badgeValue: 16,
    badgeSuffix: "",
    badgeLabel: "Specialties covered",
    avatars: [
      "/medically/images/doctors/1.jpg",
      "/medically/images/doctors/4.jpg",
      "/medically/images/team/1.png",
      "/medically/images/team/2.png",
    ],
    verifiedMark: "✓",
    verifiedLabel: "Verified practitioners",
    signerName: "The DocAgora team",
    signerRole: "Lisbon, Portugal",
  },

  processTitle: {
    title: "How it works",
    subtitle: "Four steps, no phone call",
  },

  process: [
    {
      number: "01",
      image: "/assets/images/client-photos/letzai-b0d6cab1-c167-4986-ae8e-b17ad1da0795.png",
      title: "Search",
      text: "By specialty, by city or by spoken language. Results show who practises near you.",
    },
    {
      number: "02",
      image: "/assets/images/client-photos/letzai-d3733e8a-fe69-4925-8065-75355ad747c2.png",
      title: "Compare",
      text: "Every practitioner is reviewed and approved before going live. You know who you are dealing with.",
    },
    {
      number: "03",
      image: "/assets/images/client-photos/letzai-bb4ae54c-83a1-4f18-be69-787025d6dfbf.png",
      title: "Book",
      text: "You pick a slot that is genuinely free and confirm online, at any hour.",
    },
    {
      number: "04",
      image: "/assets/images/client-photos/letzai-dd3badce-0587-421b-9402-85ab2f9ee8bb.png",
      title: "Come to your appointment",
      text: "An automatic reminder is sent before the time. You have nothing to remember.",
    },
  ],

  facts: [
    { icon: "flaticon-doctor", count: 100, suffix: " %", label: "Verified practitioners" },
    { icon: "flaticon-deadline", count: 4, label: "Steps to your appointment" },
    { icon: "flaticon-award", count: 0, suffix: " €", label: "For patients" },
    { icon: "flaticon-customer-care", text: "24/7", label: "Online booking" },
  ],

  audienceTitle: {
    title: "Who it is for",
    subtitle: "Three ways to use DocAgora",
  },

  audience: [
    {
      id: "residents",
      image: "/assets/images/client-photos/letzai-124ecce0-307e-4bd4-bf4b-8a24ade74635.png",
      title: "You live in Portugal",
      subtitle: "Residents",
    },
    {
      id: "expatries",
      image: "/assets/images/client-photos/letzai-f53a8f6e-e6e6-419c-82b1-f541306c5a26.png",
      title: "You have just moved here",
      subtitle: "Expats",
    },
    {
      id: "voyageurs",
      image: "/assets/images/client-photos/letzai-edfaa96a-4276-488a-b6bc-183e0cf168ff.png",
      title: "You are just passing through",
      subtitle: "Travellers",
    },
  ],
};
