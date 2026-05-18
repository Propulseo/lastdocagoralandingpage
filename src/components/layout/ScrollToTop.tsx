"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <button id="scrollTopBtn">
      <i className="fas fa-long-arrow-alt-up"></i>
    </button>
  );
}
