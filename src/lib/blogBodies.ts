import type { BlogBlock } from "@/lib/blog";

/**
 * Corpo dos artigos do blog, em PT-PT.
 *
 * Separado de lib/blog.ts (metadados + helpers) para que nenhum dos dois passe
 * das ~200 linhas. Cada corpo é uma lista de blocos tipados, desenhada a partir
 * do template Medically (parágrafo, subtítulo, citação, lista, galeria).
 */

export const BODY_ENCONTRAR_MEDICO: BlogBlock[] = [
  {
    type: "p",
    text: "Mudar de país tem sempre uma parte de vertigem, e a saúde é uma das primeiras coisas que nos faz sentir perdidos. O sistema português não funciona como o do país de onde vem, os nomes são outros e ninguém nos entrega um manual à chegada. A boa notícia é que os primeiros passos são simples, desde que se faça cada um pela ordem certa.",
  },
  { type: "h3", text: "Primeiro passo: o número de utente" },
  {
    type: "p",
    text: "Quase tudo no Serviço Nacional de Saúde (SNS) começa pelo número de utente. É o identificador que o liga ao sistema público e que lhe pedem em qualquer consulta, farmácia ou urgência. Se já tem residência legal, pode pedi-lo no centro de saúde da sua área de morada, apresentando um documento de identificação e um comprovativo de residência.",
  },
  {
    type: "p",
    text: "Enquanto o número não chega, guarde os contactos úteis: a linha SNS 24 (808 24 24 24) responde a dúvidas de saúde a qualquer hora e em várias línguas, e evita muitas idas desnecessárias às urgências.",
  },
  { type: "h3", text: "Médico de família: como ser atribuído" },
  {
    type: "p",
    text: "O médico de família é o seu ponto de entrada para o resto do sistema: é ele que acompanha o historial, prescreve e encaminha para especialidades. A atribuição faz-se no centro de saúde, e nem sempre é imediata — em algumas zonas há lista de espera. Inscreva-se assim que puder, mesmo que o acompanhamento só comece mais tarde.",
  },
  {
    type: "list",
    items: [
      "Documento de identificação (cartão de cidadão, passaporte ou título de residência)",
      "Comprovativo de morada na área do centro de saúde",
      "Número de utente, se já o tiver atribuído",
      "Número de identificação fiscal (NIF), muitas vezes pedido no mesmo balcão",
    ],
  },
  {
    type: "quote",
    text: "Não espere estar doente para tratar da inscrição. O momento certo para encontrar um médico é antes de precisar dele.",
  },
  { type: "h3", text: "Quando o setor privado faz sentido" },
  {
    type: "p",
    text: "O setor privado não substitui o SNS, mas resolve situações concretas: uma consulta rápida sem lista de espera, um especialista numa língua que domina, um horário que se ajusta ao trabalho. Muitos seguros de saúde comparticipam parte do valor, e os preços das primeiras consultas costumam estar anunciados à partida.",
  },
  {
    type: "gallery",
    images: ["/medically/images/blog/img-4.jpg", "/medically/images/blog/img-5.jpg"],
  },
  {
    type: "p",
    text: "É aqui que o DocAgora ajuda: reúne os profissionais por especialidade, cidade e língua falada, com os perfis lado a lado para comparar. Em vez de telefonar às cegas, vê quem está disponível perto de si e marca online — sem chamadas, sem sala de espera ao telefone.",
  },
];

export const BODY_CONSULTAR_LINGUA: BlogBlock[] = [
  {
    type: "p",
    text: "Há uma diferença enorme entre pedir um café e explicar uma dor. Numa consulta, cada palavra conta: o sítio exato, há quanto tempo, se aperta ou se arde, o que já tomou. Fazer isto numa língua que se domina mal não é só desconfortável — muda a qualidade daquilo que o médico consegue perceber.",
  },
  { type: "h3", text: "Um sintoma mal descrito é um diagnóstico mais difícil" },
  {
    type: "p",
    text: "O médico trabalha com aquilo que lhe é dito. Se as palavras faltam, o doente simplifica, encolhe os ombros, responde «mais ou menos». Detalhes que pareciam secundários ficam de fora, e são muitas vezes esses detalhes que orientam o diagnóstico. A barreira da língua não cria mal-entendidos ruidosos; cria silêncios.",
  },
  {
    type: "p",
    text: "No sentido inverso, as instruções também se perdem. Uma dose, a hora de tomar um medicamento, um sinal de alerta a vigiar — se a explicação não for entendida, o tratamento mais simples falha em casa.",
  },
  {
    type: "quote",
    text: "Ser atendido na sua língua não é um luxo de conforto. É a condição para que aquilo que sente chegue inteiro a quem o trata.",
  },
  { type: "h3", text: "Não é só uma questão de vocabulário" },
  {
    type: "list",
    items: [
      "Descrever a intensidade e a evolução de um sintoma com precisão",
      "Contar o historial e as alergias sem deixar nada de fora",
      "Compreender um diagnóstico e dar consentimento com conhecimento de causa",
      "Sair da consulta a saber exatamente o que fazer a seguir",
    ],
  },
  {
    type: "p",
    text: "Um intérprete ajuda, mas nem sempre está disponível, e nem toda a gente quer uma terceira pessoa a ouvir a sua consulta. Poder escolher à partida um profissional que fala a sua língua resolve o problema na origem.",
  },
  { type: "h3", text: "Como filtrar por língua no DocAgora" },
  {
    type: "p",
    text: "Cada perfil no DocAgora indica as línguas faladas pelo profissional. Ao pesquisar, pode filtrar por essa língua ao mesmo tempo que pela especialidade e pela cidade — e ver só os profissionais com quem se vai entender desde a primeira palavra.",
  },
  {
    type: "p",
    text: "Para quem chegou há pouco, ou para quem simplesmente prefere falar da sua saúde na língua materna, é uma forma discreta de tornar a consulta mais segura e menos intimidante.",
  },
];

export const BODY_PREPARAR_CONSULTA: BlogBlock[] = [
  {
    type: "p",
    text: "Uma primeira consulta corre sempre melhor quando se chega preparado. Não é preciso muito: alguns documentos, uma lista de perguntas e uma ideia clara do que esperar. Vinte minutos de preparação evitam a sensação de ter saído sem respostas.",
  },
  { type: "h3", text: "O que levar consigo" },
  {
    type: "list",
    items: [
      "Documento de identificação e número de utente",
      "Lista dos medicamentos que toma, com as doses",
      "Exames e análises anteriores que sejam relevantes",
      "Dados do seguro de saúde, se tiver e se a consulta for no privado",
    ],
  },
  {
    type: "p",
    text: "Se já teve acompanhamento noutro país, leve o que conseguir do seu historial. Mesmo um resumo simples poupa tempo e evita repetir exames que já fez.",
  },
  { type: "h3", text: "As perguntas que vale a pena preparar" },
  {
    type: "p",
    text: "No momento, é fácil esquecer metade do que queríamos perguntar. Escreva as dúvidas antes, por ordem de importância, e comece pela que mais o preocupa — caso o tempo aperte, garante que o essencial fica respondido.",
  },
  {
    type: "list",
    items: [
      "Qual é a causa provável daquilo que sinto?",
      "Que exames ou passos se seguem, e em que prazos?",
      "O tratamento tem efeitos a vigiar em casa?",
      "Perante que sinais devo voltar a procurar ajuda?",
    ],
  },
  {
    type: "quote",
    text: "A pergunta que não se faz é a dúvida que se leva para casa. Não há perguntas a mais numa consulta.",
  },
  { type: "h3", text: "Prazos e preços: sem surpresas" },
  {
    type: "p",
    text: "No privado, o valor da primeira consulta costuma estar indicado antes da marcação — vale a pena confirmá-lo, assim como o que o seguro comparticipa. Chegue alguns minutos antes: há quase sempre uma ficha a preencher da primeira vez.",
  },
  {
    type: "p",
    text: "No DocAgora, vê a disponibilidade real de cada profissional e marca a hora que lhe convém, sem telefonemas. Chegar preparado a uma consulta já escolhida com calma é, muitas vezes, metade do caminho para sair dela tranquilo.",
  },
];
