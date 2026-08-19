import type { BlogBlock } from "@/lib/blog";

/**
 * Corps des articles du blog, en français.
 *
 * Pendant FR de lib/blogBodies.ts (PT). Séparé pour garder chaque fichier sous
 * ~200 lignes. Traduction fidèle des mêmes articles, voix DocAgora conservée.
 */

export const BODY_ENCONTRAR_MEDICO_FR: BlogBlock[] = [
  {
    type: "p",
    text: "Changer de pays a toujours sa part de vertige, et la santé est l'une des premières choses qui nous fait sentir perdu. Le système portugais ne fonctionne pas comme celui du pays d'où l'on vient, les noms sont différents et personne ne nous remet un mode d'emploi à l'arrivée. La bonne nouvelle, c'est que les premières démarches sont simples, à condition de les faire dans le bon ordre.",
  },
  { type: "h3", text: "Première étape : le numéro d'utente" },
  {
    type: "p",
    text: "Presque tout, dans le Service national de santé (SNS), commence par le numéro d'utente. C'est l'identifiant qui vous relie au système public et qu'on vous demande à chaque consultation, en pharmacie ou aux urgences. Si vous avez déjà une résidence légale, vous pouvez le demander au centre de santé de votre lieu de résidence, avec une pièce d'identité et un justificatif de domicile.",
  },
  {
    type: "p",
    text: "En attendant qu'il arrive, gardez les contacts utiles : la ligne SNS 24 (808 24 24 24) répond aux questions de santé à toute heure et en plusieurs langues, et évite bien des passages inutiles aux urgences.",
  },
  { type: "h3", text: "Médecin de famille : comment se le voir attribuer" },
  {
    type: "p",
    text: "Le médecin de famille est votre porte d'entrée vers le reste du système : c'est lui qui suit votre historique, prescrit et oriente vers les spécialités. L'attribution se fait au centre de santé, et n'est pas toujours immédiate — dans certaines zones, il y a une liste d'attente. Inscrivez-vous dès que possible, même si le suivi ne commence que plus tard.",
  },
  {
    type: "list",
    items: [
      "Pièce d'identité (carte de citoyen, passeport ou titre de séjour)",
      "Justificatif de domicile dans la zone du centre de santé",
      "Numéro d'utente, si vous l'avez déjà",
      "Numéro d'identification fiscale (NIF), souvent demandé au même guichet",
    ],
  },
  {
    type: "quote",
    text: "N'attendez pas d'être malade pour vous inscrire. Le bon moment pour trouver un médecin, c'est avant d'en avoir besoin.",
  },
  { type: "h3", text: "Quand le secteur privé a du sens" },
  {
    type: "p",
    text: "Le secteur privé ne remplace pas le SNS, mais règle des situations concrètes : une consultation rapide sans liste d'attente, un spécialiste dans une langue que vous maîtrisez, un horaire qui s'accorde au travail. Beaucoup d'assurances santé remboursent une partie du montant, et le prix des premières consultations est en général affiché d'avance.",
  },
  {
    type: "gallery",
    images: ["/medically/images/blog/img-4.jpg", "/medically/images/blog/img-5.jpg"],
  },
  {
    type: "p",
    text: "C'est là que DocAgora aide : il réunit les professionnels par spécialité, ville et langue parlée, avec les profils côte à côte pour comparer. Au lieu de téléphoner à l'aveugle, vous voyez qui est disponible près de chez vous et vous prenez rendez-vous en ligne — sans appel, sans attente au téléphone.",
  },
];

export const BODY_CONSULTAR_LINGUA_FR: BlogBlock[] = [
  {
    type: "p",
    text: "Il y a une énorme différence entre commander un café et décrire une douleur. En consultation, chaque mot compte : l'endroit exact, depuis combien de temps, si ça serre ou si ça brûle, ce que vous avez déjà pris. Faire cela dans une langue que l'on maîtrise mal n'est pas seulement inconfortable — cela change la qualité de ce que le médecin parvient à comprendre.",
  },
  { type: "h3", text: "Un symptôme mal décrit, c'est un diagnostic plus difficile" },
  {
    type: "p",
    text: "Le médecin travaille avec ce qu'on lui dit. Si les mots manquent, le patient simplifie, hausse les épaules, répond « à peu près ». Des détails qui semblaient secondaires passent à la trappe, et ce sont souvent eux qui orientent le diagnostic. La barrière de la langue ne crée pas de malentendus bruyants ; elle crée des silences.",
  },
  {
    type: "p",
    text: "Dans l'autre sens, les consignes se perdent aussi. Une dose, l'heure de prise d'un médicament, un signe d'alerte à surveiller — si l'explication n'est pas comprise, le traitement le plus simple échoue à la maison.",
  },
  {
    type: "quote",
    text: "Être reçu dans sa langue n'est pas un luxe de confort. C'est la condition pour que ce que vous ressentez arrive intact à celui qui vous soigne.",
  },
  { type: "h3", text: "Ce n'est pas qu'une question de vocabulaire" },
  {
    type: "list",
    items: [
      "Décrire l'intensité et l'évolution d'un symptôme avec précision",
      "Raconter ses antécédents et ses allergies sans rien oublier",
      "Comprendre un diagnostic et donner un consentement éclairé",
      "Sortir de la consultation en sachant exactement quoi faire ensuite",
    ],
  },
  {
    type: "p",
    text: "Un interprète aide, mais il n'est pas toujours disponible, et tout le monde ne souhaite pas une troisième personne à l'écoute de sa consultation. Pouvoir choisir d'emblée un professionnel qui parle votre langue règle le problème à la source.",
  },
  { type: "h3", text: "Comment filtrer par langue sur DocAgora" },
  {
    type: "p",
    text: "Chaque profil sur DocAgora indique les langues parlées par le professionnel. En recherchant, vous pouvez filtrer par cette langue en même temps que par spécialité et par ville — et ne voir que les professionnels avec qui vous vous comprendrez dès le premier mot.",
  },
  {
    type: "p",
    text: "Pour qui vient d'arriver, ou pour qui préfère simplement parler de sa santé dans sa langue maternelle, c'est une façon discrète de rendre la consultation plus sûre et moins intimidante.",
  },
];

export const BODY_PREPARAR_CONSULTA_FR: BlogBlock[] = [
  {
    type: "p",
    text: "Une première consultation se passe toujours mieux quand on arrive préparé. Il n'en faut pas beaucoup : quelques documents, une liste de questions et une idée claire de ce à quoi s'attendre. Vingt minutes de préparation évitent l'impression d'être reparti sans réponses.",
  },
  { type: "h3", text: "Ce qu'il faut emporter" },
  {
    type: "list",
    items: [
      "Pièce d'identité et numéro d'utente",
      "Liste des médicaments que vous prenez, avec les doses",
      "Examens et analyses antérieurs qui sont pertinents",
      "Informations de votre assurance santé, si vous en avez une et si la consultation est dans le privé",
    ],
  },
  {
    type: "p",
    text: "Si vous avez déjà été suivi dans un autre pays, emportez ce que vous pouvez de votre historique. Même un résumé simple fait gagner du temps et évite de refaire des examens déjà passés.",
  },
  { type: "h3", text: "Les questions qui valent la peine d'être préparées" },
  {
    type: "p",
    text: "Sur le moment, il est facile d'oublier la moitié de ce qu'on voulait demander. Écrivez vos questions à l'avance, par ordre d'importance, et commencez par celle qui vous préoccupe le plus — si le temps manque, l'essentiel aura été traité.",
  },
  {
    type: "list",
    items: [
      "Quelle est la cause probable de ce que je ressens ?",
      "Quels examens ou étapes suivent, et dans quels délais ?",
      "Le traitement a-t-il des effets à surveiller à la maison ?",
      "Devant quels signes dois-je reconsulter ?",
    ],
  },
  {
    type: "quote",
    text: "La question qu'on ne pose pas, c'est le doute qu'on ramène à la maison. Il n'y a pas de questions de trop en consultation.",
  },
  { type: "h3", text: "Délais et prix : sans surprise" },
  {
    type: "p",
    text: "Dans le privé, le prix de la première consultation est en général indiqué avant la prise de rendez-vous — cela vaut la peine de le confirmer, tout comme ce que l'assurance rembourse. Arrivez quelques minutes en avance : il y a presque toujours une fiche à remplir la première fois.",
  },
  {
    type: "p",
    text: "Sur DocAgora, vous voyez la disponibilité réelle de chaque professionnel et vous réservez l'heure qui vous convient, sans coups de fil. Arriver préparé à une consultation déjà choisie au calme, c'est souvent la moitié du chemin pour en ressortir tranquille.",
  },
];
