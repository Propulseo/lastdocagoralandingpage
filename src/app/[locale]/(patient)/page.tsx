import { setRequestLocale } from "next-intl/server";

import HeroLight1 from "@/app/[locale]/v2/patient/_components/HeroLight1";
import SectionCommentCaMarche from "@/app/[locale]/v2/patient/_components/SectionCommentCaMarche";
import SpecialtiesCarousel2 from "@/app/[locale]/v2/patient/_components/SpecialtiesCarousel2";

import TrustBar from "@/components/home/TrustBar";
import AboutSection from "@/components/home/AboutSection";
import ContactInfoBoxes from "@/components/home/ContactInfoBoxes";
import MobileAppSection from "@/components/home/MobileAppSection";
import FAQHighlights from "@/components/home/FAQHighlights";
import FinalCtaSearch from "@/components/home/FinalCtaSearch";
import AnimatedSection from "@/components/shared/AnimatedSection";

/**
 * Home patient (prod), composition V2 FIGÉE promue depuis /v2/patient.
 *
 * Hero CLAIR (HeroLight1) + vidéo de fond hero-client-1 en filigrane,
 * « Comment ça marche » interactif, puis Trust Bar · À propos ·
 * Spécialités (carrousel marquee) · Contact · App mobile · FAQ · CTA final.
 *
 * Navbar (HeaderTopbar + Navbar) et Footer sont fournis par le layout
 * patient ((patient)/layout.tsx) : cette page n’en rend aucun.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="v2pat">
      <style>{`
        .v2pat { box-sizing: border-box; background: var(--color-light-1); --v2pat-header-h: 120px; }
        .v2pat *, .v2pat *::before, .v2pat *::after { box-sizing: border-box; }

        /* ── Zone hero CLAIRE + calque vidéo (voile blanc géré par HeroLight1) ── */
        .v2pat__herozone { position: relative; overflow: hidden; background: var(--color-light-1); }
        .v2pat__herovideo { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
        .v2pat__herovideo video { width: 100%; height: 100%; object-fit: cover; display: block; }
        .v2pat__herozone > .v2pat__herocontent { position: relative; z-index: 1; }
        @media (prefers-reduced-motion: reduce) {
          .v2pat__herovideo video { display: none; }
        }
      `}</style>

      {/* Zone hero claire : vidéo 1 en fond (voile blanc appliqué par HeroLight1) */}
      <div className="v2pat__herozone">
        <div className="v2pat__herovideo" aria-hidden="true">
          <video autoPlay muted loop playsInline preload="metadata">
            <source src="/assets/video/hero-client-1.mp4" type="video/mp4" />
            <source src="/assets/video/hero-client-1.webm" type="video/webm" />
          </video>
        </div>
        <div className="v2pat__herocontent">
          <HeroLight1 />
        </div>
      </div>

      <SectionCommentCaMarche />

      <TrustBar />

      <AnimatedSection>
        <AboutSection />
      </AnimatedSection>
      <AnimatedSection>
        <SpecialtiesCarousel2 />
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
        <FinalCtaSearch />
      </AnimatedSection>
    </div>
  );
}
