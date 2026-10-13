import type { View, LectureConfig } from "../../types";
import "./views.css";
import "./ThreeMomentsView.css";

type Props = { view: View; config: LectureConfig };

const MOMENTS = [
  {
    r: "i.",
    label: "Finding your way in",
    sub: "Reading the menu for the first time.",
  },
  {
    r: "ii.",
    label: "Doing the main thing",
    sub: "Ordering, then waiting.",
  },
  {
    r: "iii.",
    label: "When something goes wrong",
    sub: "The wrong drink arrives.",
  },
];

/**
 * 05.2 — Three moments decide how it feels.
 * Mirrors ThreeMoments.dc.html.
 */
export function ThreeMomentsView(_props: Props) {
  return (
    <div className="view moments-view">
      <div className="moments-view__intro">
        <p className="moments-view__reading">
          People will forget the features. They’ll remember whether it trusted
          them.
        </p>
        <h1 className="moments-view__h1">
          Three moments decide how it feels.
        </h1>
      </div>

      <ol className="moments-view__list">
        {MOMENTS.map((m) => (
          <li key={m.r} className="moments-view__item">
            <span aria-hidden="true" className="moments-view__roman">
              {m.r}
            </span>
            <span className="moments-view__label">{m.label}</span>
            <span className="moments-view__sub">{m.sub}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
