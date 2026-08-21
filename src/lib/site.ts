import { defaultLocale, locales, type Locale } from "@/i18n/config";

/**
 * Socle des URL publiques du site.
 *
 * Une seule source de vérité pour : les URL absolues (partages sociaux,
 * canoniques), le sitemap, et les balises hreflang. Sans ça, chaque page
 * réinventait sa façon de construire une URL — c'est exactement ce qui a
 * produit les liens `/pt/blog/...` non canoniques ailleurs dans le projet.
 */

/**
 * Domaine de production. Surchargeable par variable d'environnement pour les
 * préversions Vercel, qui servent le site sur une autre adresse : sans ça,
 * une preview annoncerait les URL de la production dans ses canoniques.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://docagora.pt"
).replace(/\/+$/, "");

/**
 * Code hreflang par locale. Distinct du segment d'URL : l'URL porte `pt`,
 * mais on déclare `pt-PT` à Google parce que le site vise le Portugal et non
 * l'ensemble des pays lusophones.
 */
const HREFLANG: Record<Locale, string> = {
  pt: "pt-PT",
  fr: "fr",
  en: "en",
};

/**
 * Chemin d'une page pour une locale donnée, en respectant `localePrefix:
 * "as-needed"` : le portugais est servi SANS préfixe (`/about`), le français
 * et l'anglais AVEC (`/fr/about`).
 */
export function localizedPath(locale: string, path: string): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return clean === "" ? "/" : clean;
  return `/${locale}${clean}`;
}

/** Même chose, en URL absolue. */
export function localizedUrl(locale: string, path: string): string {
  return `${SITE_URL}${localizedPath(locale, path)}`;
}

/**
 * Table des variantes linguistiques d'une page, au format attendu par
 * `alternates.languages` de Next. `x-default` pointe vers le portugais, qui
 * est la langue de référence du site.
 */
export function languageAlternates(path: string): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const locale of locales) {
    alternates[HREFLANG[locale]] = localizedUrl(locale, path);
  }
  alternates["x-default"] = localizedUrl(defaultLocale, path);
  return alternates;
}

/**
 * Bloc `alternates` complet (canonique + variantes) à poser dans le metadata
 * d'une page.
 */
export function alternatesFor(locale: string, path: string) {
  return {
    canonical: localizedUrl(locale, path),
    languages: languageAlternates(path),
  };
}

/**
 * Routes de production, listées à la main.
 *
 * Les articles de blog ne sont pas ici : leurs slugs sont ajoutés
 * dynamiquement par le sitemap.
 */
export const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/specialties",
  "/blog",
  "/contact",
  "/legal-notice",
  "/privacy-policy",
  "/terms-of-use",
  "/pro",
  "/pro/about",
  "/pro/pricing",
  "/pro/resources",
] as const;
