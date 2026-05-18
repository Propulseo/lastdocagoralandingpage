"use client";

export default function Gallery() {
  return (
    <section className="gallery pt-0 pb-90">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div
              className="slick-carousel"
              data-slick='{"slidesToShow": 4, "slidesToScroll": 1, "autoplay": true, "arrows": true, "dots": false, "responsive": [ {"breakpoint": 992, "settings": {"slidesToShow": 2}}, {"breakpoint": 767, "settings": {"slidesToShow": 2}}, {"breakpoint": 480, "settings": {"slidesToShow": 1}}]}'
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <a key={n} className="popup-gallery-item" href={`/assets/images/gallery/${n}.jpg`}>
                  <img src={`/assets/images/gallery/${n}.jpg`} alt="gallery img" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
