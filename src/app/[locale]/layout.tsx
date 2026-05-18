import type { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import HeaderTopbar from "@/components/layout/HeaderTopbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import JQueryLoader from "@/lib/jquery-loader";
import Preloader from "@/components/shared/Preloader";

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
    <html lang={locale}>
      <head>
        <link rel="icon" href="/assets/images/favicon/favicon.png" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Roboto:wght@400;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.3/css/all.css"
        />
        <link rel="stylesheet" href="/assets/css/libraries.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <style>{`* { -webkit-user-select: text !important; -moz-user-select: text !important; user-select: text !important; } html, body { overscroll-behavior: none; }`}</style>
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <div className="wrapper" style={{ overflowX: "hidden" }}>
            <Preloader />
            <header className="header header-layout1">
              <HeaderTopbar />
              <Navbar locale={locale} />
            </header>
            {children}
            <Footer />
            <ScrollToTop />
          </div>
          <JQueryLoader />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
