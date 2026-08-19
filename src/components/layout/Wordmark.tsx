/**
 * Logo texte DocAgora — « Doc » en Fraunces, « Agora » en Montserrat.
 *
 * Retour client (2026-07-28) : « I would use a version of the logo that is just
 * text for the website navigation. Then it can go bigger. As you've introduced a
 * second typeface now I would make the word "Doc" in the logo the same "Fraunces"
 * typeface. » — piste A validée par Étienne.
 *
 * Poser le logo en TEXTE plutôt qu'en image résout trois retours d'un coup :
 *   1. il peut grandir sans perte,
 *   2. la « version blanche » demandée pour le fond sombre devient un simple
 *      token de couleur — plus d'image à produire ni à maintenir,
 *   3. tous les supports (header patient, header pro, footer, billet Early
 *      Access) partagent enfin le même logo, ce qui répond au « Not your logo,
 *      need to make sure this is consistent across all assets ».
 *
 * `tone` choisit le couple de couleurs, jamais la taille : celle-ci est donnée
 * par le `font-size` du parent, pour que chaque emplacement reste maître de son
 * échelle.
 */
type WordmarkProps = {
  /** "ink" = fonds clairs · "light" = fonds sombres · "accent" = monochrome teal */
  tone?: "ink" | "light" | "accent";
  className?: string;
};

export default function Wordmark({ tone = "ink", className }: WordmarkProps) {
  return (
    <span className={`dw dw--${tone}${className ? ` ${className}` : ""}`}>
      <style>{`
        .dw {
          display: inline-flex;
          align-items: baseline;
          letter-spacing: -0.015em;
          white-space: nowrap;
          line-height: 1;
        }
        .dw__doc {
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600;
        }
        .dw__agora {
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        /* Fonds clairs : navy + vert d'accent. */
        .dw--ink .dw__doc { color: var(--color-navy); }
        .dw--ink .dw__agora { color: var(--color-accent-ink); }

        /* Fonds sombres : c'est la « version blanche » demandée. */
        .dw--light .dw__doc { color: #ffffff; }
        .dw--light .dw__agora { color: var(--color-teal); }

        /* Monochrome, pour les supports déjà très colorés (souche du billet). */
        .dw--accent .dw__doc,
        .dw--accent .dw__agora { color: currentColor; }
      `}</style>
      <span className="dw__doc">Doc</span>
      <span className="dw__agora">Agora</span>
    </span>
  );
}
