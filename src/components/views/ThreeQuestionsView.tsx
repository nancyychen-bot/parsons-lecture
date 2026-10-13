import type { View, LectureConfig } from "../../types";
import "./views.css";
import "./ThreeQuestionsView.css";

type Props = { view: View; config: LectureConfig };

const Qs = [
  { label: "Product · r = 1", q: "What can I do?" },
  { label: "Experience · r = 2", q: "How does it feel?" },
  { label: "World · r = 3", q: "What am I part of?" },
];

/**
 * 09.1 — Three questions again. Visually hidden H1 (one per view, DESIGN
 * handoff §3.5), then ruled list of the three questions.
 */
export function ThreeQuestionsView(_props: Props) {
  return (
    <div className="view threeq-view">
      <p className="orr-label threeq-view__title">
        The three questions, again
      </p>

      <h1 className="threeq-view__h1-sr">The three questions</h1>

      <dl className="threeq-view__dl">
        {Qs.map((item, i) => (
          <div
            key={item.label}
            className={`threeq-view__row${
              i === Qs.length - 1 ? " threeq-view__row--last" : ""
            }`}
          >
            <dt className="orr-label">{item.label}</dt>
            <dd className="threeq-view__dd">{item.q}</dd>
          </div>
        ))}
      </dl>

      <p className="threeq-view__footer">
        The interface still matters. It is one part of the invitation, not the
        whole thing.
      </p>
    </div>
  );
}
