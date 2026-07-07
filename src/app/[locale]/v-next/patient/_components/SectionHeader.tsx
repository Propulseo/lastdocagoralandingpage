import type { ReactNode } from "react";

/** Shared section header for the v-next patient page.
 *  Eyebrow is OPTIONAL and rationed (max ~3 per page) — most sections
 *  use the headline alone. */
export default function SectionHeader({
  eyebrow,
  title,
  lede,
  center = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: string;
  center?: boolean;
}) {
  return (
    <div className={`vnp-head${center ? " vnp-head--center" : ""}`}>
      {eyebrow ? <span className="vnp-eyebrow">{eyebrow}</span> : null}
      <h2 className="vnp-title">{title}</h2>
      {lede ? <p className="vnp-lede">{lede}</p> : null}
    </div>
  );
}
