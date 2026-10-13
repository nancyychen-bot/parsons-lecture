import "./Placeholder.css";

type PlaceholderProps = {
  label: string;
  width?: number | string;
  height?: number | string;
  align?: "left" | "center" | "right";
};

/**
 * Honest, visible, labeled placeholder for missing content.
 * Uses the `.orr-placeholder` dashed-box treatment per orrery.css.
 */
export function Placeholder({
  label,
  width,
  height,
  align = "center",
}: PlaceholderProps) {
  return (
    <div
      className="baw-placeholder orr-placeholder"
      style={{
        width,
        height,
        textAlign: align,
      }}
    >
      <p className="orr-label orr-muted">{label}</p>
    </div>
  );
}
