"use client";

/**
 * /variants — Internal showcase hub for DocAgora landing redesign.
 * Lists the 10 "wow" landing variants (5 patient · 5 pro), each a real
 * self-contained page. Not linked from production nav. PT-PT display.
 */

type Variant = {
  n: number;
  name: string;
  tag: string;
  desc: string;
  accent: string; // css var name
  href: string;
  mood: "light" | "dark";
};

const PATIENT: Variant[] = [
  {
    n: 1,
    name: "Clínica Clara",
    tag: "Premium clinique",
    desc: "Lumineux, aéré, glass cards. Confiance médicale à la Doctolib / Alan.",
    accent: "--color-teal",
    href: "/variants/patient/1",
    mood: "light",
  },
  {
    n: 2,
    name: "Histórias de Saúde",
    tag: "Éditorial humain",
    desc: "Fraunces XXL, photographie, narration. Magazine de santé chaleureux.",
    accent: "--color-navy",
    href: "/variants/patient/2",
    mood: "light",
  },
  {
    n: 3,
    name: "Sinal Vital",
    tag: "Immersif · dark",
    desc: "Mesh animé, grain, parallax, tracé ECG. Cinématographique.",
    accent: "--color-teal",
    href: "/variants/patient/3",
    mood: "dark",
  },
  {
    n: 4,
    name: "Bento Saúde",
    tag: "Modulaire · data",
    desc: "Grille bento, grands chiffres, carte du Portugal. Apple / Family.",
    accent: "--color-cobalt",
    href: "/variants/patient/4",
    mood: "light",
  },
  {
    n: 5,
    name: "Pesquisa Viva",
    tag: "Product-led",
    desc: "La recherche interactive EST le héros. Chips, typeahead, cartes en direct.",
    accent: "--color-mint",
    href: "/variants/patient/5",
    mood: "light",
  },
];

const PRO: Variant[] = [
  {
    n: 1,
    name: "Painel",
    tag: "Dashboard SaaS",
    desc: "Maquette produit, onglets de fonctionnalités. Stripe / Linear.",
    accent: "--color-cobalt",
    href: "/variants/pro/1",
    mood: "light",
  },
  {
    n: 2,
    name: "Confiança",
    tag: "Autorité éditoriale",
    desc: "Sobre, serif, conformité au premier plan. Conseil premium.",
    accent: "--color-navy",
    href: "/variants/pro/2",
    mood: "light",
  },
  {
    n: 3,
    name: "Órbita",
    tag: "Dark · glass",
    desc: "Glassmorphism, orbes lumineux, compteurs animés. Vercel / Arc.",
    accent: "--color-teal",
    href: "/variants/pro/3",
    mood: "dark",
  },
  {
    n: 4,
    name: "Retorno",
    tag: "ROI · chiffres",
    desc: "Avant/après, grandes métriques, gain de temps. Data-persuasion.",
    accent: "--color-cobalt",
    href: "/variants/pro/4",
    mood: "light",
  },
  {
    n: 5,
    name: "Fundadores",
    tag: "Invitation exclusive",
    desc: "Carte de membership, place fondateur, rareté. Accès anticipé.",
    accent: "--color-navy",
    href: "/variants/pro/5",
    mood: "dark",
  },
];

function VariantCard({ v, prefix }: { v: Variant; prefix: string }) {
  return (
    <a className="vh-card" href={v.href} style={{ ["--vh-accent" as string]: `var(${v.accent})` }}>
      <div className="vh-card__top">
        <span className="vh-card__num">
          {prefix}
          {String(v.n).padStart(2, "0")}
        </span>
        <span className={`vh-card__mood vh-card__mood--${v.mood}`}>
          {v.mood === "dark" ? "DARK" : "LIGHT"}
        </span>
      </div>
      <div className="vh-card__swatch" aria-hidden="true" />
      <h3 className="vh-card__name">{v.name}</h3>
      <p className="vh-card__tag">{v.tag}</p>
      <p className="vh-card__desc">{v.desc}</p>
      <span className="vh-card__cta">
        Voir la variante
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}

export default function VariantsHub() {
  return (
    <main className="vh">
      <style>{`
        .vh {
          box-sizing: border-box;
          min-height: 100vh;
          padding: clamp(48px, 8vh, 110px) 0 90px;
          font-family: var(--font-montserrat), system-ui, sans-serif;
          color: var(--color-light-1);
          background:
            radial-gradient(120% 80% at 8% -5%, rgba(var(--color-cobalt-rgb), 0.40) 0%, rgba(var(--color-cobalt-rgb), 0) 55%),
            radial-gradient(110% 90% at 96% 8%, rgba(var(--color-teal-rgb), 0.28) 0%, rgba(var(--color-teal-rgb), 0) 50%),
            linear-gradient(160deg, var(--color-dark-1) 0%, var(--color-dark-2) 100%);
        }
        .vh *, .vh *::before, .vh *::after { box-sizing: border-box; }
        .vh__inner { width: 100%; max-width: 1180px; margin: 0 auto; padding: 0 24px; }

        .vh__grain {
          position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: 0.05;
          background-image: radial-gradient(rgba(255,255,255,0.7) 0.5px, transparent 0.5px);
          background-size: 3px 3px;
        }

        .vh__eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 12px; letter-spacing: 0.32em; text-transform: uppercase;
          color: var(--color-teal); margin: 0 0 22px;
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
        }
        .vh__eyebrow span { height: 1px; width: 40px; background: linear-gradient(90deg, var(--color-teal), transparent); }
        .vh__title {
          margin: 0 0 18px; font-family: var(--font-fraunces), Georgia, serif;
          font-weight: 600; line-height: 1.04; letter-spacing: -0.02em;
          font-size: clamp(38px, 6vw, 72px); color: #fff; max-width: 16ch;
        }
        .vh__title em { font-style: italic; color: var(--color-teal); }
        .vh__lead {
          margin: 0 0 8px; font-size: clamp(15px, 1.6vw, 18px); line-height: 1.65;
          color: rgba(255,255,255,0.62); max-width: 60ch;
        }
        .vh__meta {
          margin-top: 18px; font-size: 13px; color: rgba(255,255,255,0.4);
          font-family: ui-monospace, "SF Mono", Menlo, monospace; letter-spacing: 0.04em;
        }

        .vh__group { margin-top: clamp(54px, 8vh, 90px); position: relative; z-index: 2; }
        .vh__group-head {
          display: flex; align-items: baseline; gap: 16px; flex-wrap: wrap;
          padding-bottom: 18px; margin-bottom: 30px;
          border-bottom: 1px solid rgba(255,255,255,0.10);
        }
        .vh__group-title {
          margin: 0; font-family: var(--font-fraunces), Georgia, serif; font-weight: 600;
          font-size: clamp(24px, 3vw, 34px); color: #fff;
        }
        .vh__group-sub { font-size: 14px; color: rgba(255,255,255,0.5); }
        .vh__group-count {
          margin-left: auto; font-family: ui-monospace, "SF Mono", Menlo, monospace;
          font-size: 12px; letter-spacing: 0.2em; color: var(--color-teal); text-transform: uppercase;
        }

        .vh__grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 22px;
        }

        .vh-card {
          position: relative; display: flex; flex-direction: column;
          padding: 24px 24px 26px; border-radius: 18px; text-decoration: none;
          background: linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.02));
          border: 1px solid rgba(255,255,255,0.09);
          box-shadow: 0 20px 50px -30px rgba(0,0,0,0.8);
          transition: transform 0.32s cubic-bezier(0.22,1,0.36,1), border-color 0.32s ease, box-shadow 0.32s ease;
          overflow: hidden; isolation: isolate;
          animation: vh-rise 0.7s cubic-bezier(0.22,1,0.36,1) both;
        }
        .vh-card::before {
          content: ""; position: absolute; inset: 0; z-index: -1; opacity: 0; transition: opacity 0.32s ease;
          background: radial-gradient(120% 100% at 50% -10%, color-mix(in srgb, var(--vh-accent) 22%, transparent) 0%, transparent 60%);
        }
        .vh-card:hover {
          transform: translateY(-6px);
          border-color: color-mix(in srgb, var(--vh-accent) 55%, transparent);
          box-shadow: 0 34px 70px -34px color-mix(in srgb, var(--vh-accent) 80%, black);
        }
        .vh-card:hover::before { opacity: 1; }
        .vh-card:focus-visible { outline: 2px solid var(--vh-accent); outline-offset: 3px; }

        .vh-card__top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .vh-card__num {
          font-family: ui-monospace, "SF Mono", Menlo, monospace; font-size: 12px;
          letter-spacing: 0.16em; color: var(--vh-accent); font-weight: 600;
        }
        .vh-card__mood {
          font-family: ui-monospace, "SF Mono", Menlo, monospace; font-size: 9px;
          letter-spacing: 0.18em; padding: 3px 8px; border-radius: 50px;
          border: 1px solid rgba(255,255,255,0.16); color: rgba(255,255,255,0.55);
        }
        .vh-card__swatch {
          height: 86px; border-radius: 12px; margin-bottom: 20px;
          background:
            radial-gradient(90% 120% at 15% 0%, color-mix(in srgb, var(--vh-accent) 75%, transparent), transparent 60%),
            linear-gradient(135deg, var(--color-navy), var(--color-dark-1));
          border: 1px solid rgba(255,255,255,0.08);
          position: relative; overflow: hidden;
        }
        .vh-card__swatch::after {
          content: ""; position: absolute; inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px);
          background-size: 14px 14px; opacity: 0.6;
          mask-image: linear-gradient(135deg, #000, transparent 70%);
          -webkit-mask-image: linear-gradient(135deg, #000, transparent 70%);
        }
        .vh-card__name {
          margin: 0 0 4px; font-family: var(--font-fraunces), Georgia, serif;
          font-weight: 600; font-size: 22px; color: #fff; letter-spacing: -0.01em;
        }
        .vh-card__tag {
          margin: 0 0 12px; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--vh-accent); font-weight: 600;
        }
        .vh-card__desc { margin: 0 0 22px; font-size: 14px; line-height: 1.6; color: rgba(255,255,255,0.6); flex: 1 1 auto; }
        .vh-card__cta {
          display: inline-flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600;
          color: #fff; transition: gap 0.25s ease;
        }
        .vh-card:hover .vh-card__cta { gap: 13px; }
        .vh-card__cta svg { transition: transform 0.25s ease; }
        .vh-card:hover .vh-card__cta svg { transform: translateX(3px); }

        .vh__foot {
          position: relative; z-index: 2; margin-top: 80px; padding-top: 26px;
          border-top: 1px solid rgba(255,255,255,0.08);
          font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.7;
        }
        .vh__foot b { color: rgba(255,255,255,0.7); font-weight: 600; }

        @keyframes vh-rise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }

        @media (prefers-reduced-motion: reduce) {
          .vh-card { animation: none; }
          .vh-card, .vh-card:hover { transform: none; }
        }
      `}</style>

      <div className="vh__grain" aria-hidden="true" />

      <div className="vh__inner">
        <header>
          <p className="vh__eyebrow">
            <span aria-hidden="true" />
            DocAgora · Design Studio
          </p>
          <h1 className="vh__title">
            10 directions de landing. <em>Choisissez l&apos;effet&nbsp;wow.</em>
          </h1>
          <p className="vh__lead">
            Cinq variantes pour les patients, cinq pour les professionnels. Chacune est une
            page réelle, navigable et responsive, construite sur la stack DocAgora, sans toucher au site
            en production. Cliquez, comparez, choisissez la gagnante.
          </p>
          <p className="vh__meta">PT · FR · EN ready · Bootstrap + tokens · Next.js 16</p>
        </header>

        <section className="vh__group" aria-labelledby="vh-patient">
          <div className="vh__group-head">
            <h2 className="vh__group-title" id="vh-patient">Patients</h2>
            <span className="vh__group-sub">B2C · confiance, chaleur, multilingue</span>
            <span className="vh__group-count">05 variantes</span>
          </div>
          <div className="vh__grid">
            {PATIENT.map((v) => (
              <VariantCard key={v.href} v={v} prefix="P" />
            ))}
          </div>
        </section>

        <section className="vh__group" aria-labelledby="vh-pro">
          <div className="vh__group-head">
            <h2 className="vh__group-title" id="vh-pro">Professionnels</h2>
            <span className="vh__group-sub">B2B SaaS · ROI, modernité, exclusivité</span>
            <span className="vh__group-count">05 variantes</span>
          </div>
          <div className="vh__grid">
            {PRO.map((v) => (
              <VariantCard key={v.href} v={v} prefix="X" />
            ))}
          </div>
        </section>

        <footer className="vh__foot">
          <b>Showcase interne.</b> Contenus, chiffres et témoignages sont illustratifs. La prise de
          rendez-vous en ligne est indiquée comme « bientôt disponible ». Aucune promesse de téléconsultation, de paiement ou
          de remboursement. Les chaînes de la variante gagnante seront externalisées en i18n avant le go-live.
        </footer>
      </div>
    </main>
  );
}
