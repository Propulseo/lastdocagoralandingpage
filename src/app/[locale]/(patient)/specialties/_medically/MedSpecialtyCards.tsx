"use client";

import { useTranslations } from "next-intl";

import RevealCascade from "@/components/shared/RevealCascade";
import { SPECIALTIES, searchLoginUrl } from "@/lib/specialties";

/**
 * Section des specialites : six en cartes detaillees, dix en bandeau defilant.
 *
 * Tout vient de la source unique du projet — `lib/specialties.ts` pour les
 * icones, les slugs et le drapeau `flagship`, et les traductions
 * `specialties.items.*` pour les intitules et descriptions, deja ecrites dans
 * les trois langues. Aucune liste locale : une deuxieme copie divergerait de la
 * page d'accueil des la premiere modification.
 *
 * Les liens passent par `searchLoginUrl()`, qui ouvre la recherche du produit
 * DEJA filtree sur la specialite — et non la racine de l'application.
 */

const FLAGSHIP = SPECIALTIES.filter((s) => s.flagship);
const OTHERS = SPECIALTIES.filter((s) => !s.flagship);

/** Les six specialites mises en avant, en encadres detailles. */
export function MedSpecialtyCards({ title }: { title: string }) {
  const t = useTranslations("specialties");

  return (
    <div className="other-service">
      <h3>{title}</h3>
      {/* Cascade par vagues ; mo-lift = la famille de cartes « soulevables » de
          /specialties (une seule par page). Lift sur la carte, cascade sur la
          colonne : jamais les deux sur le même nœud (socle motion.css). */}
      <RevealCascade className="row">
        {FLAGSHIP.map(({ key, icon, slug }) => (
          <div className="col-lg-4 col-md-6 col-12" key={key}>
            <div className="service_card mo-lift">
              <div className="icon">
                <i className={icon}></i>
              </div>
              <div className="content">
                <h2>{t(`items.${key}.title`)}</h2>
                <p>{t(`items.${key}.desc`)}</p>
                <a
                  href={searchLoginUrl({ q: t(`items.${key}.title`), specialty: slug })}
                  aria-label={t(`items.${key}.cta`)}
                >
                  <i className="flaticon-right-arrow"></i>
                </a>
              </div>
            </div>
          </div>
        ))}
      </RevealCascade>
    </div>
  );
}

/**
 * Les dix autres, en bandeau defilant continu.
 *
 * La piste est dupliquee : quand la premiere copie a fini de glisser, la
 * seconde est exactement a sa place et la boucle ne se voit pas. Le doublon est
 * masque aux lecteurs d'ecran et retire du parcours au clavier, sinon chaque
 * specialite serait annoncee et tabulable deux fois.
 *
 * Le defilement s'arrete au survol et au focus clavier — sans quoi viser un
 * lien mouvant releve du jeu d'adresse — et il est coupe net si la personne a
 * demande a reduire les animations.
 */
export function MedSpecialtyMarquee({ label }: { label: string }) {
  const t = useTranslations("specialties");

  const item = (
    { key, icon, slug }: (typeof OTHERS)[number],
    duplicate: boolean,
  ) => (
    <a
      key={duplicate ? `${key}-dup` : key}
      href={searchLoginUrl({ q: t(`items.${key}.title`), specialty: slug })}
      className="med-marquee__item"
      aria-hidden={duplicate || undefined}
      tabIndex={duplicate ? -1 : undefined}
    >
      <span className="med-marquee__icon" aria-hidden="true">
        <i className={icon}></i>
      </span>
      <span>{t(`items.${key}.title`)}</span>
    </a>
  );

  return (
    <div className="med-marquee">
      <p className="med-marquee__label">{label}</p>
      <div className="med-marquee__viewport">
        <div className="med-marquee__track">
          {OTHERS.map((s) => item(s, false))}
          {OTHERS.map((s) => item(s, true))}
        </div>
      </div>
    </div>
  );
}
