import type { PricingCopy } from "./pricingCopy";

/* Français — texte d'origine de la page, conservé tel quel.
   Les montants restent des placeholders « — € » : aucun chiffre inventé. */

export const PRICING_COPY_FR: PricingCopy = {
  hero: {
    eyebrow: "Tarifs · Professionnels de santé",
    titleLead: "Une formule claire, à la mesure de ",
    titleAccent: "votre pratique",
    titleEnd: ".",
    lead: "Agenda en ligne, réservation 24/7, rappels automatiques : choisissez le cadre qui correspond à votre cabinet. Les montants définitifs vous sont confirmés lors de la démonstration.",
    toggleAria: "Périodicité de facturation",
    toggleMonthly: "Mensuel",
    toggleYearly: "Annuel",
    toggleSave: "− — %",
    noteStrong: "Montants à confirmer",
    noteRest: " — structure tarifaire présentée en amont de la publication des prix.",
  },
  plans: [
    {
      id: "essentiel",
      name: "Essentiel",
      tagline: "Ouvrir la réservation en ligne, simplement.",
      priceLabel: "— €",
      priceUnit: "/ mois",
      priceSub: "par praticien",
      priceSubByBilling: {
        monthly: "par praticien · facturé mensuellement",
        yearly: "par praticien · facturé annuellement",
      },
      priceTbc: "Montant à confirmer",
      features: [
        "Profil professionnel vérifié",
        "Réservation en ligne 24/7",
        "Agenda en ligne du cabinet",
        "Présence en portugais, français et anglais",
        "Conformité RGPD",
      ],
      ctaLabel: "Demander le tarif",
      ctaKind: "ghost",
    },
    {
      id: "cabinet",
      name: "Cabinet",
      tagline: "Le quotidien du cabinet, sans rendez-vous manqués.",
      priceLabel: "— €",
      priceUnit: "/ mois",
      priceSub: "par praticien",
      priceSubByBilling: {
        monthly: "par praticien · facturé mensuellement",
        yearly: "par praticien · facturé annuellement",
      },
      priceTbc: "Montant à confirmer",
      featured: true,
      flag: "Recommandé",
      leadFeature: "Tout Essentiel, plus :",
      features: [
        "Rappels automatiques avant chaque rendez-vous",
        "Réduction des no-shows au fil des semaines",
        "Accompagnement à la mise en route",
        "Support prioritaire",
      ],
      ctaLabel: "Demander une démonstration",
      ctaKind: "primary",
    },
    {
      id: "equipe",
      name: "Équipe",
      tagline: "Pour les structures réunissant plusieurs praticiens.",
      priceLabel: "Sur mesure",
      priceSub: "conditions adaptées au nombre de praticiens",
      priceTbc: "Chiffrage sur échange",
      customPrice: true,
      leadFeature: "Tout Cabinet, plus :",
      features: [
        "Un profil vérifié et un agenda par praticien",
        "Interlocuteur dédié",
        "Mise en route coordonnée pour toute l'équipe",
      ],
      ctaLabel: "Échanger avec l'équipe",
      ctaKind: "ghost",
    },
  ],
  plansFootnote:
    "Les montants et paliers exacts sont en cours de finalisation et communiqués lors de la démonstration.",
  compare: {
    title: "Comparer les formules en un regard",
    subtitle: "L'essentiel du périmètre, formule par formule.",
    headers: ["Périmètre", "Essentiel", "Cabinet", "Équipe"],
    rows: [
      {
        label: "Profil professionnel vérifié",
        cells: [{ type: "check" }, { type: "check" }, { type: "check" }],
      },
      {
        label: "Réservation en ligne 24/7",
        cells: [{ type: "check" }, { type: "check" }, { type: "check" }],
      },
      {
        label: "Rappels automatiques",
        cells: [{ type: "dash" }, { type: "check" }, { type: "check" }],
      },
      {
        label: "Présence PT · FR · EN",
        cells: [{ type: "check" }, { type: "check" }, { type: "check" }],
      },
      {
        label: "Praticiens inclus",
        cells: [
          { type: "text", value: "1" },
          { type: "text", value: "1" },
          { type: "text", value: "Plusieurs" },
        ],
      },
      {
        label: "Support",
        cells: [
          { type: "text", value: "E-mail" },
          { type: "text", value: "Prioritaire" },
          { type: "text", value: "Interlocuteur dédié" },
        ],
      },
    ],
  },
  assure: [
    {
      id: "rgpd",
      title: "Conformité RGPD",
      desc: "Les données de vos patients sont traitées dans le respect du règlement européen.",
    },
    {
      id: "verified",
      title: "Professionnels vérifiés",
      desc: "Chaque profil publié sur DocAgora correspond à un praticien contrôlé.",
    },
    {
      id: "langs",
      title: "PT · FR · EN",
      desc: "Votre cabinet visible dans les trois langues de vos patients au Portugal.",
    },
  ],
  faq: {
    title: "Questions fréquentes",
    items: [
      {
        q: "Quand les montants seront-ils affichés ?",
        a: "L'offre commerciale est en cours de finalisation avec nos premiers cabinets partenaires. Les montants définitifs sont communiqués lors de la démonstration, avant leur publication sur cette page.",
      },
      {
        q: "Le tarif dépend-il du nombre de praticiens ?",
        a: "La structure présentée s'entend par praticien. Les structures qui en réunissent plusieurs relèvent de la formule Équipe, avec des conditions adaptées au volume — confirmées lors de l'échange.",
      },
      {
        q: "Que comprend la mise en route ?",
        a: "La vérification de votre profil, le paramétrage de votre agenda et de vos créneaux de réservation, et la publication de votre présence en portugais, français et anglais.",
      },
    ],
  },
};
