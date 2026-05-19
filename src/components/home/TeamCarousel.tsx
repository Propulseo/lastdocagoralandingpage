"use client";
import { useTranslations } from "next-intl";

const MEMBER_KEYS = ["member1", "member2", "member3", "member4", "member5", "member6"] as const;

export default function TeamCarousel() {
  const t = useTranslations("team");
  return (
    <section className="team-layout2 pb-80">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-8 offset-lg-2">
            <div className="heading text-center mb-40">
              {/* Placeholder profiles — to be replaced with real profiles */}
              <h3 className="heading__title">{t("title")}</h3>
              <p className="heading__desc">{t("desc")}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div
              className="slick-carousel"
              data-slick='{"slidesToShow": 3, "slidesToScroll": 1, "autoplay": true, "arrows": true, "dots": false, "responsive": [ {"breakpoint": 992, "settings": {"slidesToShow": 2}}, {"breakpoint": 767, "settings": {"slidesToShow": 1}}, {"breakpoint": 480, "settings": {"slidesToShow": 1}}]}'
            >
              {MEMBER_KEYS.map((key, i) => (
                <div key={key} className="member">
                  <div className="member__img">
                    <img src={`/assets/images/team/${i + 1}.jpg`} alt="member img" />
                  </div>
                  <div className="member__info">
                    <h5 className="member__name"><span>{t(`members.${key}.name`)}</span></h5>
                    <p className="member__job">{t(`members.${key}.job`)}</p>
                    <p className="member__desc">{t(`members.${key}.desc`)}</p>
                    <div className="mt-20 d-flex flex-wrap justify-content-between align-items-center">
                      <span className="btn btn__secondary btn__link btn__rounded">
                        <span>{t("readMore")}</span>
                        <i className="icon-arrow-right"></i>
                      </span>
                      <ul className="social-icons list-unstyled mb-0">
                        <li><button type="button" className="facebook" aria-label="Facebook"><i className="fab fa-facebook-f"></i></button></li>
                        <li><button type="button" className="twitter" aria-label="Twitter"><i className="fab fa-twitter"></i></button></li>
                        <li><button type="button" className="phone" aria-label="Phone"><i className="fas fa-phone-alt"></i></button></li>
                      </ul>
                    </div>
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
