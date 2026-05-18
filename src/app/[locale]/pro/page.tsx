import { setRequestLocale } from "next-intl/server";
import AnimatedSection from "@/components/shared/AnimatedSection";
import HeroProSection from "@/components/pro/HeroProSection";
import VideoSection from "@/components/pro/VideoSection";
import StatsSection from "@/components/pro/StatsSection";
import ImproveSection from "@/components/pro/ImproveSection";
import TestimonialsPro from "@/components/pro/TestimonialsPro";
import SolutionsSection from "@/components/pro/SolutionsSection";
import CTASection from "@/components/pro/CTASection";

export default async function ProHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroProSection />
      <AnimatedSection>
        <VideoSection />
      </AnimatedSection>
      <AnimatedSection>
        <StatsSection />
      </AnimatedSection>
      <AnimatedSection>
        <ImproveSection />
      </AnimatedSection>
      <AnimatedSection>
        <TestimonialsPro />
      </AnimatedSection>
      <AnimatedSection>
        <SolutionsSection />
      </AnimatedSection>
      <CTASection />
    </>
  );
}
