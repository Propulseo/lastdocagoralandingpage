/**
 * Shared hybrid composition for the patient bg-preview variants.
 * Order validated with the user (old = live components reused as-is,
 * new = the v-next elevated sections):
 *   Hero (old) · How-it-works (old) · Trust (new) · About (new) ·
 *   Specialties (new) · Access/112 (old) · Mobile app (new, tall phone) ·
 *   FAQ (new) · Final CTA (new).
 * All 8 background variants render THIS composition over a different
 * decorative canvas; section backgrounds are neutralised by `.vnp-bg`.
 */
import HeroLight1 from "@/app/[locale]/v2/patient/_components/HeroLight1";
import SectionCommentCaMarche from "@/app/[locale]/v2/patient/_components/SectionCommentCaMarche";
import AccessBlock from "@/components/home/AccessBlock";
import TrustStrip from "./TrustStrip";
import AboutPatient from "./AboutPatient";
import SpecialtiesMarquee from "./SpecialtiesMarquee";
import MobileApp from "./MobileApp";
import FaqSection from "./FaqSection";
import FinalCta from "./FinalCta";

export default function PatientComposition() {
  return (
    <>
      {/* Hero keeps the live background video (hero-client-1). The opaque
          herozone covers the decorative canvas here; the canvas shows in the
          sections below. Veil is applied by HeroLight1's own ::before. */}
      <div className="vnp-herozone">
        <div className="vnp-herovideo" aria-hidden="true">
          <video autoPlay muted loop playsInline preload="metadata">
            <source src="/assets/video/hero-client-1.mp4" type="video/mp4" />
            <source src="/assets/video/hero-client-1.webm" type="video/webm" />
          </video>
        </div>
        <div className="vnp-herocontent">
          <HeroLight1 />
        </div>
      </div>
      <SectionCommentCaMarche />
      <TrustStrip />
      <AboutPatient />
      <SpecialtiesMarquee />
      <AccessBlock />
      <MobileApp />
      <FaqSection />
      <FinalCta />
    </>
  );
}
