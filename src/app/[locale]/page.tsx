import { setRequestLocale } from "next-intl/server";
import HeroSlider from "@/components/home/HeroSlider";
import ContactInfoBoxes from "@/components/home/ContactInfoBoxes";
import AboutSection from "@/components/home/AboutSection";
import SpecialtiesCarousel from "@/components/home/SpecialtiesCarousel";
import FeaturesGrid from "@/components/home/FeaturesGrid";
import TeamCarousel from "@/components/home/TeamCarousel";
import WorkProcess from "@/components/home/WorkProcess";
import Testimonials from "@/components/home/Testimonials";
import CitiesGallery from "@/components/home/CitiesGallery";
import ContactForm from "@/components/home/ContactForm";
import FAQHighlights from "@/components/home/FAQHighlights";
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
      <AnimatedSection delay={0.1}>
        <ContactInfoBoxes />
      </AnimatedSection>
      <AnimatedSection>
        <AboutSection />
      </AnimatedSection>
      <AnimatedSection>
        <SpecialtiesCarousel />
      </AnimatedSection>
      <FeaturesGrid />
      <AnimatedSection>
        <TeamCarousel />
      </AnimatedSection>
      <AnimatedSection>
        <WorkProcess />
      </AnimatedSection>
      <AnimatedSection>
        <Testimonials />
      </AnimatedSection>
      <AnimatedSection>
        <CitiesGallery />
      </AnimatedSection>
      <AnimatedSection>
        <ContactForm />
      </AnimatedSection>
      <AnimatedSection>
        <FAQHighlights />
      </AnimatedSection>
    </>
  );
}
