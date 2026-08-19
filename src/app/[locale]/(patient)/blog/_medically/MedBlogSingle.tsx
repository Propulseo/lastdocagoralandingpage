/* eslint-disable @next/next/no-img-element -- Reproduction fidele du template :
   next/image casserait les selecteurs `img` propres au theme. */
import Link from "next/link";

import MedBlogSidebar from "@/app/[locale]/(patient)/blog/_medically/MedBlogSidebar";
import type { BlogBlock, BlogPost } from "@/lib/blog";
import { getBlogStrings } from "@/lib/blogStrings";

/**
 * Portage de main-component/BlogDetails, variante « blog-single-left-sidebar » :
 * le contenu a droite (order-lg-2), la barre laterale a gauche (order-lg-1).
 *
 * Plusieurs blocs du template sont volontairement retires — pour ne pas simuler
 * ce qui n'existe pas ou faire doublon avec la barre laterale : la zone de
 * commentaires et son formulaire (aucun backend), la barre d'etiquettes de
 * l'article et l'encadre auteur (deja presents dans la sidebar).
 */
function BlogBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <>
      {blocks.map((block) => {
        switch (block.type) {
          case "p":
            return <p key={block.text}>{block.text}</p>;
          case "h3":
            return <h3 key={block.text}>{block.text}</h3>;
          case "quote":
            return <blockquote key={block.text}>{block.text}</blockquote>;
          case "list":
            return (
              <ul key={block.items[0]}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "gallery":
            return (
              <div className="gallery" key={block.images[0]}>
                {block.images.map((src) => (
                  <div key={src}>
                    <img src={src} alt="" />
                  </div>
                ))}
              </div>
            );
        }
      })}
    </>
  );
}

export default function MedBlogSingle({
  post,
  prev,
  next,
  locale,
}: {
  post: BlogPost;
  prev: BlogPost | null;
  next: BlogPost | null;
  locale: string;
}) {
  const blogHref = `/${locale}/blog`;
  const t = getBlogStrings(locale);

  return (
    <section className="wpo-blog-single-section wpo-blog-single-left-sidebar-section section-padding">
      <div className="container">
        <div className="row">
          <div className="col col-lg-8 col-12 order-lg-2">
            <div className="wpo-blog-content">
              <div className="post format-standard-image">
                <div className="entry-media">
                  <img src={post.image} alt="" />
                </div>

                <div className="entry-meta">
                  <ul>
                    <li>
                      <i className="fi flaticon-user"></i> {t.metaBy}{" "}
                      <Link href={blogHref}>{post.author}</Link>
                    </li>
                    <li>
                      <i className="fi flaticon-calendar"></i> {post.date}
                    </li>
                    <li>{post.category}</li>
                  </ul>
                </div>

                <BlogBody blocks={post.body} />

                {(prev || next) && (
                  <div className="more-posts">
                    {prev && (
                      <div className="previous-post">
                        <Link
                          href={`/${locale}/blog/${prev.slug}`}
                          className="post-control-link"
                        >
                          {t.prevLabel}
                        </Link>
                        <h4 className="post-name">
                          <Link href={`/${locale}/blog/${prev.slug}`}>{prev.title}</Link>
                        </h4>
                      </div>
                    )}
                    {next && (
                      <div className="next-post">
                        <Link
                          href={`/${locale}/blog/${next.slug}`}
                          className="post-control-link"
                        >
                          {t.nextLabel}
                        </Link>
                        <h4 className="post-name">
                          <Link href={`/${locale}/blog/${next.slug}`}>{next.title}</Link>
                        </h4>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <MedBlogSidebar blLeft="order-lg-1" locale={locale} />
        </div>
      </div>
    </section>
  );
}
