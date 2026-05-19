"use client";
import { useTranslations } from "next-intl";

export default function CitiesGallery() {
  const t = useTranslations("cities");
  const cities = t.raw("items") as string[];

  return (
    <section className="gallery pt-80 pb-90">
      <div className="container">
        <div className="row mb-30">
          <div className="col-sm-12 col-md-12 col-lg-8 offset-lg-2 text-center">
            <h3 className="heading__title">{t("title")}</h3>
            <p className="heading__desc">{t("desc")}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div
              className="slick-carousel"
              data-slick='{"slidesToShow": 4, "slidesToScroll": 1, "autoplay": true, "arrows": true, "dots": false, "responsive": [ {"breakpoint": 992, "settings": {"slidesToShow": 2}}, {"breakpoint": 767, "settings": {"slidesToShow": 2}}, {"breakpoint": 480, "settings": {"slidesToShow": 1}}]}'
            >
              {cities.map((city: string, i: number) => (
                <div key={city} className="text-center">
                  {/* City image placeholder — to be replaced with real city photo */}
                  <a className="popup-gallery-item" href={`/assets/images/gallery/${i + 1}.jpg`}>
                    <img src={`/assets/images/gallery/${i + 1}.jpg`} alt={city} />
                  </a>
                  <p className="font-weight-bold mt-10">{city}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
