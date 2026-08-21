"use client";

import { useTranslations } from "next-intl";

import { useConsent } from "@/components/analytics/ConsentProvider";
import { CONTACT_MAP_SRC } from "@/app/[locale]/(patient)/contact/_medically/contactCopy";

/**
 * Carte de la page contact, chargée seulement après consentement.
 *
 * L'iframe Google Maps envoie l'adresse IP du visiteur à Google dès
 * l'affichage de la page. Demander l'accord pour la mesure d'audience tout en
 * laissant cette carte se charger d'office reviendrait à demander la
 * permission d'un côté et à s'en passer de l'autre.
 *
 * Tant que l'accord n'est pas donné, on affiche un bloc de remplacement avec
 * un lien vers Google Maps : la personne garde l'information, et c'est elle
 * qui décide d'ouvrir le service tiers.
 */
export default function ConsentedMap({ title }: { title: string }) {
  const t = useTranslations("cookies");
  const { consent } = useConsent();

  if (consent === "granted") {
    return (
      <iframe
        className="pat-map__iframe"
        title={title}
        src={CONTACT_MAP_SRC}
        loading="lazy"
      />
    );
  }

  return (
    <div className="pat-map__placeholder">
      <style>{`
        .pat-map__placeholder {
          position: absolute;
          inset: 0;
          display: grid;
          place-content: center;
          gap: 10px;
          padding: 24px;
          text-align: center;
          background: var(--color-light-2, #F3F5F6);
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
        }
        .pat-map__placeholder strong { font-size: 15px; color: var(--color-navy); }
        .pat-map__placeholder p { margin: 0; font-size: 13.5px; line-height: 1.5; color: #40506a; max-width: 42ch; }
        .pat-map__placeholder a { font-size: 13.5px; font-weight: 600; color: var(--color-navy); }
      `}</style>
      <strong>{t("mapTitle")}</strong>
      <p>{t("mapText")}</p>
      <a href={CONTACT_MAP_SRC} target="_blank" rel="noopener noreferrer">
        {t("mapOpen")}
      </a>
    </div>
  );
}
