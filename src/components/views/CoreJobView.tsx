import type { View, LectureConfig } from "../../types";
import "./views.css";
import "./CoreJobView.css";

type Props = { view: View; config: LectureConfig };

const QUESTIONS = [
  { r: "i", q: "Who is it for?" },
  { r: "ii", q: "What does it help them do?" },
  { r: "iii", q: "What one thing must it do well?" },
];

/**
 * 04.1 Core job — apple-half cutout right, text + list left.
 * Mirrors CoreJob.dc.html.
 */
export function CoreJobView(_props: Props) {
  return (
    <div className="view corejob-view">
      <div className="corejob-view__text">
        <p className="corejob-view__reading">
          Be useful first. Charm comes later.
        </p>
        <h1 className="corejob-view__h1">
          Before a product means something, it has to do something.
        </h1>
        <p className="corejob-view__body">
          At the coffee shop, the product is a good cup, reliably. A beautiful
          room can’t save a bad cup.
        </p>
      </div>

      <ol className="corejob-view__list">
        {QUESTIONS.map(({ r, q }) => (
          <li key={r} className="corejob-view__item">
            <span className="orr-label orr-muted">{r}</span>
            <span className="corejob-view__q">{q}</span>
          </li>
        ))}
      </ol>

      <figure className="corejob-view__figure">
        <img
          className="orr-cutout corejob-view__img"
          src="/cutouts/apple-half.png"
          alt="Engraved apple cut in half, showing its core and seeds"
        />
        <figcaption className="corejob-view__caption">
          <span className="orr-label">Fig. 04 · Apple, halved</span>
          <span className="orr-label orr-muted">The core, cut open</span>
        </figcaption>
      </figure>
    </div>
  );
}
