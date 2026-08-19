import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import ProBackdrop from "@/app/[locale]/pro/_ui/ProBackdrop";
import ResourcesExplorer from "./_components/ResourcesExplorer";
import ResourcesThemes from "./_components/ResourcesThemes";
import { getResourcesCopy } from "./_components/resourcesCopy";
import { resourcesBaseCss } from "./_components/resourcesBase.styles";

/* ============================================================
   /pro/resources — centre d'aide pro (direction « Centre
   d'aide », dark pro). Header/footer fournis par le layout pro.
   Hero + recherche réelle · guide vedette + réponses rapides ·
   thèmes. Le CTA de bas de page a été retiré : la bande de
   conversion du footer partagé (ft2__cta) le doublonnait.
   ============================================================ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "metadata.proResources",
  });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = getResourcesCopy(locale);

  return (
    <div className="pr3">
      <style>{resourcesBaseCss}</style>
      <ProBackdrop />
      <div className="pr3-shell">
        <ResourcesExplorer hero={copy.hero} featured={copy.featured} quick={copy.quick} />
        <ResourcesThemes themes={copy.themes} />
      </div>
    </div>
  );
}
