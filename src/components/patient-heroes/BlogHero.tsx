/* eslint-disable @next/next/no-img-element -- Même contrainte que le reste du
   portage Medically : next/image enveloppe l'image et injecte des styles inline,
   ce qui casserait le cadrage plein format de la « une ». */
import { Link } from "@/i18n/navigation";

import { blogHeroCss } from "@/components/patient-heroes/blogHero.styles";
import type { BlogPost } from "@/lib/blog";

/**
 * BlogHero — masthead « magazine » de /blog (thème clair patient). Rendu HORS
 * `.med`. Statique, reveals CSS. Textes trilingues via blogStrings (en props).
 *
 * Il ne se contente plus de poser le ton : il porte les deux choses que le
 * lecteur cherche en arrivant — les rubriques (navigation visible tout de suite,
 * plus enfouie dans la barre latérale) et LA « une », l'article mis en avant en
 * grande carte duotone, titre posé sur l'image. La liste en dessous reprend donc
 * à partir du deuxième article : elle ne répète pas la une.
 *
 * `featured` est optionnel : une recherche sans résultat n'a pas de une, le
 * masthead se réduit alors au titre et aux rubriques.
 */
export default function BlogHero({
  title,
  subtitle,
  homeLabel,
  crumb,
  locale,
  categories,
  activeCategory,
  allCategoriesLabel,
  featured,
  featuredLabel,
  readMore,
}: {
  title: string;
  subtitle: string;
  homeLabel: string;
  crumb: string;
  locale: string;
  categories: { label: string; count: number }[];
  /** Rubrique actuellement filtrée (?q=), pour l'état actif des pastilles. */
  activeCategory?: string;
  allCategoriesLabel: string;
  featured?: BlogPost;
  featuredLabel: string;
  readMore: string;
}) {
  const blogHref = "/blog";
  const normalized = (activeCategory ?? "").trim().toLowerCase();
  const isAll = normalized === "";

  return (
    <section className="pbh" aria-label={title}>
      <style>{blogHeroCss}</style>

      <div className="pbh__inner">
        <div className="pbh__crumb pbh-reveal pbh-d1">
          <Link href="/">{homeLabel}</Link> &nbsp;/&nbsp; {crumb}
        </div>
        <h1 className="pbh__title pbh-reveal pbh-d2">{title}</h1>
        <p className="pbh__subtitle pbh-reveal pbh-d3">{subtitle}</p>

        <nav className="pbh__cats pbh-reveal pbh-d3" aria-label={allCategoriesLabel}>
          <Link
            href={blogHref}
            className={`pbh__cat${isAll ? " is-active" : ""}`}
            aria-current={isAll ? "true" : undefined}
          >
            {allCategoriesLabel}
          </Link>
          {categories.map((category) => {
            const active = category.label.toLowerCase() === normalized;
            return (
              <Link
                key={category.label}
                href={`${blogHref}?q=${encodeURIComponent(category.label)}`}
                className={`pbh__cat${active ? " is-active" : ""}`}
                aria-current={active ? "true" : undefined}
              >
                {category.label}
                <span className="pbh__cat-count">{category.count}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {featured && (
        <div className="pbh__wide pbh-reveal pbh-d4">
          <article className="pbh__cover mo-premium-card">
            <div className="pbh__cover-media">
              <img src={featured.image} alt="" />
            </div>
            <div className="pbh__cover-scrim" aria-hidden="true"></div>
            <div className="pbh__cover-body">
              <div className="pbh__cover-tags">
                <span className="pbh__cover-flag">{featuredLabel}</span>
                <span className="pbh__cover-cat">{featured.category}</span>
              </div>
              <h2 className="pbh__cover-title">
                <Link href={`${blogHref}/${featured.slug}`}>{featured.title}</Link>
              </h2>
              <p className="pbh__cover-excerpt">{featured.excerpt}</p>
              <span className="pbh__cover-meta">{featured.date}</span>
              <Link href={`${blogHref}/${featured.slug}`} className="pbh__cover-more">
                <span>{readMore}</span>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
