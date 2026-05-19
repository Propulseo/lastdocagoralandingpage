"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar({ locale }: { locale?: string }) {
  void locale;
  const t = useTranslations("navbar");
  const pathname = usePathname();

  return (
    <nav className="navbar navbar-expand-lg sticky-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/" style={{ marginLeft: "clamp(0px, 5vw, 3cm)" }}>
          <img
            src="/assets/images/logo/logo-light.png"
            className="logo-light"
            alt="logo"
            style={{ transform: "scale(1.4)" }}
          />
          <img
            src="/assets/images/logo/logo-dark.png"
            className="logo-dark"
            alt="logo"
            style={{ transform: "scale(1.4)" }}
          />
        </Link>
        <button className="navbar-toggler" type="button">
          <span className="menu-lines">
            <span></span>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="mainNavigation">
          <ul className="navbar-nav mx-auto" style={{ paddingLeft: "5vw" }}>
            <li className="nav__item">
              <Link href="/" className={`nav__item-link${pathname === "/" ? " active" : ""}`}>
                {t("home")}
              </Link>
            </li>
            <li className="nav__item">
              <Link href="/about" className={`nav__item-link${pathname === "/about" ? " active" : ""}`}>
                {t("about")}
              </Link>
            </li>
            <li className="nav__item">
              <Link href="/specialties" className={`nav__item-link${pathname === "/specialties" ? " active" : ""}`}>
                {t("specialties")}
              </Link>
            </li>
            <li className="nav__item">
              <Link href="/blog" className={`nav__item-link${pathname === "/blog" ? " active" : ""}`}>
                {t("blog")}
              </Link>
            </li>
            <li className="nav__item">
              <Link href="/contact" className={`nav__item-link${pathname === "/contact" ? " active" : ""}`}>
                {t("contact")}
              </Link>
            </li>
          </ul>
          <div className="d-block d-lg-none py-3 px-3">
            <LanguageSwitcher />
          </div>
          <button className="close-mobile-menu d-block d-lg-none">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="d-none d-xl-flex align-items-center position-relative ml-30">
          <LanguageSwitcher />
          <Link
            href="/pro"
            className="btn btn__primary btn__rounded ml-30"
          >
            <i className="icon-doctor"></i>
            <span>{t("imAProfessional")}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
