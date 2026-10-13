import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import type { LectureConfig, Section, View } from "../types";
import { sections, getVisibleViews } from "../content/lecture";
import { usePresenterSync } from "../hooks/usePresenterSync";
import { useKeyboardNav } from "../hooks/useKeyboardNav";
import { SectionNav } from "./SectionNav";
import "./PresenterWindow.css";

type Props = {
  config: LectureConfig;
};

export function PresenterWindow({ config }: Props) {
  const [sectionId, setSectionId] = useState("start");
  const [viewIndex, setViewIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const startTimeRef = useRef(Date.now());

  // Elapsed timer
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRemoteNavigate = useCallback(
    (remoteSectionId: string, remoteViewIndex: number) => {
      setSectionId(remoteSectionId);
      setViewIndex(remoteViewIndex);
    },
    []
  );

  const { supported, connected, broadcast } = usePresenterSync({
    onNavigate: handleRemoteNavigate,
  });

  // Build flat list of all visible views
  const flatViews = useMemo(() => {
    const flat: { section: Section; view: View; viewIdx: number }[] = [];
    for (const s of sections) {
      const views = getVisibleViews(s, config);
      views.forEach((v, i) => flat.push({ section: s, view: v, viewIdx: i }));
    }
    return flat;
  }, [config]);

  const section = useMemo(
    () => sections.find((s) => s.id === sectionId) ?? sections[0],
    [sectionId]
  );

  const visibleViews = useMemo(
    () => getVisibleViews(section, config),
    [section, config]
  );

  const currentView = visibleViews[viewIndex] ?? visibleViews[0];

  const currentFlatIndex = flatViews.findIndex(
    (f) => f.section.id === section.id && f.viewIdx === viewIndex
  );

  const nextFlat =
    currentFlatIndex < flatViews.length - 1
      ? flatViews[currentFlatIndex + 1]
      : null;

  function navigateTo(targetSectionId: string, targetViewIndex: number) {
    setSectionId(targetSectionId);
    setViewIndex(targetViewIndex);
    broadcast(targetSectionId, targetViewIndex);
  }

  function goNext() {
    if (nextFlat) {
      navigateTo(nextFlat.section.id, nextFlat.viewIdx);
    }
  }

  function goPrev() {
    if (currentFlatIndex > 0) {
      const prev = flatViews[currentFlatIndex - 1];
      navigateTo(prev.section.id, prev.viewIdx);
    }
  }

  function handleSectionNav(targetSectionId: string) {
    navigateTo(targetSectionId, 0);
  }

  useKeyboardNav({
    onNext: goNext,
    onPrev: goPrev,
    enabled: true,
  });

  const isFirst = currentFlatIndex === 0;
  const isLast = currentFlatIndex === flatViews.length - 1;

  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  const timeStr = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="presenter">
      {/* Top bar */}
      <header className="presenter-topbar">
        <div className="presenter-time">
          <span className="presenter-time-label">Elapsed</span>
          <span className="presenter-time-value">{timeStr}</span>
        </div>
        <div className="presenter-progress">
          {currentFlatIndex + 1} / {flatViews.length}
        </div>
        <div
          className={`presenter-connection ${connected ? "presenter-connection--on" : ""}`}
        >
          <span className="presenter-connection-dot" />
          {!supported
            ? "BroadcastChannel not available"
            : connected
              ? "Connected to audience tab"
              : "Not connected"}
        </div>
      </header>

      {/* Main content */}
      <div className="presenter-main">
        {/* Current view */}
        <div className="presenter-current">
          <div className="presenter-section-label">
            {section.number} {section.navLabel}
          </div>
          <h1 className="presenter-headline">{currentView.headline}</h1>
          {currentView.body && (
            <p className="presenter-body">{currentView.body}</p>
          )}
          {currentView.interaction && (
            <p className="presenter-interaction-tag">
              Interactive: {currentView.interaction}
            </p>
          )}

          {/* Presenter notes */}
          {currentView.presenterNote && (
            <div className="presenter-notes">
              <div className="presenter-notes-label">Notes</div>
              <p className="presenter-notes-text">
                {currentView.presenterNote}
              </p>
            </div>
          )}
        </div>

        {/* Next preview */}
        <aside className="presenter-next">
          <div className="presenter-next-label">Next</div>
          {nextFlat ? (
            <>
              <div className="presenter-next-section">
                {nextFlat.section.number} {nextFlat.section.navLabel}
              </div>
              <div className="presenter-next-headline">
                {nextFlat.view.headline}
              </div>
              {nextFlat.view.body && (
                <div className="presenter-next-body">{nextFlat.view.body}</div>
              )}
            </>
          ) : (
            <div className="presenter-next-headline">End of lecture</div>
          )}
        </aside>
      </div>

      {/* Navigation */}
      <footer className="presenter-footer">
        <button
          className="presenter-nav-btn"
          onClick={goPrev}
          disabled={isFirst}
          aria-label="Previous view"
        >
          Previous
        </button>

        <SectionNav
          currentSectionId={section.id}
          onNavigate={handleSectionNav}
        />

        <button
          className="presenter-nav-btn"
          onClick={goNext}
          disabled={isLast}
          aria-label="Next view"
        >
          Next
        </button>
      </footer>
    </div>
  );
}
