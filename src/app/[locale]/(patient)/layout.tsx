import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import HeaderV4 from "@/components/layout/HeaderV4";
import Footer from "@/components/layout/Footer";
import "@/styles/vnext-patient.css";

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
    <div className="da-patient">
      <header className="header-patient">
        <HeaderV4 variant="patient" />
      </header>
      {children}
      <Footer />
    </div>
  );
}
