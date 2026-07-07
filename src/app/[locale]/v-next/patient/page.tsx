import { setRequestLocale } from "next-intl/server";
import HeaderV4 from "@/components/layout/HeaderV4";
import Footer from "@/components/layout/Footer";
import HeroPatient from "./_components/HeroPatient";
import TrustStrip from "./_components/TrustStrip";
import HowItWorks from "./_components/HowItWorks";
import AboutPatient from "./_components/AboutPatient";
import SpecialtiesMarquee from "./_components/SpecialtiesMarquee";
import AccessCards from "./_components/AccessCards";
import MobileApp from "./_components/MobileApp";
import FaqSection from "./_components/FaqSection";
import FinalCta from "./_components/FinalCta";

/**
 * Patient LP — "v-next" preview (full-page elevation, solid backgrounds).
 * This is the original all-new composition; the hybrid + decorative
 * backgrounds live under ./bg/[variant].
 */
export default async function VNextPatientPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="da-patient">
      <header className="header-patient">
        <HeaderV4 variant="patient" />
      </header>
      <main className="vnp">
        <HeroPatient />
        <TrustStrip />
        <HowItWorks />
        <AboutPatient />
        <SpecialtiesMarquee />
        <AccessCards />
        <MobileApp />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
