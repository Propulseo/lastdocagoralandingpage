import type { MetadataRoute } from "next";

/**
 * Les routes de TRAVAIL (maquettes, variantes, previews) sont construites par
 * le build et donc accessibles publiquement. Elles n'ont rien à faire dans un
 * index de recherche : un visiteur qui tomberait dessus verrait une direction
 * abandonnée en croyant voir le produit.
 *
 * On bloque l'exploration plutôt que de supprimer les routes : elles servent
 * encore de référence interne, et une suppression se déciderait à part.
 *
 * Chaque motif est doublé (`/x` et l'ancre locale) parce que le portugais est
 * servi SANS préfixe (`/variants`) alors que FR et EN en portent un
 * (`/fr/variants`).
 */
const WORK_ROUTES = [
  "variants",
  "v2",
  "v-next",
  "preview-fills",
  "about-visual-preview",
  "pro-header-preview",
];

export default function robots(): MetadataRoute.Robots {
  const disallow = WORK_ROUTES.flatMap((r) => [`/${r}`, `/*/${r}`]);

  return {
    rules: [{ userAgent: "*", allow: "/", disallow }],
  };
}
