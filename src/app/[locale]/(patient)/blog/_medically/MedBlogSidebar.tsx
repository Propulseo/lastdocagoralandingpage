/* eslint-disable @next/next/no-img-element -- Reproduction fidele du template :
   next/image casserait les selecteurs `img` propres au theme. */
import { Link } from "@/i18n/navigation";

import RevealCascade from "@/components/shared/RevealCascade";
import { getAllTags, getBlogPosts, getCategories, isActiveFilter } from "@/lib/blog";
import { getBlogStrings } from "@/lib/blogStrings";

/**
 * Portage de components/BlogSidebar/BlogSidebar.jsx.
 *
 * Recherche, rubriques et mots-cles sont branches : chacun renvoie vers
 * /blog?q=<terme>, ou la liste filtre les articles (titre, chapo, categorie,
 * mots-cles). Le filtre actif est mis en evidence (`is-active`) et un nouveau
 * clic dessus le desactive (retour a /blog). Rubriques et nuage de mots-cles
 * sont derives des articles — pas d'entree orpheline. Suivent la locale.
 */
export default function MedBlogSidebar({
  blLeft,
  locale,
  query,
}: {
  blLeft?: string;
  locale: string;
  query?: string;
}) {
  const blogHref = "/blog";
  const posts = getBlogPosts(locale);
  const categories = getCategories(locale);
  const tags = getAllTags(locale);
  const sidebar = getBlogStrings(locale).sidebar;

  // Filtre inactif -> on l'active ; filtre deja actif -> on le retire (toggle).
  const toggleHref = (term: string) =>
    isActiveFilter(query, term) ? blogHref : `${blogHref}?q=${encodeURIComponent(term)}`;

  return (
    <div className={`col col-lg-4 col-12 ${blLeft ?? ""}`}>
      {/* Les encadrés arrivent en cascade, légèrement après la liste (T2/B3).
          Le widget « à propos » du template a sauté : il n'apportait qu'une
          photo stock et un texte que la page /about dit déjà mieux. */}
      <RevealCascade className="blog-sidebar" baseDelayMs={120}>
        <div className="widget search-widget">
          <h3>{sidebar.searchTitle}</h3>
          <form action={blogHref} method="get">
            <div>
              <input
                type="text"
                name="q"
                className="form-control"
                placeholder={sidebar.searchPlaceholder}
                defaultValue={query ?? ""}
                aria-label={sidebar.searchTitle}
              />
              <button type="submit" aria-label={sidebar.searchTitle}>
                <i className="ti-search"></i>
              </button>
            </div>
          </form>
        </div>

        <div className="widget category-widget">
          <h3>{sidebar.categoriesTitle}</h3>
          <ul>
            {categories.map((category) => {
              const active = isActiveFilter(query, category.label);
              return (
                <li key={category.label}>
                  <Link
                    href={toggleHref(category.label)}
                    className={active ? "is-active" : undefined}
                    aria-current={active ? "true" : undefined}
                  >
                    {category.label}
                    <span>{category.count}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="widget recent-post-widget">
          <h3>{sidebar.recentTitle}</h3>
          <div className="posts">
            {posts.map((post) => (
              <div className="post" key={post.id}>
                <div className="img-holder">
                  <img src={post.thumb} alt="" />
                </div>
                <div className="details">
                  <h4>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h4>
                  <span className="date">{post.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="widget tag-widget">
          <h3>{sidebar.tagsTitle}</h3>
          <ul>
            {tags.map((tag) => {
              const active = isActiveFilter(query, tag);
              return (
                <li key={tag}>
                  <Link
                    href={toggleHref(tag)}
                    className={active ? "is-active" : undefined}
                    aria-current={active ? "true" : undefined}
                  >
                    {tag}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </RevealCascade>
    </div>
  );
}
