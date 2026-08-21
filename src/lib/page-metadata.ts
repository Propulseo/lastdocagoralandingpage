import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { alternatesFor, localizedUrl } from "@/lib/site";

/**
 * Métadonnées d'une page : titre, description, URL canonique, variantes de
 * langue et aperçu de partage.
 *
 * Pourquoi un helper plutôt qu'un bloc posé une fois sur le layout : le
 * canonical et le hreflang dépendent du CHEMIN de la page. Déclarés au niveau
 * du layout, toutes les pages hériteraient de l'adresse de l'accueil — ce qui
 * revient à dire à Google que chaque page est en fait la page d'accueil.
 * Chaque page doit donc passer son propre `path`.
 *
 * `metadataBase` et les icônes, eux, restent sur le layout : ils sont
 * identiques partout.
 */

type Base = {
  locale: string;
  /** Chemin sans préfixe de langue, tel qu'écrit pour le portugais : "/pro/about". */
  path: string;
};

/** Variante lisant le titre et la description dans les fichiers de traduction. */
export async function pageMetadata({
  locale,
  path,
  namespace,
}: Base & { namespace: string }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  return buildMetadata({
    locale,
    path,
    title: t("title"),
    description: t("description"),
  });
}

/** Variante pour les pages dont le texte vient d'ailleurs (légal, articles). */
export function buildMetadata({
  locale,
  path,
  title,
  description,
}: Base & { title: string; description?: string }): Metadata {
  return {
    title,
    ...(description ? { description } : {}),
    alternates: alternatesFor(locale, path),
    openGraph: {
      type: "website",
      siteName: "DocAgora",
      locale,
      url: localizedUrl(locale, path),
      title,
      ...(description ? { description } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      ...(description ? { description } : {}),
    },
  };
}
