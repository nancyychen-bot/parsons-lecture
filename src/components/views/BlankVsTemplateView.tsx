import type { View, LectureConfig } from "../../types";
import { Placeholder } from "../Placeholder";
import "./views.css";
import "./BlankVsTemplateView.css";

type Props = { view: View; config: LectureConfig };

/**
 * 05.3 — Blank page vs. a guided class-project template.
 * When notionApproved, both panels become labeled placeholders for the real
 * approved screenshots; otherwise we draw the abstract wireframe stand-in in
 * the site's own visual language (never a Notion look-alike).
 */
export function BlankVsTemplateView({ config }: Props) {
  return (
    <div className="view bvt-view">
      <div className="bvt-view__intro">
        <h1 className="bvt-view__h1">Same tool. Different feeling.</h1>
        <p className="bvt-view__sub">
          Guidance, labels and defaults change the feeling. The tool
          underneath stays the same.
        </p>
      </div>

      <p className="orr-label orr-muted bvt-view__note">
        Placeholder — approved Notion screenshots replace both panels
      </p>

      <div className="bvt-view__panels">
        <figure className="bvt-view__panel">
          <figcaption className="bvt-view__cap">
            <span className="orr-label">A blank page</span>
            <span className="orr-label orr-muted">Illustrative</span>
          </figcaption>
          {config.notionApproved ? (
            <Placeholder
              label="Placeholder — approved Notion screenshot (blank page)"
              width="100%"
              height={224}
            />
          ) : (
            <div className="bvt-view__box">
              <span className="bvt-view__caret" aria-hidden="true" />
            </div>
          )}
          <p className="bvt-view__quote">Where do I even start?</p>
        </figure>

        <figure className="bvt-view__panel">
          <figcaption className="bvt-view__cap">
            <span className="orr-label">A guided class-project template</span>
            <span className="orr-label orr-muted">Illustrative</span>
          </figcaption>
          {config.notionApproved ? (
            <Placeholder
              label="Placeholder — approved Notion screenshot (template)"
              width="100%"
              height={224}
            />
          ) : (
            <div className="bvt-view__box bvt-view__box--template">
              <p className="bvt-view__t-title">Class project</p>
              <div className="bvt-view__t-rows">
                <span className="orr-label orr-muted">Goal</span>
                <span
                  className="bvt-view__t-bar"
                  style={{ width: "78%" }}
                />
                <span className="orr-label orr-muted">Who does what</span>
                <span className="bvt-view__t-whodoes">
                  <span
                    aria-hidden="true"
                    className="bvt-view__t-dot"
                  />
                  <span
                    className="bvt-view__t-bar"
                    style={{ width: "60%" }}
                  />
                </span>
                <span className="orr-label orr-muted">Due</span>
                <span
                  className="bvt-view__t-bar"
                  style={{ width: "40%" }}
                />
                <span className="orr-label orr-muted">Start here</span>
                <span
                  className="bvt-view__t-bar"
                  style={{ width: "66%" }}
                />
              </div>
            </div>
          )}
          <p className="bvt-view__quote">
            The next step is already written down.
          </p>
        </figure>
      </div>
    </div>
  );
}
