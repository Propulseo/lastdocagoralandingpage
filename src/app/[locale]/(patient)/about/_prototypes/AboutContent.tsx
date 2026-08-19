import "@/styles/medically.css";
import "@/styles/medically-overrides.css";

import AboutHero from "@/components/patient-heroes/AboutHero";
import PatientClosingCta from "@/components/patient-heroes/PatientClosingCta";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { getMedicallyCopy } from "@/app/[locale]/(patient)/about/_prototypes/medically/medicallyCopy";
import {
  MedAbout,
  MedProcess,
} from "@/app/[locale]/(patient)/about/_prototypes/medically/MedSectionsTop";
import {
  MedAudience,
  MedFunFact,
} from "@/app/[locale]/(patient)/about/_prototypes/medically/MedSectionsMid";
import { MedBlog } from "@/app/[locale]/(patient)/about/_prototypes/medically/MedSectionsEnd";

/**
 * Contenu de la page « À propos » (/about), porte du template Medically avec les
 * textes reecrits pour DocAgora.
 *
 * Perimetre volontairement limite aux SECTIONS : le header et le footer restent
 * ceux du landing. Trois blocs du template ont ete retires :
 *  - CtaSectionS2 (bande « Available 24/7 » avec numero de telephone),
 *  - CtafromSection (formulaire « Get A Free Consultation »), qui doublonnerait
 *    avec la page /contact,
 *  - le footer du template, remplace par celui de DocAgora.
 *
 * La classe `.med` est indispensable. La feuille `medically.css` est generee par
 * scripts/build-medically-css.cjs avec chaque selecteur prefixe par `.med` :
 * sans ce conteneur, aucune regle ne s'applique — et sans ce prefixe, les
 * selecteurs globaux du template (html, body, h1..h6, p, a) ecraseraient le
 * header, le footer et la DA des pages d'accueil.
 *
 * Les textes viennent de medically/medicallyCopy.ts, qui documente aussi tout
 * ce qui a ete retire du template faute d'etre vrai (chiffres inventes,
 * praticiens fictifs, numero de telephone, signature d'un PDG imaginaire).
 *
 * `.pat-aurora` (polish.css) : nappe aurora fixe partagée avec la home, posée
 * autour du hero ET du corps — medically-overrides.css fond le haut de `.med`
 * pour une couture invisible. Chaque section arrive en reveal (AnimatedSection),
 * les grilles cascadent dans MedSections* (RevealCascade) — socle motion.css.
 */
export default function AboutContent({ locale }: { locale: string }) {
  /* Seul point où la locale est résolue : les sections reçoivent leurs textes
     en props. Une page = une résolution, pas une par composant. */
  const copy = getMedicallyCopy(locale);

  return (
    <div className="pat-aurora">
      <AboutHero locale={locale} copy={copy.hero} />
      <div className="med">
        <AnimatedSection>
          <MedAbout hclass="about_section section-padding s4" copy={copy.about} />
        </AnimatedSection>
        <AnimatedSection>
          <MedProcess
            hclass="work_section_s2 section-padding"
            title={copy.processTitle}
            steps={copy.process}
          />
        </AnimatedSection>
        <AnimatedSection>
          <MedFunFact hclass="funfact_section" facts={copy.facts} />
        </AnimatedSection>
        <AnimatedSection>
          <MedAudience
            hclass="team_section_s2 section-padding"
            locale={locale}
            title={copy.audienceTitle}
            cards={copy.audience}
          />
        </AnimatedSection>
        <AnimatedSection>
          <MedBlog tClass="blog_section section-padding" locale={locale} />
        </AnimatedSection>
      </div>
      {/* La page se terminait sur les articles, sans aucun appel à l'action —
          seule sous-page dans ce cas avec /blog. Même clôture que la home. */}
      <AnimatedSection>
        <PatientClosingCta
          eyebrow={copy.closing.eyebrow}
          title={copy.closing.title}
          sub={copy.closing.sub}
          cta={copy.closing.cta}
        />
      </AnimatedSection>
    </div>
  );
}
