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
import ScrollToTop from "@/components/layout/ScrollToTop";
import JQueryLoader from "@/lib/jquery-loader";
import SiteLoader from "@/components/shared/SiteLoader";
import { AudienceWashProvider } from "@/components/layout/AudienceWash";

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
  return {
    title: t("title"),
    description: t("description"),
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
          <AudienceWashProvider>
            <div className="wrapper" style={{ overflowX: "clip" }}>
              <SiteLoader />
              {children}
              <ScrollToTop />
            </div>
          </AudienceWashProvider>
          <JQueryLoader />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
