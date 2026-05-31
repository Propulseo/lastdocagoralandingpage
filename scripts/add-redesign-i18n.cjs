/* One-shot: add i18n keys for the "Consultório" redesign (hero search-first,
   search console, verified record, cities bento, final CTA) to fr/pt/en. */
const fs = require("fs");
const path = require("path");
const file = (l) => path.join(__dirname, "..", "src", "i18n", "locales", `${l}.json`);
const read = (l) => JSON.parse(fs.readFileSync(file(l), "utf8"));
const write = (l, o) => fs.writeFileSync(file(l), JSON.stringify(o, null, 2) + "\n", "utf8");

// Trilingual demo queries — identical across locales by design (the typing
// placeholder performs the "a doctor who speaks your language" promise).
const EXAMPLES = [
  "Dermatologista em Lisboa",
  "Médecin généraliste à Cascais",
  "English-speaking dentist in Porto",
  "Pediatra em Braga",
];

const P = {
  fr: {
    heroLead: "Trouvez un médecin qui",
    heroEm: "parle votre langue",
    heroSub:
      "Des professionnels de santé vérifiés dans tout le Portugal, en portugais, français et anglais. Recherche gratuite — réservation bientôt disponible.",
    search: {
      specialtyLabel: "Spécialité ou motif",
      cityLabel: "Ville",
      cityAll: "Toutes les villes",
      languageLabel: "Langue",
      cta: "Rechercher",
      examples: EXAMPLES,
      resultsHead: "Professionnels correspondants (exemples) :",
      seeAll: "Voir tous les professionnels",
      trustVerified: "Professionnels vérifiés",
      trustLanguages: "PT · FR · EN",
      trustFree: "Recherche gratuite",
      finalPlaceholder: "Quel professionnel cherchez-vous ?",
    },
    record: { verified: "Professionnel vérifié", speaks: "Parle :", illustrative: "Exemple" },
    citiesEyebrow: "Couverture",
    citiesCta: "Voir les professionnels",
    final: {
      eyebrow: "Commencez maintenant",
      title: "Commencez votre recherche.",
      sub: "Trouvez un professionnel qui parle votre langue, partout au Portugal. Gratuit.",
    },
  },
  pt: {
    heroLead: "Encontre um médico que",
    heroEm: "fala a sua língua",
    heroSub:
      "Profissionais de saúde verificados em todo Portugal, em português, francês e inglês. Pesquisa gratuita — marcação em breve.",
    search: {
      specialtyLabel: "Especialidade ou motivo",
      cityLabel: "Cidade",
      cityAll: "Todas as cidades",
      languageLabel: "Idioma",
      cta: "Procurar",
      examples: EXAMPLES,
      resultsHead: "Profissionais correspondentes (exemplos):",
      seeAll: "Ver todos os profissionais",
      trustVerified: "Profissionais verificados",
      trustLanguages: "PT · FR · EN",
      trustFree: "Pesquisa gratuita",
      finalPlaceholder: "Que profissional procura?",
    },
    record: { verified: "Profissional verificado", speaks: "Fala:", illustrative: "Exemplo" },
    citiesEyebrow: "Cobertura",
    citiesCta: "Ver profissionais",
    final: {
      eyebrow: "Comece agora",
      title: "Comece a sua pesquisa.",
      sub: "Encontre um profissional que fala a sua língua, em todo Portugal. Gratuito.",
    },
  },
  en: {
    heroLead: "Find a doctor who",
    heroEm: "actually speaks your language",
    heroSub:
      "Verified healthcare professionals across Portugal, in Portuguese, French and English. Free search — booking coming soon.",
    search: {
      specialtyLabel: "Specialty or reason",
      cityLabel: "City",
      cityAll: "All cities",
      languageLabel: "Language",
      cta: "Search",
      examples: EXAMPLES,
      resultsHead: "Matching professionals (examples):",
      seeAll: "See all professionals",
      trustVerified: "Verified professionals",
      trustLanguages: "PT · FR · EN",
      trustFree: "Free search",
      finalPlaceholder: "Which professional are you looking for?",
    },
    record: { verified: "Verified professional", speaks: "Speaks:", illustrative: "Example" },
    citiesEyebrow: "Coverage",
    citiesCta: "See professionals",
    final: {
      eyebrow: "Get started",
      title: "Start your search.",
      sub: "Find a professional who speaks your language, anywhere in Portugal. Free.",
    },
  },
};

for (const locale of ["fr", "pt", "en"]) {
  const j = read(locale);
  const p = P[locale];

  j.hero = { ...j.hero, titleLead: p.heroLead, titleEmphasis: p.heroEm, subhead: p.heroSub };
  j.search = p.search;
  j.record = p.record;
  j.cities = { ...j.cities, eyebrow: p.citiesEyebrow, cta: p.citiesCta };
  j.final = p.final;

  write(locale, j);
  console.log(`${locale}: done — top-level keys = ${Object.keys(j).length}`);
}
