/* eslint-disable @next/next/no-img-element -- Reproduction fidele du template :
   next/image casserait les selecteurs `img` propres au theme. */
import { Link } from "@/i18n/navigation";

import MedBlogSidebar from "@/app/[locale]/(patient)/blog/_medically/MedBlogSidebar";
import AnimatedSection from "@/components/shared/AnimatedSection";
import RevealCascade from "@/components/shared/RevealCascade";
import { searchBlogPosts } from "@/lib/blog";
import { getBlogStrings } from "@/lib/blogStrings";

/**
 * Liste du blog, variante sidebar a gauche.
 *
 * Mise en page « vedette + cartes » : le premier article garde le grand format
 * du template (image large, chapo, « lire la suite ») ; les suivants passent en
 * cartes plus compactes, cote a cote. Deux ecarts par rapport au template, pour
 * ne pas mentir : le bouton video est retire (pas de video), la pagination reste
 * inactive tant qu'il n'y a que trois articles.
 *
 * `query` vient de ?q= (recherche, rubrique ou mot-cle) : la liste est filtree,
 * et la mise en page « vedette + cartes » s'applique aux resultats. Contenu et
 * libelles suivent la locale.
 */
export default function MedBlogList({
  blLeft,
  blRight,
  locale,
  query,
  featuredInHero = false,
}: {
  blLeft?: string;
  blRight?: string;
  locale: string;
  query?: string;
  /** La « une » est portée par le masthead : la liste reprend au 2e article et
   *  n'affiche plus le grand format, sinon le premier article apparaîtrait deux
   *  fois sur la même page. */
  featuredInHero?: boolean;
}) {
  const posts = searchBlogPosts(locale, query ?? "");
  const t = getBlogStrings(locale);
  const blogHref = "/blog";
  const activeQuery = (query ?? "").trim();
  // La une est soit dans le masthead, soit en tête de liste — jamais les deux.
  const [first, ...rest] = posts;
  const featured = featuredInHero ? undefined : first;

  return (
    <section className="wpo-blog-pg-section section-padding">
      <div className="container">
        <div className="row">
          <div className={`col col-lg-8 col-12 ${blRight ?? ""}`}>
            <div className="wpo-blog-content">
              {activeQuery !== "" && (
                <div className="blog-active-filter">
                  <span className="blog-active-filter__label">
                    {t.resultsFor} <strong>«{activeQuery}»</strong>
                  </span>
                  <Link href={blogHref} className="blog-active-filter__clear">
                    {t.clearFilter}
                  </Link>
                </div>
              )}

              {posts.length === 0 ? (
                <p>{t.searchNoResults}</p>
              ) : (
                <>
                  {/* Vedette en reveal, puis cartes compactes en cascade.
                      mo-lift = la famille de cartes « soulevables » de /blog
                      (une seule par page) ; il vit sur l'article, DANS un
                      wrapper qui porte la cascade — jamais les deux transforms
                      sur le même nœud (socle motion.css). */}
                  {featured && (
                  <AnimatedSection>
                    <div className="post format-standard-image">
                      <div className="entry-media">
                        <img src={featured.image} alt="" />
                      </div>
                      <div className="entry-meta">
                        <ul>
                          <li>
                            <i className="fi flaticon-user"></i> {t.metaBy}{" "}
                            <Link href={`${blogHref}/${featured.slug}`}>{featured.author}</Link>
                          </li>
                          <li>
                            <i className="fi flaticon-calendar"></i> {featured.date}
                          </li>
                          <li>{featured.category}</li>
                        </ul>
                      </div>
                      <div className="entry-details">
                        <h3>
                          <Link href={`${blogHref}/${featured.slug}`}>{featured.title}</Link>
                        </h3>
                        <p>{featured.excerpt}</p>
                        <Link href={`${blogHref}/${featured.slug}`} className="read-more">
                          {t.readMore}
                        </Link>
                      </div>
                    </div>
                  </AnimatedSection>
                  )}

                  {rest.length > 0 && (
                    <RevealCascade
                      className={`blog-mini-grid${featured ? "" : " blog-mini-grid--lead"}`}
                    >
                      {rest.map((post) => (
                        <div key={post.id}>
                          <article className="blog-mini mo-lift">
                            <Link
                              href={`${blogHref}/${post.slug}`}
                              className="blog-mini__media"
                              aria-label={post.title}
                            >
                              <img src={post.image} alt="" />
                            </Link>
                            <span className="blog-mini__cat">{post.category}</span>
                            <h3 className="blog-mini__title">
                              <Link href={`${blogHref}/${post.slug}`}>{post.title}</Link>
                            </h3>
                            <span className="blog-mini__date">{post.date}</span>
                          </article>
                        </div>
                      ))}
                    </RevealCascade>
                  )}
                </>
              )}
            </div>
          </div>

          <MedBlogSidebar blLeft={blLeft} locale={locale} query={query} />
        </div>
      </div>
    </section>
  );
}
