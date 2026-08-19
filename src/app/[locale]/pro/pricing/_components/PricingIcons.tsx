/* ============================================================
   Icônes SVG inline partagées de /pro/pricing (server-safe).
   ============================================================ */

export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8.5 6.5 12 13 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowIcon() {
  return (
    <svg className="pp1-arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2 8h11M9 3.5 13.5 8 9 12.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ShieldIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 1.8 3.5 4.4v4.4c0 4.3 2.8 7.6 6.5 9.4 3.7-1.8 6.5-5.1 6.5-9.4V4.4L10 1.8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="m7 9.8 2.2 2.2 3.8-4.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PersonIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="7" r="3.4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3.5 17.5c1.2-3 3.6-4.5 6.5-4.5s5.3 1.5 6.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function GlobeIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M2.5 10h15M10 2.5c2.4 2.2 3.4 4.7 3.4 7.5S12.4 15.3 10 17.5C7.6 15.3 6.6 12.8 6.6 10S7.6 4.7 10 2.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}
