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
      "Sem telefonemas, sem esperar que lhe liguem de volta. A pesquisa e a marcação são gratuitas para os utentes, e a interface existe em português, francês e inglês.",
    ],
    badgeValue: 3,
    badgeSuffix: "",
    badgeLabel: "Idiomas disponíveis",
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
      image: "/medically/images/work/1.jpg",
      title: "Pesquise",
      text: "Por especialidade, por cidade ou por idioma falado. Os resultados mostram quem exerce perto de si.",
    },
    {
      number: "02",
      image: "/medically/images/work/2.jpg",
      title: "Compare",
      text: "Cada profissional é analisado e aprovado antes de entrar na plataforma. Sabe a quem se dirige.",
    },
    {
      number: "03",
      image: "/medically/images/work/3.jpg",
      title: "Marque",
      text: "Escolhe um horário realmente livre e confirma online, a qualquer hora.",
    },
    {
      number: "04",
      image: "/medically/images/work/4.jpg",
      title: "Vá à consulta",
      text: "Recebe um lembrete automático antes da hora. Não tem de se lembrar de nada.",
    },
  ],

  facts: [
    { icon: "flaticon-doctor", count: 100, suffix: " %", label: "Profissionais verificados" },
    { icon: "flaticon-businesswoman", count: 3, label: "Idiomas: PT, FR, EN" },
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
      image: "/medically/images/team/1.png",
      title: "Vive em Portugal",
      subtitle: "Residentes",
    },
    {
      id: "expatries",
      image: "/medically/images/team/2.png",
      title: "Acabou de se instalar",
      subtitle: "Estrangeiros",
    },
    {
      id: "voyageurs",
      image: "/medically/images/team/3.png",
      title: "Está de passagem",
      subtitle: "Visitantes",
    },
  ],
};
