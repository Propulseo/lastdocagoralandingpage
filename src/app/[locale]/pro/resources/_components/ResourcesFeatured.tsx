import type { CSSProperties } from "react";

import RevealCascade from "@/components/shared/RevealCascade";
import type { ResourcesCopy } from "./resourcesCopy";
import { resourcesFeaturedCss } from "./resourcesFeatured.styles";

/* ============================================================
   ResourcesFeatured — duo « guide vedette + réponses rapides ».
   La carte vedette est un <article> non cliquable (le contenu
   sera rédigé plus tard). L'accordéon FAQ est réellement filtré
   par la recherche du hero (includes() insensible à la casse et
   aux accents) ; message « aucune réponse » sinon.
   Rendu dans l'arbre client de ResourcesExplorer.
   ============================================================ */

interface ResourcesFeaturedProps {
  featured: ResourcesCopy["featured"];
  quick: ResourcesCopy["quick"];
  query: string;
}

/** Plage des diacritiques combinants (U+0300 → U+036F). */
const DIACRITICS = new RegExp("[\\u0300-\\u036f]", "g");

/** Minuscule + sans accents, pour un filtre tolérant en français. */
function normalize(value: string) {
  return value.toLowerCase().normalize("NFD").replace(DIACRITICS, "");
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 12l5 5L20 7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ResourcesFeatured({
  featured,
  quick,
  query,
}: ResourcesFeaturedProps) {
  const needle = normalize(query.trim());
  const hasQuery = needle.length > 0;
  const items = hasQuery
    ? quick.items.filter(
        (item) =>
          normalize(item.q).includes(needle) ||
          normalize(item.a).includes(needle)
      )
    : [...quick.items];

  return (
    <>
      <style>{resourcesFeaturedCss}</style>
      <RevealCascade className="pr3-main">
        <article className="pr3-star pro-ring pro-ring--halo">
        <span className="pr3-badge">{featured.badge}</span>
        <h2>{featured.title}</h2>
        <p>{featured.lead}</p>
        <ul className="pr3-pts">
          {featured.points.map((point) => (
            <li key={point}>
              <CheckIcon />
              {point}
            </li>
          ))}
        </ul>
        <div className="pr3-smeta">
          {featured.meta.map((meta) => (
            <span key={meta}>{meta}</span>
          ))}
        </div>
      </article>

      <aside className="pr3-quick">
        <div className="pr3-quick__head">
          <h2>{quick.heading}</h2>
          {/* Le compteur « tique » : remonté à chaque changement de total,
              il rejoue sa micro-animation au lieu de changer en silence. */}
          <span className="pr3-count" aria-live="polite" key={`count-${items.length}`}>
            {items.length}/{quick.items.length}
          </span>
        </div>

        {/* Le filtrage est chorégraphié : la liste est remontée à chaque
            saisie (clé = terme normalisé) et ses réponses réapparaissent en
            léger décalage, au lieu de se substituer d'un coup. */}
        <div className="pr3-quick__list" key={`list-${needle}`}>
          {items.map((item, i) => (
            <details
              key={`${item.id}${hasQuery ? "-filtered" : ""}`}
              open={hasQuery || i === 0}
              style={{ "--qi": i } as CSSProperties}
            >
              <summary>
                {item.q}
                <PlusIcon />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>

        {items.length === 0 && (
          <div className="pr3-empty">
            {/* Pas de guillemets en dur : ils étaient français sur les trois
                langues. Le terme est mis en avant par le gras teal. */}
            <p>
              {quick.emptyLead} <b>{query.trim()}</b>.
            </p>
            <small>{quick.emptyHint}</small>
          </div>
        )}
      </aside>
      </RevealCascade>
    </>
  );
}
