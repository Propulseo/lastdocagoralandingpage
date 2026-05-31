/* One-shot: bring fr.json to parity with en.json/pt.json by adding the
   62 redesign/legal/search/trust keys that were missing (build broke with
   MISSING_MESSAGE: legal/search (fr)). Touches ONLY fr.json. Typographic
   apostrophes (U+2019), no em dashes. */
const fs = require("fs");
const path = require("path");
const file = path.join(__dirname, "..", "src", "i18n", "locales", "fr.json");
const fr = JSON.parse(fs.readFileSync(file, "utf8"));

const ADD = {
  hero: {
    ctaPrimary: "Trouver un professionnel",
    ctaSecondary: "Comment ça marche",
    imageAlt:
      "Patient en contact avec un professionnel de santé au Portugal via DocAgora",
    titleLead: "Trouvez un médecin qui",
    titleEmphasis: "parle votre langue",
    subhead:
      "Des professionnels de santé vérifiés dans tout le Portugal, en portugais, français et anglais. Recherche gratuite, réservation bientôt disponible.",
  },
  specialties: {
    seeAll: "Voir toutes les spécialités",
  },
  cities: {
    eyebrow: "Couverture",
    cta: "Voir les professionnels",
  },
  contactPage: {
    mapTitle: "Carte de Lisbonne, Portugal",
  },
  pro: {
    testimonials: {
      subtitle: "Ils font confiance à DocAgora",
      items: {
        item1: { location: "Coimbra" },
        item2: { location: "Porto" },
        item3: { location: "Lisbonne" },
        item4: { location: "Braga" },
        item5: {
          quote:
            "Mes patients me trouvent facilement en ligne, et la réservation multilingue fait toute la différence.",
          name: "Dr. Sofia R.",
          specialty: "Pédiatre",
          location: "Aveiro",
        },
        item6: {
          quote:
            "Mise en place simple et tarifs clairs : j’étais opérationnel en moins d’une journée.",
          name: "Dr. João P.",
          specialty: "Cardiologue",
          location: "Faro",
        },
      },
    },
  },
  trust: {
    ariaLabel: "Pourquoi faire confiance à DocAgora",
    specialtiesValue: "16 spécialités",
    specialtiesLabel: "Médecine générale et spécialistes",
    languagesValue: "PT · FR · EN",
    languagesLabel: "Plateforme multilingue",
    verifiedValue: "Vérifiés",
    verifiedLabel: "Professionnels de santé validés",
    gdprValue: "RGPD",
    gdprLabel: "Données hébergées en Europe",
  },
  legal: {
    lastUpdated: "Dernière mise à jour : mai 2026",
    contactPrompt: "Une question sur ce document ?",
    contactCta: "Contactez-nous",
    privacy: {
      title: "Politique de confidentialité",
      intro:
        "Chez DocAgora, la protection de vos données est une priorité. Cette politique explique quelles données nous collectons, pourquoi, et comment nous les protégeons, conformément au Règlement général sur la protection des données (RGPD).",
      sections: [
        {
          title: "Données que nous collectons",
          body:
            "Nous collectons uniquement les données nécessaires au service : informations de compte (nom, e-mail, langue) et critères de recherche. Aucune donnée médicale n’est conservée sans votre consentement explicite.",
        },
        {
          title: "Utilisation de vos données",
          body:
            "Vos données servent à vous mettre en relation avec des professionnels de santé, à gérer vos rendez-vous et à améliorer le service. Nous ne vendons jamais vos données à des tiers.",
        },
        {
          title: "Hébergement et sécurité",
          body:
            "Toutes les données sont hébergées sur des serveurs situés dans l’Union européenne et chiffrées. L’accès est strictement limité au personnel autorisé.",
        },
        {
          title: "Vos droits",
          body:
            "Conformément au RGPD, vous pouvez à tout moment accéder à vos données, les rectifier, les supprimer ou en demander la portabilité. Pour exercer ces droits, contactez-nous.",
        },
      ],
    },
    terms: {
      title: "Conditions d’utilisation",
      intro:
        "Ces conditions définissent les règles d’utilisation de la plateforme DocAgora. En utilisant le service, vous les acceptez.",
      sections: [
        {
          title: "Objet du service",
          body:
            "DocAgora est une plateforme qui met en relation patients et professionnels de santé au Portugal. Nous ne fournissons pas de soins et ne remplaçons pas une consultation médicale.",
        },
        {
          title: "Utilisation acceptable",
          body:
            "Vous vous engagez à fournir des informations exactes et à utiliser la plateforme dans le respect de la loi et des autres utilisateurs.",
        },
        {
          title: "Responsabilité",
          body:
            "Les professionnels référencés sont responsables des soins qu’ils prodiguent. DocAgora facilite la mise en relation mais n’intervient pas dans la relation de soin.",
        },
        {
          title: "Évolution du service",
          body:
            "DocAgora peut faire évoluer ses fonctionnalités et ces conditions. Les changements importants vous seront communiqués.",
        },
      ],
    },
    notice: {
      title: "Mentions légales",
      intro:
        "Informations légales concernant l’éditeur de la plateforme DocAgora.",
      sections: [
        {
          title: "Éditeur",
          body:
            "La plateforme DocAgora est éditée par l’équipe DocAgora. Pour toute demande, écrivez-nous à hello@docagora.com.",
        },
        {
          title: "Hébergement",
          body:
            "Le site et ses données sont hébergés sur une infrastructure située dans l’Union européenne.",
        },
        {
          title: "Propriété intellectuelle",
          body:
            "L’ensemble des contenus (textes, logos, éléments graphiques) est protégé. Toute reproduction sans autorisation est interdite.",
        },
        {
          title: "Contact",
          body:
            "Pour toute question d’ordre juridique, contactez-nous via notre formulaire de contact ou par e-mail.",
        },
      ],
    },
  },
  search: {
    specialtyLabel: "Spécialité ou motif",
    cityLabel: "Ville",
    cityAll: "Toutes les villes",
    languageLabel: "Langue",
    cta: "Rechercher",
    examples: [
      "Dermatologista em Lisboa",
      "Médecin généraliste à Cascais",
      "English-speaking dentist in Porto",
      "Pediatra em Braga",
    ],
    resultsHead: "Professionnels correspondants (exemples) :",
    seeAll: "Voir tous les professionnels",
    trustVerified: "Professionnels vérifiés",
    trustLanguages: "PT · FR · EN",
    trustFree: "Recherche gratuite",
    finalPlaceholder: "Quel professionnel cherchez-vous ?",
  },
  record: {
    verified: "Professionnel vérifié",
    speaks: "Parle :",
    illustrative: "Exemple",
  },
  final: {
    eyebrow: "Commencez maintenant",
    title: "Commencez votre recherche.",
    sub:
      "Trouvez un professionnel qui parle votre langue, partout au Portugal. Gratuit.",
  },
};

const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);
let added = 0;
let skipped = 0;
function merge(target, source, prefix = "") {
  for (const k of Object.keys(source)) {
    const p = prefix ? prefix + "." + k : k;
    if (isObj(source[k])) {
      if (!isObj(target[k])) target[k] = {};
      merge(target[k], source[k], p);
    } else if (!(k in target)) {
      target[k] = source[k];
      added++;
    } else {
      skipped++;
      console.log("SKIP (already present): " + p);
    }
  }
}
merge(fr, ADD);
fs.writeFileSync(file, JSON.stringify(fr, null, 2) + "\n", "utf8");
console.log(`Done. Added ${added} leaf keys, skipped ${skipped}.`);
