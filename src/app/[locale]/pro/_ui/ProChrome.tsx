import { type ReactNode } from "react";
import HeaderV4 from "@/components/layout/HeaderV4";
import Footer from "@/components/layout/Footer";

/**
 * Chrome de toutes les pages /pro : header pro (avec bascule d'audience
 * pro/patient) + footer pro (design patient, variante dark cobalt).
 * Fixe depuis la promotion de la version élevée — plus de toggle
 * Actuel/Amélioré.
 */
export default function ProChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="header-pro">
        <HeaderV4 variant="pro" showAudienceSwitch />
      </header>
      {children}
      <Footer variant="pro" />
    </>
  );
}
