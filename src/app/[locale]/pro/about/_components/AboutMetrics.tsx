"use client";

import RevealCascade from "@/components/shared/RevealCascade";
import { useCountUp, useInView } from "@/app/[locale]/pro/_components/elevated/heroMetrics";
import type { AboutCopy } from "./aboutCopy";
import { aboutMetricsCss } from "./aboutMetrics.styles";

/* ============================================================
   Barre de métriques de /pro/about. Les chiffres s'incrémentent
   à l'entrée dans le viewport, avec le compteur PARTAGÉ de la
   home pro (useCountUp/useInView) : un seul déclencheur, un seul
   comportement SSR-safe, reduced-motion géré une fois pour toutes.
   Les valeurs non chiffrables (« 24/7 ») s'affichent telles quelles.

   La section CTA qui suivait a été retirée : la bande de
   conversion du footer partagé (ft2__cta) la doublonnait, comme
   sur /pro/pricing et /pro/resources.
   ============================================================ */

function MetricValue({
  metric,
  start,
}: {
  metric: AboutCopy["metrics"]["figures"][number];
  start: boolean;
}) {
  const display = useCountUp(metric.to ?? 0, metric.decimals ?? 0, start);

  if (metric.text !== undefined) {
    return <span className="pa2-metric-num">{metric.text}</span>;
  }

  return (
    <span className="pa2-metric-num">
      {metric.prefix}
      {display}
      {metric.suffix}
      {metric.sup && <sup>{metric.sup}</sup>}
    </span>
  );
}

export default function AboutMetrics({ metrics }: { metrics: AboutCopy["metrics"] }) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      className="pa2-section pa2-section--line pa2-metrics-section"
      aria-labelledby="pa2-metrics-title"
    >
      <style>{aboutMetricsCss}</style>

      <RevealCascade>
        <h2 className="pa2-h2" id="pa2-metrics-title">
          {metrics.title}
        </h2>
      </RevealCascade>

      <RevealCascade className="pa2-metrics" baseDelayMs={120}>
        {metrics.figures.map((metric) => (
          <div className="pa2-metric" key={metric.label}>
            <MetricValue metric={metric} start={inView} />
            <span className="pa2-metric-label">{metric.label}</span>
          </div>
        ))}
      </RevealCascade>

      <RevealCascade baseDelayMs={240}>
        <p className="pa2-footnote">{metrics.footnote}</p>
      </RevealCascade>
    </section>
  );
}
