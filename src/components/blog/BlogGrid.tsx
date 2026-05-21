"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AnimatedCardsContainer, AnimatedCard } from "@/components/shared/AnimatedCards";

const ARTICLE_KEYS = ["a1", "a2", "a3", "a4", "a5", "a6"] as const;

export default function BlogGrid() {
  const t = useTranslations("blogPage");

  return (
    <section className="blog-grid">
      <div className="container">
        <AnimatedCardsContainer className="row">
          {ARTICLE_KEYS.map((key, i) => (
            <AnimatedCard key={key} className="col-sm-12 col-md-6 col-lg-4">
              <div className="post-item">
                <div className="post__img">
                  <Link href="/blog">
                    <img
                      src={`/assets/images/blog/grid/${i + 1}.jpg`}
                      alt={t(`articles.${key}.title`)}
                      loading="lazy"
                    />
                  </Link>
                </div>
                <div className="post__body">
                  <div className="post__meta-cat">
                    <span>{t(`articles.${key}.category`)}</span>
                  </div>
                  <div className="post__meta d-flex">
                    <span className="post__meta-date">{t(`articles.${key}.date`)}</span>
                    <span className="post__meta-author">{t(`articles.${key}.author`)}</span>
                  </div>
                  <h4 className="post__title">
                    <Link href="/blog">{t(`articles.${key}.title`)}</Link>
                  </h4>
                  <p className="post__desc">{t(`articles.${key}.excerpt`)}</p>
                  <Link href="/blog" className="btn btn__secondary btn__link btn__rounded">
                    <span>{t("readMore")}</span>
                    <i className="icon-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </AnimatedCardsContainer>
        <div className="row">
          <div className="col-12 text-center">
            <nav className="pagination-area">
              <ul className="pagination justify-content-center">
                <li><button type="button" className="current" aria-label="Page 1" aria-current="page">1</button></li>
                <li><button type="button" aria-label="Page 2">2</button></li>
                <li><button type="button" aria-label="Next page"><i className="icon-arrow-right"></i></button></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
