import { useCallback, useEffect, useState } from "react";
import type { LectureConfig } from "../types";
import { sections, getSection, getVisibleViews } from "../content/lecture";
import { useHashRouter } from "../hooks/useHashRouter";
import { useKeyboardNav } from "../hooks/useKeyboardNav";
import { LiveStage } from "./LiveStage";
import { Placeholder } from "./Placeholder";
import WorkshopPage from "./WorkshopPage";
import ExplorePage from "./ExplorePage";
import PresenterWindow from "./PresenterWindow";
import "./AppShell.css";

type Props = {
  config: LectureConfig;
};

/**
 * AppShell — the top-level router.
 *
 * Hashes:
 *   #/                     → equivalent to #/live/start/0 (title)
 *   #/live/:section/:idx   → Live stage
 *   #/explore/:section     → Explore page (Agent 6 slot)
 *   #/workshop             → Workshop page (Agent 3 slot)
 *   #/presenter            → Presenter window (Agent 6 slot)
 */
export function AppShell({ config }: Props) {
  const { route, setRoute, navigateToSection } = useHashRouter(config);
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  // Which top-level route are we on?
  const isPresenter = hash.startsWith("#/presenter");
  const isWorkshop = hash.startsWith("#/workshop");
  const isExplore = hash.startsWith("#/explore");

  // Resolve the current Live view (used by LiveStage AND keyboard nav).
  const section = getSection(route.sectionId) ?? sections[0];
  const visibleViews = getVisibleViews(section, config);
  const viewIndex = Math.min(
    Math.max(route.viewIndex, 0),
    Math.max(0, visibleViews.length - 1),
  );
  const view = visibleViews[viewIndex];

  // Navigation helpers for Live mode.
  const goNext = useCallback(() => {
    if (!view) return;
    if (viewIndex < visibleViews.length - 1) {
      setRoute({ mode: "live", sectionId: section.id, viewIndex: viewIndex + 1 });
      return;
    }
    // End of section → go to next section's first view.
    const i = sections.findIndex((s) => s.id === section.id);
    if (i >= 0 && i < sections.length - 1) {
      setRoute({
        mode: "live",
        sectionId: sections[i + 1].id,
        viewIndex: 0,
      });
    }
  }, [view, viewIndex, visibleViews.length, section.id, setRoute]);

  const goPrev = useCallback(() => {
    if (viewIndex > 0) {
      setRoute({ mode: "live", sectionId: section.id, viewIndex: viewIndex - 1 });
      return;
    }
    const i = sections.findIndex((s) => s.id === section.id);
    if (i > 0) {
      const prev = sections[i - 1];
      const prevVisible = getVisibleViews(prev, config);
      setRoute({
        mode: "live",
        sectionId: prev.id,
        viewIndex: Math.max(0, prevVisible.length - 1),
      });
    }
  }, [viewIndex, section.id, config, setRoute]);

  const openPresenter = useCallback(() => {
    // Open as a new tab/window. BroadcastChannel sync is handled by the
    // PresenterWindow (future agent).
    window.open(`${window.location.pathname}#/presenter`, "baw-presenter");
  }, []);

  // Keyboard navigation (Live mode only).
  useKeyboardNav({
    enabled: !isPresenter && !isWorkshop && !isExplore,
    onNext: goNext,
    onPrev: goPrev,
    onPresenter: openPresenter,
  });

  // Extra keys the shared hook doesn't cover: Home / End / PageUp / PageDown / F / E
  useEffect(() => {
    if (isPresenter || isWorkshop || isExplore) return;
    function onKey(e: KeyboardEvent) {
      // Reuse the hook's keyboard-safety heuristic by checking the active element.
      const ae = document.activeElement as HTMLElement | null;
      if (ae) {
        const tag = ae.tagName;
        if (
          tag === "INPUT" ||
          tag === "TEXTAREA" ||
          tag === "SELECT" ||
          tag === "BUTTON" ||
          ae.isContentEditable ||
          ae.getAttribute("role") === "textbox"
        ) {
          // Buttons: still allow arrow keys for nav? No — the handoff says ignore
          // every nav key while focus is on an interactive element. Return.
          return;
        }
      }
      switch (e.key) {
        case "PageDown":
          e.preventDefault();
          goNext();
          break;
        case "PageUp":
          e.preventDefault();
          goPrev();
          break;
        case "Home":
          e.preventDefault();
          setRoute({ mode: "live", sectionId: "start", viewIndex: 0 });
          break;
        case "End":
          e.preventDefault();
          setRoute({ mode: "live", sectionId: "qa", viewIndex: 0 });
          break;
        case "f":
        case "F":
          e.preventDefault();
          if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
          } else {
            document.documentElement.requestFullscreen().catch(() => {});
          }
          break;
        case "e":
        case "E":
          e.preventDefault();
          window.location.hash = `#/explore/${section.id}`;
          break;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, setRoute, section.id, isPresenter, isWorkshop, isExplore]);

  // --- Render -----------------------------------------------------------------

  if (isPresenter) {
    return (
      <PresenterWindow
        sections={sections}
        config={config}
        initialSectionId={route.sectionId}
        initialViewIndex={route.viewIndex}
      />
    );
  }

  if (isWorkshop) {
    return <WorkshopPage />;
  }

  if (isExplore) {
    return (
      <ExplorePage
        sections={sections}
        currentSectionId={route.sectionId}
        config={config}
        onNavigateSection={(id) => {
          window.location.hash = `#/explore/${id}`;
          navigateToSection(id);
        }}
        onSwitchToLive={() => {
          setRoute({ mode: "live", sectionId: route.sectionId, viewIndex: 0 });
        }}
      />
    );
  }

  if (!view) {
    // Should never happen (route parser clamps indices), but render a graceful
    // fallback just in case.
    return (
      <div className="app-shell" data-theme="live">
        <Placeholder label="No view at this route — check lecture.ts" />
      </div>
    );
  }

  return (
    <LiveStage
      section={section}
      view={view}
      viewIndex={viewIndex}
      totalVisibleViews={visibleViews.length}
      onNext={goNext}
      onPrev={goPrev}
      onJumpToSection={navigateToSection}
      config={config}
    />
  );
}
