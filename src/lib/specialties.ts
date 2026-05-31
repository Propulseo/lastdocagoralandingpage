/** Single source of truth for the 16 patient specialties (key → icon → slug).
 *  Used by the Hero search console and the SpecialtiesBento grid. */
export interface Specialty {
  key: string;
  icon: string;
  slug: string;
  flagship?: boolean;
}

export const SPECIALTIES: Specialty[] = [
  { key: "generalPractice", icon: "icon-doctor", slug: "general-practice", flagship: true },
  { key: "cardiology", icon: "icon-heart", slug: "cardiology" },
  { key: "dermatology", icon: "icon-microscope", slug: "dermatology" },
  { key: "pediatrics", icon: "icon-heart3", slug: "pediatrics" },
  { key: "gynecology", icon: "icon-heart2", slug: "gynecology" },
  { key: "ophthalmology", icon: "icon-first-aid-kit", slug: "ophthalmology" },
  { key: "orthopedics", icon: "icon-bandage", slug: "orthopedics" },
  { key: "psychology", icon: "icon-head", slug: "psychology" },
  { key: "dentistry", icon: "icon-medicine", slug: "dentistry" },
  { key: "physiotherapy", icon: "icon-stethoscope", slug: "physiotherapy" },
  { key: "ent", icon: "icon-hospital", slug: "ent" },
  { key: "endocrinology", icon: "icon-dropper", slug: "endocrinology" },
  { key: "gastroenterology", icon: "icon-health-report", slug: "gastroenterology" },
  { key: "neurology", icon: "icon-head", slug: "neurology" },
  { key: "urology", icon: "icon-drugs", slug: "urology" },
  { key: "rheumatology", icon: "icon-expenses", slug: "rheumatology" },
];

export const SPECIALTY_ICON: Record<string, string> = SPECIALTIES.reduce(
  (acc, s) => {
    acc[s.key] = s.icon;
    return acc;
  },
  {} as Record<string, string>
);

export const PLATFORM_URL =
  process.env.NEXT_PUBLIC_PLATFORM_URL || "https://app.docagora.com";

/** Honest deep-link into the real product search (existing pattern). */
export function searchLoginUrl(params: Record<string, string | undefined>) {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v) qs.set(k, v);
  }
  const target = `/patient/search${qs.toString() ? `?${qs.toString()}` : ""}`;
  return `${PLATFORM_URL}/login?redirect=${encodeURIComponent(target)}`;
}
