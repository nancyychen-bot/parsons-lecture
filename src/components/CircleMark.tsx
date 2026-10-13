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

/**
 * Progress mark SVG — matches the mockup geometry exactly.
 *
 * sm  = 64×64  viewBox, core r=2.4, rings 9.5/19/28.5  (top-right corner of Live frame)
 * md  = 72×72  viewBox, core r=2.6, rings 10.5/21/31.5  (site-readback mini glyphs)
 * lg  = 480×480 viewBox, core r=18,  rings 72/144/216   (circle-explorer diagram — NOT a mark)
 *
 * Axis at -58deg with ticks at each end.
 * Broken state: gap at center, outer segments swung +6deg.
 */

/* Geometry tables keyed by size */
const GEO = {
  sm:  { vb: 64,  cx: 32,  cy: 32,  core: 2.4,  r1: 9.5,  r2: 19,   r3: 28.5 },
  md:  { vb: 72,  cx: 36,  cy: 36,  core: 2.6,  r1: 10.5, r2: 21,   r3: 31.5 },
  lg:  { vb: 480, cx: 240, cy: 240, core: 18,    r1: 72,   r2: 144,  r3: 216  },
} as const;

const AXIS_ANGLE = -58;

export function CircleMark({
  focus,
  filled = { product: false, experience: false, world: false, axis: false },
  size = "sm",
  className = "",
  broken = false,
}: Props) {
  const g = GEO[size] || GEO.sm;
  const isMark = size === "sm" || size === "md"; // uses .orr-mark class (thinner strokes)

  /* Ring class helpers */
  function ringCls(ringId: CircleId): string {
    const isFilled =
      ringId === "product"    ? filled.product :
      ringId === "experience" ? filled.experience :
      ringId === "world"      ? filled.world : false;

    if (ringId === "world" && isFilled) return "orr-ring orr-ring--world";
    if (isFilled) return "orr-ring";
    return "orr-ring orr-ring--unfilled";
  }

  const coreCls = filled.product ? "orr-core" : "orr-core--unfilled";
  const showAxis = filled.axis;

  /* Axis geometry — axis runs 12% past the world ring */
  const axisExt = g.r3 * 1.12;
  // For sm (64×64): axis endpoints at ~0.1 and ~63.9
  // For md (72×72): axis endpoints at ~0.7 and ~71.3
  const axisStart = size === "sm" ? 0.1 : size === "md" ? 0.7 : g.cx - axisExt;
  const axisEnd = size === "sm" ? (g.vb - 0.1) : size === "md" ? (g.vb - 0.7) : g.cx + axisExt;
  const tickHalf = size === "sm" ? 3 : size === "md" ? 3.5 : 9;

  /* Ring labels (only on lg) */
  const showLabels = size === "lg";
  const labelFontSize = 18;

  return (
    <div
      className={`circle-mark circle-mark--${size} ${className}`}
      role="img"
      aria-label={buildAriaLabel(focus, filled, broken)}
    >
      <svg
        viewBox={`0 0 ${g.vb} ${g.vb}`}
        width={g.vb}
        height={g.vb}
        className={`orr-svg${isMark ? " orr-mark" : ""}`}
      >
        {/* Core dot */}
        <circle className={coreCls} cx={g.cx} cy={g.cy} r={g.core} />

        {/* Product ring */}
        <circle className={ringCls("product")} cx={g.cx} cy={g.cy} r={g.r1} />

        {/* Experience ring */}
        <circle className={ringCls("experience")} cx={g.cx} cy={g.cy} r={g.r2} />

        {/* World ring */}
        <circle className={ringCls("world")} cx={g.cx} cy={g.cy} r={g.r3} />

        {/* Ring labels (lg only) */}
        {showLabels && (
          <>
            <text x={g.cx} y={g.cy - g.r1 - 6} style={{ textAnchor: "middle", fontSize: `${labelFontSize}px` }}>
              PRODUCT
            </text>
            <text x={g.cx} y={g.cy - g.r2 - 6} style={{ textAnchor: "middle", fontSize: `${labelFontSize}px` }}>
              EXPERIENCE
            </text>
            <text x={g.cx} y={g.cy - g.r3 - 6} style={{ textAnchor: "middle", fontSize: `${labelFontSize}px` }}>
              WORLD
            </text>
          </>
        )}

        {/* Axis — clean or broken */}
        {showAxis && !broken && (
          <g transform={`rotate(${AXIS_ANGLE} ${g.cx} ${g.cy})`}>
            <line className="orr-axis" x1={axisStart} y1={g.cy} x2={axisEnd} y2={g.cy} />
            {/* Ticks only on sm and lg — md (site-readback mini glyphs) omits them */}
            {size !== "md" && (
              <>
                <line className="orr-axis" x1={axisStart} y1={g.cy - tickHalf} x2={axisStart} y2={g.cy + tickHalf} />
                <line className="orr-axis" x1={axisEnd} y1={g.cy - tickHalf} x2={axisEnd} y2={g.cy + tickHalf} />
              </>
            )}
          </g>
        )}

        {/* Broken axis — gap at center, outer segments at -52deg */}
        {showAxis && broken && (
          <>
            {/* Center stub at -58deg */}
            <g transform={`rotate(${AXIS_ANGLE} ${g.cx} ${g.cy})`}>
              <line className="orr-axis"
                x1={g.cx - g.r1 * 0.8} y1={g.cy}
                x2={g.cx + g.r1 * 0.8} y2={g.cy}
              />
            </g>
            {/* Outer segments at -52deg */}
            <g transform={`rotate(-52 ${g.cx} ${g.cy})`}>
              <line className="orr-axis"
                x1={g.cx + g.r1 * 1.3} y1={g.cy}
                x2={axisEnd} y2={g.cy}
              />
              <line className="orr-axis"
                x1={axisEnd} y1={g.cy - tickHalf}
                x2={axisEnd} y2={g.cy + tickHalf}
              />
              <line className="orr-axis"
                x1={axisStart} y1={g.cy}
                x2={g.cx - g.r1 * 1.3} y2={g.cy}
              />
              <line className="orr-axis"
                x1={axisStart} y1={g.cy - tickHalf}
                x2={axisStart} y2={g.cy + tickHalf}
              />
            </g>
          </>
        )}
      </svg>
    </div>
  );
}

function buildAriaLabel(
  _focus: Props["focus"],
  filled: NonNullable<Props["filled"]>,
  broken: boolean
): string {
  const parts: string[] = [];
  if (!filled.product && !filled.experience && !filled.world) {
    parts.push("Progress mark: no rings reached yet");
  } else {
    const rings: string[] = [];
    if (filled.product) rings.push("Product");
    if (filled.experience) rings.push("Experience");
    if (filled.world) rings.push("World");
    parts.push(`Progress mark: ${rings.join(" and ")} reached`);
  }
  if (filled.axis && !broken) parts.push(", axis intact");
  if (filled.axis && broken) parts.push(", axis broken");
  return parts.join("");
}
