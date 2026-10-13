import type { LectureConfig } from "../types";
import "./Placeholder.css";

type Props = {
  label: string;
  fallback?: string;
  config: LectureConfig;
};

export function Placeholder({ label, fallback, config }: Props) {
  const showFallback = fallback && !config.notionApproved;
  const text = showFallback ? fallback : label;

  return (
    <div className="placeholder" role="note" aria-label={`Placeholder: ${text}`}>
      <span className="placeholder-tag">
        {showFallback ? "Fallback" : "Placeholder"}
      </span>
      <p className="placeholder-text">{text}</p>
    </div>
  );
}
