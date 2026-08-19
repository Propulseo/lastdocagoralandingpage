import type { ResourcesCopy } from "./resourcesCopy";

/* Português (PT-PT) — locale par défaut du site, donc la référence de
   qualité : vocabulaire du Portugal (marcação, faltas, definições), jamais
   de calque brésilien. */

export const RESOURCES_COPY_PT: ResourcesCopy = {
  hero: {
    eyebrow: "Centro de ajuda · Área profissional",
    titleLine1: "Alguma dúvida?",
    titleLine2Lead: "A resposta ",
    titleLine2Accent: "já está aqui",
    lead: "Guias, perguntas frequentes e conselhos práticos para tirar o melhor partido do DocAgora — da primeira sessão às definições mais finas.",
    searchLabel: "Filtrar as respostas rápidas",
    searchPlaceholder: "Filtrar as respostas (ex.: lembretes, férias…)",
    clearLabel: "Limpar a pesquisa",
    popularLabel: "Pesquisas frequentes:",
    popular: ["lembretes", "férias", "perfil", "dados", "línguas"],
  },
  quick: {
    heading: "Respostas rápidas",
    emptyLead: "Nenhuma resposta corresponde a",
    emptyHint:
      "Experimente outra palavra — ou escreva-nos, responde-lhe uma pessoa real.",
    items: [
      {
        id: "verification",
        q: "Como é verificado o meu perfil profissional?",
        a: "Cada profissional é verificado antes de o perfil ser publicado. O selo «Verificado» só aparece depois de concluída a verificação — é a primeira coisa que os pacientes veem.",
      },
      {
        id: "conges",
        q: "Posso bloquear horários para as minhas férias?",
        a: "Sim. Bloqueie um intervalo ou um período inteiro a partir da agenda: os horários deixam de estar disponíveis para marcação online de imediato.",
      },
      {
        id: "rappels",
        q: "Os lembretes são enviados automaticamente?",
        a: "Sim. Uma vez activados, são enviados antes de cada consulta, sem qualquer acção da sua parte.",
      },
      {
        id: "donnees",
        q: "Os dados dos meus pacientes estão protegidos?",
        a: "O tratamento dos dados cumpre o RGPD. Mantém sempre o controlo sobre as informações dos seus pacientes.",
      },
      {
        id: "langues",
        q: "Em que línguas podem os meus pacientes marcar consulta?",
        a: "Em português, francês e inglês — a interface adapta-se à língua de cada paciente.",
      },
    ],
  },
  featured: {
    badge: "Guia em destaque",
    title: "Reduzir as faltas com lembretes automáticos",
    lead: "O hábito dos consultórios com agenda cheia: lembretes definidos no momento certo, enviados sem qualquer acção da sua parte.",
    points: [
      "Escolher a antecedência adequada aos seus pacientes",
      "Escrever uma mensagem clara, em PT, FR ou EN",
      "Acompanhar o efeito nas consultas realizadas",
    ],
    meta: ["10 min de leitura", "Guia prático", "PT · FR · EN"],
  },
  themes: {
    heading: "Explorar por tema",
    lead: "Guias práticos, respostas das perguntas frequentes e artigos de conselhos, organizados por assunto.",
    items: [
      {
        id: "demarrer",
        icon: "compass",
        title: "Começar",
        desc: "Criar o perfil verificado, configurar a agenda, receber a primeira marcação.",
      },
      {
        id: "agenda",
        icon: "calendar",
        title: "Agenda e marcações",
        desc: "Disponibilidades, marcação online 24/7, ausências e férias.",
      },
      {
        id: "rappels",
        icon: "bell",
        title: "Lembretes e faltas",
        desc: "Definições dos lembretes automáticos e boas práticas de acompanhamento.",
      },
      {
        id: "profil",
        icon: "shield",
        title: "Perfil e RGPD",
        desc: "Visibilidade, línguas faladas, protecção dos dados dos pacientes.",
      },
    ],
  },
};
