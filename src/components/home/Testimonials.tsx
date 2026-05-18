"use client";
import { useTranslations } from "next-intl";

const ITEM_KEYS = ["item1", "item2", "item3"] as const;

export default function Testimonials({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("testimonials");
  return (
    <section className={`testimonials-layout2 ${compact ? "pt-40" : "pt-130"} pb-40`}>
      <div className="container">
        <div className="testimonials-wrapper">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-5">
              <div className="heading-layout2">
                <h3 className="heading__title">{t("title")}</h3>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-7">
              <div className="slider-with-navs">
                {ITEM_KEYS.map((key) => (
                  <div key={key} className="testimonial-item">
                    {/* Temporary testimonial to be replaced */}
                    <h3 className="testimonial__title">&ldquo;{t(`items.${key}.quote`)}&rdquo;</h3>
                  </div>
                ))}
              </div>
              <div className="slider-nav mb-60">
                {ITEM_KEYS.map((key, i) => (
                  <div key={key} className="testimonial__meta">
                    <div className="testimonial__thmb">
                      <img src={`/assets/images/testimonials/thumbs/${i + 1}.png`} alt="author thumb" />
                    </div>
                    <div>
                      <h4 className="testimonial__meta-title">{t(`items.${key}.name`)}</h4>
                      <p className="testimonial__meta-desc">{t(`items.${key}.location`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
