import { setRequestLocale } from "next-intl/server";
import AnimatedSection from "@/components/shared/AnimatedSection";
import HeroProSection from "@/components/pro/HeroProSection";

import ImproveSection from "@/components/pro/ImproveSection";
import SolutionsSection from "@/components/pro/SolutionsSection";
import FeaturesGridPro from "@/components/pro/FeaturesGridPro";
import WhyDocAgoraSection from "@/components/pro/WhyDocAgoraSection";
import AboutSectionPro from "@/components/pro/AboutSectionPro";
import EarlyAdoptersPro from "@/components/pro/EarlyAdoptersPro";
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

      {/* 3. PLATFORM — Interactive ERP showcase */}
      <FeaturesGridPro />

      {/* 4. DIFFERENTIATION — Why DocAgora vs alternatives */}
      <AnimatedSection once>
        <WhyDocAgoraSection />
      </AnimatedSection>

      {/* 5. RELEVANCE — Show specialty coverage */}
      <AnimatedSection once>
        <SolutionsSection />
      </AnimatedSection>

      {/* 6. ABOUT — Brief about DocAgora */}
      <AnimatedSection once>
        <AboutSectionPro />
      </AnimatedSection>

      {/* 7. SOCIAL PROOF — Early adopters invitation */}
      <AnimatedSection once>
        <EarlyAdoptersPro />
      </AnimatedSection>

      {/* 8. ACTION — Final CTA (seamless dark continuation) */}
      <CTASection />
    </>
  );
}
