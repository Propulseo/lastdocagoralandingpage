import { setRequestLocale } from "next-intl/server";
import AnimatedSection from "@/components/shared/AnimatedSection";
import HeroProSection from "@/components/pro/HeroProSection";

import ImproveSection from "@/components/pro/ImproveSection";
import SolutionsSection from "@/components/pro/SolutionsSection";
import FeaturesGridPro from "@/components/pro/FeaturesGridPro";
import TestimonialsPro from "@/components/pro/TestimonialsPro";
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
      {/* 1. ATTENTION — Hook + primary CTA + lead form */}
      <HeroProSection />

      {/* 2. INTEREST — Value propositions: why switch */}
      <AnimatedSection once>
        <ImproveSection />
      </AnimatedSection>

      {/* 4. PLATFORM — Interactive ERP showcase */}
      <FeaturesGridPro />

      {/* 5. RELEVANCE — Show specialty coverage */}
      <AnimatedSection once>
        <SolutionsSection />
      </AnimatedSection>

      {/* 6. DESIRE — Peer proof reinforcement */}
      <AnimatedSection once>
        <TestimonialsPro />
      </AnimatedSection>

      {/* 7. ACTION — Final conversion push */}
      <CTASection />
    </>
  );
}
