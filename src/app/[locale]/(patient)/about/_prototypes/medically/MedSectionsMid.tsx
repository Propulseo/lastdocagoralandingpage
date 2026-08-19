/* eslint-disable @next/next/no-img-element -- Reproduction fidele du template :
   next/image casserait les selecteurs `img` propres au theme. */
import Link from "next/link";

import MedCountUp from "@/components/medically/MedCountUp";
import { MedSectionTitle } from "@/components/medically/MedPrimitives";
import RevealCascade from "@/components/shared/RevealCascade";
import type { MedicallyCopy } from "@/app/[locale]/(patient)/about/_prototypes/medically/medicallyCopy";

/**
 * Portage de components/FunFact/FunFact.jsx.
 *
 * Meme bloc, meme mise en page, mais les quatre chiffres du template
 * (250 medecins, 3020 clients, 25 recompenses) sont remplaces par des faits
 * verifiables : praticiens tous verifies, trois langues, gratuite patient,
 * reservation ouverte en permanence.
 */
export function MedFunFact({
  hclass,
  facts,
}: {
  hclass: string;
  facts: MedicallyCopy["facts"];
}) {
  return (
    <section className={hclass}>
      <div className="container">
        {/* Cascade : les quatre faits arrivent par vagues (socle motion.css). */}
        <RevealCascade className="row">
          {facts.map((fact) => (
            <div className="col col-lg-3 col-md-6 col-sm-6 col-12" key={fact.label}>
              <div className="item">
                <i className={fact.icon}></i>
                <h3>
                  {typeof fact.count === "number" ? <MedCountUp end={fact.count} /> : fact.text}
                  {fact.suffix}
                </h3>
                <p>{fact.label}</p>
              </div>
            </div>
          ))}
        </RevealCascade>
      </div>
    </section>
  );
}

/**
 * Portage de components/TeamSection/TeamSection.jsx.
 *
 * DocAgora est un annuaire : il n'a pas de praticiens salaries a presenter.
 * Le bloc garde sa mise en page (trois portraits encadres) mais sert a montrer
 * les trois profils de patients, ce qui rend les portraits pertinents.
 */
export function MedAudience({
  hclass,
  locale,
  title,
  cards,
}: {
  hclass: string;
  locale: string;
  title: MedicallyCopy["audienceTitle"];
  cards: MedicallyCopy["audience"];
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
        {/* Cascade : les trois profils arrivent par vagues (socle motion.css). */}
        <RevealCascade className="row">
          {cards.map((card) => (
            <div className="col-lg-4 col-md-6 col-12" key={card.id}>
              <div className="team_card">
                <div className="image">
                  <img src={card.image} alt="" />
                  <div className="border-shape">
                    <img src="/medically/images/team/border-shape.svg" alt="" />
                  </div>
                </div>
                <div className="content">
                  <h3>
                    <Link href={`/${locale}/specialties`}>{card.title}</Link>
                  </h3>
                  <span>{card.subtitle}</span>
                </div>
              </div>
            </div>
          ))}
        </RevealCascade>
      </div>
    </section>
  );
}
