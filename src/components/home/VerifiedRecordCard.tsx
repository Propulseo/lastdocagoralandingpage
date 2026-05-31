"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

export type Lang = "PT" | "FR" | "EN";
const ALL_LANGS: Lang[] = ["PT", "FR", "EN"];

function VerifiedCheck({ animate }: { animate: boolean }) {
  return (
    <svg
      className="da-record__check"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ width: 16, height: 16 }}
    >
      <motion.path
        d="M4 12.5l5 5 11-11"
        stroke="currentColor"
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animate ? { pathLength: 0 } : false}
        whileInView={animate ? { pathLength: 1 } : undefined}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
      />
    </svg>
  );
}

export default function VerifiedRecordCard({
  icon,
  specialty,
  city,
  languages,
  illustrative = true,
}: {
  icon: string;
  specialty: string;
  city: string;
  languages: Lang[];
  illustrative?: boolean;
}) {
  const t = useTranslations("record");
  const prefersReduced = useReducedMotion();

  return (
    <div className="da-record">
      {illustrative && <span className="da-record__badge">{t("illustrative")}</span>}
      <div className="da-record__top">
        <div className="da-record__mono" aria-hidden="true">
          <i className={icon}></i>
        </div>
        <div>
          <span className="da-record__verified">
            <VerifiedCheck animate={!prefersReduced} />
            {t("verified")}
          </span>
          <p className="da-record__name">{specialty}</p>
          <p className="da-record__meta">
            <i className="fas fa-map-marker-alt"></i>
            {city}
          </p>
        </div>
      </div>
      <div className="da-record__langs">
        <span className="da-record__langs-label">{t("speaks")}</span>
        {ALL_LANGS.map((lang) => (
          <span
            key={lang}
            className={`da-lang-chip${languages.includes(lang) ? " is-match" : ""}`}
          >
            {lang}
          </span>
        ))}
      </div>
    </div>
  );
}
