/* Remove pre-existing overselling that the redesign review surfaced and that
   contradicts the honest "booking coming soon" hero, across rendered patient
   surfaces: topbar "24/7", specialties feature list (24/7 / real-time booking /
   "real patient reviews"), and the support FAQ answer. Also deletes the now-
   orphaned fabricated `testimonials` block (component removed). Pro untouched. */
const fs = require("fs");
const path = require("path");
const file = (l) => path.join(__dirname, "..", "src", "i18n", "locales", `${l}.json`);
const read = (l) => JSON.parse(fs.readFileSync(file(l), "utf8"));
const write = (l, o) => fs.writeFileSync(file(l), JSON.stringify(o, null, 2) + "\n", "utf8");

const P = {
  fr: {
    available247: "Recherche gratuite",
    f3: "Réservation en ligne — bientôt",
    f6: "Disponibilités en temps réel — bientôt",
    f7: "Profils transparents et détaillés",
    f8: "Rappels de rendez-vous — bientôt",
    q9: "Vous pouvez joindre notre équipe à hello@docagora.com. Nous nous efforçons de répondre sous 24 heures. La recherche de professionnels vérifiés est gratuite ; la réservation en ligne arrive bientôt.",
  },
  pt: {
    available247: "Pesquisa gratuita",
    f3: "Marcação online — em breve",
    f6: "Disponibilidade em tempo real — em breve",
    f7: "Perfis transparentes e detalhados",
    f8: "Lembretes de consulta — em breve",
    q9: "Pode contactar a nossa equipa em hello@docagora.com. Procuramos responder no prazo de 24 horas. A pesquisa de profissionais verificados é gratuita; a marcação online está a caminho.",
  },
  en: {
    available247: "Free search",
    f3: "Online booking — coming soon",
    f6: "Real-time availability — coming soon",
    f7: "Transparent, detailed profiles",
    f8: "Appointment reminders — coming soon",
    q9: "You can reach our team at hello@docagora.com. We aim to respond within 24 hours. Searching verified professionals is free; online booking is on the way.",
  },
};

for (const locale of ["fr", "pt", "en"]) {
  const j = read(locale);
  const p = P[locale];

  if (j.topbar) j.topbar.available247 = p.available247;
  if (j.specialtiesPage && j.specialtiesPage.features) {
    j.specialtiesPage.features.f3 = p.f3;
    j.specialtiesPage.features.f6 = p.f6;
    j.specialtiesPage.features.f7 = p.f7;
    j.specialtiesPage.features.f8 = p.f8;
  }
  if (j.faqPage && j.faqPage.items && j.faqPage.items.q9) {
    j.faqPage.items.q9.answer = p.q9;
  }

  // Remove the orphaned fabricated testimonials block (Testimonials.tsx deleted).
  delete j.testimonials;

  write(locale, j);
  console.log(`${locale}: overselling cleaned + testimonials block removed`);
}
