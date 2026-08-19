import type { SpecialtiesCopy } from "@/app/[locale]/(patient)/specialties/_medically/specialtiesCopy";
import { PLATFORM_URL, searchLoginUrl } from "@/lib/specialties";

/**
 * Bande de conversion de la page /specialties.
 *
 * C'était la barre latérale droite du template. Depuis que la liste des seize
 * spécialités est passée dans le corps de la page, il ne reste qu'une bande
 * unique, centrée en bas : la recherche à gauche, la création de compte à
 * droite, séparées d'un filet.
 *
 * Le bouton « Rechercher » mène à la vraie recherche du produit via
 * searchLoginUrl(). L'ancienne colonne « newsletter » (champ e-mail jamais
 * branché — faux formulaire) a été remplacée par un CTA réel vers la
 * plateforme (PLATFORM_URL) : deux actions, deux vraies destinations.
 */
export default function MedServiceSidebar({ copy }: { copy: SpecialtiesCopy["sidebar"] }) {
  return (
    <div className="spec_convert">
      <div className="spec_convert__col">
        <span className="spec_convert__eyebrow">{copy.ctaEyebrow}</span>
        <h2 className="spec_convert__title">{copy.ctaTitle}</h2>
        <p className="spec_convert__text">{copy.ctaLede}</p>
        <a className="spec_convert__btn" href={searchLoginUrl({})}>
          {copy.ctaButton}
          <span aria-hidden="true">→</span>
        </a>
      </div>

      <div className="spec_convert__rule" aria-hidden="true"></div>

      <div className="spec_convert__col">
        <span className="spec_convert__eyebrow">{copy.accountEyebrow}</span>
        <h2 className="spec_convert__title">{copy.accountTitle}</h2>
        <p className="spec_convert__text">{copy.accountLede}</p>
        <a className="spec_convert__btn" href={PLATFORM_URL}>
          {copy.accountButton}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
