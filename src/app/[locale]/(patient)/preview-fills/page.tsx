/* DEV PREVIEW — not linked in nav. Renders the FULL hero four times, each with
   a different refinement of the chosen "verified profiles" element below the
   verified card. Remove once a variant is chosen. */
import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/home/Hero";
import {
  FillStackList,
  FillStackFan,
  FillStackTicker,
  FillStackGrid,
} from "@/components/home/HeroFills";

export default async function PreviewFillsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const variants = [
    { tag: "Variante A : Liste épurée", fill: <FillStackList /> },
    { tag: "Variante B : Cartes en éventail (survol pour écarter)", fill: <FillStackFan /> },
    { tag: "Variante C : Ticker vertical (défile, pause au survol)", fill: <FillStackTicker /> },
    { tag: "Variante D : Grille 2×2 de badges", fill: <FillStackGrid /> },
  ];

  return (
    <>
      {variants.map((v) => (
        <div key={v.tag} className="fillprev-hero">
          <div className="fillprev-hero__label">{v.tag}</div>
          <Hero fill={v.fill} />
        </div>
      ))}
    </>
  );
}
