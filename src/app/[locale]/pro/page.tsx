import { setRequestLocale } from "next-intl/server";
import ProHome from "./_components/ProHome";

export default async function ProHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProHome />;
}
