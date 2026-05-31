import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import BlogGrid from "@/components/blog/BlogGrid";
import Gallery from "@/components/shared/Gallery";
import AnimatedSection from "@/components/shared/AnimatedSection";

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

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blogPage" });

  return (
    <>
      <section className="page-title page-title-layout5 bg-overlay">
        <div className="bg-img">
          <img src="/assets/images/page-titles/8.jpg" alt="" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="pagetitle__heading">{t("pageTitle")}</h1>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <a href={`/${locale}`}>{t("breadcrumbHome")}</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {t("breadcrumbBlog")}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <AnimatedSection>
        <BlogGrid />
      </AnimatedSection>
      <AnimatedSection>
        <Gallery />
      </AnimatedSection>
    </>
  );
}
