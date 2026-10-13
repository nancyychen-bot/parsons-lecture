import type { View, LectureConfig } from "../../types";
import "./views.css";
import "./NancysBuildView.css";

type Props = { view: View; config: LectureConfig };

const ROWS = [
  { r: "i", label: "What it lets someone do" },
  { r: "ii", label: "The first, imperfect version" },
  { r: "iii", label: "One judgment call" },
  { r: "iv", label: "One change prompted by real behavior" },
];

/**
 * 07.3 — Nancy's build. Four labeled placeholder rows + alembic cutout +
 * AI line. See DESIGN-HANDOFF §8 — the four fields stay as visible
 * placeholders until Nancy confirms copy.
 */
export function NancysBuildView(_props: Props) {
  return (
    <div className="view nancys-view">
      <div className="nancys-view__text">
        <p className="orr-label">Nancy’s build</p>
        <h1 className="nancys-view__h1">
          One of my builds, read through the three circles.
        </h1>

        <dl className="nancys-view__dl">
          {ROWS.map((row, i) => (
            <div
              key={row.r}
              className={`nancys-view__row${
                i === 0 ? " nancys-view__row--first" : ""
              }${i === ROWS.length - 1 ? " nancys-view__row--last" : ""}`}
            >
              <dt className="nancys-view__dt">
                {row.r} · {row.label}
              </dt>
              <dd className="orr-label orr-muted nancys-view__dd">
                Placeholder
              </dd>
            </div>
          ))}
        </dl>

        <p className="orr-label orr-muted nancys-view__fallback">
          Fallback: this site, and the change from the dry run
        </p>
      </div>

      <figure className="nancys-view__figure">
        <img
          className="orr-cutout nancys-view__img"
          src="/cutouts/alembic.png"
          alt="Engraved alembic, a still with a coiled copper tube"
        />
        <figcaption className="nancys-view__cap">
          <span className="orr-label">Fig. 07 · Alembic</span>
          <span className="orr-label orr-muted">A rough version, refined</span>
        </figcaption>
        <p className="nancys-view__ai">
          AI can draw any of these circles. It can’t choose the belief that
          runs through them.
        </p>
      </figure>
    </div>
  );
}
