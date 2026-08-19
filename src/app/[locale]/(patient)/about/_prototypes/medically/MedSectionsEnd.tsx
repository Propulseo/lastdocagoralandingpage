/* eslint-disable @next/next/no-img-element -- Reproduction fidele du template :
   next/image casserait les selecteurs `img` propres au theme. */
import Link from "next/link";

import { MedSectionTitle } from "@/components/medically/MedPrimitives";
import RevealCascade from "@/components/shared/RevealCascade";
import { getBlogPosts } from "@/lib/blog";
import { getBlogStrings } from "@/lib/blogStrings";

/**
 * Portage de components/BlogSection/BlogSection.jsx.
 *
 * Le template ecrit `blogs.slice(0.3)` — une coquille : `slice(0.3)` vaut
 * `slice(0)` et affiche donc tous les articles au lieu de trois. On applique
 * l'intention, `slice(0, 3)`.
 */
export function MedBlog({ tClass, locale }: { tClass: string; locale: string }) {
  const t = getBlogStrings(locale);

  return (
    <section className={tClass}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9 col-12">
            <MedSectionTitle title={t.sectionTitle} subtitle={t.sectionSubtitle} />
          </div>
        </div>
        {/* Cascade par vagues ; mo-lift = la famille de cartes « soulevables »
            de /about (une seule par page — socle motion.css). Lift sur la carte,
            cascade sur la colonne : jamais les deux sur le même nœud. */}
        <RevealCascade className="row">
          {getBlogPosts(locale).slice(0, 3).map((post) => (
            <div className="col-lg-4 col-md-6 col-12" key={post.id}>
              <div className="blog_card mo-lift">
                <img src={post.image} alt="" />
                <span>{post.category}</span>
                <div className="content">
                  <ul>
                    <li>{post.date}</li>
                    <li>{post.author}</li>
                  </ul>
                  <h3>{post.title}</h3>
                  <Link href={`/${locale}/blog/${post.slug}`} aria-label={post.title}>
                    <i className="flaticon-right-arrow"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </RevealCascade>
      </div>
    </section>
  );
}
