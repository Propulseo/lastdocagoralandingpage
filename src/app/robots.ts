import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

/**
 * Les anciennes routes de travail (v2, v-next, variants, preview-fills,
 * about-visual-preview, pro-header-preview) ont été supprimées du projet :
 * il n'y a plus rien à bloquer, toutes les pages construites sont des pages
 * de production destinées à être vues.
 *
 * Si de nouvelles pages de travail apparaissent un jour, il faudra les
 * exclure ici à la main — ce n'est pas automatique.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
