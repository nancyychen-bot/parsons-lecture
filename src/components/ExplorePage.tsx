import { useRef, useEffect, useMemo, useState } from "react";
import type { LectureConfig } from "../types";
import { sections, getFilledCircles } from "../content/lecture";
import { CircleMark } from "./CircleMark";
import { Placeholder } from "./Placeholder";
import "./ExplorePage.css";

type Props = {
  sectionId: string;
  config: LectureConfig;
  onSectionNav: (sectionId: string) => void;
};

export function ExplorePage({ sectionId, config, onSectionNav }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentSection = useMemo(
    () => sections.find((s) => s.id === sectionId) || sections[0],
    [sectionId]
  );

  useEffect(() => {
    contentRef.current?.scrollTo(0, 0);
  }, [sectionId]);

  const sectionIndex = sections.findIndex((s) => s.id === currentSection.id);

  return (
    <div className="explore-page" data-theme="explore">
      {/* Desktop sidebar nav */}
      <nav className="explore-sidebar" aria-label="Section navigation">
        <ol className="explore-sidebar-list">
          {sections.map((s) => (
            <li key={s.id}>
              <button
                className={`explore-sidebar-link ${s.id === currentSection.id ? "explore-sidebar-link--active" : ""}`}
                onClick={() => onSectionNav(s.id)}
                aria-current={s.id === currentSection.id ? "page" : undefined}
              >
                <span className="explore-sidebar-num">{s.number}</span>
                {s.navLabel}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      {/* Mobile menu toggle */}
      <button
        className="explore-menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
        aria-controls="explore-mobile-menu"
      >
        {currentSection.number} {currentSection.navLabel}
        <span aria-hidden="true">{menuOpen ? "▲" : "▼"}</span>
      </button>

      {menuOpen && (
        <nav
          id="explore-mobile-menu"
          className="explore-mobile-menu"
          aria-label="Section navigation"
        >
          <ol className="explore-mobile-list">
            {sections.map((s) => (
              <li key={s.id}>
                <button
                  className={`explore-mobile-link ${s.id === currentSection.id ? "explore-mobile-link--active" : ""}`}
                  onClick={() => {
                    onSectionNav(s.id);
                    setMenuOpen(false);
                  }}
                >
                  <span className="explore-sidebar-num">{s.number}</span>
                  {s.navLabel}
                </button>
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Content area */}
      <div className="explore-content" ref={contentRef}>
        <article className="explore-article">
          <header className="explore-section-header">
            <CircleMark
              focus="all"
              filled={getFilledCircles(sectionIndex)}
              size="md"
            />
            <div>
              <p className="explore-section-num">{currentSection.number}</p>
              <h1 className="explore-section-title">{currentSection.navLabel}</h1>
              <p className="explore-section-reading">{currentSection.reading}</p>
            </div>
          </header>

          {currentSection.explore ? (
            <div className="explore-body">
              <p>{currentSection.explore.body}</p>

              {currentSection.explore.extras?.map((extra, i) => (
                <Placeholder key={i} label={extra} config={config} />
              ))}
            </div>
          ) : (
            <Placeholder label="Explore content for this section." config={config} />
          )}

          {/* Render views as subsections */}
          {currentSection.views.map((view) => (
            <section key={view.id} className="explore-view-section">
              <h2 className="explore-view-heading">{view.headline}</h2>
              {view.body && <p className="explore-view-body">{view.body}</p>}
              {view.placeholder && (
                <Placeholder
                  label={view.placeholder}
                  fallback={view.fallback}
                  config={config}
                />
              )}
            </section>
          ))}

          {/* Section navigation */}
          <nav className="explore-section-nav" aria-label="Previous and next sections">
            {sectionIndex > 0 && (
              <button
                className="explore-prev-next"
                onClick={() => onSectionNav(sections[sectionIndex - 1].id)}
              >
                ← {sections[sectionIndex - 1].number} {sections[sectionIndex - 1].navLabel}
              </button>
            )}
            <span className="explore-nav-spacer" />
            {sectionIndex < sections.length - 1 && (
              <button
                className="explore-prev-next"
                onClick={() => onSectionNav(sections[sectionIndex + 1].id)}
              >
                {sections[sectionIndex + 1].number} {sections[sectionIndex + 1].navLabel} →
              </button>
            )}
          </nav>
        </article>
      </div>
    </div>
  );
}
