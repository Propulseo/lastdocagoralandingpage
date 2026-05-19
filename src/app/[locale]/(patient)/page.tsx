import { setRequestLocale } from "next-intl/server";
import HeroSlider from "@/components/home/HeroSlider";
import ContactInfoBoxes from "@/components/home/ContactInfoBoxes";
import AboutSection from "@/components/home/AboutSection";
import SpecialtiesCarousel from "@/components/home/SpecialtiesCarousel";

import TeamCarousel from "@/components/home/TeamCarousel";

import Testimonials from "@/components/home/Testimonials";
import CitiesGallery from "@/components/home/CitiesGallery";

import FAQHighlights from "@/components/home/FAQHighlights";
import MobileAppSection from "@/components/home/MobileAppSection";
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
      <HeroSlider />
      <AnimatedSection>
        <AboutSection />
      </AnimatedSection>
      <AnimatedSection>
        <SpecialtiesCarousel />
      </AnimatedSection>
      <AnimatedSection>
        <ContactInfoBoxes />
      </AnimatedSection>
      <AnimatedSection>
        <TeamCarousel />
      </AnimatedSection>
      <AnimatedSection>
        <MobileAppSection />
      </AnimatedSection>
      <AnimatedSection>
        <Testimonials />
      </AnimatedSection>
      <AnimatedSection>
        <FAQHighlights />
      </AnimatedSection>
      <AnimatedSection>
        <CitiesGallery />
      </AnimatedSection>
    </>
  );
}
