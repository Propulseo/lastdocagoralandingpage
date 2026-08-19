import type { SpecialtiesCopy } from "./specialtiesCopy";

/**
 * /specialties — português (PT-PT), locale de référence du site.
 *
 * Registre : on s'adresse au visiteur avec « si / o seu », pas « você », et on
 * dit « marcação » plutôt que « agendamento » (brésilien). « Utente » est le mot
 * du système de santé portugais et vaut mieux que « paciente » partout où l'on
 * parle du citoyen face au soin.
 */
export const SPECIALTIES_COPY_PT: SpecialtiesCopy = {
  pageTitle: {
    title: "Especialidades",
    crumb: "Especialidades",
  },

  hero: {
    eyebrow: "16 especialidades médicas",
    titleLead: "Encontre o especialista",
    titleEmphasis: "certo para si.",
    lead: "Profissionais verificados em todas as grandes especialidades, em todo o Portugal.",
    specialtyPlaceholder: "Especialidade ou motivo",
    cityPlaceholder: "Cidade",
    cta: "Pesquisar",
    labelSpecialty: "O que procura?",
    labelCity: "Cidade",
    labelLang: "Idioma",
    chipsLabel: "Acesso direto",
  },

  intro: {
    title: "Todas as especialidades, em todo o Portugal",
    paragraphs: [
      "A DocAgora reúne profissionais de saúde verificados nas grandes especialidades médicas, do clínico geral ao especialista. Pesquise por especialidade, por cidade ou por idioma falado, e veja de imediato quem exerce perto de si e quando.",
      "Cada profissional é analisado e aprovado antes de entrar na plataforma. Sabe a quem se dirige antes de marcar, e a marcação não lhe custa nada.",
    ],
  },

  capabilities: {
    title: "O que pode filtrar",
    lede: "A pesquisa não se limita à especialidade. Três filtros chegam, na maioria das vezes, para encontrar o profissional certo.",
    steps: [
      "Comece pela especialidade — ou pelo motivo, se ainda não souber qual.",
      "Junte a cidade: fica só o que está ao seu alcance.",
      "Precise o idioma — o filtro que muda tudo quando se acabou de chegar.",
    ],
    langWord: "Francês",
    destCap:
      "Resta o profissional certo: verificado, a falar a sua língua, com horários reais e marcação online.",
  },

  approach: {
    title: "A nossa abordagem",
    paragraphs: [
      "Um diretório só vale pela qualidade daquilo que reúne. Em vez de abrir a plataforma ao maior número, cada profissional é analisado e aprovado antes de aparecer. É mais lento, mas evita que o utente tenha de se interrogar sobre quem vai encontrar.",
      "E porque muitos dos nossos utilizadores acabaram de chegar a Portugal, o idioma falado pelo profissional é tratado como um critério de pesquisa de pleno direito, tal como a especialidade ou a cidade.",
    ],
  },

  listTitle: "As especialidades mais procuradas",
  marqueeLabel: "E também",

  sidebar: {
    ctaEyebrow: "Pronto para consultar?",
    ctaTitle: "Encontre o seu profissional",
    ctaLede: "Filtre por especialidade, cidade e idioma falado. A marcação não custa nada.",
    ctaButton: "Pesquisar",
    accountEyebrow: "A sua área",
    accountTitle: "Crie a sua conta",
    accountLede: "Marque online e reúna as suas consultas no mesmo sítio. Gratuito para os utentes.",
    accountButton: "Criar conta",
  },
};
