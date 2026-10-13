import type { View, LectureConfig } from "../../types";
import "./views.css";
import "./WhatIsProductView.css";

type Props = { view: View; config: LectureConfig };

const EXAMPLES = [
  "Notion",
  "A restaurant",
  "A music festival",
  "A neighborhood coffee shop",
  "Empower",
];

const ROMAN = ["i", "ii", "iii", "iv", "v"];

/**
 * 02.1 — Prompt: where does it begin and end?
 * Mirrors WhatIsProduct.dc.html.
 */
export function WhatIsProductView(_props: Props) {
  return (
    <div className="view wip-view">
      <div className="wip-view__intro">
        <p className="wip-view__reading">The screen is the smallest part of it.</p>
        <h1 className="wip-view__h1">
          Where does the product begin, and where does it end?
        </h1>
      </div>

      <ol className="wip-view__list">
        {EXAMPLES.map((label, i) => (
          <li key={label} className="wip-view__item">
            <span className="orr-label orr-muted">{ROMAN[i]}</span>
            <span className="wip-view__item-label">{label}</span>
          </li>
        ))}
      </ol>

      <p className="wip-view__hint">
        Pick one. Call out where it stops. There’s no wrong answer.
      </p>
    </div>
  );
}
