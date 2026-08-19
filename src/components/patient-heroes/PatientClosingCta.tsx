import { searchLoginUrl } from "@/lib/specialties";

/**
 * PatientClosingCta — clôture conversion des sous-pages patient.
 *
 * /about et /blog se terminaient sans aucun appel à l'action, alors que la home
 * finit toujours par une invitation à chercher. On réemploie exactement le
 * langage visuel de sa bande finale (classes `.da-final*` de redesign.css,
 * chargée globalement) plutôt que d'inventer un bloc : même carte, même bouton
 * dégradé teal, même lien fléché qui avance au survol.
 *
 * Différence avec `home/FinalCtaSearch` : celui-ci pointe sur l'ancre `#vnp-hero`
 * de la home, qui n'existe pas ici. Le CTA descend donc vers la vraie recherche
 * du produit (searchLoginUrl) — un lien honnête, jamais une ancre morte.
 *
 * Rendu HORS `.med` (aucune classe du template), sous `.pat-aurora` : la classe
 * `pat-final` rend la bande transparente pour laisser passer la nappe.
 */
interface PatientClosingCtaProps {
  eyebrow: string;
  title: string;
  sub: string;
  cta: string;
  /** Lien du bouton. Par défaut : la recherche réelle de la plateforme. */
  href?: string;
}

export default function PatientClosingCta({
  eyebrow,
  title,
  sub,
  cta,
  href,
}: PatientClosingCtaProps) {
  return (
    <section className="da-final da-final--card pat-final">
      <div className="da-shell">
        <div className="da-final__inner">
          <span className="da-final__eyebrow">{eyebrow}</span>
          <h2 className="da-final__title">{title}</h2>
          <p className="da-final__sub">{sub}</p>
          <a className="da-final__cta" href={href ?? searchLoginUrl({})}>
            <span>{cta}</span>
            <i className="icon-arrow-right da-final__cta-arrow" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
