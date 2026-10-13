import { useState, useCallback } from "react";
import "./BeforeAfter.css";

type Shop = "a" | "b";

const SHOP_A = {
  label: "Shop A",
  lines: [
    { text: "Venti blonde flat white, extra shot, oat, 140°", type: "menu" as const },
    { text: "Next!", type: "staff" as const },
    { text: "No guidance. No suggestions. You either know or you don't.", type: "normal" as const },
  ],
};

const SHOP_B = {
  label: "Shop B",
  lines: [
    { text: "Welcome! First time? Here’s what we’d recommend.", type: "staff" as const },
    { text: "Small · Medium · Large. Milk of your choice. We’ll walk you through it.", type: "menu" as const },
    { text: "Take your time. We’re here if you have questions.", type: "staff" as const },
  ],
};

const ANNOTATIONS = ["Language", "Guidance", "Pace", "Support"];

export function BeforeAfter() {
  const [active, setActive] = useState<Shop>("a");
  const [annotationKey, setAnnotationKey] = useState(0);

  const toggle = useCallback((shop: Shop) => {
    setActive(shop);
    setAnnotationKey((k) => k + 1);
  }, []);

  return (
    <div className="before-after" role="group" aria-label="Before and after comparison">
      {/* Toggle */}
      <div className="ba-toggle" role="radiogroup" aria-label="Select a shop">
        <button
          className="ba-toggle-btn"
          role="radio"
          aria-pressed={active === "a"}
          aria-checked={active === "a"}
          onClick={() => toggle("a")}
        >
          Shop A
        </button>
        <button
          className="ba-toggle-btn"
          role="radio"
          aria-pressed={active === "b"}
          aria-checked={active === "b"}
          onClick={() => toggle("b")}
        >
          Shop B
        </button>
      </div>

      {/* Cards */}
      <div className="ba-cards">
        <div
          className={`ba-card ${active === "a" ? "ba-card--active" : "ba-card--dimmed"}`}
          aria-hidden={active !== "a"}
        >
          <div className="ba-card-label">{SHOP_A.label}</div>
          <div className="ba-card-dialogue">
            {SHOP_A.lines.map((line, i) => (
              <div
                key={i}
                className={`ba-line ${line.type === "staff" ? "ba-line--staff" : ""} ${line.type === "menu" ? "ba-line--menu" : ""}`}
              >
                {line.text}
              </div>
            ))}
          </div>
        </div>

        <div
          className={`ba-card ${active === "b" ? "ba-card--active" : "ba-card--dimmed"}`}
          aria-hidden={active !== "b"}
        >
          <div className="ba-card-label">{SHOP_B.label}</div>
          <div className="ba-card-dialogue">
            {SHOP_B.lines.map((line, i) => (
              <div
                key={i}
                className={`ba-line ${line.type === "staff" ? "ba-line--staff" : ""} ${line.type === "menu" ? "ba-line--menu" : ""}`}
              >
                {line.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Annotation labels */}
      <div className="ba-annotations" aria-label="Experience dimensions" key={annotationKey}>
        {ANNOTATIONS.map((a) => (
          <span key={a} className="ba-annotation">{a}</span>
        ))}
      </div>
    </div>
  );
}
