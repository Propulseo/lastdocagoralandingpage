import type { ReactNode } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import NavbarPro from "@/components/layout/NavbarPro";
import FooterPro from "@/components/layout/FooterPro";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.pro" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ProLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <header className="header header-layout1">
        <NavbarPro locale={locale} />
      </header>
      {children}
      <FooterPro />
    </>
  );
}
