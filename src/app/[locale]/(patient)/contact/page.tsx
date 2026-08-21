import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/page-metadata";
import ConsentedMap from "@/app/[locale]/(patient)/contact/_medically/ConsentedMap";

import "@/styles/medically.css";
import "@/styles/medically-overrides.css";

import ContactHero from "@/components/patient-heroes/ContactHero";
import AnimatedSection from "@/components/shared/AnimatedSection";
import RevealCascade from "@/components/shared/RevealCascade";
import MedContactForm from "@/app/[locale]/(patient)/contact/_medically/MedContactForm";
import {
  getContactCopy,
} from "@/app/[locale]/(patient)/contact/_medically/contactCopy";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, path: "/contact", namespace: "metadata.contact" });
}

/**
 * Portage de main-component/ContactPage + components/Contactpage/Contactpage.jsx.
 *
 * Sequence du template : bandeau, trois blocs de coordonnees, titre, formulaire,
 * puis la carte en pleine largeur. Navbar et Footer du template ecartes : le
 * landing fournit les siens.
 *
 * La carte est recentree sur Lisbonne — celle du template pointait sur New York.
 */
export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = getContactCopy(locale);

  return (
    <div className="pat-aurora">
      <ContactHero copy={copy.hero} />
      <div className="med">
        <section className="wpo-contact-pg-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col col-lg-10 offset-lg-1">
              <div className="office-info">
                {/* Cascade par vagues ; mo-lift = la famille de cartes
                    « soulevables » de /contact (une seule par page). Lift sur
                    la carte, cascade sur la colonne (socle motion.css). */}
                <RevealCascade className="row">
                  {copy.info.map((info) => (
                    <div className="col col-xl-4 col-lg-6 col-md-6 col-12" key={info.title}>
                      <div className="office-info-item mo-lift">
                        <div className="office-info-icon">
                          <div className="icon">
                            <i className={info.icon}></i>
                          </div>
                        </div>
                        <div className="office-info-text">
                          <h2>{info.title}</h2>
                          {info.lines.map((line) => (
                            <p key={line}>{line}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </RevealCascade>
              </div>

              {/* #contact-form : cible du CTA principal du hero (ContactHero).
                  scroll-margin-top posé dans medically-overrides.css. */}
              <AnimatedSection>
                <div className="wpo-contact-title" id="contact-form">
                  <h2>{copy.intro.title}</h2>
                  <p>{copy.intro.lede}</p>
                </div>

                <div className="wpo-contact-form-area">
                  <MedContactForm />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>

        {/* La page finissait sur une iframe Google Maps brute, pleine largeur,
            aux couleurs par défaut. Elle devient une carte de la page : cadre
            arrondi, plan désaturé puis reteinté navy→teal, épingle DocAgora
            par-dessus. Le voile et l'épingle sont `pointer-events: none` :
            le plan reste manipulable (zoom, déplacement). */}
        <AnimatedSection>
          <section className="wpo-contact-map-section">
            <div className="container">
              <figure className="pat-map">
                <div className="pat-map__frame">
                  <ConsentedMap title={copy.map.title} />
                  <span className="pat-map__veil" aria-hidden="true"></span>
                  <span className="pat-map__pin" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 22s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z"
                        fill="currentColor"
                      />
                      <circle cx="12" cy="11" r="2.6" fill="#fff" />
                    </svg>
                  </span>
                </div>
                <figcaption className="pat-map__caption">{copy.map.caption}</figcaption>
              </figure>
            </div>
          </section>
        </AnimatedSection>
      </section>
      </div>
    </div>
  );
}
