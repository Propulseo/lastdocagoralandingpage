import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactLayout from "@/components/contact/ContactLayout";
import FAQAccordion from "@/components/shared/FAQAccordion";
import Testimonials from "@/components/home/Testimonials";
import Gallery from "@/components/shared/Gallery";
import AnimatedSection from "@/components/shared/AnimatedSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.contact" });
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
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "contactPage" });

  return (
    <>
      <section className="google-map py-0">
        <h1 className="visually-hidden">{t("pageHeading")}</h1>
        <iframe
          frameBorder="0"
          height="500"
          width="100%"
          src="https://maps.google.com/maps?q=Lisbon%2C%20Portugal&amp;t=m&amp;z=10&amp;output=embed&amp;iwloc=near"
          title="Map"
        ></iframe>
      </section>
      <AnimatedSection>
        <ContactLayout />
      </AnimatedSection>
      <AnimatedSection>
        <FAQAccordion />
      </AnimatedSection>
      <AnimatedSection>
        <Testimonials compact />
      </AnimatedSection>
      <AnimatedSection>
        <Gallery />
      </AnimatedSection>
    </>
  );
}
