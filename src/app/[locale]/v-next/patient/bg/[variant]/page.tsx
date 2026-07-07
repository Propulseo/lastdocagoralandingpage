import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import HeaderV4 from "@/components/layout/HeaderV4";
import Footer from "@/components/layout/Footer";
import BackgroundFx from "@/app/[locale]/v-next/patient/_bg/BackgroundFx";
import { BG_SLUGS } from "@/app/[locale]/v-next/patient/_bg/variants";
import PatientComposition from "@/app/[locale]/v-next/patient/_components/PatientComposition";

export function generateStaticParams() {
  return BG_SLUGS.map((variant) => ({ variant }));
}

/**
 * One patient preview = the shared hybrid composition over a decorative
 * canvas (variant). BackgroundFx is the first child of `.vnp-bgroot` and
 * sits at z-0, behind the header (z-2) and the composition (z-1).
 */
export default async function VNextPatientBgPage({
  params,
}: {
  params: Promise<{ locale: string; variant: string }>;
}) {
  const { locale, variant } = await params;
  setRequestLocale(locale);
  if (!BG_SLUGS.includes(variant)) notFound();

  return (
    <div className="da-patient vnp-bgroot">
      <BackgroundFx variant={variant} />
      <header className="header-patient">
        <HeaderV4 variant="patient" />
      </header>
      <main className="vnp vnp-bg">
        <PatientComposition />
      </main>
      <Footer />
    </div>
  );
}
