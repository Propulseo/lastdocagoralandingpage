import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import HeaderTopbar from "@/components/layout/HeaderTopbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default async function PatientLayout({
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
        <HeaderTopbar />
        <Navbar locale={locale} />
      </header>
      {children}
      <Footer />
    </>
  );
}
