import type { PricingCopy } from "./pricingCopy";

/* Português (PT-PT) — locale par défaut du site. Les montants restent des
   placeholders « — € » : aucun chiffre inventé, dans aucune langue. */

export const PRICING_COPY_PT: PricingCopy = {
  hero: {
    eyebrow: "Preços · Profissionais de saúde",
    titleLead: "Um plano claro, à medida da ",
    titleAccent: "sua prática",
    titleEnd: ".",
    lead: "Agenda online, marcação 24/7, lembretes automáticos: escolha o enquadramento que corresponde ao seu consultório. Os valores definitivos são confirmados durante a demonstração.",
    toggleAria: "Periodicidade de facturação",
    toggleMonthly: "Mensal",
    toggleYearly: "Anual",
    toggleSave: "− — %",
    noteStrong: "Valores a confirmar",
    noteRest: " — estrutura de preços apresentada antes da publicação dos valores.",
  },
  plans: [
    {
      id: "essentiel",
      name: "Essencial",
      tagline: "Abrir a marcação online, de forma simples.",
      priceLabel: "— €",
      priceUnit: "/ mês",
      priceSub: "por profissional",
      priceSubByBilling: {
        monthly: "por profissional · facturado mensalmente",
        yearly: "por profissional · facturado anualmente",
      },
      priceTbc: "Valor a confirmar",
      features: [
        "Perfil profissional verificado",
        "Marcação online 24/7",
        "Agenda online do consultório",
        "Presença em português, francês e inglês",
        "Conformidade com o RGPD",
      ],
      ctaLabel: "Pedir o preço",
      ctaKind: "ghost",
    },
    {
      id: "cabinet",
      name: "Consultório",
      tagline: "O dia a dia do consultório, sem consultas falhadas.",
      priceLabel: "— €",
      priceUnit: "/ mês",
      priceSub: "por profissional",
      priceSubByBilling: {
        monthly: "por profissional · facturado mensalmente",
        yearly: "por profissional · facturado anualmente",
      },
      priceTbc: "Valor a confirmar",
      featured: true,
      flag: "Recomendado",
      leadFeature: "Tudo o do Essencial, mais:",
      features: [
        "Lembretes automáticos antes de cada consulta",
        "Menos faltas ao longo das semanas",
        "Acompanhamento no arranque",
        "Apoio prioritário",
      ],
      ctaLabel: "Pedir uma demonstração",
      ctaKind: "primary",
    },
    {
      id: "equipe",
      name: "Equipa",
      tagline: "Para estruturas que reúnem vários profissionais.",
      priceLabel: "Sob medida",
      priceSub: "condições adaptadas ao número de profissionais",
      priceTbc: "Orçamento após contacto",
      customPrice: true,
      leadFeature: "Tudo o do Consultório, mais:",
      features: [
        "Um perfil verificado e uma agenda por profissional",
        "Interlocutor dedicado",
        "Arranque coordenado para toda a equipa",
      ],
      ctaLabel: "Falar com a equipa",
      ctaKind: "ghost",
    },
  ],
  plansFootnote:
    "Os valores e escalões exactos estão a ser finalizados e são comunicados durante a demonstração.",
  compare: {
    title: "Comparar os planos num relance",
    subtitle: "O essencial do âmbito, plano a plano.",
    headers: ["Âmbito", "Essencial", "Consultório", "Equipa"],
    rows: [
      {
        label: "Perfil profissional verificado",
        cells: [{ type: "check" }, { type: "check" }, { type: "check" }],
      },
      {
        label: "Marcação online 24/7",
        cells: [{ type: "check" }, { type: "check" }, { type: "check" }],
      },
      {
        label: "Lembretes automáticos",
        cells: [{ type: "dash" }, { type: "check" }, { type: "check" }],
      },
      {
        label: "Presença PT · FR · EN",
        cells: [{ type: "check" }, { type: "check" }, { type: "check" }],
      },
      {
        label: "Profissionais incluídos",
        cells: [
          { type: "text", value: "1" },
          { type: "text", value: "1" },
          { type: "text", value: "Vários" },
        ],
      },
      {
        label: "Apoio",
        cells: [
          { type: "text", value: "E-mail" },
          { type: "text", value: "Prioritário" },
          { type: "text", value: "Interlocutor dedicado" },
        ],
      },
    ],
  },
  assure: [
    {
      id: "rgpd",
      title: "Conformidade com o RGPD",
      desc: "Os dados dos seus pacientes são tratados no respeito do regulamento europeu.",
    },
    {
      id: "verified",
      title: "Profissionais verificados",
      desc: "Cada perfil publicado no DocAgora corresponde a um profissional verificado.",
    },
    {
      id: "langs",
      title: "PT · FR · EN",
      desc: "O seu consultório visível nas três línguas dos seus pacientes em Portugal.",
    },
  ],
  faq: {
    title: "Perguntas frequentes",
    items: [
      {
        q: "Quando é que os valores serão apresentados?",
        a: "A oferta comercial está a ser finalizada com os nossos primeiros consultórios parceiros. Os valores definitivos são comunicados durante a demonstração, antes da sua publicação nesta página.",
      },
      {
        q: "O preço depende do número de profissionais?",
        a: "A estrutura apresentada entende-se por profissional. As estruturas que reúnem vários enquadram-se no plano Equipa, com condições adaptadas ao volume — confirmadas durante o contacto.",
      },
      {
        q: "O que inclui o arranque?",
        a: "A verificação do seu perfil, a configuração da sua agenda e dos horários de marcação, e a publicação da sua presença em português, francês e inglês.",
      },
    ],
  },
};
