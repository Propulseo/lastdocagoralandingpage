import { setRequestLocale } from "next-intl/server";

import HeroLight1 from "@/app/[locale]/v2/patient/_components/HeroLight1";
import SectionCommentCaMarche from "@/app/[locale]/v2/patient/_components/SectionCommentCaMarche";
import SpecialtiesCarousel2 from "@/app/[locale]/v2/patient/_components/SpecialtiesCarousel2";

import AboutPatient from "@/app/[locale]/v-next/patient/_components/AboutPatient";
import MobileApp from "@/app/[locale]/v-next/patient/_components/MobileApp";
import FaqSection from "@/app/[locale]/v-next/patient/_components/FaqSection";

import AccessBlock from "@/components/home/AccessBlock";
import FinalCtaSearch from "@/components/home/FinalCtaSearch";
import AnimatedSection from "@/components/shared/AnimatedSection";

/**
 * Home patient (prod), composition mixte v1 (live) + v-next (élévation),
 * validée section par section avec Étienne.
 *
 * Hero CLAIR (HeroLight1) + barre de recherche/filtres + vidéo hero-client-1,
 * « Comment ça marche » interactif, Trust Bar,
 * puis 3 sections élevées v-next enveloppées dans `.vnp` :
 *   « Trouvez votre médecin » (AboutPatient) · App mobile (MobileApp) · FAQ (FaqSection).
 * Spécialités (carrousel) et « En cas d'urgence » (AccessBlock) restent en v1,
 * CTA final « Commencez votre recherche » (FinalCtaSearch).
 *
 * Le CSS v-next (`vnext-patient.css`, scopé `.vnp`) est importé par le layout
 * patient. Header (HeaderV4) et Footer sont fournis par ((patient)/layout.tsx).
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
        .v2pat {
          box-sizing: border-box; --v2pat-header-h: 120px; --v2pat-navbar-h: 72px;
          background:
            radial-gradient(46% 38% at 86% 3%, rgba(var(--color-teal-rgb), 0.16), transparent 60%),
            radial-gradient(42% 46% at 2% 60%, rgba(var(--color-cobalt-rgb), 0.11), transparent 64%),
            radial-gradient(40% 40% at 70% 100%, rgba(var(--color-mint-rgb, var(--color-teal-rgb)), 0.10), transparent 66%),
            var(--color-light-1);
          background-attachment: fixed;
        }
        .v2pat *, .v2pat *::before, .v2pat *::after { box-sizing: border-box; }

        /* Fonds — alternance blanc/gris. Seules les sections v1 grises sont
           forcees ici ; les sections v-next (.vnp) gerent leur propre fond. */
        .v2pat .trust-bar { background-color: var(--color-light-3) !important; }
        /* ── Coutures : l'aurora fixe (.v2pat) doit rester CONTINUE derrière
           toutes les sections. Deux traitements : ─────────────────────────── */

        /* (a) Sections « plates » (fond light-1, wrapper .vnp opaque, ou carte
           autonome) → fond retiré : l'aurora traverse, aucune bande ni couture.
           .vnp = wrapper des sections v-next (About/App/FAQ) ; .acc = « En cas
           d'urgence » ; .da-final = CTA finale (carte blanche, bande light-3
           inutile, définie dans redesign.css). */
        .v2pat .vnp,
        .v2pat .acc,
        .v2pat .da-final { background: transparent !important; }

        /* (b) Bandes d'identité colorées (gris Spécialités, tint App mobile) →
           fondu des bords : la teinte s'estompe en haut/bas et l'aurora réémerge
           sans arête (cf. skill, catalogue §1). */
        .v2pat .vsc2-section,
        .v2pat .vnp-section--tint {
          background: linear-gradient(180deg, transparent,
            var(--color-light-3) clamp(40px, 6vh, 80px),
            var(--color-light-3) calc(100% - clamp(40px, 6vh, 80px)),
            transparent) !important;
        }

        /* Rythme vertical resserré (~½ de l'espace) et unifié entre sections. */
        .v2pat .vnp-section,
        .v2pat .vphw-section,
        .v2pat .acc,
        .v2pat .vsc2-section,
        .v2pat .da-final { padding-block: clamp(36px, 4vw, 60px); }

        /* ── Zone hero CLAIRE + calque vidéo (voile blanc géré par HeroLight1) ──
           Le fondu du bas du hero est géré DANS HeroLight1 (.vphl1-hero::after),
           au-dessus du voile blanc — sinon le voile repeint par-dessus. */
        .v2pat__herozone { position: relative; overflow: hidden; background: var(--color-light-1); }
        .v2pat__herovideo { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
        .v2pat__herovideo video { width: 100%; height: 100%; object-fit: cover; display: block; }
        .v2pat__herozone > .v2pat__herocontent { position: relative; z-index: 1; }
        @media (prefers-reduced-motion: reduce) {
          .v2pat__herovideo video { display: none; }
        }
      `}</style>

      {/* Zone hero claire : vidéo 1 en fond (voile blanc appliqué par HeroLight1) */}
      <div id="vnp-hero" className="v2pat__herozone">
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

      <AnimatedSection>
        <div className="vnp">
          <AboutPatient />
        </div>
      </AnimatedSection>
      <AnimatedSection>
        <SpecialtiesCarousel2 />
      </AnimatedSection>

      <AnimatedSection>
        <AccessBlock />
      </AnimatedSection>
      <AnimatedSection>
        <div className="vnp">
          <MobileApp />
        </div>
      </AnimatedSection>
      <AnimatedSection>
        <div className="vnp">
          <FaqSection />
        </div>
      </AnimatedSection>
      <AnimatedSection>
        <FinalCtaSearch />
      </AnimatedSection>
    </div>
  );
}
