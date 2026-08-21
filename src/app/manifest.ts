import type { MetadataRoute } from "next";

/**
 * Manifeste web — ce que le téléphone lit quand un visiteur ajoute le site à
 * son écran d'accueil, et ce qui donne sa couleur à la barre du navigateur
 * sur Android.
 *
 * `icons` pointe vers le fichier existant, qui fait aujourd'hui 6144x4096
 * pour 280 Ko : à remplacer par de vraies icônes 192 et 512 px lors de la
 * passe sur les images.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DocAgora",
    short_name: "DocAgora",
    description:
      "Encontre e marque consulta com profissionais de saúde em Portugal.",
    start_url: "/",
    display: "standalone",
    background_color: "#FCFEFE",
    theme_color: "#244882",
    icons: [
      {
        src: "/assets/images/favicon/favicon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
