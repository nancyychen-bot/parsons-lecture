import { useState, useCallback, useEffect, useMemo } from "react";
import type { LectureConfig } from "../types";
import { sections, getVisibleViews } from "../content/lecture";
import { useHashRouter } from "../hooks/useHashRouter";
import { usePresenterSync } from "../hooks/usePresenterSync";
import { LiveStage } from "./LiveStage";
import { ExplorePage } from "./ExplorePage";
import { PresenterWindow } from "./PresenterWindow";
import "./AppShell.css";

type Props = {
  config: LectureConfig;
};

function isPresenterRoute(): boolean {
  return window.location.hash.replace(/^#\/?/, "").startsWith("presenter");
}

export function AppShell({ config }: Props) {
  const [isPresenter, setIsPresenter] = useState(isPresenterRoute);
  const { route, setRoute, setMode } = useHashRouter(config);
  const [showInlineNotes, setShowInlineNotes] = useState(false);

  // Listen for hash changes to detect presenter route
  useEffect(() => {
    function onHashChange() {
      setIsPresenter(isPresenterRoute());
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Presenter sync: audience side receives navigate messages from presenter
  const handleSyncNavigate = useCallback(
    (sectionId: string, viewIndex: number) => {
      if (!isPresenter) {
        setRoute({ mode: "live", sectionId, viewIndex });
      }
    },
    [isPresenter, setRoute]
  );

  const { supported: syncSupported, connected: syncConnected, broadcast } =
    usePresenterSync({ onNavigate: handleSyncNavigate });

  const handleLiveNavigate = useCallback(
    (sectionId: string, viewIndex: number) => {
      setRoute({ mode: "live", sectionId, viewIndex });
      broadcast(sectionId, viewIndex);
    },
    [setRoute, broadcast]
  );

  const handleSectionNav = useCallback(
    (sectionId: string) => {
      setRoute({ mode: route.mode, sectionId, viewIndex: 0 });
      broadcast(sectionId, 0);
    },
    [route.mode, setRoute, broadcast]
  );

  const handleOpenPresenter = useCallback(() => {
    window.open(
      `${window.location.pathname}#/presenter`,
      "baw-presenter",
      "width=800,height=600"
    );
  }, []);

  // N-key fallback: toggle inline notes when presenter window is unavailable
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (isPresenter) return;
      const el = document.activeElement;
      if (
        el &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.tagName === "SELECT" ||
          (el as HTMLElement).isContentEditable)
      )
        return;

      if (e.key === "n" || e.key === "N") {
        e.preventDefault();
        setShowInlineNotes((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPresenter]);

  // Get the current presenter note for inline display
  const currentPresenterNote = useMemo(() => {
    const section = sections.find((s) => s.id === route.sectionId);
    if (!section) return undefined;
    const views = getVisibleViews(section, config);
    const view = views[route.viewIndex];
    return view?.presenterNote;
  }, [route.sectionId, route.viewIndex, config]);

  // If this is the presenter route, render PresenterWindow
  if (isPresenter) {
    return <PresenterWindow config={config} />;
  }

  return (
    <div className="app-shell" data-mode={route.mode} data-theme={route.mode}>
      <div className="mode-switcher">
        <button
          className={`mode-btn ${route.mode === "live" ? "mode-btn--active" : ""}`}
          onClick={() => setMode("live")}
          aria-pressed={route.mode === "live"}
        >
          Live
        </button>
        <button
          className={`mode-btn ${route.mode === "explore" ? "mode-btn--active" : ""}`}
          onClick={() => setMode("explore")}
          aria-pressed={route.mode === "explore"}
        >
          Explore
        </button>
      </div>

      {route.mode === "live" ? (
        <LiveStage
          sectionId={route.sectionId}
          viewIndex={route.viewIndex}
          config={config}
          onNavigate={handleLiveNavigate}
          onSectionNav={handleSectionNav}
          onOpenPresenter={handleOpenPresenter}
        />
      ) : (
        <ExplorePage
          sectionId={route.sectionId}
          config={config}
          onSectionNav={handleSectionNav}
        />
      )}

      {/* Inline presenter notes (N-key fallback) */}
      {showInlineNotes && route.mode === "live" && (
        <div className="inline-notes" role="status">
          <div className="inline-notes-warning">
            Notes are visible on screen
          </div>
          {!syncSupported && (
            <div className="inline-notes-sync-status">
              BroadcastChannel unavailable -- use P to open presenter window
            </div>
          )}
          {syncSupported && !syncConnected && (
            <div className="inline-notes-sync-status">
              No presenter window connected -- use P to open one
            </div>
          )}
          {currentPresenterNote ? (
            <p className="inline-notes-text">{currentPresenterNote}</p>
          ) : (
            <p className="inline-notes-empty">No notes for this view.</p>
          )}
          <div className="inline-notes-hint">Press N to hide</div>
        </div>
      )}
    </div>
  );
}
