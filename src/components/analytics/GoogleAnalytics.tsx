"use client";

import Script from "next/script";

import { useConsent } from "@/components/analytics/ConsentProvider";

/**
 * Chargement de Google Analytics — uniquement après un accord explicite.
 *
 * Google Analytics dépose des cookies. Sur un site de santé visant le marché
 * portugais, le charger d'office serait une infraction : rien ne doit partir
 * vers Google tant que le visiteur n'a pas dit oui. Le composant ne rend donc
 * strictement rien dans tous les autres cas — pas de script, pas de requête.
 */
export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  const { consent } = useConsent();

  if (consent !== "granted") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
