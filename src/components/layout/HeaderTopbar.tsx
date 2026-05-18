"use client";

import { useTranslations } from "next-intl";
import HeaderSearch from "./HeaderSearch";

export default function HeaderTopbar() {
  const t = useTranslations("topbar");

  return (
    <div className="header-topbar">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-12">
            <div className="d-flex align-items-center justify-content-between">
              <ul className="contact__list d-flex flex-wrap align-items-center list-unstyled mb-0">
                <li>
                  <button className="miniPopup-emergency-trigger" type="button">
                    {t("contact")}
                  </button>
                  <div
                    id="miniPopup-emergency"
                    className="miniPopup miniPopup-emergency text-center"
                  >
                    <div className="emergency__icon">
                      <i className="icon-call3"></i>
                    </div>
                    <a href={`mailto:${t("email")}`} className="phone__number">
                      <i className="icon-email"></i> <span>{t("email")}</span>
                    </a>
                    <p>{t("emergencyNotice")}</p>
                    <a href="#" className="btn btn__secondary btn__link btn__block">
                      <span>{t("findProfessional")}</span>{" "}
                      <i className="icon-arrow-right"></i>
                    </a>
                  </div>
                </li>
                <li>
                  <i className="icon-email"></i>
                  <a href={`mailto:${t("email")}`}>{t("email")}</a>
                </li>
                <li>
                  <i className="icon-location"></i>
                  <a href="#">{t("location")}</a>
                </li>
                <li>
                  <i className="icon-clock"></i>
                  <a href="#">{t("available247")}</a>
                </li>
              </ul>
              <div className="d-flex">
                <ul className="social-icons list-unstyled mb-0 mr-30">
                  <li>
                    <a href="#">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                </ul>
                <HeaderSearch />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
