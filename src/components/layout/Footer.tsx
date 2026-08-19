"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Wordmark from "./Wordmark";

const specialties = [
  { key: "generalPractice", slug: "general-practice" },
  { key: "cardiology", slug: "cardiology" },
  { key: "dermatology", slug: "dermatology" },
  { key: "pediatrics", slug: "pediatrics" },
  { key: "dentistry", slug: "dentistry" },
  { key: "psychology", slug: "psychology" },
] as const;

type FooterVariant = "patient" | "pro";

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="ft2__arrow">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Footer « variant 2 » (CTA-forward), partagé patient/pro.
 * Le thème (fond, texte, accents) est piloté par les variables --ft2-* posées
 * par .ft2--patient / .ft2--pro (cf. polish.css). Le patient = navy, le pro =
 * dark. Contenu et copies i18n diffèrent selon la variante.
 */
export default function Footer({ variant = "patient" }: { variant?: FooterVariant }) {
  const t = useTranslations("footer");
  const tp = useTranslations("pro");
  const isPro = variant === "pro";

  const cta = isPro
    ? { title: tp("cta.title"), sub: tp("cta.subtitle"), label: tp("hero.ctaPrimary"), href: "/contact" }
    : { title: t("ctaTitle"), sub: t("ctaSub"), label: t("findProfessional"), href: "/specialties" };

  const linksTitle = isPro ? tp("footerPro.proLinksTitle") : t("specialtiesTitle");

  return (
    <footer className={`ft2 ${isPro ? "ft2--pro" : "ft2--patient"}`}>
      <div className="ft2__in">
        {/* Bande CTA — dernier point de conversion */}
        <div className="ft2__cta">
          <div className="ft2__cta-copy">
            <h2 className="ft2__cta-title">{cta.title}</h2>
            <p className="ft2__cta-sub">{cta.sub}</p>
          </div>
          <Link href={cta.href} className="ft2__cta-btn">
            <span>{cta.label}</span>
            <ArrowRight />
          </Link>
        </div>

        <div className="ft2__grid">
          {/* Marque */}
          <div className="ft2__brand">
            <span className="ft2__logo"><Wordmark tone="light" /></span>
            <span className="ft2__rule" aria-hidden="true" />
            <p className="ft2__lead">{t("aboutText")}</p>
          </div>

          {/* Colonne 1 : spécialités (patient) ou liens pro */}
          <nav className="ft2__col" aria-label={linksTitle}>
            <h3 className="ft2__col-title">{linksTitle}</h3>
            <ul className="ft2__links">
              {isPro ? (
                <>
                  <li><Link href="/pro/pricing">{tp("footerPro.pricingLink")}</Link></li>
                  <li><Link href="/pro/resources">{tp("footerPro.resourcesLink")}</Link></li>
                  <li><Link href="/pro#solutions">{tp("footerPro.featuresLink")}</Link></li>
                </>
              ) : (
                specialties.map((spec) => (
                  <li key={spec.key}>
                    <Link href={`/specialties#${spec.slug}`}>{t(`footerSpecialties.${spec.key}`)}</Link>
                  </li>
                ))
              )}
            </ul>
          </nav>

          {/* Colonne 2 : liens généraux */}
          <nav className="ft2__col" aria-label={t("linksTitle")}>
            <h3 className="ft2__col-title">{t("linksTitle")}</h3>
            <ul className="ft2__links">
              <li><Link href="/about">{t("linkAbout")}</Link></li>
              {isPro ? (
                <li><Link href="/">{tp("footerPro.patientSite")}</Link></li>
              ) : (
                <li><Link href="/specialties">{t("linkSpecialties")}</Link></li>
              )}
              <li><Link href="/blog">{t("linkBlog")}</Link></li>
              <li><Link href="/contact">{t("linkContact")}</Link></li>
              <li><Link href="/legal-notice">{t("linkLegal")}</Link></li>
              <li><Link href="/privacy-policy">{t("linkPrivacy")}</Link></li>
              <li><Link href="/terms-of-use">{t("linkTerms")}</Link></li>
            </ul>
          </nav>

          {/* Colonne 3 : contact */}
          <div className="ft2__col">
            <h3 className="ft2__col-title">{t("contactTitle")}</h3>
            <ul className="ft2__contact">
              <li>
                <a href={`mailto:${t("contactEmail")}`} className="ft2__mail">
                  <i className="icon-email" aria-hidden="true" />
                  {t("contactEmail")}
                </a>
              </li>
              <li className="ft2__loc">
                <i className="fas fa-map-marker-alt" aria-hidden="true" />
                {t("contactLocation")}
              </li>
            </ul>
          </div>
        </div>

        {/* Barre du bas */}
        <div className="ft2__bottom">
          <span>{t("copyright")}</span>
          <span className="ft2__credit">
            {t("madeBy")}{" "}
            <a href="https://propulseo-site.com" target="_blank" rel="noopener noreferrer">
              Propul’SEO
            </a>
          </span>
          <span className="ft2__gdpr">{t("gdprBadge")}</span>
        </div>
      </div>
    </footer>
  );
}
