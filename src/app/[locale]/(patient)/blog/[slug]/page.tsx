import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import "@/styles/medically.css";
import "@/styles/medically-overrides.css";

import { MedPageTitle } from "@/components/medically/MedPrimitives";
import MedBlogSingle from "@/app/[locale]/(patient)/blog/_medically/MedBlogSingle";
import { getAdjacentPosts, getBlogSlugs, getPostBySlug } from "@/lib/blog";
import { getBlogStrings } from "@/lib/blogStrings";

/** Une page par article. La locale vient du generateStaticParams du layout. */
export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(locale, slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [post.image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

/**
 * Page de detail d'un article, layout « blog-single-left-sidebar » du template
 * Medically. Le bandeau reprend le titre de l'article ; le fil d'Ariane pointe
 * vers l'espace conseils. Contenu et libelles suivent la locale.
 *
 * La classe `.med` est indispensable — `medically.css` est generee avec chaque
 * selecteur prefixe par elle.
 */
export default async function BlogSinglePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getPostBySlug(locale, slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(locale, slug);
  const t = getBlogStrings(locale);

  return (
    <div className="med">
      <MedPageTitle
        title={post.title}
        crumb={t.crumb}
        locale={locale}
        homeLabel={t.homeLabel}
      />
      <MedBlogSingle post={post} prev={prev} next={next} locale={locale} />
    </div>
  );
}
