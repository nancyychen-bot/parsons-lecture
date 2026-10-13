import type { View, LectureConfig } from "../../types";
import { Placeholder } from "../Placeholder";
import "./views.css";
import "./OneTaskView.css";

type Props = { view: View; config: LectureConfig };

/**
 * 04.2 One task — illustrative "shared notes app" stand-in on the left,
 * explanation + AI line on the right. When `config.notionApproved` is true
 * we swap in an approved Notion screenshot placeholder (never a mockup).
 */
export function OneTaskView({ config }: Props) {
  return (
    <div className="view onetask-view">
      <figure className="onetask-view__figure">
        <figcaption className="orr-label orr-muted">
          Illustrative · a shared notes app
        </figcaption>

        {config.notionApproved ? (
          <Placeholder
            label="Placeholder — approved Notion screenshot (configure before class)"
            width="100%"
            height={280}
          />
        ) : (
          <div className="onetask-view__panel">
            <p className="onetask-view__title">Class project</p>
            <p className="orr-label orr-muted">This week</p>
            <div className="onetask-view__rows">
              <span
                aria-hidden="true"
                className="onetask-view__dot onetask-view__dot--on"
              />
              <span
                className="onetask-view__bar"
                style={{ width: "82%" }}
              />
              <span className="orr-label orr-muted">AL</span>
              <span className="orr-label orr-muted">Mon</span>

              <span aria-hidden="true" className="onetask-view__dot" />
              <span
                className="onetask-view__bar"
                style={{ width: "64%" }}
              />
              <span className="orr-label orr-muted">JD</span>
              <span className="orr-label orr-muted">Wed</span>

              <span aria-hidden="true" className="onetask-view__dot" />
              <span
                className="onetask-view__bar"
                style={{ width: "74%" }}
              />
              <span className="orr-label orr-muted">You</span>
              <span className="orr-label orr-muted">Thu</span>
            </div>
            <p className="orr-label orr-muted onetask-view__decisions">
              Decisions
            </p>
            <span
              className="onetask-view__bar onetask-view__bar--muted"
              style={{ width: "70%" }}
            />
            <span
              className="onetask-view__bar onetask-view__bar--muted"
              style={{ width: "52%" }}
            />
          </div>
        )}

        {!config.notionApproved && (
          <p className="orr-label orr-muted onetask-view__fallback">
            Placeholder — approved Notion screenshot replaces this
          </p>
        )}
      </figure>

      <div className="onetask-view__text">
        <p className="orr-label">One task, not a feature list</p>
        <h1 className="onetask-view__h1">Organizing a class project.</h1>
        <p className="onetask-view__body">
          That’s the job. Every feature either serves it or waits.
        </p>
      </div>

      <div className="onetask-view__ai">
        <hr className="orr-rule" />
        <p className="onetask-view__ai-line">
          AI can generate a solution. It can’t decide which problem deserves
          your attention.
        </p>
      </div>
    </div>
  );
}
