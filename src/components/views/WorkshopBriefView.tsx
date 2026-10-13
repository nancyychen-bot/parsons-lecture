import type { View, LectureConfig } from "../../types";
import "./views.css";
import "./WorkshopBriefView.css";

type Props = { view: View; config: LectureConfig };

const STEPS = [
  {
    r: "i · 3 min",
    label: "Choose a person and a point of view",
    sub: "We are building for ___, and we believe ___.",
  },
  {
    r: "ii · 6 min",
    label: "Fill the three circles",
    sub: "One useful thing. One moment. One invitation.",
  },
  {
    r: "iii · 3 min",
    label: "Check the connection",
    sub: "Find one contradiction. Change one choice.",
  },
  {
    r: "iv · 3–8 min",
    label: "Share and test",
    sub: "Sixty seconds. Your partner names one assumption to test.",
  },
];

/**
 * 08.1 — Workshop brief + timing. Mirrors WorkshopBrief.dc.html.
 */
export function WorkshopBriefView(_props: Props) {
  return (
    <div className="view workshop-brief-view">
      <div className="workshop-brief-view__intro">
        <p className="workshop-brief-view__reading">Your turn. Be specific.</p>
        <h1 className="workshop-brief-view__h1">Build your world</h1>
      </div>

      <ol className="workshop-brief-view__list">
        {STEPS.map((s) => (
          <li key={s.r} className="workshop-brief-view__item">
            <span className="orr-label orr-muted">{s.r}</span>
            <span className="workshop-brief-view__label">{s.label}</span>
            <span className="workshop-brief-view__sub">{s.sub}</span>
          </li>
        ))}
      </ol>

      <p className="orr-label workshop-brief-view__footer">
        Empower or your own project · Output: one canvas, one point of view,
        one next test
      </p>
    </div>
  );
}
