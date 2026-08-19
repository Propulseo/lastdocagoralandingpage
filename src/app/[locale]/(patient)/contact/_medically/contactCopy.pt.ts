import type { ContactCopy } from "./contactCopy";

/**
 * /contact — português (PT-PT), locale de référence du site.
 *
 * « Contactos » au pluriel, comme le veut l'usage portugais. « Marcação » et
 * non « agendamento » (brésilien). Le panneau de succès dit la vérité : le
 * formulaire n'envoie rien pour l'instant, et on donne l'adresse e-mail comme
 * solution immédiate.
 */
export const CONTACT_COPY_PT: ContactCopy = {
  pageTitle: {
    title: "Contactos",
    crumb: "Contactos",
  },

  hero: {
    eyebrow: "Contactos",
    titleLead: "Respondemos-lhe,",
    titleEmphasis: "em PT · FR · EN.",
    lead: "Uma dúvida sobre a plataforma, uma ficha a corrigir, uma parceria? Escreva-nos. Para marcar uma consulta com um profissional, a pesquisa continua a ser o caminho mais rápido.",
    email: "hello@docagora.com",
    formCta: "Escrever uma mensagem",
    mailPrefix: "ou diretamente:",
  },

  info: [
    {
      icon: "fi flaticon-location-1",
      title: "Onde estamos",
      lines: ["Lisboa, Portugal"],
    },
    {
      icon: "fi flaticon-email",
      title: "Escreva-nos",
      lines: ["hello@docagora.com"],
    },
    {
      icon: "fi flaticon-24-7",
      title: "Tudo se faz online",
      lines: ["Pesquisa e marcação abertas", "24 horas por dia, sem telefonemas"],
    },
  ],

  intro: {
    title: "Alguma dúvida?",
    lede: "Escreva-nos. Respondemos em português, francês ou inglês. Para marcar uma consulta com um profissional, use antes a pesquisa: é imediato.",
  },

  form: {
    placeholderName: "O seu nome",
    placeholderEmail: "O seu e-mail",
    placeholderPhone: "O seu telefone (opcional)",
    subjectLabel: "Assunto",
    subjects: [
      "Uma dúvida sobre a plataforma",
      "Um problema com uma marcação",
      "Sou profissional de saúde",
      "Comunicar um erro numa ficha",
      "Imprensa e parcerias",
      "Outro",
    ],
    placeholderMessage: "A sua mensagem",
    submit: "Enviar",
    errorName: "O nome é obrigatório",
    errorEmailRequired: "O e-mail é obrigatório",
    errorEmailInvalid: "Este endereço de e-mail não é válido",
    errorSubject: "Escolha um assunto",
    errorMessage: "A mensagem é obrigatória",
    successTitle: "Obrigado, a sua mensagem está completa.",
    successText: "Protótipo: o envio ainda não está ligado. Entretanto, escreva-nos para",
  },

  map: {
    title: "Mapa de Lisboa, Portugal",
    caption: "DocAgora — Lisboa, Portugal",
  },
};
