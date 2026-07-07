/** Registry of the 8 background-preview variants (4 refined + 4 bold). */
export type BgVariant = {
  slug: string;
  label: string;
  desc: string;
  bold: boolean;
};

export const BG_VARIANTS: BgVariant[] = [
  { slug: "aurora", label: "Aurora mesh", desc: "Dégradés maillés teal/cobalt/mint, aéré et premium.", bold: false },
  { slug: "blobs", label: "Formes organiques", desc: "Grands blobs flous + grain filmique, profondeur éditoriale.", bold: false },
  { slug: "grid", label: "Grille + arcs", desc: "Points fins + arcs/cercles d'accent, structuré et tech.", bold: false },
  { slug: "waves", label: "Bandes + vagues", desc: "Bandes dégradées séparées par des vagues SVG, fluide.", bold: false },
  { slug: "aurora-bold", label: "Aurora audacieux", desc: "Mesh saturé, contrastes appuyés, lumière franche.", bold: true },
  { slug: "blobs-bold", label: "Formes audacieuses", desc: "Blobs massifs et colorés, composition expressive.", bold: true },
  { slug: "grid-bold", label: "Grille audacieuse", desc: "Grille marquée + formes géométriques fortes.", bold: true },
  { slug: "waves-bold", label: "Vagues audacieuses", desc: "Vagues amples et saturées, énergie maximale.", bold: true },
];

export const BG_SLUGS = BG_VARIANTS.map((v) => v.slug);
