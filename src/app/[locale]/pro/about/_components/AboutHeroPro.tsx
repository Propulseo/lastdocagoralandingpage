import type { CSSProperties } from "react";

import PointerTilt from "@/components/shared/PointerTilt";
import { PLATFORM_URL } from "@/lib/specialties";
import type { AboutCopy } from "./aboutCopy";
import { BellIcon, CheckIcon, ShieldIcon } from "./aboutIcons";
import { aboutHeroCss } from "./aboutHero.styles";

/* ============================================================
   Hero de /pro/about — rangée [texte | mock agenda illustratif]
   avec chips flottantes « Profil vérifié » / « Rappel envoyé ».
   Server component statique (textes FR dans aboutCopy.ts).
   CTA primaire → /contact (même cible que le hero de la home),
   CTA fantôme → plateforme réelle (PLATFORM_URL).
   ============================================================ */

const CTA_HREF = "/contact";

export default function AboutHeroPro({
  hero,
  mock,
}: {
  hero: AboutCopy["hero"];
  mock: AboutCopy["mock"];
}) {
  return (
    <section className="pa2-hero" aria-labelledby="pa2-about-title">
      <style>{aboutHeroCss}</style>

      <div>
        <span className="pa2-eyebrow">
          <i aria-hidden="true" />
          {hero.eyebrow}
        </span>
        <h1 className="pa2-hero-title" id="pa2-about-title">
          {hero.titleLead} <span className="pa2-accent">{hero.titleAccent}</span>
        </h1>
        <p className="pa2-hero-lead">{hero.lead}</p>
        <div className="pa2-hero-cta">
          <a className="pa2-btn pa2-btn--primary" href={CTA_HREF}>
            {hero.ctaPrimary}
          </a>
          <a className="pa2-btn pa2-btn--ghost" href={PLATFORM_URL}>
            {hero.ctaGhost}
          </a>
        </div>
        <ul className="pa2-hero-badges">
          {hero.badges.map((badge) => (
            <li key={badge}>
              <CheckIcon />
              {badge}
            </li>
          ))}
        </ul>
      </div>

      {/* Objet signature de la page : la maquette s'incline vers le pointeur
          (un seul élément traité ainsi par page, cf. PointerTilt).
          Les chips flottantes restent HORS du calque incliné : `preserve-3d`
          en fait un plan à part entière, et tout ce qu'il contient y est
          enfermé — les chips passaient alors derrière l'agenda. Sœurs du
          calque, elles se replacent au-dessus, ancrées sur le cadre. */}
      <div className="pa2-mockwrap" aria-hidden="true">
        <PointerTilt className="pa2-tilt pro-ring" maxDeg={6} lift={8}>
          <div className="pa2-mock pro-ring--halo">
          <div className="pa2-mock-head">
            <span className="pa2-mock-title">{mock.title}</span>
            <span className="pa2-mock-live">
              <i />
              {mock.live}
            </span>
          </div>
          <div className="pa2-mock-week">
            {mock.days.map((day, dayIndex) => (
              <div className="pa2-mock-day" key={day.name}>
                <span className="pa2-mock-dayname">{day.name}</span>
                {day.slots.map((slot, slotIndex) => (
                  <div
                    className={`pa2-slot${slot.kind !== "base" ? ` pa2-slot--${slot.kind}` : ""}`}
                    key={`${day.name}-${slot.time ?? slot.label}`}
                    /* Rang de remplissage : les créneaux se posent en diagonale
                       (une colonne après l'autre, du haut vers le bas). */
                    style={{ "--i": dayIndex * 2 + slotIndex } as CSSProperties}
                  >
                    {slot.time && <b>{slot.time}</b>}
                    {slot.label}
                  </div>
                ))}
              </div>
            ))}
            </div>
          </div>
        </PointerTilt>
        <span className="pa2-float pa2-float--tr">
          <ShieldIcon />
          {mock.floatVerified}
        </span>
        <span className="pa2-float pa2-float--bl">
          <BellIcon />
          {mock.floatReminder}
        </span>
      </div>
    </section>
  );
}
