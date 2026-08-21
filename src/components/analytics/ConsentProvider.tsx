"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type ConsentChoice = "granted" | "denied";
/** `"none"` = la personne n'a pas encore choisi. `"pending"` = pas encore lu. */
type StoredValue = ConsentChoice | "none";
type Snapshot = StoredValue | "pending";

const STORAGE_KEY = "docagora-consent";

/* ------------------------------------------------------------------ */
/* Petit magasin externe                                               */
/*                                                                     */
/* Le choix vit dans localStorage, qui n'existe pas au rendu serveur.  */
/* `useSyncExternalStore` est fait pour ça : il sert un instantané     */
/* serveur pendant l'hydratation, puis la vraie valeur ensuite — sans  */
/* écart d'hydratation, et sans écrire d'état depuis un effet (ce qui  */
/* déclencherait des rendus en cascade).                               */
/* ------------------------------------------------------------------ */

const listeners = new Set<() => void>();
/* L'instantané doit être stable d'un appel à l'autre, sinon React boucle. */
let cached: StoredValue | null = null;

function read(): StoredValue {
  if (cached !== null) return cached;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    cached = stored === "granted" || stored === "denied" ? stored : "none";
  } catch {
    /* navigation privée : on redemandera, sans conséquence */
    cached = "none";
  }
  return cached;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

function write(choice: ConsentChoice) {
  cached = choice;
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    /* le choix vaut alors pour la visite en cours seulement */
  }
  for (const notify of listeners) notify();
}

type ConsentContextValue = {
  /** `null` tant que rien n'a été choisi. */
  consent: ConsentChoice | null;
  /** `false` pendant le rendu serveur et l'hydratation. */
  ready: boolean;
  decide: (choice: ConsentChoice) => void;
};

const ConsentContext = createContext<ConsentContextValue>({
  consent: null,
  ready: false,
  decide: () => {},
});

/**
 * Mémorise le choix du visiteur sur les traceurs tiers.
 *
 * Un seul endroit décide, pour que la mesure d'audience ET la carte Google
 * Maps de la page contact obéissent à la même réponse — sinon on demanderait
 * le consentement d'un côté tout en envoyant l'adresse IP du visiteur de
 * l'autre.
 */
export function ConsentProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore<Snapshot>(
    subscribe,
    read,
    () => "pending",
  );

  const decide = useCallback((choice: ConsentChoice) => write(choice), []);

  const value: ConsentContextValue = {
    consent: snapshot === "granted" || snapshot === "denied" ? snapshot : null,
    ready: snapshot !== "pending",
    decide,
  };

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  return useContext(ConsentContext);
}
