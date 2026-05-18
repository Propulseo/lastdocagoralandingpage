import { setRequestLocale } from "next-intl/server";
import HeroSlider from "@/components/home/HeroSlider";
import ContactInfoBoxes from "@/components/home/ContactInfoBoxes";
import AboutSection from "@/components/home/AboutSection";
import LandingChatbot from "@/components/home/LandingChatbot";
import SpecialtiesCarousel from "@/components/home/SpecialtiesCarousel";
import FeaturesGrid from "@/components/home/FeaturesGrid";
import TeamCarousel from "@/components/home/TeamCarousel";
import WorkProcess from "@/components/home/WorkProcess";
import Testimonials from "@/components/home/Testimonials";
import CitiesGallery from "@/components/home/CitiesGallery";
import ContactForm from "@/components/home/ContactForm";
import FAQHighlights from "@/components/home/FAQHighlights";

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
      <LandingChatbot />
      <ContactInfoBoxes />
      <AboutSection />
      <SpecialtiesCarousel />
      <FeaturesGrid />
      <TeamCarousel />
      <WorkProcess />
      <Testimonials />
      <CitiesGallery />
      <ContactForm />
      <FAQHighlights />
    </>
  );
}
