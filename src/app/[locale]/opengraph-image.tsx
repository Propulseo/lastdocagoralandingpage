import { ImageResponse } from "next/og";

import { getTranslations } from "next-intl/server";

/**
 * Carte d'aperçu affichée quand une page du site est partagée (WhatsApp,
 * LinkedIn, Facebook, Twitter).
 *
 * Générée au build plutôt que prise dans les fichiers existants : les seules
 * images de marque disponibles font 6144x4096 pour 280 Ko, un format que
 * plusieurs plateformes refusent. Ici on produit exactement le 1200x630
 * attendu, pour quelques kilo-octets.
 *
 * Next associe automatiquement ce fichier à toutes les pages de ce segment :
 * pas besoin de déclarer `openGraph.images` à la main.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "DocAgora";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "88px",
          background: "linear-gradient(135deg, #0C121E 0%, #244882 100%)",
          color: "#FCFEFE",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            fontSize: "34px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#67CBC7",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: "#67CBC7",
            }}
          />
          DocAgora
        </div>

        <div
          style={{
            marginTop: "28px",
            fontSize: "68px",
            lineHeight: 1.15,
            fontWeight: 700,
            maxWidth: "900px",
          }}
        >
          {t("title")}
        </div>

        <div
          style={{
            marginTop: "26px",
            fontSize: "31px",
            lineHeight: 1.4,
            color: "rgba(252, 254, 254, 0.72)",
            maxWidth: "930px",
          }}
        >
          {t("description")}
        </div>
      </div>
    ),
    size,
  );
}
