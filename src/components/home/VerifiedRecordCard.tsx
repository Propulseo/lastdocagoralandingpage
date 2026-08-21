"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

export type Lang = "PT" | "FR" | "EN" | "ES";
/* Aligne sur les langues que les praticiens peuvent declarer dans la
   plateforme (pt, en, fr, es). Le site vitrine n'en proposait que 3 :
   un patient hispanophone ne pouvait pas filtrer sur sa langue. */
const ALL_LANGS: Lang[] = ["PT", "FR", "EN", "ES"];

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

  /**
   * SSR-safe guard: do NOT read window/matchMedia during render.
   * On the server and on the first client render the component outputs
   * the fully-drawn (final) state so there is no hydration mismatch.
   * After mount we check the user preference and enable the animation
   * only when (a) the component has mounted client-side AND (b) the
   * user has not requested reduced motion.
   */
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  // Before mount: no animation (server + first client render = same output)
  // After mount: animate unless the user prefers reduced motion
  const prefersReduced =
    mounted && typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const shouldAnimate = mounted && !prefersReduced;

  return (
    <div className="da-record">
      {illustrative && <span className="da-record__badge">{t("illustrative")}</span>}
      <div className="da-record__top">
        <div className="da-record__mono" aria-hidden="true">
          <i className={icon}></i>
        </div>
        <div>
          <span className="da-record__verified">
            <VerifiedCheck animate={shouldAnimate} />
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
