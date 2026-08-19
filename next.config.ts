import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // Dev uniquement : autorise un téléphone du réseau local (Wi-Fi) à charger
  // les ressources du serveur de dev (sans ça, Next 16 bloque le JS et la page
  // reste sur l écran d ouverture). Sans effet en production.
  allowedDevOrigins: ["192.168.1.45", "192.168.1.*"],
};

export default withNextIntl(nextConfig);
