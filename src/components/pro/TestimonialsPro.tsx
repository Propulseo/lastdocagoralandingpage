"use client";

import { useTranslations } from "next-intl";

// Placeholder reviews — illustrative content to be replaced with real
// certified-professional reviews once available. Personas and cities are fictional.
const ITEMS = ["item1", "item2", "item3", "item4", "item5", "item6"] as const;

// Pixel-perfect reuse of the legacy template carousel chrome (services-carousel +
// slick + heading), identical to the former patient SpecialtiesCarousel, with
// professional review cards instead of specialty cards.
export default function TestimonialsPro() {
  const t = useTranslations("pro.testimonials");

  return (
    <section className="services-layout1 services-carousel pro-reviews-carousel pro-section pro-s-reviews">
      <style>{`
        .pro-reviews-carousel { padding: 120px 0 100px; }
        @media (min-width: 1200px) { .pro-reviews-carousel { padding-top: 200px; } }
        .pro-reviews-carousel .service__icon i { color: #435ba1; }
        .pro-reviews-carousel .service__desc { font-style: italic; color: #4b5563; }
        .pro-reviews-carousel .review__meta {
          font-size: 14px;
          color: #6b7280;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .pro-reviews-carousel .review__meta i { font-size: 12px; color: #435ba1; }
      `}</style>

      <div className="bg-img">
        <img src="/assets/images/backgrounds/2.jpg" alt="background" />
      </div>

      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-6 offset-lg-3">
            <div className="heading text-center mb-60">
              <h2 className="heading__subtitle">{t("subtitle")}</h2>
              <h3 className="heading__title">{t("title")}</h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div
              className="slick-carousel"
              data-slick='{"slidesToShow": 3, "slidesToScroll": 1, "autoplay": true, "arrows": true, "dots": true, "responsive": [ {"breakpoint": 992, "settings": {"slidesToShow": 2}}, {"breakpoint": 767, "settings": {"slidesToShow": 1}}, {"breakpoint": 480, "settings": {"slidesToShow": 1}}]}'
            >
              {ITEMS.map((key) => (
                <div key={key} className="service-item">
                  <div className="service__icon">
                    <i className="fas fa-quote-left"></i>
                    <i className="fas fa-quote-left"></i>
                  </div>
                  <div className="service__content">
                    <p className="service__desc">{t(`items.${key}.quote`)}</p>
                    <h4 className="service__title" style={{ fontSize: 19, marginBottom: 4 }}>
                      {t(`items.${key}.name`)}
                    </h4>
                    <span className="review__meta">
                      {t(`items.${key}.specialty`)}
                      <span style={{ opacity: 0.5 }}>&middot;</span>
                      <i className="fas fa-map-marker-alt"></i>
                      {t(`items.${key}.location`)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
