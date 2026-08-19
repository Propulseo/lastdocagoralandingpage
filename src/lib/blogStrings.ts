import { defaultLocale } from "@/i18n/config";

/**
 * Libellés d'interface du blog, par locale.
 *
 * Le contenu des articles vit dans lib/blog.ts ; ici, seuls les textes de
 * l'habillage (barre latérale, fil d'Ariane, boutons, titres de section). Le
 * nuage de mots-clés et les rubriques (avec leur compte) sont dérivés des
 * articles (getAllTags / getCategories). Les trois locales sont écrites ; une
 * locale inconnue retombe sur `defaultLocale` (pt).
 */

export interface BlogStrings {
  pageTitle: string;
  heroSubtitle: string;
  homeLabel: string;
  crumb: string;
  metaBy: string;
  readMore: string;
  prevLabel: string;
  nextLabel: string;
  searchNoResults: string;
  resultsFor: string;
  clearFilter: string;
  sectionTitle: string;
  sectionSubtitle: string;
  /** Masthead : pastille de l'article mis à la une. */
  featuredLabel: string;
  /** Masthead : pastille « toutes les rubriques » (filtre neutre). */
  allCategories: string;
  /** Clôture conversion en bas de page (la page finissait sans appel). */
  closing: {
    eyebrow: string;
    title: string;
    sub: string;
    cta: string;
  };
  sidebar: {
    searchTitle: string;
    searchPlaceholder: string;
    categoriesTitle: string;
    recentTitle: string;
    tagsTitle: string;
  };
}

const STRINGS: Record<string, BlogStrings> = {
  pt: {
    pageTitle: "Conselhos de saúde",
    heroSubtitle:
      "Referências e conselhos para cuidar bem da saúde em Portugal — residentes, expatriados e viajantes.",
    homeLabel: "Início",
    crumb: "Conselhos de saúde",
    metaBy: "Por",
    readMore: "LER MAIS…",
    prevLabel: "Artigo anterior",
    nextLabel: "Artigo seguinte",
    searchNoResults: "Nenhum artigo corresponde à sua pesquisa.",
    resultsFor: "Resultados para",
    clearFilter: "Ver todos os artigos",
    sectionTitle: "Conselhos de saúde",
    sectionSubtitle: "Os nossos artigos mais recentes",
    featuredLabel: "Em destaque",
    allCategories: "Todos os temas",
    closing: {
      eyebrow: "Marcar consulta",
      title: "Encontre um profissional que fala a sua língua",
      sub: "Pesquisa por especialidade, cidade e língua. Disponibilidades reais, marcação online, gratuito para os pacientes.",
      cta: "Iniciar uma pesquisa",
    },
    sidebar: {
      searchTitle: "Pesquisar",
      searchPlaceholder: "Pesquisar um artigo…",
      categoriesTitle: "Categorias",
      recentTitle: "Artigos relacionados",
      tagsTitle: "Etiquetas",
    },
  },
  fr: {
    pageTitle: "Conseils santé",
    heroSubtitle:
      "Repères et conseils pour bien se soigner au Portugal — résidents, expatriés et voyageurs.",
    homeLabel: "Accueil",
    crumb: "Conseils santé",
    metaBy: "Par",
    readMore: "LIRE LA SUITE…",
    prevLabel: "Article précédent",
    nextLabel: "Article suivant",
    searchNoResults: "Aucun article ne correspond à votre recherche.",
    resultsFor: "Résultats pour",
    clearFilter: "Voir tous les articles",
    sectionTitle: "Conseils santé",
    sectionSubtitle: "Nos derniers articles",
    featuredLabel: "À la une",
    allCategories: "Toutes les rubriques",
    closing: {
      eyebrow: "Prendre rendez-vous",
      title: "Trouvez un praticien qui parle votre langue",
      sub: "Recherche par spécialité, ville et langue. Disponibilités réelles, réservation en ligne, gratuit pour les patients.",
      cta: "Lancer une recherche",
    },
    sidebar: {
      searchTitle: "Rechercher",
      searchPlaceholder: "Rechercher un article…",
      categoriesTitle: "Rubriques",
      recentTitle: "Articles liés",
      tagsTitle: "Mots-clés",
    },
  },
  en: {
    pageTitle: "Health advice",
    heroSubtitle:
      "Guidance and advice to look after your health in Portugal — residents, expats and travellers.",
    homeLabel: "Home",
    crumb: "Health advice",
    metaBy: "By",
    readMore: "READ MORE…",
    prevLabel: "Previous article",
    nextLabel: "Next article",
    searchNoResults: "No article matches your search.",
    resultsFor: "Results for",
    clearFilter: "Show all articles",
    sectionTitle: "Health advice",
    sectionSubtitle: "Our latest articles",
    featuredLabel: "Featured",
    allCategories: "All topics",
    closing: {
      eyebrow: "Book an appointment",
      title: "Find a practitioner who speaks your language",
      sub: "Search by specialty, city and language. Real availability, online booking, free for patients.",
      cta: "Start a search",
    },
    sidebar: {
      searchTitle: "Search",
      searchPlaceholder: "Search an article…",
      categoriesTitle: "Categories",
      recentTitle: "Related articles",
      tagsTitle: "Tags",
    },
  },
};

/** Libellés du blog pour la locale, avec repli sur `defaultLocale`. */
export function getBlogStrings(locale: string): BlogStrings {
  return STRINGS[locale] ?? STRINGS[defaultLocale];
}
