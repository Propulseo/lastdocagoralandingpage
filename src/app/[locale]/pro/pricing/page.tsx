import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import ProPlaceholderPage from "@/components/pro/ProPlaceholderPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.proPricing" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ProPlaceholderPage
      titleKey="pricingTitle"
      subtitleKey="pricingSubtitle"
      descKey="pricingDesc"
    />
  );
}
