import type { PricingCopy } from "./pricingCopy";

/* English. Amounts stay as “— €” placeholders: no invented figure, in any
   language. */

export const PRICING_COPY_EN: PricingCopy = {
  hero: {
    eyebrow: "Pricing · Healthcare professionals",
    titleLead: "A clear plan, sized to ",
    titleAccent: "your practice",
    titleEnd: ".",
    lead: "Online calendar, 24/7 booking, automatic reminders: pick the setup that matches your practice. Final amounts are confirmed during the demo.",
    toggleAria: "Billing period",
    toggleMonthly: "Monthly",
    toggleYearly: "Yearly",
    toggleSave: "− — %",
    noteStrong: "Amounts to be confirmed",
    noteRest: " — pricing structure shown ahead of the figures being published.",
  },
  plans: [
    {
      id: "essentiel",
      name: "Essential",
      tagline: "Open up online booking, simply.",
      priceLabel: "— €",
      priceUnit: "/ month",
      priceSub: "per practitioner",
      priceSubByBilling: {
        monthly: "per practitioner · billed monthly",
        yearly: "per practitioner · billed yearly",
      },
      priceTbc: "Amount to be confirmed",
      features: [
        "Verified professional profile",
        "24/7 online booking",
        "Online practice calendar",
        "Presence in Portuguese, French and English",
        "GDPR compliance",
      ],
      ctaLabel: "Ask for the price",
      ctaKind: "ghost",
    },
    {
      id: "cabinet",
      name: "Practice",
      tagline: "Day-to-day practice life, without missed appointments.",
      priceLabel: "— €",
      priceUnit: "/ month",
      priceSub: "per practitioner",
      priceSubByBilling: {
        monthly: "per practitioner · billed monthly",
        yearly: "per practitioner · billed yearly",
      },
      priceTbc: "Amount to be confirmed",
      featured: true,
      flag: "Recommended",
      leadFeature: "Everything in Essential, plus:",
      features: [
        "Automatic reminders before every appointment",
        "Fewer no-shows week after week",
        "Guided onboarding",
        "Priority support",
      ],
      ctaLabel: "Request a demo",
      ctaKind: "primary",
    },
    {
      id: "equipe",
      name: "Team",
      tagline: "For practices bringing several practitioners together.",
      priceLabel: "Tailored",
      priceSub: "terms matched to the number of practitioners",
      priceTbc: "Quote after a conversation",
      customPrice: true,
      leadFeature: "Everything in Practice, plus:",
      features: [
        "One verified profile and one calendar per practitioner",
        "A dedicated contact",
        "Coordinated onboarding for the whole team",
      ],
      ctaLabel: "Talk to the team",
      ctaKind: "ghost",
    },
  ],
  plansFootnote:
    "Exact amounts and tiers are being finalised and are shared during the demo.",
  compare: {
    title: "Compare the plans at a glance",
    subtitle: "The core of each plan's scope, side by side.",
    headers: ["Scope", "Essential", "Practice", "Team"],
    rows: [
      {
        label: "Verified professional profile",
        cells: [{ type: "check" }, { type: "check" }, { type: "check" }],
      },
      {
        label: "24/7 online booking",
        cells: [{ type: "check" }, { type: "check" }, { type: "check" }],
      },
      {
        label: "Automatic reminders",
        cells: [{ type: "dash" }, { type: "check" }, { type: "check" }],
      },
      {
        label: "PT · FR · EN presence",
        cells: [{ type: "check" }, { type: "check" }, { type: "check" }],
      },
      {
        label: "Practitioners included",
        cells: [
          { type: "text", value: "1" },
          { type: "text", value: "1" },
          { type: "text", value: "Several" },
        ],
      },
      {
        label: "Support",
        cells: [
          { type: "text", value: "Email" },
          { type: "text", value: "Priority" },
          { type: "text", value: "Dedicated contact" },
        ],
      },
    ],
  },
  assure: [
    {
      id: "rgpd",
      title: "GDPR compliance",
      desc: "Your patients' data is processed in line with the European regulation.",
    },
    {
      id: "verified",
      title: "Verified professionals",
      desc: "Every profile published on DocAgora belongs to a practitioner who has been checked.",
    },
    {
      id: "langs",
      title: "PT · FR · EN",
      desc: "Your practice visible in the three languages your patients use in Portugal.",
    },
  ],
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        q: "When will the amounts be shown?",
        a: "The commercial offer is being finalised with our first partner practices. Final amounts are shared during the demo, before being published on this page.",
      },
      {
        q: "Does the price depend on the number of practitioners?",
        a: "The structure shown is per practitioner. Practices with several fall under the Team plan, with terms matched to the volume — confirmed during the conversation.",
      },
      {
        q: "What does onboarding include?",
        a: "Verifying your profile, setting up your calendar and booking slots, and publishing your presence in Portuguese, French and English.",
      },
    ],
  },
};
