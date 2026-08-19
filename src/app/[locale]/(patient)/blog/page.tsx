import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import "@/styles/medically.css";
import "@/styles/medically-overrides.css";

import BlogHero from "@/components/patient-heroes/BlogHero";
import PatientClosingCta from "@/components/patient-heroes/PatientClosingCta";
import AnimatedSection from "@/components/shared/AnimatedSection";
import MedBlogList from "@/app/[locale]/(patient)/blog/_medically/MedBlogList";
import { getCategories, searchBlogPosts } from "@/lib/blog";
import { getBlogStrings } from "@/lib/blogStrings";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.blog" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    keywords: t("keywords"),
  };
}

/**
 * Portage de main-component/BlogPageLeft/BlogPageLeft.jsx.
 *
 * Sequence du template : bandeau de titre, puis la liste d'articles avec sa
 * sidebar placee a GAUCHE (`order-lg-1` / `order-lg-2`). Le Navbar et le Footer
 * du template sont ecartes : le landing fournit les siens via le layout patient.
 *
 * La classe `.med` est indispensable — `medically.css` est generee avec chaque
 * selecteur prefixe par elle.
 */
export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { locale } = await params;
  const { q: qRaw } = await searchParams;
  // ?q=a&q=b -> Next fournit un tableau ; on ne garde que la première valeur
  // pour ne pas casser query.trim() plus bas.
  const q = Array.isArray(qRaw) ? qRaw[0] : qRaw;
  setRequestLocale(locale);
  const t = getBlogStrings(locale);

  // La « une » du masthead et la liste doivent parler du MÊME jeu filtré :
  // on résout les articles ici, et la liste reprend au deuxième.
  const posts = searchBlogPosts(locale, q ?? "");

  return (
    <div className="pat-aurora">
      <BlogHero
        title={t.pageTitle}
        subtitle={t.heroSubtitle}
        homeLabel={t.homeLabel}
        crumb={t.crumb}
        locale={locale}
        categories={getCategories(locale)}
        activeCategory={q}
        allCategoriesLabel={t.allCategories}
        featured={posts[0]}
        featuredLabel={t.featuredLabel}
        readMore={t.readMore}
      />
      <div className="med">
        <MedBlogList
          blLeft="order-lg-1"
          blRight="order-lg-2"
          locale={locale}
          query={q}
          featuredInHero
        />
      </div>
      {/* La page se terminait sur la pagination inactive, sans appel à l'action. */}
      <AnimatedSection>
        <PatientClosingCta
          eyebrow={t.closing.eyebrow}
          title={t.closing.title}
          sub={t.closing.sub}
          cta={t.closing.cta}
        />
      </AnimatedSection>
    </div>
  );
}
