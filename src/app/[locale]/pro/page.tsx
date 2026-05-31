import { setRequestLocale } from "next-intl/server";
import AnimatedSection from "@/components/shared/AnimatedSection";
import HeroProSection from "@/components/pro/HeroProSection";

import ImproveSection from "@/components/pro/ImproveSection";
import FeaturesGridPro from "@/components/pro/FeaturesGridPro";
import WhyDocAgoraSection from "@/components/pro/WhyDocAgoraSection";
import TestimonialsPro from "@/components/pro/TestimonialsPro";
import EarlyAdoptersPro from "@/components/pro/EarlyAdoptersPro";
import CTASection from "@/components/pro/CTASection";
import { BgThemeProvider } from "@/components/pro/bg-themes/BgThemeStudio";


export default async function ProHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <BgThemeProvider>
      {/* 1. ATTENTION — Hook + primary CTA + lead form */}
      <HeroProSection />

      {/* 2. INTEREST — Value propositions: why switch */}
      <AnimatedSection once>
        <ImproveSection />
      </AnimatedSection>

      {/* 3. PLATFORM — Interactive ERP showcase */}
      <FeaturesGridPro />

      {/* 4. DIFFERENTIATION — Why DocAgora (editorial) */}
      <WhyDocAgoraSection />

      {/* 5. SOCIAL PROOF — Reviews from certified professionals */}
      <AnimatedSection once>
        <TestimonialsPro />
      </AnimatedSection>

      {/* 7. CONVERSION — Early access pass */}
      <EarlyAdoptersPro />

      {/* 8. ACTION — Final CTA (oversized) */}
      <CTASection />
    </BgThemeProvider>
  );
}
