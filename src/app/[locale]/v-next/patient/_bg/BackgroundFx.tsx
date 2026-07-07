import type { ComponentType } from "react";
import BgAurora from "./BgAurora";
import BgBlobs from "./BgBlobs";
import BgGrid from "./BgGrid";
import BgWaves from "./BgWaves";
import BgAuroraBold from "./BgAuroraBold";
import BgBlobsBold from "./BgBlobsBold";
import BgGridBold from "./BgGridBold";
import BgWavesBold from "./BgWavesBold";

const MAP: Record<string, ComponentType> = {
  aurora: BgAurora,
  blobs: BgBlobs,
  grid: BgGrid,
  waves: BgWaves,
  "aurora-bold": BgAuroraBold,
  "blobs-bold": BgBlobsBold,
  "grid-bold": BgGridBold,
  "waves-bold": BgWavesBold,
};

/** Fixed full-viewport decorative canvas for a given variant. */
export default function BackgroundFx({ variant }: { variant: string }) {
  const Comp = MAP[variant] ?? BgAurora;
  return (
    <div className="vnp-bgfx" aria-hidden="true">
      <Comp />
    </div>
  );
}
