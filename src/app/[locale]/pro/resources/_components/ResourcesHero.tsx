import type { ResourcesCopy } from "./resourcesCopy";
import { resourcesHeroCss } from "./resourcesHero.styles";

/* ============================================================
   ResourcesHero — hero court du centre d'aide pro.
   Le champ de recherche est RÉEL : il filtre les « réponses
   rapides » (état remonté à ResourcesExplorer). Les mots-clés
   fréquents remplissent le champ (aucun bouton factice).
   Rendu dans l'arbre client de ResourcesExplorer.
   ============================================================ */

interface ResourcesHeroProps {
  copy: ResourcesCopy["hero"];
  query: string;
  onQueryChange: (value: string) => void;
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M20 20l-4-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ResourcesHero({
  copy,
  query,
  onQueryChange,
}: ResourcesHeroProps) {
  return (
    <header className="pr3-hero">
      <style>{resourcesHeroCss}</style>

      {/* Hero séquencé : eyebrow → titre → accroche → recherche → mots-clés.
          Le hero est au-dessus de la ligne de flottaison, donc la séquence se
          joue au chargement (pas de déclencheur au scroll à prévoir). */}
      <span className="pr3-eyebrow pr3-rise pr3-r1">
        <i aria-hidden="true" />
        {copy.eyebrow}
      </span>
      <h1 className="pr3-title pr3-rise pr3-r2">
        {copy.titleLine1}
        <br />
        {copy.titleLine2Lead}
        <em>{copy.titleLine2Accent}</em>.
      </h1>
      <p className="pr3-lead pr3-rise pr3-r3">{copy.lead}</p>

      {/* L'élément le plus utile de la page mérite d'être désigné : anneau
          dégradé dont la lumière voyage (.pro-ring--spot) + halo qui
          s'intensifie à la saisie. Un seul objet ainsi traité par page. */}
      <div className="pr3-search pro-ring pro-ring--spot pr3-rise pr3-r4" role="search">
        <SearchIcon />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={copy.searchPlaceholder}
          aria-label={copy.searchLabel}
        />
        {query.length > 0 && (
          <button
            type="button"
            className="pr3-clear"
            onClick={() => onQueryChange("")}
          >
            <CrossIcon />
            {copy.clearLabel}
          </button>
        )}
      </div>

      <div className="pr3-pop pr3-rise pr3-r5">
        {copy.popularLabel}
        {copy.popular.map((word) => (
          <button
            key={word}
            type="button"
            aria-pressed={query === word}
            onClick={() => onQueryChange(query === word ? "" : word)}
          >
            {word}
          </button>
        ))}
      </div>
    </header>
  );
}
