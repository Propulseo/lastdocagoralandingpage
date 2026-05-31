"use client";

/**
 * /v2/patient, Landing PATIENT V2 (configuration FIGÉE, validée).
 *
 * Combo validé : Hero CLAIR (HeroLight1) · Vidéo de fond 1 (squares) · Carrousel spécialités 2 (Marquee auto).
 * Studio retiré. Header CLAIR aligné avec le hero clair et la page.
 *
 * Composition :
 *   - Hero patient CLAIR (plein écran adaptatif, console de recherche, vidéo de fond 1 en filigrane)
 *   - « Comment ça marche » interactif (section 2)
 *   - Trust Bar · À propos · Spécialités (carrousel marquee) · Contact · App mobile · FAQ · CTA final
 *   - Footer
 * Showcase interne, non lié à la nav de prod.
 */

import Link from "next/link";

import HeroLight1 from "./_components/HeroLight1";
import SectionCommentCaMarche from "./_components/SectionCommentCaMarche";
import SpecialtiesCarousel2 from "./_components/SpecialtiesCarousel2";

import TrustBar from "@/components/home/TrustBar";
import AboutSection from "@/components/home/AboutSection";
import ContactInfoBoxes from "@/components/home/ContactInfoBoxes";
import MobileAppSection from "@/components/home/MobileAppSection";
import FAQHighlights from "@/components/home/FAQHighlights";
import FinalCtaSearch from "@/components/home/FinalCtaSearch";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Footer from "@/components/layout/Footer";

export default function PatientV2Page() {
  return (
    <div className="v2pat">
      <style>{`
        .v2pat { box-sizing: border-box; background: var(--color-light-1); --v2pat-header-h: 56px; }
        .v2pat *, .v2pat *::before, .v2pat *::after { box-sizing: border-box; }

        /* ── Header CLAIR (aligné avec le hero clair + la page) ── */
        .v2pat__bar {
          position: sticky; top: 0; z-index: 50;
          display: flex; align-items: center; gap: 16px;
          padding: 12px clamp(16px, 4vw, 40px);
          background: rgba(252,254,254,0.80);
          backdrop-filter: blur(14px) saturate(1.4);
          -webkit-backdrop-filter: blur(14px) saturate(1.4);
          border-bottom: 1px solid rgba(var(--color-navy-rgb),0.08);
          font-family: var(--font-montserrat), system-ui, sans-serif;
        }
        .v2pat__brand { display: inline-flex; align-items: center; gap: 9px; font-family: var(--font-fraunces), Georgia, serif; font-weight: 600; font-size: 17px; color: var(--color-dark-1); text-decoration: none; letter-spacing: -0.01em; }
        .v2pat__brand-dot { width: 22px; height: 22px; border-radius: 6px; display: grid; place-items: center; background: linear-gradient(135deg, var(--color-teal), var(--color-cobalt)); color: #fff; font-weight: 700; font-size: 13px; font-family: var(--font-montserrat), sans-serif; }
        .v2pat__tag { font-family: ui-monospace, "SF Mono", Menlo, monospace; font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: #1E6E68; padding: 4px 9px; border-radius: 50px; border: 1px solid rgba(var(--color-teal-rgb),0.5); }
        .v2pat__back { margin-left: auto; display: inline-flex; align-items: center; gap: 7px; font-size: 13px; font-weight: 600; color: rgba(var(--color-navy-rgb),0.72); text-decoration: none; transition: color 0.2s ease; }
        .v2pat__back:hover { color: var(--color-navy); }

        /* ── Zone hero CLAIRE + calque vidéo (voile blanc géré par HeroLight1) ── */
        .v2pat__herozone { position: relative; overflow: hidden; background: var(--color-light-1); }
        .v2pat__herovideo { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
        .v2pat__herovideo video { width: 100%; height: 100%; object-fit: cover; display: block; }
        .v2pat__herozone > .v2pat__herocontent { position: relative; z-index: 1; }
        @media (prefers-reduced-motion: reduce) {
          .v2pat__herovideo video { display: none; }
          .v2pat__back { transition: none; }
        }
        @media (max-width: 600px) { .v2pat__tag { display: none; } }
      `}</style>

      <header className="v2pat__bar">
        <Link href="/v2/patient" className="v2pat__brand">
          <span className="v2pat__brand-dot">D</span>
          DocAgora
        </Link>
        <span className="v2pat__tag">Patient · V2</span>
        <Link href="/variants" className="v2pat__back">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Variantes
        </Link>
      </header>

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

      <main>
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
      </main>

      <Footer />
    </div>
  );
}
