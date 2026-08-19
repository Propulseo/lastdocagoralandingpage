/**
 * Briques communes aux pages portees du template Medically.
 *
 * Elles vivent ici plutot que dans une page, parce que /about, /blog,
 * /specialties et /contact les utilisent toutes. Chaque page garde en revanche
 * ses propres sections dans son dossier `_medically/`.
 *
 * Toutes doivent etre rendues a l'interieur d'un conteneur `.med` : la feuille
 * `medically.css` est generee avec chaque selecteur prefixe par cette classe.
 */
import Link from "next/link";

/** Portage de components/pagetitle/PageTitle.jsx */
export function MedPageTitle({
  title,
  crumb,
  locale,
  homeLabel = "Accueil",
}: {
  title: string;
  crumb: string;
  locale: string;
  homeLabel?: string;
}) {
  return (
    <div className="wpo-breadcumb-area">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="wpo-breadcumb-wrap">
              <h2>{title}</h2>
              <ul>
                <li>
                  <Link href={`/${locale}`}>{homeLabel}</Link>
                </li>
                <li>{crumb}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Portage de components/SectionTitle/SectionTitle.jsx */
export function MedSectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="section_title">
      <h2>{title}</h2>
      <h3>{subtitle}</h3>
    </div>
  );
}
