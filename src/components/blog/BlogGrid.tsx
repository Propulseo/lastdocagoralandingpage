"use client";
import { useTranslations } from "next-intl";

const ARTICLE_KEYS = ["a1", "a2", "a3", "a4", "a5", "a6"] as const;

export default function BlogGrid() {
  const t = useTranslations("blogPage");

  return (
    <section className="blog-grid">
      <div className="container">
        {/* Placeholder blog articles — to be replaced with real SEO content */}
        <div className="row">
          {ARTICLE_KEYS.map((key, i) => (
            <div key={key} className="col-sm-12 col-md-6 col-lg-4">
              <div className="post-item">
                <div className="post__img">
                  <a href="#">
                    <img
                      src={`/assets/images/blog/grid/${i + 1}.jpg`}
                      alt={t(`articles.${key}.title`)}
                      loading="lazy"
                    />
                  </a>
                </div>
                <div className="post__body">
                  <div className="post__meta-cat">
                    <a href="#">{t(`articles.${key}.category`)}</a>
                  </div>
                  <div className="post__meta d-flex">
                    <span className="post__meta-date">{t(`articles.${key}.date`)}</span>
                    <a className="post__meta-author" href="#">{t(`articles.${key}.author`)}</a>
                  </div>
                  <h4 className="post__title">
                    <a href="#">{t(`articles.${key}.title`)}</a>
                  </h4>
                  <p className="post__desc">{t(`articles.${key}.excerpt`)}</p>
                  <a href="#" className="btn btn__secondary btn__link btn__rounded">
                    <span>{t("readMore")}</span>
                    <i className="icon-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <nav className="pagination-area">
              <ul className="pagination justify-content-center">
                <li><a className="current" href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#"><i className="icon-arrow-right"></i></a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
