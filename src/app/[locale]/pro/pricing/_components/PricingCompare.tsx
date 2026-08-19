import type { CSSProperties, JSX } from "react";
import RevealCascade from "@/components/shared/RevealCascade";
import { CheckIcon, GlobeIcon, PersonIcon, ShieldIcon } from "./PricingIcons";
import type { AssureItemCopy, CompareCell, PricingCopy } from "./pricingCopy";
import { pricingCompareCss } from "./pricingCompare.styles";

/* ============================================================
   Comparatif de /pro/pricing — table compacte des 3 formules
   (colonne « Cabinet » teintée teal) + bande de réassurance
   RGPD / profils vérifiés / PT·FR·EN. Périmètre = uniquement
   ce que le produit revendique.
   ============================================================ */

// Index (0-based) de la colonne mise en avant dans compare.rows[].cells.
const STAR_COL = 1;

const ASSURE_ICONS: Record<AssureItemCopy["id"], () => JSX.Element> = {
  rgpd: ShieldIcon,
  verified: PersonIcon,
  langs: GlobeIcon,
};

function Cell({ cell }: { cell: CompareCell }) {
  if (cell.type === "check") return <CheckIcon className="pp1-cell-check" />;
  if (cell.type === "dash") return <span className="pp1-dash">—</span>;
  return <>{cell.value}</>;
}

export default function PricingCompare({
  compare,
  assure,
}: {
  compare: PricingCopy["compare"];
  assure: PricingCopy["assure"];
}) {
  const [firstHeader, ...planHeaders] = compare.headers;

  return (
    <div className="pp1-shell">
      <style>{pricingCompareCss}</style>

      <section className="pp1-compare" aria-labelledby="pp1-compare-title">
        <RevealCascade>
          <h2 className="pp1-h2" id="pp1-compare-title">
            {compare.title}
          </h2>
          <p className="pp1-h2sub">{compare.subtitle}</p>

          <div className="pp1-table-scroll">
          <table className="pp1-table">
            <thead>
              <tr>
                <th scope="col">{firstHeader}</th>
                {planHeaders.map((header, i) => (
                  <th
                    key={header}
                    scope="col"
                    className={i === STAR_COL ? "pp1-col-star" : undefined}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            {/* --ri : rang de la ligne. Le tableau se révèle ligne par ligne
                et une lueur descend la colonne « Cabinet » — sans nouveau
                composant : RevealCascade a déjà posé .mo-in au-dessus. */}
            <tbody>
              {compare.rows.map((row, rowIndex) => (
                <tr key={row.label} style={{ "--ri": rowIndex + 1 } as CSSProperties}>
                  <th scope="row">{row.label}</th>
                  {row.cells.map((cell, i) => (
                    <td key={i} className={i === STAR_COL ? "pp1-col-star" : undefined}>
                      <Cell cell={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </RevealCascade>
      </section>

      <RevealCascade className="pp1-assure">
        {assure.map((item) => {
          const Icon = ASSURE_ICONS[item.id];
          return (
            <div className="pp1-assure-item" key={item.id}>
              <Icon />
              <div>
                <b>{item.title}</b>
                <span>{item.desc}</span>
              </div>
            </div>
          );
        })}
      </RevealCascade>
    </div>
  );
}
