"use client";

import { useState } from "react";
import ResourcesHero from "./ResourcesHero";
import ResourcesFeatured from "./ResourcesFeatured";
import type { ResourcesCopy } from "./resourcesCopy";

/* ============================================================
   ResourcesExplorer — orchestrateur client du centre d'aide :
   porte l'état de recherche partagé entre le hero (saisie +
   mots-clés) et les réponses rapides (liste filtrée). Les textes
   viennent de la page (déjà résolus pour la locale).
   ============================================================ */

export default function ResourcesExplorer({
  hero,
  featured,
  quick,
}: {
  hero: ResourcesCopy["hero"];
  featured: ResourcesCopy["featured"];
  quick: ResourcesCopy["quick"];
}) {
  const [query, setQuery] = useState("");

  return (
    <>
      <ResourcesHero copy={hero} query={query} onQueryChange={setQuery} />
      <ResourcesFeatured featured={featured} quick={quick} query={query} />
    </>
  );
}
