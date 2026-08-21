import type { MetadataRoute } from "next";

import { locales } from "@/i18n/config";
import { getBlogSlugs } from "@/lib/blog";
import { PUBLIC_ROUTES, languageAlternates, localizedUrl } from "@/lib/site";

/**
 * Sitemap XML — la liste des pages que Google doit connaître.
 *
 * Sans lui, un moteur ne découvre les pages qu'en suivant les liens internes :
 * plus lent, moins fiable, et surtout incapable de comprendre que `/about`,
 * `/fr/about` et `/en/about` sont trois langues d'une même page. C'est le rôle
 * du bloc `alternates` posé sur chaque entrée.
 *
 * Les routes de travail n'y figurent pas : elles sont listées dans
 * `WORK_ROUTES` de robots.ts, qui les bloque déjà à l'exploration.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths: string[] = [
    ...PUBLIC_ROUTES,
    ...getBlogSlugs().map((slug) => `/blog/${slug}`),
  ];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: localizedUrl(locale, path),
      alternates: { languages: languageAlternates(path) },
      changeFrequency: changeFrequencyFor(path),
      priority: priorityFor(path),
    })),
  );
}

/** L'accueil prime, puis les pages d'entrée, puis le légal en bout de chaîne. */
function priorityFor(path: string): number {
  if (path === "/" || path === "/pro") return 1;
  if (path.startsWith("/legal") || path.startsWith("/privacy") || path.startsWith("/terms")) {
    return 0.3;
  }
  if (path.startsWith("/blog/")) return 0.6;
  return 0.8;
}

function changeFrequencyFor(path: string): "weekly" | "monthly" | "yearly" {
  if (path === "/blog") return "weekly";
  if (path.startsWith("/legal") || path.startsWith("/privacy") || path.startsWith("/terms")) {
    return "yearly";
  }
  return "monthly";
}
