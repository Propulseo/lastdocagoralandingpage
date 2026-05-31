/* Honesty fixes flagged by the redesign review: align pre-launch copy with the
   hero's "booking coming soon" promise. contactInfo (drop 24/7 + live booking),
   process steps 3/4 + title (booking is forthcoming), + specialties.seeAll. */
const fs = require("fs");
const path = require("path");
const file = (l) => path.join(__dirname, "..", "src", "i18n", "locales", `${l}.json`);
const read = (l) => JSON.parse(fs.readFileSync(file(l), "utf8"));
const write = (l, o) => fs.writeFileSync(file(l), JSON.stringify(o, null, 2) + "\n", "utf8");

const P = {
  fr: {
    contactInfo: {
      bookingTitle: "Réservation bientôt disponible",
      bookingDesc: "Recherchez gratuitement des professionnels vérifiés. La réservation en ligne arrive bientôt.",
      availableTitle: "Disponible aujourd'hui",
      platformAvailable: "Recherche",
      platformValue: "Gratuite",
      searchBook: "Professionnels",
      searchBookValue: "Vérifiés",
      reminders: "Rappels",
      remindersValue: "Bientôt",
    },
    process: {
      title: "Trouvez, comparez et (bientôt) réservez votre médecin en quelques clics.",
      desc: "Que vous cherchiez un médecin généraliste ou un spécialiste, DocAgora vous guide de la recherche au bon professionnel, dans votre langue. Une expérience simple, rapide et multilingue.",
      step3desc: "Consultez les disponibilités en temps réel — sans appel téléphonique (réservation bientôt disponible).",
      step4title: "Réservez en un clic — bientôt",
      step4desc: "Dès le lancement de la réservation, réservez en un clic avec confirmation immédiate par e-mail — sans attente.",
      ctaDesc: "Trouvez le bon professionnel dans votre langue, gratuitement. La réservation en ligne arrive bientôt.",
      tag3: "Réservation bientôt",
    },
    seeAll: "Voir toutes les spécialités",
  },
  pt: {
    contactInfo: {
      bookingTitle: "Marcação em breve",
      bookingDesc: "Pesquise profissionais verificados gratuitamente. A marcação online está a caminho.",
      availableTitle: "Disponível hoje",
      platformAvailable: "Pesquisa",
      platformValue: "Gratuita",
      searchBook: "Profissionais",
      searchBookValue: "Verificados",
      reminders: "Lembretes",
      remindersValue: "Em breve",
    },
    process: {
      title: "Encontre, compare e (em breve) marque o seu médico em poucos cliques.",
      desc: "Quer precise de um médico de família ou de um especialista, a DocAgora guia-o da pesquisa até ao profissional certo, na sua língua. Uma experiência simples, rápida e multilingue.",
      step3desc: "Veja a disponibilidade em tempo real — sem telefonemas (marcação em breve).",
      step4title: "Marque num clique — em breve",
      step4desc: "Quando a marcação estiver disponível, reserve num clique com confirmação imediata por e-mail — sem esperas.",
      ctaDesc: "Encontre o profissional certo na sua língua, gratuitamente. A marcação online está a caminho.",
      tag3: "Marcação em breve",
    },
    seeAll: "Ver todas as especialidades",
  },
  en: {
    contactInfo: {
      bookingTitle: "Booking coming soon",
      bookingDesc: "Search verified professionals for free. Online booking is on the way.",
      availableTitle: "Available today",
      platformAvailable: "Search",
      platformValue: "Free",
      searchBook: "Professionals",
      searchBookValue: "Verified",
      reminders: "Reminders",
      remindersValue: "Coming soon",
    },
    process: {
      title: "Find, compare and (soon) book your doctor in a few clicks.",
      desc: "Whether you need a GP or a specialist, DocAgora guides you from search to the right professional, in your language. A simple, fast, multilingual experience.",
      step3desc: "See real-time availability — no phone call needed (booking coming soon).",
      step4title: "Book in one click — coming soon",
      step4desc: "When booking launches, reserve in one click with instant email confirmation — no waiting.",
      ctaDesc: "Find the right professional in your language, for free. Online booking is on the way.",
      tag3: "Booking coming soon",
    },
    seeAll: "See all specialties",
  },
};

for (const locale of ["fr", "pt", "en"]) {
  const j = read(locale);
  const p = P[locale];

  // contactInfo — keep emergency 112, drop 24/7 + live-booking promises
  j.contactInfo = { ...j.contactInfo, ...p.contactInfo };

  // process — soften booking-as-live to "coming soon"
  j.process.title = p.process.title;
  j.process.desc = p.process.desc;
  j.process.ctaDesc = p.process.ctaDesc;
  j.process.steps.step3.desc = p.process.step3desc;
  j.process.steps.step4.title = p.process.step4title;
  j.process.steps.step4.desc = p.process.step4desc;
  if (Array.isArray(j.process.tags) && j.process.tags.length >= 3) {
    j.process.tags[2] = p.process.tag3; // "Real-time availability" -> "Booking coming soon"
  }

  // specialties — CTA tile label for the bento grid
  j.specialties.seeAll = p.seeAll;

  write(locale, j);
  console.log(`${locale}: honesty fixes applied`);
}
