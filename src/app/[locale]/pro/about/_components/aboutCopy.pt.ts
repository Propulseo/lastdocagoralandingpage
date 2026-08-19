import type { AboutCopy } from "./aboutCopy";

/* Português (PT-PT) — locale par défaut du site, donc la référence de
   qualité : marcação (et non « agendamento »), faltas, Ordem profissional. */

export const ABOUT_COPY_PT: AboutCopy = {
  hero: {
    eyebrow: "Sobre nós · DocAgora Pro",
    titleLead: "Quem somos vê-se naquilo",
    titleAccent: "que construímos.",
    lead: "Em vez de um longo discurso: o DocAgora é uma plataforma portuguesa, já online, que liga os pacientes a profissionais de saúde verificados. Aqui está a ferramenta, tal como trabalha para um consultório.",
    ctaPrimary: "Abrir a minha agenda",
    ctaGhost: "Ver a plataforma",
    badges: ["Marcação 24/7", "Lembretes automáticos", "PT · FR · EN"],
  },
  mock: {
    title: "Agenda — semana em curso",
    live: "Online",
    floatVerified: "Perfil verificado",
    floatReminder: "Lembrete enviado · SMS",
    days: [
      {
        name: "Seg",
        slots: [
          { time: "09:00", label: "Consulta", kind: "base" },
          { time: "10:30", label: "Marcado online", kind: "online" },
          { time: "14:00", label: "Seguimento", kind: "base" },
        ],
      },
      {
        name: "Ter",
        slots: [
          { time: "09:30", label: "Consulta", kind: "base" },
          { label: "Livre", kind: "free" },
          { time: "15:00", label: "Marcado · 23:12", kind: "online" },
        ],
      },
      {
        name: "Qua",
        slots: [
          { time: "08:30", label: "Marcado online", kind: "online" },
          { time: "11:00", label: "Consulta", kind: "base" },
          { time: "16:30", label: "Avaliação", kind: "base" },
        ],
      },
      {
        name: "Qui",
        slots: [
          { label: "Livre", kind: "free" },
          { time: "10:00", label: "Marcado online", kind: "online" },
          { time: "14:30", label: "Consulta", kind: "base" },
        ],
      },
      {
        name: "Sex",
        slots: [
          { time: "09:00", label: "Consulta", kind: "base" },
          { time: "11:30", label: "Marcado online", kind: "online" },
          { label: "Livre", kind: "free" },
        ],
      },
    ],
  },
  steps: {
    title: "Da inscrição às primeiras marcações",
    sub: "A nossa história com cada consultório começa da mesma forma: um percurso curto, verificado, sem surpresas.",
    items: [
      {
        num: "1",
        title: "Criação da conta",
        text: "Indica a sua actividade e as suas especialidades, em poucos minutos.",
      },
      {
        num: "2",
        title: "Verificação",
        text: "Habilitações e inscrição profissional verificadas antes de qualquer publicação.",
        chip: "Selo «Verificado»",
      },
      {
        num: "3",
        title: "Agenda online",
        text: "As suas disponibilidades, as suas regras: mantém o controlo de cada horário.",
      },
      {
        num: "4",
        title: "Marcações 24/7",
        text: "Os pacientes marcam sozinhos, os lembretes seguem automaticamente.",
      },
    ],
  },
  bento: {
    title: "O que a plataforma faz, concretamente",
    reminders: {
      title: "Lembretes automáticos",
      text: "Cada marcação desencadeia um lembrete antes da consulta. Menos esquecimentos, menos horários perdidos — sem que a sua secretaria tenha de atender o telefone.",
      smsIn: "Lembrete — a sua consulta é amanhã às 14:30. Responda SIM para confirmar.",
      smsOut: "SIM",
    },
    verified: {
      title: "Perfil verificado",
      text: "O selo que os pacientes veem assenta numa verificação real, feita antes da publicação.",
      checks: ["Habilitações verificadas", "Inscrição na Ordem profissional", "Identidade confirmada"],
    },
    languages: {
      title: "Três línguas",
      text: "Os seus pacientes marcam na sua língua; o seu perfil existe nas três.",
      rows: [
        { code: "PT", label: "Marcar consulta" },
        { code: "FR", label: "Prendre rendez-vous" },
        { code: "EN", label: "Book an appointment" },
      ],
    },
    gdpr: {
      title: "RGPD, desde a concepção",
      text: "Os dados do seu consultório e dos seus pacientes são tratados no âmbito do RGPD. Os direitos são respeitados, não contornados.",
      checks: ["Consentimento explícito", "Direito de acesso e de eliminação", "Nenhuma venda de dados"],
    },
  },
  metrics: {
    title: "O que isto muda num consultório",
    footnote:
      "* Valor ilustrativo: o efeito dos lembretes depende da sua actividade e dos seus pacientes.",
    figures: [
      {
        prefix: "−",
        to: 40,
        decimals: 0,
        suffix: " %",
        sup: "*",
        label: "de consultas falhadas, graças aos lembretes",
      },
      { text: "24/7", label: "marcação online, mesmo com o consultório fechado" },
      { to: 3, decimals: 0, label: "línguas — PT · FR · EN — para os seus pacientes" },
    ],
  },
};
