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
};

const RING_CONFIG = {
  world: { r: 44, label: "World" },
  experience: { r: 30, label: "Experience" },
  product: { r: 16, label: "Product" },
} as const;

export function CircleMark({
  focus,
  filled = { product: false, experience: false, world: false, axis: false },
  size = "md",
  className = "",
}: Props) {
  const cx = 50;
  const cy = 50;
  const isFocused = (id: CircleId) =>
    focus === id || focus === "all" || focus === "axis";

  return (
    <div
      className={`circle-mark circle-mark--${size} ${className}`}
      role="img"
      aria-label={buildAriaLabel(focus, filled)}
    >
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        {/* World ring */}
        <circle
          cx={cx}
          cy={cy}
          r={RING_CONFIG.world.r}
          className={`ring ring--world ${isFocused("world") ? "ring--active" : ""} ${filled.world ? "ring--filled" : ""}`}
        />
        {/* Experience ring */}
        <circle
          cx={cx}
          cy={cy}
          r={RING_CONFIG.experience.r}
          className={`ring ring--experience ${isFocused("experience") ? "ring--active" : ""} ${filled.experience ? "ring--filled" : ""}`}
        />
        {/* Product ring */}
        <circle
          cx={cx}
          cy={cy}
          r={RING_CONFIG.product.r}
          className={`ring ring--product ${isFocused("product") ? "ring--active" : ""} ${filled.product ? "ring--filled" : ""}`}
        />
        {/* POV axis line */}
        {filled.axis && (
          <line
            x1={cx}
            y1={cy - RING_CONFIG.world.r - 4}
            x2={cx}
            y2={cy + RING_CONFIG.world.r + 4}
            className="axis-line"
          />
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
