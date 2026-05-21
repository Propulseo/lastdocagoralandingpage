"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
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
                    <Link href="/specialties" className="btn btn__secondary btn__link btn__block">
                      <span>{t("findProfessional")}</span>{" "}
                      <i className="icon-arrow-right"></i>
                    </Link>
                  </div>
                </li>
                <li>
                  <i className="icon-email"></i>
                  <a href={`mailto:${t("email")}`}>{t("email")}</a>
                </li>
                <li>
                  <i className="icon-location"></i>
                  <span>{t("location")}</span>
                </li>
                <li>
                  <i className="icon-clock"></i>
                  <span>{t("available247")}</span>
                </li>
              </ul>
              <div className="d-flex">
                <ul className="social-icons list-unstyled mb-0 mr-30">
                  <li>
                    <button type="button" aria-label="Facebook">
                      <i className="fab fa-facebook-f"></i>
                    </button>
                  </li>
                  <li>
                    <button type="button" aria-label="Instagram">
                      <i className="fab fa-instagram"></i>
                    </button>
                  </li>
                  <li>
                    <button type="button" aria-label="Twitter">
                      <i className="fab fa-twitter"></i>
                    </button>
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
