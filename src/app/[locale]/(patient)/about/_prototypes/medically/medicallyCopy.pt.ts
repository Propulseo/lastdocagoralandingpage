import type { MedicallyCopy } from "./medicallyCopy";

/**
 * /about — português (PT-PT), locale de référence du site.
 *
 * « Utente » pour le citoyen face au soin, « marcação » et non « agendamento »,
 * « equipa » et non « equipe ». « Estrangeiros » plutôt que « expatriados » :
 * c'est le mot courant au Portugal pour qui vient de s'installer.
 */
export const MEDICALLY_COPY_PT: MedicallyCopy = {
  pageTitle: {
    title: "Sobre nós",
    crumbHome: "Início",
    crumbCurrent: "Sobre nós",
  },

  hero: {
    eyebrow: "Sobre a DocAgora",
    titleLead: "Melhorar o acesso aos cuidados de saúde em Portugal,",
    titleEmphasis: "para todos.",
    lead: "Residentes, estrangeiros ou visitantes: todos merecem encontrar um profissional verificado, que fale a sua língua e tenha disponibilidades reais.",
    ctaPrimary: "Encontrar um profissional",
    ctaGhost: "As nossas especialidades",
    badgeTitle: "Profissionais verificados",
    badgeSub: "analisados antes de entrarem na plataforma",
    card: {
      specialtyKey: "generalPractice",
      specialty: "Medicina geral e familiar",
      city: "Lisboa",
      languages: ["PT", "FR", "EN"],
    },
  },

  closing: {
    eyebrow: "Marcar consulta",
    title: "Encontre um profissional que fale a sua língua",
    sub: "Pesquisa por especialidade, cidade e idioma. Disponibilidades reais, marcação online, gratuito para os utentes.",
    cta: "Iniciar uma pesquisa",
  },

  about: {
    eyebrow: "Sobre a DocAgora",
    title: "Encontrar o profissional certo sem perder o dia",
    paragraphs: [
      "A DocAgora liga os utentes — residentes, estrangeiros e visitantes — a profissionais de saúde verificados em todo o Portugal. Pesquise por especialidade, por cidade ou por idioma falado, veja as disponibilidades reais e marque online.",
      "Sem telefonemas, sem esperar que lhe liguem de volta. A pesquisa e a marcação são gratuitas para os utentes. E pode filtrar os profissionais pelo idioma que falam em consulta: português, francês, inglês ou espanhol.",
    ],
    badgeValue: 16,
    badgeSuffix: "",
    badgeLabel: "Especialidades cobertas",
    avatars: [
      "/medically/images/doctors/1.jpg",
      "/medically/images/doctors/4.jpg",
      "/medically/images/team/1.png",
      "/medically/images/team/2.png",
    ],
    verifiedMark: "✓",
    verifiedLabel: "Profissionais verificados",
    signerName: "A equipa DocAgora",
    signerRole: "Lisboa, Portugal",
  },

  processTitle: {
    title: "Como funciona",
    subtitle: "Quatro passos, nenhum telefonema",
  },

  process: [
    {
      number: "01",
      image: "/assets/images/client-photos/letzai-b0d6cab1-c167-4986-ae8e-b17ad1da0795.png",
      title: "Pesquise",
      text: "Por especialidade, por cidade ou por idioma falado. Os resultados mostram quem exerce perto de si.",
    },
    {
      number: "02",
      image: "/assets/images/client-photos/letzai-d3733e8a-fe69-4925-8065-75355ad747c2.png",
      title: "Compare",
      text: "Cada profissional é analisado e aprovado antes de entrar na plataforma. Sabe a quem se dirige.",
    },
    {
      number: "03",
      image: "/assets/images/client-photos/letzai-bb4ae54c-83a1-4f18-be69-787025d6dfbf.png",
      title: "Marque",
      text: "Escolhe um horário realmente livre e confirma online, a qualquer hora.",
    },
    {
      number: "04",
      image: "/assets/images/client-photos/letzai-dd3badce-0587-421b-9402-85ab2f9ee8bb.png",
      title: "Vá à consulta",
      text: "Recebe um lembrete automático antes da hora. Não tem de se lembrar de nada.",
    },
  ],

  facts: [
    { icon: "flaticon-doctor", count: 100, suffix: " %", label: "Profissionais verificados" },
    { icon: "flaticon-deadline", count: 4, label: "Passos até à sua consulta" },
    { icon: "flaticon-award", count: 0, suffix: " €", label: "Para os utentes" },
    { icon: "flaticon-customer-care", text: "24/7", label: "Marcação online" },
  ],

  audienceTitle: {
    title: "Para quem",
    subtitle: "Três formas de usar a DocAgora",
  },

  audience: [
    {
      id: "residents",
      image: "/assets/images/client-photos/letzai-124ecce0-307e-4bd4-bf4b-8a24ade74635.png",
      title: "Vive em Portugal",
      subtitle: "Residentes",
    },
    {
      id: "expatries",
      image: "/assets/images/client-photos/letzai-f53a8f6e-e6e6-419c-82b1-f541306c5a26.png",
      title: "Acabou de se instalar",
      subtitle: "Estrangeiros",
    },
    {
      id: "voyageurs",
      image: "/assets/images/client-photos/letzai-edfaa96a-4276-488a-b6bc-183e0cf168ff.png",
      title: "Está de passagem",
      subtitle: "Visitantes",
    },
  ],
};
