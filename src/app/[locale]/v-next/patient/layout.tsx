import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import "@/styles/vnext-patient.css";

/**
 * Pass-through layout for all patient v-next previews (single + the 8
 * background variants). Each PAGE renders its own shell (header / main /
 * footer) so the bg variants can place a fixed decorative canvas behind
 * the header without layout-nesting conflicts. Fonts, i18n and FontAwesome
 * come from the [locale] root layout. Does NOT touch / or /pro.
 */
export default async function VNextPatientLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <>{children}</>;
}
