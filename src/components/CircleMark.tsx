import type { CircleId } from "../types";
import "./CircleMark.css";

type Props = {
  focus?: CircleId | "all" | "axis" | null;
  filled?: {
    product: boolean;
    experience: boolean;
    world: boolean;
    axis: boolean;
  };
  size?: "sm" | "md" | "lg";
  className?: string;
  broken?: boolean;
};

/* Canonical ring geometry: radii in ratio 1:2:3 */
const VB = 100; // viewBox
const CX = VB / 2;
const CY = VB / 2;

/* Size-dependent ring radii (in viewBox units) */
const RINGS = {
  sm: { product: 12, experience: 24, world: 36, core: 3, overshoot: 4 },
  md: { product: 16, experience: 32, world: 48, core: 4, overshoot: 6 },
  lg: { product: 16, experience: 32, world: 48, core: 4, overshoot: 6 },
};

/* Axis angle: -58 degrees from vertical */
const AXIS_ANGLE = -58;

function polarToCart(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export function CircleMark({
  focus,
  filled = { product: false, experience: false, world: false, axis: false },
  size = "md",
  className = "",
  broken = false,
}: Props) {
  const r = RINGS[size] || RINGS.md;
  const isFilled = (id: CircleId) => {
    if (id === "product") return filled.product;
    if (id === "experience") return filled.experience;
    if (id === "world") return filled.world;
    return false;
  };

  const isUnfilled = (id: CircleId) => !isFilled(id);

  /* Axis endpoints: overshoot 12% past world ring */
  const axisLen = r.world * (1 + 0.12);
  const axisStart = polarToCart(CX, CY, axisLen, AXIS_ANGLE);
  const axisEnd = polarToCart(CX, CY, axisLen, AXIS_ANGLE + 180);

  /* Tick marks at axis ends (small perpendicular lines) */
  const tickLen = size === "sm" ? 2 : 3;
  const tickAngle = AXIS_ANGLE + 90;
  const tickStart1a = polarToCart(axisStart.x, axisStart.y, tickLen, tickAngle);
  const tickStart1b = polarToCart(axisStart.x, axisStart.y, tickLen, tickAngle + 180);
  const tickEnd1a = polarToCart(axisEnd.x, axisEnd.y, tickLen, tickAngle);
  const tickEnd1b = polarToCart(axisEnd.x, axisEnd.y, tickLen, tickAngle + 180);

  /* Ring label positions: -90 degrees (top of ring) */
  const showLabels = size === "lg" || size === "md";
  const labelAngle = -90;
  const labelFontSize = size === "lg" ? 5 : 4;

  const productLabel = polarToCart(CX, CY, r.product, labelAngle);
  const experienceLabel = polarToCart(CX, CY, r.experience, labelAngle);
  const worldLabel = polarToCart(CX, CY, r.world, labelAngle);

  return (
    <div
      className={`circle-mark circle-mark--${size} ${className}`}
      role="img"
      aria-label={buildAriaLabel(focus, filled)}
    >
      <svg viewBox={`0 0 ${VB} ${VB}`} xmlns="http://www.w3.org/2000/svg" className="orr-svg orr-mark">
        {/* World ring */}
        <circle
          cx={CX} cy={CY} r={r.world}
          className={`orr-ring orr-ring--world ${isUnfilled("world") ? "orr-ring--unfilled" : ""}`}
        />
        {/* Experience ring */}
        <circle
          cx={CX} cy={CY} r={r.experience}
          className={`orr-ring ${isUnfilled("experience") ? "orr-ring--unfilled" : ""}`}
        />
        {/* Product ring */}
        <circle
          cx={CX} cy={CY} r={r.product}
          className={`orr-ring ${isUnfilled("product") ? "orr-ring--unfilled" : ""}`}
        />
        {/* Core dot */}
        <circle
          cx={CX} cy={CY} r={r.core}
          className={isFilled("product") ? "orr-core" : "orr-core--unfilled"}
        />

        {/* Ring labels (only on md and lg) */}
        {showLabels && (
          <>
            <text x={productLabel.x} y={productLabel.y} textAnchor="middle" dominantBaseline="central" fontSize={labelFontSize}
              className={isFilled("product") ? "" : "orr-muted"}>PRODUCT</text>
            <text x={experienceLabel.x} y={experienceLabel.y} textAnchor="middle" dominantBaseline="central" fontSize={labelFontSize}
              className={isFilled("experience") ? "" : "orr-muted"}>EXPERIENCE</text>
            <text x={worldLabel.x} y={worldLabel.y} textAnchor="middle" dominantBaseline="central" fontSize={labelFontSize}
              className={isFilled("world") ? "" : "orr-muted"}>WORLD</text>
          </>
        )}

        {/* POV axis */}
        {filled.axis && !broken && (
          <g className="orr-axis">
            <line x1={axisStart.x} y1={axisStart.y} x2={axisEnd.x} y2={axisEnd.y} />
            {/* Ticks */}
            <line x1={tickStart1a.x} y1={tickStart1a.y} x2={tickStart1b.x} y2={tickStart1b.y} />
            <line x1={tickEnd1a.x} y1={tickEnd1a.y} x2={tickEnd1b.x} y2={tickEnd1b.y} />
          </g>
        )}
      </svg>
    </div>
  );
}

function buildAriaLabel(
  focus: Props["focus"],
  filled: NonNullable<Props["filled"]>
): string {
  const parts = ["Three concentric circles: Product, Experience, World."];
  if (filled.product) parts.push("Product ring filled.");
  if (filled.experience) parts.push("Experience ring filled.");
  if (filled.world) parts.push("World ring filled.");
  if (filled.axis) parts.push("Point-of-view axis visible through all rings.");
  if (focus && focus !== "all" && focus !== "axis") {
    parts.push(`Currently highlighting: ${focus}.`);
  }
  return parts.join(" ");
}
