import { defaultLocale } from "@/i18n/config";
import {
  BODY_CONSULTAR_LINGUA,
  BODY_ENCONTRAR_MEDICO,
  BODY_PREPARAR_CONSULTA,
} from "@/lib/blogBodies";
import {
  BODY_CONSULTAR_LINGUA_FR,
  BODY_ENCONTRAR_MEDICO_FR,
  BODY_PREPARAR_CONSULTA_FR,
} from "@/lib/blogBodiesFr";
import {
  BODY_CONSULTAR_LINGUA_EN,
  BODY_ENCONTRAR_MEDICO_EN,
  BODY_PREPARAR_CONSULTA_EN,
} from "@/lib/blogBodiesEn";

/**
 * Source unique des articles du blog (cartes, listage, détail et section
 * «Conseils santé» de /about lisent tous ici), traduite par locale.
 *
 * Le slug est stable d'une langue à l'autre : seul le contenu change. Les locales
 * absentes (en) retombent sur `defaultLocale` (pt). Les corps vivent dans
 * lib/blogBodies*.ts, les libellés d'interface dans lib/blogStrings.ts.
 */

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "gallery"; images: string[] };

interface BlogContent {
  title: string;
  excerpt: string;
  /** Sert de catégorie et d'étiquette sur la carte. */
  category: string;
  /** Mots-clés : nuage de la sidebar + recherche (non affichés sur l'article). */
  tags: string[];
  author: string;
  /** Date déjà rédigée dans la langue, ex. «18 de junho de 2026». */
  date: string;
  body: BlogBlock[];
}

interface BlogPostSource {
  id: string;
  slug: string;
  image: string;
  thumb: string;
  content: Record<string, BlogContent>;
}

/** Article résolu pour une locale : les champs traduits sont aplatis. */
export interface BlogPost extends BlogContent {
  id: string;
  slug: string;
  image: string;
  thumb: string;
}

const SOURCES: BlogPostSource[] = [
  {
    id: "1",
    slug: "encontrar-medico-em-portugal",
    image: "/assets/images/client-photos/letzai-499bd640-87be-49d7-88ef-0b44484d2c29.png",
    thumb: "/assets/images/client-photos/letzai-499bd640-87be-49d7-88ef-0b44484d2c29.png",
    content: {
      pt: {
        title: "Encontrar médico em Portugal quando se acaba de chegar",
        excerpt:
          "Acabou de se instalar e não sabe por onde começar. Número de utente, médico de família, setor privado: este guia põe as coisas por ordem e diz-lhe o que fazer primeiro.",
        category: "Guia",
        tags: ["Portugal", "Médico de família", "SNS", "Expatriados"],
        author: "A equipa DocAgora",
        date: "18 de junho de 2026",
        body: BODY_ENCONTRAR_MEDICO,
      },
      fr: {
        title: "Trouver un médecin au Portugal quand on vient d'arriver",
        excerpt:
          "Vous venez de vous installer et vous ne savez pas par où commencer. Numéro d'utente, médecin de famille, secteur privé : ce guide remet les choses dans l'ordre et vous dit quoi faire en premier.",
        category: "Guide",
        tags: ["Portugal", "Médecin de famille", "SNS", "Expatriés"],
        author: "L'équipe DocAgora",
        date: "18 juin 2026",
        body: BODY_ENCONTRAR_MEDICO_FR,
      },
      en: {
        title: "Finding a doctor in Portugal when you've just arrived",
        excerpt:
          "You've just settled in and don't know where to start. Utente number, family doctor, private sector: this guide puts things in order and tells you what to do first.",
        category: "Guide",
        tags: ["Portugal", "Family doctor", "SNS", "Expats"],
        author: "The DocAgora team",
        date: "18 June 2026",
        body: BODY_ENCONTRAR_MEDICO_EN,
      },
    },
  },
  {
    id: "2",
    slug: "consultar-na-sua-lingua",
    image: "/assets/images/client-photos/letzai-47889e68-bdf4-4e85-8848-837e4bca9a84.png",
    thumb: "/assets/images/client-photos/letzai-47889e68-bdf4-4e85-8848-837e4bca9a84.png",
    content: {
      pt: {
        title: "Consultar na sua língua: o que muda",
        excerpt:
          "Descrever uma dor numa língua que se domina mal é arriscar-se a ser mal compreendido. Porque é que o filtro por língua falada não é um conforto, mas uma questão de segurança.",
        category: "Conselhos",
        tags: ["Línguas", "Segurança", "Comunicação"],
        author: "A equipa DocAgora",
        date: "3 de julho de 2026",
        body: BODY_CONSULTAR_LINGUA,
      },
      fr: {
        title: "Consulter dans sa langue : ce que ça change",
        excerpt:
          "Décrire une douleur dans une langue que l'on maîtrise mal, c'est risquer d'être mal compris. Pourquoi le filtre par langue parlée n'est pas un confort mais une question de sécurité.",
        category: "Conseils",
        tags: ["Langues", "Sécurité", "Communication"],
        author: "L'équipe DocAgora",
        date: "3 juillet 2026",
        body: BODY_CONSULTAR_LINGUA_FR,
      },
      en: {
        title: "Consulting in your own language: what changes",
        excerpt:
          "Describing pain in a language you don't master well means risking being misunderstood. Why filtering by spoken language isn't a comfort but a matter of safety.",
        category: "Advice",
        tags: ["Languages", "Safety", "Communication"],
        author: "The DocAgora team",
        date: "3 July 2026",
        body: BODY_CONSULTAR_LINGUA_EN,
      },
    },
  },
  {
    id: "3",
    slug: "preparar-a-primeira-consulta",
    image: "/assets/images/client-photos/letzai-fb254101-a64a-4dda-90f3-8f72506840fb.png",
    thumb: "/assets/images/client-photos/letzai-fb254101-a64a-4dda-90f3-8f72506840fb.png",
    content: {
      pt: {
        title: "Preparar a primeira consulta, passo a passo",
        excerpt:
          "Os documentos a levar, as perguntas a preparar, o que saber sobre prazos e preços. O suficiente para chegar tranquilo a uma primeira marcação.",
        category: "Prática",
        tags: ["Primeira consulta", "Marcação", "Preparação"],
        author: "A equipa DocAgora",
        date: "22 de julho de 2026",
        body: BODY_PREPARAR_CONSULTA,
      },
      fr: {
        title: "Préparer sa première consultation, étape par étape",
        excerpt:
          "Les documents à emporter, les questions à préparer, ce qu'il faut savoir sur les délais et les tarifs. De quoi arriver serein à un premier rendez-vous.",
        category: "Pratique",
        tags: ["Première consultation", "Rendez-vous", "Préparation"],
        author: "L'équipe DocAgora",
        date: "22 juillet 2026",
        body: BODY_PREPARAR_CONSULTA_FR,
      },
      en: {
        title: "Preparing for your first appointment, step by step",
        excerpt:
          "The documents to bring, the questions to prepare, what to know about timeframes and prices. Enough to arrive relaxed at a first appointment.",
        category: "Practical",
        tags: ["First appointment", "Appointment", "Preparation"],
        author: "The DocAgora team",
        date: "22 July 2026",
        body: BODY_PREPARAR_CONSULTA_EN,
      },
    },
  },
];

function resolve(source: BlogPostSource, locale: string): BlogPost {
  const content = source.content[locale] ?? source.content[defaultLocale];
  return {
    id: source.id,
    slug: source.slug,
    image: source.image,
    thumb: source.thumb,
    ...content,
  };
}

/** Tous les articles, traduits pour la locale. */
export function getBlogPosts(locale: string): BlogPost[] {
  return SOURCES.map((source) => resolve(source, locale));
}

/** Article correspondant à un slug (traduit), ou undefined s'il n'existe pas. */
export function getPostBySlug(locale: string, slug: string): BlogPost | undefined {
  const source = SOURCES.find((item) => item.slug === slug);
  return source ? resolve(source, locale) : undefined;
}

/** Slugs pour generateStaticParams (indépendants de la locale). */
export function getBlogSlugs(): string[] {
  return SOURCES.map((source) => source.slug);
}

/** Article précédent et suivant (traduits), pour la navigation du détail. */
export function getAdjacentPosts(
  locale: string,
  slug: string,
): { prev: BlogPost | null; next: BlogPost | null } {
  const index = SOURCES.findIndex((source) => source.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? resolve(SOURCES[index - 1], locale) : null,
    next: index < SOURCES.length - 1 ? resolve(SOURCES[index + 1], locale) : null,
  };
}

/** Minuscule sans accents, pour une recherche tolérante (medico ~ médico). */
function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

/**
 * Articles de la locale filtrés par la recherche (titre, chapô, catégorie,
 * mots-clés). Requête vide -> tous les articles.
 */
export function searchBlogPosts(locale: string, query: string): BlogPost[] {
  const posts = getBlogPosts(locale);
  const q = normalize(query.trim());
  if (!q) return posts;
  return posts.filter((post) =>
    normalize(
      `${post.title} ${post.excerpt} ${post.category} ${post.tags.join(" ")}`,
    ).includes(q),
  );
}

/** Union dédupliquée des mots-clés de la locale, pour le nuage de la sidebar. */
export function getAllTags(locale: string): string[] {
  const seen = new Set<string>();
  const tags: string[] = [];
  for (const post of getBlogPosts(locale)) {
    for (const tag of post.tags) {
      const key = tag.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        tags.push(tag);
      }
    }
  }
  return tags;
}

/** Rubriques de la locale avec leur nombre d'articles, dérivées des articles. */
export function getCategories(locale: string): { label: string; count: number }[] {
  const byKey = new Map<string, { label: string; count: number }>();
  for (const post of getBlogPosts(locale)) {
    const key = post.category.toLowerCase();
    const entry = byKey.get(key);
    if (entry) entry.count += 1;
    else byKey.set(key, { label: post.category, count: 1 });
  }
  return [...byKey.values()];
}

/** Vrai si la recherche courante correspond exactement à ce libellé (filtre actif). */
export function isActiveFilter(query: string | undefined, label: string): boolean {
  return query !== undefined && normalize(query.trim()) === normalize(label);
}
