import RevealCascade from "@/components/shared/RevealCascade";
import type { ResourcesCopy, ThemeIcon } from "./resourcesCopy";
import { resourcesThemesCss } from "./resourcesThemes.styles";

/* ============================================================
   ResourcesThemes — « Explorer par thème ». Quatre entrées non
   cliquables (les pages de thème seront rédigées plus tard),
   présentées en LISTE filetée sur deux colonnes plutôt qu'en
   tuiles encadrées : la page comptait déjà plusieurs familles de
   cartes translucides, une de plus n'apportait aucune hiérarchie.
   Composant serveur, textes via resourcesCopy.
   ============================================================ */

function ThemeGlyph({ icon }: { icon: ThemeIcon }) {
  const stroke = {
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  } as const;

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {icon === "compass" && (
        <>
          <circle cx="12" cy="12" r="9" {...stroke} />
          <path d="M15 9l-2 5-4 2 2-5z" {...stroke} />
        </>
      )}
      {icon === "calendar" && (
        <>
          <rect x="3" y="5" width="18" height="16" rx="2" {...stroke} />
          <path d="M3 9h18M8 3v4M16 3v4" {...stroke} />
        </>
      )}
      {icon === "bell" && (
        <>
          <path d="M18 16v-5a6 6 0 1 0-12 0v5l-2 2h16z" {...stroke} />
          <path d="M10 20a2 2 0 0 0 4 0" {...stroke} />
        </>
      )}
      {icon === "shield" && (
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" {...stroke} />
      )}
    </svg>
  );
}

export default function ResourcesThemes({ themes }: { themes: ResourcesCopy["themes"] }) {
  return (
    <section className="pr3-th" aria-labelledby="pr3-themes-title">
      <style>{resourcesThemesCss}</style>

      <RevealCascade className="pr3-th__head">
        <h2 id="pr3-themes-title">{themes.heading}</h2>
        <p>{themes.lead}</p>
      </RevealCascade>
      <RevealCascade className="pr3-tiles" baseDelayMs={120}>
        {themes.items.map((theme) => (
          <article className="pr3-tile" key={theme.id}>
            <i aria-hidden="true">
              <ThemeGlyph icon={theme.icon} />
            </i>
            {/* Titre et texte dans une même cellule : la grille de la ligne
                n'a que deux colonnes (picto | contenu). */}
            <div>
              <h3>{theme.title}</h3>
              <p>{theme.desc}</p>
            </div>
          </article>
        ))}
      </RevealCascade>
    </section>
  );
}
