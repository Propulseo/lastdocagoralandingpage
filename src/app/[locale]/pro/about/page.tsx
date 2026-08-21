import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/page-metadata";
import ProBackdrop from "@/app/[locale]/pro/_ui/ProBackdrop";
import AboutHeroPro from "./_components/AboutHeroPro";
import AboutSteps from "./_components/AboutSteps";
import AboutBento from "./_components/AboutBento";
import AboutMetrics from "./_components/AboutMetrics";
import { getAboutCopy } from "./_components/aboutCopy";
import { aboutSharedCss } from "./_components/aboutShared.styles";

/* ============================================================
   /pro/about — « À propos » pro, direction « la preuve par le
   produit » : hero + mock agenda, timeline d'onboarding, bento
   fonctionnalités, métriques (no-shows illustratif). Le CTA de bas
   de page a été retiré : la bande de conversion du footer partagé
   (ft2__cta) le doublonnait.
   Canvas dark autonome (préfixe pa2-) ; header/footer pro
   fournis par le layout (ProChrome). Textes : aboutCopy.ts (PT/FR/EN).
   ============================================================ */

/* Sans ce bloc, la page héritait du titre générique de /pro : les trois pages
   pro affichaient le même <title> et la même description, ce que Google lit
   comme du contenu dupliqué. Les traductions dédiées existaient déjà. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, path: "/pro/about", namespace: "metadata.proAbout" });
}

export default async function ProAboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = getAboutCopy(locale);

  return (
    <div className="pa2-page">
      <style>{aboutSharedCss}</style>
      <ProBackdrop />
      <main className="pa2-shell">
        <AboutHeroPro hero={copy.hero} mock={copy.mock} />
        <AboutSteps steps={copy.steps} />
        <AboutBento bento={copy.bento} />
        <AboutMetrics metrics={copy.metrics} />
      </main>
    </div>
  );
}
