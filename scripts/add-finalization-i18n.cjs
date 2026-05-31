/* One-shot: add i18n keys introduced by the patient-landing finalization.
   Adds hero CTAs, trust bar, testimonials eyebrow, map title, and legal pages
   to fr / pt / en, preserving 2-space indent + trailing newline. */
const fs = require("fs");
const path = require("path");
const file = (l) => path.join(__dirname, "..", "src", "i18n", "locales", `${l}.json`);
const read = (l) => JSON.parse(fs.readFileSync(file(l), "utf8"));
const write = (l, obj) =>
  fs.writeFileSync(file(l), JSON.stringify(obj, null, 2) + "\n", "utf8");

const patches = {
  fr: {
    hero: {
      ctaPrimary: "Trouver un professionnel",
      ctaSecondary: "Comment ça marche",
      imageAlt: "Patiente en relation avec un professionnel de santé au Portugal via DocAgora",
    },
    testimonialsEyebrow: "Témoignages",
    mapTitle: "Carte — Lisbonne, Portugal",
    trust: {
      ariaLabel: "Pourquoi faire confiance à DocAgora",
      specialtiesValue: "16 spécialités",
      specialtiesLabel: "Médecine générale et spécialistes",
      languagesValue: "PT · FR · EN",
      languagesLabel: "Plateforme multilingue",
      verifiedValue: "Vérifiés",
      verifiedLabel: "Professionnels de santé contrôlés",
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
          "Chez DocAgora, la protection de vos données est une priorité. Cette politique explique quelles données nous collectons, pourquoi, et comment nous les protégeons, conformément au Règlement Général sur la Protection des Données (RGPD).",
        sections: [
          { title: "Données que nous collectons", body: "Nous collectons uniquement les données nécessaires au service : informations de compte (nom, e-mail, langue) et critères de recherche. Aucune donnée médicale n'est conservée sans votre consentement explicite." },
          { title: "Utilisation de vos données", body: "Vos données servent à vous mettre en relation avec des professionnels de santé, à gérer vos rendez-vous et à améliorer le service. Nous ne vendons jamais vos données à des tiers." },
          { title: "Hébergement et sécurité", body: "Toutes les données sont hébergées sur des serveurs situés dans l'Union européenne et chiffrées. L'accès est strictement limité au personnel autorisé." },
          { title: "Vos droits", body: "Conformément au RGPD, vous pouvez à tout moment accéder à vos données, les rectifier, les supprimer ou en demander la portabilité. Pour exercer ces droits, contactez-nous." },
        ],
      },
      terms: {
        title: "Conditions d'utilisation",
        intro:
          "Ces conditions définissent les règles d'utilisation de la plateforme DocAgora. En utilisant le service, vous les acceptez.",
        sections: [
          { title: "Objet du service", body: "DocAgora est une plateforme de mise en relation entre patients et professionnels de santé au Portugal. Nous ne fournissons pas de soins et ne remplaçons pas une consultation médicale." },
          { title: "Utilisation acceptable", body: "Vous vous engagez à fournir des informations exactes et à utiliser la plateforme dans le respect de la loi et des autres utilisateurs." },
          { title: "Responsabilité", body: "Les professionnels référencés sont responsables des soins qu'ils prodiguent. DocAgora facilite la mise en relation mais n'intervient pas dans la relation de soin." },
          { title: "Évolution du service", body: "DocAgora peut faire évoluer ses fonctionnalités et ces conditions. Les changements importants vous seront communiqués." },
        ],
      },
      notice: {
        title: "Mentions légales",
        intro: "Informations légales relatives à l'éditeur de la plateforme DocAgora.",
        sections: [
          { title: "Éditeur", body: "La plateforme DocAgora est éditée par l'équipe DocAgora. Pour toute demande, écrivez-nous à hello@docagora.com." },
          { title: "Hébergement", body: "Le site et les données sont hébergés sur une infrastructure située dans l'Union européenne." },
          { title: "Propriété intellectuelle", body: "L'ensemble des contenus (textes, logos, éléments graphiques) est protégé. Toute reproduction sans autorisation est interdite." },
          { title: "Contact", body: "Pour toute question d'ordre légal, contactez-nous via notre formulaire de contact ou par e-mail." },
        ],
      },
    },
  },

  pt: {
    hero: {
      ctaPrimary: "Encontrar um profissional",
      ctaSecondary: "Como funciona",
      imageAlt: "Paciente em contacto com um profissional de saúde em Portugal através da DocAgora",
    },
    testimonialsEyebrow: "Testemunhos",
    mapTitle: "Mapa — Lisboa, Portugal",
    trust: {
      ariaLabel: "Porquê confiar na DocAgora",
      specialtiesValue: "16 especialidades",
      specialtiesLabel: "Clínica geral e especialistas",
      languagesValue: "PT · FR · EN",
      languagesLabel: "Plataforma multilingue",
      verifiedValue: "Verificados",
      verifiedLabel: "Profissionais de saúde validados",
      gdprValue: "RGPD",
      gdprLabel: "Dados alojados na Europa",
    },
    legal: {
      lastUpdated: "Última atualização: maio de 2026",
      contactPrompt: "Tem alguma questão sobre este documento?",
      contactCta: "Contacte-nos",
      privacy: {
        title: "Política de privacidade",
        intro:
          "Na DocAgora, a proteção dos seus dados é uma prioridade. Esta política explica que dados recolhemos, porquê, e como os protegemos, em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD).",
        sections: [
          { title: "Dados que recolhemos", body: "Recolhemos apenas os dados necessários ao serviço: informações de conta (nome, e-mail, idioma) e critérios de pesquisa. Nenhum dado médico é guardado sem o seu consentimento explícito." },
          { title: "Utilização dos seus dados", body: "Os seus dados servem para o ligar a profissionais de saúde, gerir as suas marcações e melhorar o serviço. Nunca vendemos os seus dados a terceiros." },
          { title: "Alojamento e segurança", body: "Todos os dados são alojados em servidores localizados na União Europeia e cifrados. O acesso é estritamente limitado ao pessoal autorizado." },
          { title: "Os seus direitos", body: "Em conformidade com o RGPD, pode a qualquer momento aceder aos seus dados, retificá-los, apagá-los ou solicitar a sua portabilidade. Para exercer estes direitos, contacte-nos." },
        ],
      },
      terms: {
        title: "Termos de utilização",
        intro:
          "Estes termos definem as regras de utilização da plataforma DocAgora. Ao utilizar o serviço, aceita-os.",
        sections: [
          { title: "Objeto do serviço", body: "A DocAgora é uma plataforma que liga pacientes e profissionais de saúde em Portugal. Não prestamos cuidados nem substituímos uma consulta médica." },
          { title: "Utilização aceitável", body: "Compromete-se a fornecer informações exatas e a utilizar a plataforma no respeito pela lei e pelos outros utilizadores." },
          { title: "Responsabilidade", body: "Os profissionais referenciados são responsáveis pelos cuidados que prestam. A DocAgora facilita o contacto mas não intervém na relação de cuidados." },
          { title: "Evolução do serviço", body: "A DocAgora pode fazer evoluir as suas funcionalidades e estes termos. As alterações importantes ser-lhe-ão comunicadas." },
        ],
      },
      notice: {
        title: "Aviso legal",
        intro: "Informações legais relativas ao editor da plataforma DocAgora.",
        sections: [
          { title: "Editor", body: "A plataforma DocAgora é editada pela equipa DocAgora. Para qualquer pedido, escreva-nos para hello@docagora.com." },
          { title: "Alojamento", body: "O site e os dados são alojados numa infraestrutura localizada na União Europeia." },
          { title: "Propriedade intelectual", body: "Todos os conteúdos (textos, logótipos, elementos gráficos) estão protegidos. É proibida qualquer reprodução sem autorização." },
          { title: "Contacto", body: "Para qualquer questão de natureza legal, contacte-nos através do nosso formulário de contacto ou por e-mail." },
        ],
      },
    },
  },

  en: {
    hero: {
      ctaPrimary: "Find a professional",
      ctaSecondary: "How it works",
      imageAlt: "Patient connecting with a healthcare professional in Portugal through DocAgora",
    },
    testimonialsEyebrow: "Testimonials",
    mapTitle: "Map — Lisbon, Portugal",
    trust: {
      ariaLabel: "Why trust DocAgora",
      specialtiesValue: "16 specialties",
      specialtiesLabel: "General practice and specialists",
      languagesValue: "PT · FR · EN",
      languagesLabel: "Multilingual platform",
      verifiedValue: "Verified",
      verifiedLabel: "Vetted healthcare professionals",
      gdprValue: "GDPR",
      gdprLabel: "Data hosted in Europe",
    },
    legal: {
      lastUpdated: "Last updated: May 2026",
      contactPrompt: "A question about this document?",
      contactCta: "Contact us",
      privacy: {
        title: "Privacy Policy",
        intro:
          "At DocAgora, protecting your data is a priority. This policy explains what data we collect, why, and how we protect it, in line with the General Data Protection Regulation (GDPR).",
        sections: [
          { title: "Data we collect", body: "We collect only the data needed to run the service: account information (name, email, language) and search criteria. No medical data is stored without your explicit consent." },
          { title: "How we use your data", body: "Your data is used to connect you with healthcare professionals, manage your appointments and improve the service. We never sell your data to third parties." },
          { title: "Hosting and security", body: "All data is hosted on servers located in the European Union and encrypted. Access is strictly limited to authorised staff." },
          { title: "Your rights", body: "Under the GDPR, you can access, rectify, delete or request portability of your data at any time. To exercise these rights, contact us." },
        ],
      },
      terms: {
        title: "Terms of Use",
        intro:
          "These terms set out the rules for using the DocAgora platform. By using the service, you accept them.",
        sections: [
          { title: "Purpose of the service", body: "DocAgora is a platform that connects patients with healthcare professionals in Portugal. We do not provide care and do not replace a medical consultation." },
          { title: "Acceptable use", body: "You agree to provide accurate information and to use the platform in compliance with the law and other users." },
          { title: "Liability", body: "Listed professionals are responsible for the care they provide. DocAgora facilitates the connection but does not intervene in the care relationship." },
          { title: "Changes to the service", body: "DocAgora may evolve its features and these terms. Significant changes will be communicated to you." },
        ],
      },
      notice: {
        title: "Legal Notice",
        intro: "Legal information about the publisher of the DocAgora platform.",
        sections: [
          { title: "Publisher", body: "The DocAgora platform is published by the DocAgora team. For any request, write to us at hello@docagora.com." },
          { title: "Hosting", body: "The site and its data are hosted on infrastructure located in the European Union." },
          { title: "Intellectual property", body: "All content (text, logos, graphic elements) is protected. Any reproduction without authorisation is prohibited." },
          { title: "Contact", body: "For any legal question, contact us via our contact form or by email." },
        ],
      },
    },
  },
};

for (const locale of ["fr", "pt", "en"]) {
  const json = read(locale);
  const p = patches[locale];

  json.hero = { ...json.hero, ctaPrimary: p.hero.ctaPrimary, ctaSecondary: p.hero.ctaSecondary, imageAlt: p.hero.imageAlt };
  json.testimonials = { ...json.testimonials, eyebrow: p.testimonialsEyebrow };
  json.contactPage = { ...json.contactPage, mapTitle: p.mapTitle };
  json.trust = p.trust;
  json.legal = p.legal;

  write(locale, json);
  console.log(`${locale}: done — top-level keys = ${Object.keys(json).length}`);
}
