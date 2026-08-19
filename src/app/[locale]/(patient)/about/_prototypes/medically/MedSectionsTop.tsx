/* eslint-disable @next/next/no-img-element -- Reproduction fidele du template :
   next/image enveloppe l'image et lui injecte des styles inline, ce qui casse
   les selecteurs `img` propres au theme (.about_left .image img, etc.). */
import MedCountUp from "@/components/medically/MedCountUp";
import { MedSectionTitle } from "@/components/medically/MedPrimitives";
import RevealCascade from "@/components/shared/RevealCascade";
import type { MedicallyCopy } from "@/app/[locale]/(patient)/about/_prototypes/medically/medicallyCopy";

/** Portage de components/about/about.jsx */
export function MedAbout({
  hclass,
  copy,
}: {
  hclass: string;
  copy: MedicallyCopy["about"];
}) {
  return (
    <section className={hclass}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-12">
            <div className="about_left">
              <div className="image">
                <img src="/medically/images/about.jpg" alt="" />
                <span className="round-on"></span>
                <span className="round-two"></span>
                <div className="award">
                  <div className="icon">
                    <i className="flaticon-cup"></i>
                  </div>
                  <div className="text">
                    <h2>
                      <MedCountUp end={copy.badgeValue} />
                      {copy.badgeSuffix}
                    </h2>
                    <p>{copy.badgeLabel}</p>
                  </div>
                </div>
                <div className="doctors">
                  <ul>
                    {copy.avatars.map((avatar) => (
                      <li key={avatar}>
                        <img src={avatar} alt="" />
                      </li>
                    ))}
                    <li>
                      <span>{copy.verifiedMark}</span>
                    </li>
                  </ul>
                  <h4>{copy.verifiedLabel}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <div className="content">
              <h2>{copy.eyebrow}</h2>
              <h3>{copy.title}</h3>
              {copy.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
              <div className="ceo">
                <div>
                  <h4>{copy.signerName}</h4>
                  <span>{copy.signerRole}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Portage de components/ProcessSection/ProcessSection.jsx */
export function MedProcess({
  hclass,
  title,
  steps,
}: {
  hclass: string;
  title: MedicallyCopy["processTitle"];
  steps: MedicallyCopy["process"];
}) {
  return (
    <section className={hclass}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9 col-12">
            <MedSectionTitle
              title={title.title}
              subtitle={title.subtitle}
            />
          </div>
        </div>
        <div className="work_wrapper">
          {/* Parcours vivant : le filet se trace à l'entrée dans le viewport et
              les quatre jalons s'allument l'un après l'autre. Aucun mécanisme
              nouveau — RevealCascade pose déjà `.mo-in` sur le conteneur et un
              `--mo-delay` par enfant ; le CSS (medically-overrides) s'y branche.
              Purement décoratif : les étapes sont lues sur les cartes en dessous. */}
          <div className="mp-railwrap" aria-hidden="true">
            <RevealCascade className="mp-rail" stepMs={300} distance={8}>
              {steps.map((step) => (
                <span className="mp-rail__dot" key={step.number}>
                  <i />
                </span>
              ))}
            </RevealCascade>
          </div>
          {/* Cascade : les quatre étapes arrivent par vagues (socle motion.css). */}
          <RevealCascade className="row">
            {steps.map((step) => (
              <div className="col-xl-3 col-lg-6 col-md-6 col-12" key={step.number}>
                <div className="work_card">
                  <div className="image">
                    <img src={step.image} alt="" />
                    <span className="number">{step.number}</span>
                  </div>
                  <div className="text">
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </RevealCascade>
          <div className="shape">
            <img src="/medically/images/work/shape.svg" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
