"use client";

import { useRevealInView } from "@/components/shared/useRevealInView";
import VerifiedRecordCard, { type Lang } from "@/components/home/VerifiedRecordCard";
import type { SpecialtiesCopy } from "@/app/[locale]/(patient)/specialties/_medically/specialtiesCopy";

/**
 * « Le fil de la recherche » — seul visuel du corps de /specialties.
 *
 * Le bloc n'énumère plus cinq critères : il fait suivre UNE recherche. Un fil
 * teal→cobalt se trace de gauche à droite, trois stations s'allument en
 * accumulant leurs pastilles (spécialité, puis ville, puis langue), et le fil
 * aboutit sur la fiche vérifiée du site. Le croisement des filtres est montré
 * par l'accumulation plutôt qu'expliqué.
 *
 * Toute la grammaire vient du site : le filet qui se trace est celui du
 * parcours de /about, le dégradé teal→cobalt celui des liserés de heroes, la
 * fiche et sa lévitation celles du hero /about. Rien de neuf à apprendre.
 *
 * La séquence se joue une fois, à l'entrée dans le champ (socle motion,
 * useRevealInView). Sans JavaScript ou en reduced-motion tout est visible
 * d'emblée : les keyframes ne s'appliquent que sous `.play` — jamais de
 * contenu caché au rendu serveur.
 *
 * La fiche porte sa propre mention « illustratif » ; la spécialité et la ville
 * viennent des sources uniques (lib/specialties, `cities.items`).
 */
export default function SearchJourney({
  copy,
  specialty,
  city,
  icon,
  languages = ["PT", "FR", "EN"],
}: {
  copy: SpecialtiesCopy["capabilities"];
  specialty: string;
  city: string;
  icon: string;
  languages?: Lang[];
}) {
  const { ref, revealed } = useRevealInView();

  /** Chaque station reprend les choix précédents et ajoute le sien. */
  const stations = [
    [specialty],
    [specialty, city],
    [specialty, city, copy.langWord],
  ];

  return (
    <div ref={ref} className={`spec-journey${revealed ? " play" : ""}`}>
      <div className="spec-journey__steps">
        {stations.map((chips, i) => (
          <div className="spec-journey__step" key={copy.steps[i]}>
            <span className="spec-journey__num">0{i + 1}</span>
            <div className="spec-journey__chips">
              {chips.map((chip, j) => (
                <span
                  className={`spec-journey__chip${j === chips.length - 1 ? " is-new" : ""}`}
                  key={chip}
                >
                  {chip}
                </span>
              ))}
            </div>
            <p className="spec-journey__cap">{copy.steps[i]}</p>
          </div>
        ))}
      </div>

      <div className="spec-journey__dest">
        <div className="spec-journey__card">
          <span className="spec-journey__halo" aria-hidden="true" />
          <VerifiedRecordCard
            icon={icon}
            specialty={specialty}
            city={city}
            languages={languages}
          />
        </div>
        <p className="spec-journey__destcap">{copy.destCap}</p>
      </div>
    </div>
  );
}
