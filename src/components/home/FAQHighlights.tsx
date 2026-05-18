"use client";
import { useTranslations, useLocale } from "next-intl";

const ITEM_KEYS = ["item1", "item2", "item3"] as const;

export default function FAQHighlights() {
  const t = useTranslations("faqHighlights");
  const locale = useLocale();
  const faqHref = `/${locale}/contact#faq`;

  return (
    <section className="blog-grid pb-50">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-6 offset-lg-3">
            <div className="heading text-center mb-40">
              <h2 className="heading__subtitle">{t("subtitle")}</h2>
              <h3 className="heading__title">{t("title")}</h3>
            </div>
          </div>
        </div>
        <div className="row">
          {ITEM_KEYS.map((key, i) => (
            <div key={key} className="col-sm-12 col-md-6 col-lg-4">
              <div className="post-item">
                <div className="post__img">
                  <a href={faqHref}>
                    <img src={`/assets/images/blog/grid/${i + 1}.jpg`} alt="FAQ image" loading="lazy" />
                  </a>
                </div>
                <div className="post__body">
                  <div className="post__meta-cat">
                    <a href={faqHref}>{t(`items.${key}.category`)}</a>
                  </div>
                  <h4 className="post__title">
                    <a href={faqHref}>{t(`items.${key}.question`)}</a>
                  </h4>
                  <p className="post__desc">{t(`items.${key}.answer`)}</p>
                  <a href={faqHref} className="btn btn__secondary btn__link btn__rounded">
                    <span>{t("seeAllFaqs")}</span>
                    <i className="icon-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
