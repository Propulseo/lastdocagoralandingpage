import { setRequestLocale } from "next-intl/server";
import HeaderV4 from "@/components/layout/HeaderV4";
import Footer from "@/components/layout/Footer";
import { BG_VARIANTS } from "@/app/[locale]/v-next/patient/_bg/variants";

/** Hub listing the 8 patient background previews (4 refined + 4 bold). */
export default async function VNextPatientBgHub({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const base = locale === "pt" ? "/v-next/patient/bg" : `/${locale}/v-next/patient/bg`;
  const refined = BG_VARIANTS.filter((v) => !v.bold);
  const bold = BG_VARIANTS.filter((v) => v.bold);

  return (
    <div className="da-patient">
      <header className="header-patient">
        <HeaderV4 variant="patient" />
      </header>
      <main className="vnp">
        <section className="vnp-section vnhub">
          <style>{`
            .vnhub__head { max-width: 720px; margin-bottom: clamp(32px, 5vw, 52px); }
            .vnhub__title { font-family: var(--font-fraunces), Georgia, serif; font-weight: 600; font-size: clamp(28px, 3.6vw, 44px); line-height: 1.08; letter-spacing: -0.018em; color: var(--vnp-ink); margin: 0; }
            .vnhub__lede { font-size: 16px; line-height: 1.6; color: var(--vnp-body); margin: 14px 0 0; }
            .vnhub__group { margin-top: clamp(28px, 4vw, 44px); }
            .vnhub__group-label { font-size: 12px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--vnp-accent); margin: 0 0 18px; }
            .vnhub__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
            .vnhub__card { display: flex; flex-direction: column; padding: 22px; border-radius: var(--vnp-radius); background: #fff; border: 1px solid var(--vnp-line); box-shadow: var(--shadow-sm); text-decoration: none; transition: transform 0.25s var(--vnp-ease), box-shadow 0.25s var(--vnp-ease), border-color 0.25s var(--vnp-ease); }
            .vnhub__card:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); border-color: rgba(var(--color-teal-rgb), 0.5); }
            .vnhub__swatch { height: 96px; border-radius: 12px; margin-bottom: 16px; overflow: hidden; position: relative; border: 1px solid var(--vnp-line); }
            /* Representative mini-previews of each canvas (approximation) */
            .vnhub__swatch[data-bg="aurora"] { background:
              radial-gradient(60% 70% at 18% 20%, rgba(var(--color-teal-rgb),0.22), transparent 60%),
              radial-gradient(60% 70% at 85% 80%, rgba(var(--color-cobalt-rgb),0.2), transparent 60%),
              linear-gradient(160deg, var(--color-light-1), var(--color-light-3)); }
            .vnhub__swatch[data-bg="blobs"] { background:
              radial-gradient(closest-side at 25% 35%, rgba(var(--color-teal-rgb),0.32), transparent),
              radial-gradient(closest-side at 78% 65%, rgba(var(--color-cobalt-rgb),0.28), transparent),
              radial-gradient(closest-side at 60% 20%, rgba(var(--color-mint-rgb),0.28), transparent),
              var(--color-light-1); }
            .vnhub__swatch[data-bg="grid"] { background:
              radial-gradient(circle, rgba(var(--color-navy-rgb),0.16) 1px, transparent 1px) 0 0 / 12px 12px,
              radial-gradient(70% 80% at 80% 20%, rgba(var(--color-teal-rgb),0.16), transparent 60%),
              var(--color-light-1); }
            .vnhub__swatch[data-bg="waves"] { background:
              linear-gradient(180deg, var(--color-light-1) 40%, rgba(var(--color-mint-rgb),0.28) 70%, rgba(var(--color-teal-rgb),0.4) 100%); }
            .vnhub__swatch[data-bg="aurora-bold"] { background:
              radial-gradient(55% 70% at 15% 18%, rgba(var(--color-teal-rgb),0.5), transparent 60%),
              radial-gradient(60% 70% at 88% 82%, rgba(var(--color-cobalt-rgb),0.45), transparent 62%),
              radial-gradient(50% 60% at 60% 40%, rgba(var(--color-mint-rgb),0.4), transparent 60%),
              linear-gradient(160deg, var(--color-light-1), var(--color-light-2)); }
            .vnhub__swatch[data-bg="blobs-bold"] { background:
              radial-gradient(closest-side at 22% 30%, rgba(var(--color-teal-rgb),0.55), transparent),
              radial-gradient(closest-side at 82% 70%, rgba(var(--color-cobalt-rgb),0.5), transparent),
              radial-gradient(closest-side at 55% 50%, rgba(var(--color-mint-rgb),0.45), transparent),
              var(--color-light-1); }
            .vnhub__swatch[data-bg="grid-bold"] { background:
              linear-gradient(rgba(var(--color-navy-rgb),0.14) 1px, transparent 1px) 0 0 / 16px 16px,
              linear-gradient(90deg, rgba(var(--color-teal-rgb),0.14) 1px, transparent 1px) 0 0 / 16px 16px,
              radial-gradient(60% 80% at 85% 12%, rgba(var(--color-teal-rgb),0.4), transparent 55%),
              var(--color-light-1); }
            .vnhub__swatch[data-bg="waves-bold"] { background:
              linear-gradient(110deg, rgba(var(--color-cobalt-rgb),0.4), rgba(var(--color-mint-rgb),0.36) 45%, rgba(var(--color-teal-rgb),0.44)),
              linear-gradient(180deg, var(--color-light-1) 30%, transparent); }
            .vnhub__name { font-family: var(--font-fraunces), Georgia, serif; font-weight: 600; font-size: 18px; color: var(--vnp-ink); margin: 0; }
            .vnhub__desc { font-size: 13px; line-height: 1.5; color: var(--vnp-muted); margin: 8px 0 16px; flex: 1; }
            .vnhub__go { display: inline-flex; align-items: center; gap: 7px; font-size: 13.5px; font-weight: 700; color: var(--vnp-accent); }
            @media (max-width: 980px) { .vnhub__grid { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 520px) { .vnhub__grid { grid-template-columns: 1fr; } }
          `}</style>
          <div className="vnp-shell">
            <div className="vnhub__head">
              <h1 className="vnhub__title">8 fonds premium pour la LP Patient</h1>
              <p className="vnhub__lede">Même composition, 8 ambiances décoratives. 4 raffinées, 4 plus audacieuses. Clique pour ouvrir une preview.</p>
            </div>

            {[{ label: "Raffinées", items: refined }, { label: "Audacieuses", items: bold }].map((group) => (
              <div className="vnhub__group" key={group.label}>
                <p className="vnhub__group-label">{group.label}</p>
                <div className="vnhub__grid">
                  {group.items.map((v) => (
                    <a className="vnhub__card" href={`${base}/${v.slug}`} key={v.slug}>
                      <span className="vnhub__swatch" data-bg={v.slug} />
                      <p className="vnhub__name">{v.label}</p>
                      <p className="vnhub__desc">{v.desc}</p>
                      <span className="vnhub__go">Voir la preview <i className="fas fa-arrow-right" aria-hidden="true" /></span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
