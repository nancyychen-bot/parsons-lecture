import { useMemo } from "react";
import type { Section, LectureConfig, MarkState } from "../types";
import "./ExplorePage.css";

type ExplorePageProps = {
  sections: Section[];
  currentSectionId: string;
  config: LectureConfig;
  onNavigateSection: (sectionId: string) => void;
  onSwitchToLive: () => void;
};

/** Which rings are filled for a given section number string (per DESIGN §2.4) */
function markStateForSection(num: string): {
  product: boolean;
  experience: boolean;
  world: boolean;
  axis: boolean;
} {
  const n = parseInt(num, 10) || 0;
  const product = n >= 3;
  const experience = n >= 5;
  const world = n >= 6;
  const axis = n >= 7;
  return { product, experience, world, axis };
}

function OrreryMark({
  size = 120,
  state,
}: {
  size?: number;
  state: ReturnType<typeof markStateForSection>;
}) {
  const r = size / 2;
  const coreR = r / 13.3; // 4.5 at 120
  const r1 = r * 0.3;
  const r2 = r * 0.6;
  const r3 = r * 0.9;
  return (
    <svg
      className="orr-svg"
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      role="img"
      aria-label="Progress mark"
      style={{ flex: "none" }}
    >
      <circle
        className={state.product ? "orr-core" : "orr-core--unfilled"}
        cx={r}
        cy={r}
        r={coreR}
      />
      <circle
        className={state.product ? "orr-ring" : "orr-ring orr-ring--unfilled"}
        cx={r}
        cy={r}
        r={r1}
      />
      <circle
        className={state.experience ? "orr-ring" : "orr-ring orr-ring--unfilled"}
        cx={r}
        cy={r}
        r={r2}
      />
      <circle
        className={
          state.world ? "orr-ring orr-ring--world" : "orr-ring orr-ring--unfilled"
        }
        cx={r}
        cy={r}
        r={r3}
      />
      {state.axis && (
        <g transform={`rotate(-58 ${r} ${r})`}>
          <line
            className="orr-axis"
            x1={r - r3 * 1.12}
            y1={r}
            x2={r + r3 * 1.12}
            y2={r}
          />
        </g>
      )}
    </svg>
  );
}

export default function ExplorePage({
  sections,
  currentSectionId,
  config,
  onNavigateSection,
  onSwitchToLive,
}: ExplorePageProps) {
  // Pick the active section, defaulting to first
  const section = useMemo(
    () => sections.find((s) => s.id === currentSectionId) ?? sections[0],
    [sections, currentSectionId],
  );

  const currentIndex = useMemo(
    () => sections.findIndex((s) => s.id === section.id),
    [sections, section.id],
  );

  const prevSection = currentIndex > 0 ? sections[currentIndex - 1] : null;
  const nextSection =
    currentIndex >= 0 && currentIndex < sections.length - 1
      ? sections[currentIndex + 1]
      : null;

  const state = markStateForSection(section.number);

  // Pick a key line view if any
  const keyLineView = section.views.find((v) => v.keyLine);

  return (
    <div data-theme="explore" className="explore-root">
      <header className="explore-header">
        <a href="#/" className="explore-sitename">
          Build a world, not just a product
        </a>
        <div className="explore-header-right">
          <a
            className="orr-btn orr-btn--text"
            href="#/workshop"
            style={{ display: "inline-flex", alignItems: "center" }}
          >
            Go to the workshop
          </a>
          <div role="group" aria-label="Mode" className="explore-mode-group">
            <button
              type="button"
              className="orr-btn"
              onClick={onSwitchToLive}
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              Live
            </button>
            <button
              type="button"
              className="orr-btn"
              aria-current="page"
              style={{
                display: "inline-flex",
                alignItems: "center",
                marginLeft: "-1px",
                background: "var(--ink)",
                color: "var(--ground)",
              }}
            >
              Explore
            </button>
          </div>
        </div>
      </header>

      <div className="explore-body">
        <nav aria-label="Sections" className="explore-nav">
          <ol className="explore-nav-list">
            {sections.map((s) => {
              const isCurrent = s.id === section.id;
              return (
                <li key={s.id}>
                  <a
                    href={`#/explore/${s.id}`}
                    aria-current={isCurrent ? "page" : undefined}
                    className={
                      "explore-nav-item" + (isCurrent ? " explore-nav-item--current" : "")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateSection(s.id);
                    }}
                  >
                    <span
                      className={
                        "orr-label" + (isCurrent ? "" : " orr-muted")
                      }
                    >
                      {s.number}
                    </span>
                    <span className="explore-nav-label">{s.navLabel}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>

        <article className="explore-article">
          <header className="explore-article-header">
            <div className="explore-article-header-text">
              <p className="orr-label orr-muted" style={{ margin: 0 }}>
                {section.number} / 09 · {section.navLabel}
              </p>
              <h1
                className="display explore-article-h1"
                tabIndex={-1}
              >
                {section.navLabel}
              </h1>
              <p
                className="reading explore-article-reading"
              >
                {section.reading}
              </p>
            </div>
            <OrreryMark size={120} state={state} />
          </header>

          {section.explore?.body && (
            <p className="body explore-body-text">{section.explore.body}</p>
          )}

          {section.explore?.extras?.map((paragraph, idx) => (
            <p key={idx} className="body explore-body-text">
              {paragraph}
            </p>
          ))}

          {/* Inline figure for section 05 — the ordering moment demo */}
          {section.id === "experience" && <ExperienceFigure />}

          {/* Three moments list for section 05 */}
          {section.id === "experience" && <ThreeMomentsSection />}

          {/* Notion placeholder (when !notionApproved) */}
          {!config.notionApproved && section.id === "experience" && (
            <NotionPlaceholder />
          )}

          {/* Try it prompt */}
          {section.id === "experience" && <TryItSection />}

          {/* Key line block */}
          {keyLineView && (
            <KeyLineBlock
              label="Key line"
              line={keyLineView.headline}
            />
          )}

          {/* Prev/next */}
          <nav
            aria-label="Previous and next section"
            className="explore-prevnext"
          >
            {prevSection ? (
              <a
                className="orr-btn explore-prev"
                href={`#/explore/${prevSection.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateSection(prevSection.id);
                }}
              >
                ← {prevSection.number} {prevSection.navLabel}
              </a>
            ) : (
              <span />
            )}
            {nextSection ? (
              <a
                className="orr-btn explore-next"
                href={`#/explore/${nextSection.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateSection(nextSection.id);
                }}
              >
                {nextSection.number} {nextSection.navLabel} →
              </a>
            ) : (
              <span />
            )}
          </nav>
        </article>
      </div>
    </div>
  );
}

/** Section-05 one-ordering-moment figure (BeforeAfter preview, inline). */
function ExperienceFigure() {
  return (
    <section className="explore-section" aria-label="One ordering moment">
      <h2 className="explore-h2">Same coffee, two shops</h2>
      <figure
        className="explore-figure"
        style={{ margin: 0, display: "flex", flexDirection: "column", gap: 20, paddingTop: 14, borderTop: "1px solid var(--ink)" }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
          }}
        >
          <p className="orr-label" style={{ margin: 0 }}>
            Fig. 05.1 · One ordering moment
          </p>
        </div>
        <div className="explore-shop-grid">
          <div className="explore-shop" style={{ opacity: 0.5 }}>
            <p className="orr-label" style={{ margin: 0 }}>Shop A</p>
            <p className="explore-mono-line">
              <strong>Menu</strong> Espresso · ristretto · lungo · cortado ·
              gibraltar · flat white · macchiato (trad.) · SO / blend · V60 ·
              kalita · chemex · nitro CB · cold drip · affogato · alt milk +
            </p>
            <p className="explore-mono-line" style={{ fontWeight: 500 }}>“Next!”</p>
            <p className="explore-mono-line">Order at register. No substitutions.</p>
          </div>
          <div className="explore-shop">
            <p className="orr-label" style={{ margin: 0 }}>Shop B</p>
            {[
              "Coffee — smooth, not bitter. Coffee with milk — mild, creamy.",
              "First time? Here’s what we’d recommend.",
              "Take your time. We’ll be ready when you are.",
              "Ask us anything.",
            ].map((text, i) => (
              <div
                key={i}
                style={{ display: "flex", gap: 12, alignItems: "baseline" }}
              >
                <span
                  className="orr-label explore-shop-num"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <p
                  style={{
                    margin: 0,
                    fontSize: 18,
                    lineHeight: 1.45,
                    fontStyle: i === 1 ? "italic" : "normal",
                  }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
        <figcaption
          className="orr-muted"
          style={{ fontSize: 15, lineHeight: 1.5 }}
        >
          Four levers: 1 language, 2 guidance, 3 pace, 4 support. Same coffee in both shops.
        </figcaption>
      </figure>
    </section>
  );
}

function ThreeMomentsSection() {
  return (
    <section className="explore-section explore-threemoments">
      <div className="explore-threemoments-text">
        <h2 className="explore-h2">Three moments</h2>
        <ol className="explore-threemoments-list">
          <li className="explore-threemoments-item">
            <span className="orr-label orr-muted">01</span>
            <span className="body">Finding your way in.</span>
          </li>
          <li className="explore-threemoments-item">
            <span className="orr-label orr-muted">02</span>
            <span className="body">Doing the main thing.</span>
          </li>
          <li className="explore-threemoments-item explore-threemoments-item--last">
            <span className="orr-label orr-muted">03</span>
            <span className="body">When something goes wrong.</span>
          </li>
        </ol>
      </div>
      <figure className="explore-moon-fig">
        <img
          className="orr-cutout"
          src="/cutouts/moon-phases.png"
          alt="Engraved chart of the moon’s phases"
          style={{ height: 300, width: "auto" }}
        />
        <figcaption style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span className="orr-label">Fig. 05.2 · Moon phases</span>
          <span className="orr-label orr-muted">One thing, seen in stages</span>
        </figcaption>
      </figure>
    </section>
  );
}

function NotionPlaceholder() {
  return (
    <section className="explore-section explore-notion">
      <h2 className="explore-h2">A Notion example</h2>
      <div className="orr-placeholder">
        <p className="orr-label" style={{ margin: 0, color: "var(--ink)" }}>
          Placeholder — Notion screenshots: a blank page vs. a guided class-project template
        </p>
        <p>
          Approved screenshots only, framed as screenshots. Without approval,
          an abstract wireframe in this site’s own visual language, labelled illustrative.
        </p>
      </div>
    </section>
  );
}

function TryItSection() {
  return (
    <section className="explore-section explore-tryit">
      <h2 className="explore-h2">Try it</h2>
      <p className="reading explore-tryit-prompt">
        We want this moment to feel ___, so we will ___.
      </p>
      <p className="orr-muted explore-tryit-sub">
        Say it to the person next to you, or type it in chat.
      </p>
    </section>
  );
}

function KeyLineBlock({ label, line }: { label: string; line: string }) {
  return (
    <section aria-label={label} className="explore-section explore-keyline">
      <p className="orr-label" style={{ margin: 0 }}>
        {label}
      </p>
      <hr className="orr-rule" />
      <p className="explore-keyline-text">{line}</p>
    </section>
  );
}

/** Export the mark state helper so other components could use it if needed. */
export function sectionMarkStateFromNumber(num: string): MarkState {
  const s = markStateForSection(num);
  if (s.axis) return "axis";
  const filled = (s.product ? 1 : 0) + (s.experience ? 1 : 0) + (s.world ? 1 : 0);
  return filled as MarkState;
}
