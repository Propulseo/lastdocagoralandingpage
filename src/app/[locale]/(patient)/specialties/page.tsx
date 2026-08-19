import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import "@/styles/medically.css";
import "@/styles/medically-overrides.css";

import SpecialtiesHero from "@/components/patient-heroes/SpecialtiesHero";
import AnimatedSection from "@/components/shared/AnimatedSection";
import MedServiceSidebar from "@/app/[locale]/(patient)/specialties/_medically/MedServiceSidebar";
import SearchJourney from "@/app/[locale]/(patient)/specialties/_medically/SearchJourney";
import {
  MedSpecialtyCards,
  MedSpecialtyMarquee,
} from "@/app/[locale]/(patient)/specialties/_medically/MedSpecialtyCards";
import { getSpecialtiesCopy } from "@/app/[locale]/(patient)/specialties/_medically/specialtiesCopy";
import { SPECIALTY_ICON } from "@/lib/specialties";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.specialties" });
  return { title: t("title"), description: t("description") };
}

/**
 * Portage de main-component/ServiceSinglePage/ServiceSinglePage.jsx.
 *
 * Le template destinait cette page a UN service, avec une barre laterale a
 * droite. Ici elle presente l'ensemble des specialites : le contenu editorial
 * est centre sur une seule colonne, la grille « Related Service » devient la
 * liste complete (coeur de la page, pleine largeur), et l'ancienne sidebar se
 * reduit a un bloc de conversion centre en bas (encart recherche + inscription).
 *
 * Navbar et Footer du template ecartes : le landing fournit les siens.
 */
export default async function SpecialtiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = getSpecialtiesCopy(locale);

  /* La recherche montrée par le fil s'appuie sur les sources uniques : le
     libellé de spécialité vient des traductions `specialties.items.*`, la ville
     de `cities.items`. Aucune donnée locale à faire diverger. */
  const tSpec = await getTranslations({ locale, namespace: "specialties" });
  const tCities = await getTranslations({ locale, namespace: "cities" });
  const journeySpecialty = tSpec("items.dermatology.title");
  const journeyCity = (tCities.raw("items") as string[])[0];

  return (
    <div className="pat-aurora">
      <SpecialtiesHero />
      <div className="med">
        <section className="service_single section-padding">
        <div className="container spec-wide">
          {/* Contenu editorial : une seule colonne centree, en reveal. */}
          <AnimatedSection className="row">
            <div className="col-12">
              <div className="service_content spec-editorial">
                <div>
                  <h2>{copy.intro.title}</h2>
                  {copy.intro.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                </div>

                {/* Seul visuel du corps, et il est fait maison : le fil de la
                    recherche, qui APPREND à croiser spécialité, ville et langue
                    au lieu d'énumérer des critères (et remplace le trio de
                    photos stock du template). */}
                <div>
                  <h3>{copy.capabilities.title}</h3>
                  <p>{copy.capabilities.lede}</p>
                  <SearchJourney
                    copy={copy.capabilities}
                    specialty={journeySpecialty}
                    city={journeyCity}
                    icon={SPECIALTY_ICON.dermatology ?? "icon-doctor"}
                  />
                </div>

                <div>
                  <h3>{copy.approach.title}</h3>
                  {copy.approach.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Coeur de la page : l'ensemble des specialites, en pleine largeur.
              La cascade des six cartes vedettes vit dans MedSpecialtyCards. */}
          <AnimatedSection className="row">
            <div className="col-12 service_content">
              <MedSpecialtyCards title={copy.listTitle} />
              <MedSpecialtyMarquee label={copy.marqueeLabel} />
            </div>
          </AnimatedSection>

          {/* Conversion : bande recherche + creation de compte, pleine largeur. */}
          <AnimatedSection className="row">
            <div className="col-12">
              <MedServiceSidebar copy={copy.sidebar} />
            </div>
          </AnimatedSection>
        </div>
      </section>
      </div>
    </div>
  );
}
