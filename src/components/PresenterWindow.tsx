import { useEffect, useMemo, useState, useCallback } from "react";
import { usePresenterSync } from "../hooks/usePresenterSync";
import type { Section, LectureConfig, View } from "../types";
import "./PresenterWindow.css";

type PresenterWindowProps = {
  sections: Section[];
  config: LectureConfig;
  initialSectionId?: string;
  initialViewIndex?: number;
};

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function formatElapsed(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${pad2(m)}:${pad2(s)}`;
}

/** Return all visible views in order, respecting cutAt45. */
function flattenVisibleViews(
  sections: Section[],
  config: LectureConfig,
): Array<{ section: Section; view: View; sectionIndex: number; viewIndex: number }> {
  const list: Array<{
    section: Section;
    view: View;
    sectionIndex: number;
    viewIndex: number;
  }> = [];
  sections.forEach((section, sectionIndex) => {
    const views = section.views.filter(
      (v) => !(config.variant === "m45" && v.cutAt45),
    );
    views.forEach((view, viewIndex) => {
      list.push({ section, view, sectionIndex, viewIndex });
    });
  });
  return list;
}

export default function PresenterWindow({
  sections,
  config,
  initialSectionId,
  initialViewIndex = 0,
}: PresenterWindowProps) {
  const flat = useMemo(
    () => flattenVisibleViews(sections, config),
    [sections, config],
  );

  const initialFlatIndex = useMemo(() => {
    if (!initialSectionId) return 0;
    const idx = flat.findIndex(
      (entry) =>
        entry.section.id === initialSectionId &&
        entry.viewIndex === initialViewIndex,
    );
    return idx >= 0 ? idx : 0;
  }, [flat, initialSectionId, initialViewIndex]);

  const [cursor, setCursor] = useState<number>(initialFlatIndex);

  const current = flat[cursor];
  const next = cursor + 1 < flat.length ? flat[cursor + 1] : null;

  // Elapsed timer
  const [startedAt] = useState<number>(() => Date.now());
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, []);

  const { supported, connected, broadcast } = usePresenterSync({
    onNavigate: (sectionId, viewIndex) => {
      const idx = flat.findIndex(
        (entry) =>
          entry.section.id === sectionId && entry.viewIndex === viewIndex,
      );
      if (idx >= 0) setCursor(idx);
    },
  });

  const navigateTo = useCallback(
    (nextCursor: number) => {
      if (nextCursor < 0 || nextCursor >= flat.length) return;
      setCursor(nextCursor);
      const entry = flat[nextCursor];
      broadcast(entry.section.id, entry.viewIndex);
    },
    [flat, broadcast],
  );

  const onPrev = useCallback(() => navigateTo(cursor - 1), [cursor, navigateTo]);
  const onNext = useCallback(() => navigateTo(cursor + 1), [cursor, navigateTo]);

  // Keyboard: arrows and space
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        ["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(target.tagName)
      ) {
        return;
      }
      switch (e.key) {
        case "ArrowRight":
        case " ":
        case "PageDown":
          e.preventDefault();
          onNext();
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          onPrev();
          break;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onNext, onPrev]);

  if (!current) {
    return (
      <div className="presenter-root presenter-empty">
        <p>No views configured.</p>
      </div>
    );
  }

  const minuteBudget =
    current.section.minutes[config.variant] ?? current.section.minutes.m60;

  return (
    <div data-theme="live" className="presenter-root">
      {!supported && (
        <div role="alert" className="presenter-warning">
          Cross-tab sync is unavailable in this browser. The audience tab won’t
          follow the presenter.
        </div>
      )}

      <header className="presenter-topbar">
        <div className="presenter-topbar-left">
          <span className="orr-label">Elapsed</span>
          <span className="presenter-timer">{formatElapsed(now - startedAt)}</span>
          <span className="orr-label orr-muted presenter-budget">
            Section budget · {minuteBudget} min
          </span>
        </div>
        <div className="presenter-topbar-right">
          <span
            className={
              "presenter-dot" +
              (connected ? " presenter-dot--on" : " presenter-dot--off")
            }
            aria-hidden="true"
          />
          <span className="orr-label">
            {supported
              ? connected
                ? "Audience connected"
                : "Waiting for audience"
              : "Sync unavailable"}
          </span>
        </div>
      </header>

      <main className="presenter-main">
        <section className="presenter-current" aria-label="Current view">
          <p className="orr-label orr-muted">
            {current.section.number} · {current.section.navLabel}
            {" · "}View {current.viewIndex + 1} of{" "}
            {flat.filter((e) => e.section.id === current.section.id).length}
          </p>
          <h1 className="presenter-headline">{current.view.headline}</h1>
          {current.view.body && (
            <p className="presenter-body">{current.view.body}</p>
          )}
          {current.view.presenterNote && (
            <aside
              className="presenter-notes"
              aria-label="Presenter notes"
            >
              <p className="orr-label orr-muted" style={{ margin: 0 }}>
                Notes
              </p>
              <p className="presenter-notes-text">{current.view.presenterNote}</p>
            </aside>
          )}
        </section>

        <aside className="presenter-next" aria-label="Next view">
          <p className="orr-label orr-muted" style={{ margin: 0 }}>
            Up next
          </p>
          {next ? (
            <>
              <p className="orr-label">
                {next.section.number} · {next.section.navLabel}
              </p>
              <p className="presenter-next-headline">{next.view.headline}</p>
              {next.view.body && (
                <p className="presenter-next-body">{next.view.body}</p>
              )}
            </>
          ) : (
            <p className="presenter-next-headline">End of lecture</p>
          )}
        </aside>
      </main>

      <footer className="presenter-footer">
        <div className="presenter-controls">
          <button
            type="button"
            className="orr-btn"
            onClick={onPrev}
            disabled={cursor <= 0}
          >
            ← Previous
          </button>
          <button
            type="button"
            className="orr-btn orr-btn--primary"
            onClick={onNext}
            disabled={cursor >= flat.length - 1}
          >
            Next →
          </button>
        </div>

        <nav aria-label="Sections" className="presenter-section-nav">
          {sections.map((s) => {
            const isCurrent = s.id === current.section.id;
            return (
              <button
                key={s.id}
                type="button"
                className={
                  "presenter-section-dot" +
                  (isCurrent ? " presenter-section-dot--current" : "")
                }
                aria-label={`${s.number} ${s.navLabel}`}
                onClick={() => {
                  const idx = flat.findIndex((e) => e.section.id === s.id);
                  if (idx >= 0) navigateTo(idx);
                }}
              >
                <span className="orr-label">{s.number}</span>
              </button>
            );
          })}
        </nav>
      </footer>
    </div>
  );
}
