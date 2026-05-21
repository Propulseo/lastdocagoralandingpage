"use client";
import { useTranslations, useLocale } from "next-intl";
import { AnimatedCardsContainer, AnimatedCard } from "@/components/shared/AnimatedCards";

const ITEM_KEYS = ["item1", "item2", "item3"] as const;

export default function FAQHighlights() {
  const t = useTranslations("faqHighlights");
  const locale = useLocale();
  const faqHref = `/${locale}/contact#faq`;

  return (
    <section className="blog-grid pb-50 bg-overlay bg-overlay-primary-gradient">
      <style>{`
        .da-faq-card {
          background: #fff;
          border-radius: 14px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .da-faq-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.14);
        }
      `}</style>
      <div className="bg-img"><img src="/assets/images/banners/3.jpg" alt="background" /></div>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-6 offset-lg-3">
            <div className="heading heading-light text-center mb-40">
              <span className="heading__subtitle d-block">{t("subtitle")}</span>
              <h2 className="heading__title">{t("title")}</h2>
            </div>
          </div>
        </div>
        <AnimatedCardsContainer className="row">
          {ITEM_KEYS.map((key, i) => (
            <AnimatedCard key={key} className="col-sm-12 col-md-6 col-lg-4">
              <div className="post-item da-faq-card">
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
            </AnimatedCard>
          ))}
        </AnimatedCardsContainer>
      </div>
    </section>
  );
}
