import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

/**
 * Page affichée pour toute adresse inconnue.
 *
 * Sans elle, une faute de frappe ou un ancien lien menait à l'écran gris par
 * défaut de Next : ni logo, ni navigation, ni moyen de revenir. Le header et
 * le footer viennent du layout patient, cette page n'a donc que son message
 * et son bouton de retour à porter.
 */
export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <main className="nf">
      <style>{`
        .nf {
          min-height: 58vh;
          display: grid;
          place-items: center;
          text-align: center;
          padding: clamp(48px, 10vw, 120px) 24px;
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
          background: var(--color-light-1);
        }
        .nf__code {
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-size: clamp(64px, 12vw, 128px);
          font-weight: 600;
          line-height: 1;
          margin: 0;
          background: linear-gradient(90deg, var(--color-teal), var(--color-cobalt));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .nf__title {
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-size: clamp(22px, 3vw, 32px);
          font-weight: 600;
          color: var(--color-navy);
          margin: 18px 0 10px;
          text-wrap: balance;
        }
        .nf__text {
          color: #40506a;
          font-size: clamp(15px, 1.3vw, 17px);
          line-height: 1.6;
          max-width: 46ch;
          margin: 0 auto 30px;
        }
        .nf__cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: 999px;
          background: var(--color-navy);
          color: #fff;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          transition: background 0.22s ease, transform 0.18s ease;
        }
        .nf__cta:hover {
          background: var(--color-cobalt);
          transform: translateY(-1px);
        }
        @media (prefers-reduced-motion: reduce) {
          .nf__cta:hover { transform: none; }
        }
      `}</style>
      <div>
        <p className="nf__code">404</p>
        <h1 className="nf__title">{t("title")}</h1>
        <p className="nf__text">{t("text")}</p>
        <Link href="/" className="nf__cta">
          {t("cta")}
        </Link>
      </div>
    </main>
  );
}
