import type { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Montserrat, Fraunces } from "next/font/google";
import "@/app/globals.css";
import "@/styles/tokens.css";
import "@/styles/polish.css";
import "@/styles/motion.css";
import "@/styles/redesign.css";
import { getMessages, getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { locales } from "@/i18n/config";
import { SITE_URL } from "@/lib/site";
import ScrollToTop from "@/components/layout/ScrollToTop";
import SiteLoader from "@/components/shared/SiteLoader";
import { AudienceWashProvider } from "@/components/layout/AudienceWash";
import { ConsentProvider } from "@/components/analytics/ConsentProvider";
import CookieConsent from "@/components/analytics/CookieConsent";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });

  /* Ce layout ne porte QUE ce qui est identique sur tout le site. L'URL
     canonique, les variantes de langue et l'URL de partage dépendent du
     chemin : elles sont déclarées page par page via `pageMetadata`, sinon
     chaque page hériterait de l'adresse de l'accueil.

     Le titre et la description ci-dessous ne servent que de filet pour une
     page qui n'en déclarerait pas. */
  return {
    /* Sans metadataBase, une image de partage déclarée en chemin relatif
       (les articles de blog le font) n'est pas résolue en URL absolue —
       or WhatsApp, LinkedIn et Facebook exigent une adresse complète. */
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
    icons: {
      icon: "/assets/images/favicon/favicon.png",
      apple: "/assets/images/favicon/favicon.png",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${montserrat.variable} ${fraunces.variable}`}>
      <head>
        <link rel="icon" href="/assets/images/favicon/favicon.png" />
        {/* FontAwesome vient d'un serveur tiers et bloque le rendu tant qu'il
            n'a pas répondu. Le preconnect ouvre la connexion (DNS + TLS) en
            avance, pendant que le reste du head est lu. Correctif d'attente :
            l'objectif reste de rapatrier ces icônes dans le projet. */}
        <link rel="preconnect" href="https://use.fontawesome.com" />
        <link rel="preconnect" href="https://use.fontawesome.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.3/css/all.css"
        />
        <link rel="stylesheet" href="/assets/css/libraries.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <style>{`* { -webkit-user-select: text !important; -moz-user-select: text !important; user-select: text !important; } html, body { overscroll-behavior: none; }`}</style>
        {/* L'écran d'ouverture est dans le HTML servi, sinon il apparaîtrait
            APRÈS la page. Mais il ne doit se montrer qu'une fois par session :
            sans ce marqueur posé avant la première peinture, un rechargement
            en cours de visite ferait clignoter le voile le temps que React
            lise sessionStorage. Trois lignes, exécutées avant le rendu.

            Le script est une chaîne LITTÉRALE, sans interpolation : aucune
            donnée extérieure n'y entre, et il ne faut jamais y en faire
            entrer. */}
        <style>{`html.doca-seen .sl { display: none; }`}</style>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('doca-loaded')==='1')document.documentElement.classList.add('doca-seen')}catch(e){}",
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ConsentProvider>
            <AudienceWashProvider>
              <div className="wrapper" style={{ overflowX: "clip" }}>
                <SiteLoader />
                {children}
                <ScrollToTop />
              </div>
            </AudienceWashProvider>
            {/* Rien ne part vers Google tant que le visiteur n'a pas accepte.
                Sans NEXT_PUBLIC_GA_ID, le bandeau ne s'affiche pas du tout. */}
            <CookieConsent gaId={process.env.NEXT_PUBLIC_GA_ID} />
          </ConsentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
