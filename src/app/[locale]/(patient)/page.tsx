import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import HowItWorks from "@/components/home/HowItWorks";
import AboutSection from "@/components/home/AboutSection";
import SpecialtiesBento from "@/components/home/SpecialtiesBento";
import ContactInfoBoxes from "@/components/home/ContactInfoBoxes";
import MobileAppSection from "@/components/home/MobileAppSection";
import FAQHighlights from "@/components/home/FAQHighlights";
import CitiesBento from "@/components/home/CitiesBento";
import FinalCtaSearch from "@/components/home/FinalCtaSearch";
import AnimatedSection from "@/components/shared/AnimatedSection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <TrustBar />
      <AnimatedSection>
        <HowItWorks />
      </AnimatedSection>
      <AnimatedSection>
        <AboutSection />
      </AnimatedSection>
      <AnimatedSection>
        <SpecialtiesBento />
      </AnimatedSection>
      <AnimatedSection>
        <ContactInfoBoxes />
      </AnimatedSection>
      <AnimatedSection>
        <MobileAppSection />
      </AnimatedSection>
      <AnimatedSection>
        <FAQHighlights />
      </AnimatedSection>
      <AnimatedSection>
        <CitiesBento />
      </AnimatedSection>
      <AnimatedSection>
        <FinalCtaSearch />
      </AnimatedSection>
    </>
  );
}
