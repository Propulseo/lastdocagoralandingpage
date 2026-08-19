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
      "No phone call, no waiting for someone to call back. Search and booking are free for patients, and the interface exists in Portuguese, French and English.",
    ],
    badgeValue: 3,
    badgeSuffix: "",
    badgeLabel: "Languages available",
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
      image: "/medically/images/work/1.jpg",
      title: "Search",
      text: "By specialty, by city or by spoken language. Results show who practises near you.",
    },
    {
      number: "02",
      image: "/medically/images/work/2.jpg",
      title: "Compare",
      text: "Every practitioner is reviewed and approved before going live. You know who you are dealing with.",
    },
    {
      number: "03",
      image: "/medically/images/work/3.jpg",
      title: "Book",
      text: "You pick a slot that is genuinely free and confirm online, at any hour.",
    },
    {
      number: "04",
      image: "/medically/images/work/4.jpg",
      title: "Come to your appointment",
      text: "An automatic reminder is sent before the time. You have nothing to remember.",
    },
  ],

  facts: [
    { icon: "flaticon-doctor", count: 100, suffix: " %", label: "Verified practitioners" },
    { icon: "flaticon-businesswoman", count: 3, label: "Languages: PT, FR, EN" },
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
      image: "/medically/images/team/1.png",
      title: "You live in Portugal",
      subtitle: "Residents",
    },
    {
      id: "expatries",
      image: "/medically/images/team/2.png",
      title: "You have just moved here",
      subtitle: "Expats",
    },
    {
      id: "voyageurs",
      image: "/medically/images/team/3.png",
      title: "You are just passing through",
      subtitle: "Travellers",
    },
  ],
};
