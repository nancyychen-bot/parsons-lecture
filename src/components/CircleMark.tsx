import type { MarkState } from "../types";
import "./CircleMark.css";

type Props = {
  state: MarkState;
  size?: number;
  broken?: boolean;
  ariaLabel?: string;
};

function markLabel(state: MarkState, broken: boolean): string {
  if (broken) {
    return "Progress mark: axis broken";
  }
  if (state === "axis") {
    return "Progress mark: all rings reached, axis drawn";
  }
  if (state === 0) return "Progress mark: no rings reached yet";
  const plural = state === 1 ? "ring" : "rings";
  return `Progress mark: ${state} of 3 ${plural} reached`;
}

/**
 * CircleMark — pure-SVG progress mark used in the top-right corner.
 *
 *  - viewBox is always 0 0 64 64. Pass size (default 64) to render larger/smaller
 *    without changing the geometry.
 *  - state determines which rings are filled.
 *  - broken=true draws the axis as two swung-apart segments (used on Contradiction).
 */
export function CircleMark({
  state,
  size = 64,
  broken = false,
  ariaLabel,
}: Props) {
  const hasProduct = state === "axis" || (typeof state === "number" && state >= 1);
  const hasExperience =
    state === "axis" || (typeof state === "number" && state >= 2);
  const hasWorld =
    state === "axis" || (typeof state === "number" && state >= 3);
  const hasAxis = state === "axis" || broken;

  return (
    <svg
      className="orr-svg orr-mark"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-label={ariaLabel ?? markLabel(state, broken)}
    >
      <circle
        className={hasProduct ? "orr-core" : "orr-core--unfilled"}
        cx="32"
        cy="32"
        r="2.4"
      />
      <circle
        className={hasProduct ? "orr-ring" : "orr-ring orr-ring--unfilled"}
        cx="32"
        cy="32"
        r="9.5"
      />
      <circle
        className={hasExperience ? "orr-ring" : "orr-ring orr-ring--unfilled"}
        cx="32"
        cy="32"
        r="19"
      />
      <circle
        className={
          hasWorld
            ? "orr-ring orr-ring--world"
            : "orr-ring orr-ring--unfilled"
        }
        cx="32"
        cy="32"
        r="28.5"
      />
      {hasAxis && !broken && (
        <g transform="rotate(-58 32 32)">
          <line className="orr-axis" x1="0.1" y1="32" x2="63.9" y2="32" />
          <line className="orr-axis" x1="0.1" y1="29" x2="0.1" y2="35" />
          <line className="orr-axis" x1="63.9" y1="29" x2="63.9" y2="35" />
        </g>
      )}
      {broken && (
        <>
          {/* Central stub stays at -58°, outer segments swing to -52° */}
          <g transform="rotate(-58 32 32)">
            <line className="orr-axis" x1="22" y1="32" x2="42" y2="32" />
          </g>
          <g transform="rotate(-52 32 32)">
            <line className="orr-axis" x1="0.1" y1="32" x2="18" y2="32" />
            <line className="orr-axis" x1="0.1" y1="29" x2="0.1" y2="35" />
            <line className="orr-axis" x1="46" y1="32" x2="63.9" y2="32" />
            <line className="orr-axis" x1="63.9" y1="29" x2="63.9" y2="35" />
          </g>
        </>
      )}
    </svg>
  );
}
