import { useState, useEffect, useCallback } from "react";
import type { AppMode, RouteState } from "../types";
import { sections, getVisibleViews } from "../content/lecture";
import type { LectureConfig } from "../types";

const DEFAULT_ROUTE: RouteState = {
  mode: "live",
  sectionId: "start",
  viewIndex: 0,
};

function parseHash(hash: string, config: LectureConfig): RouteState {
  const clean = hash.replace(/^#\/?/, "");
  const parts = clean.split("/").filter(Boolean);

  if (parts.length === 0) return DEFAULT_ROUTE;

  // #/workshop → explore mode, workshop section
  if (parts[0] === "workshop") {
    return { mode: "explore", sectionId: "workshop", viewIndex: 0 };
  }

  // #/presenter → handled separately
  if (parts[0] === "presenter") {
    return { mode: "live", sectionId: "start", viewIndex: 0 };
  }

  const mode = parts[0] as AppMode;
  if (mode !== "live" && mode !== "explore") {
    return DEFAULT_ROUTE;
  }

  const sectionId = parts[1] || "start";
  const section = sections.find((s) => s.id === sectionId);
  if (!section) {
    // Find nearest valid section
    const nearest = sections.find((s) =>
      s.id.startsWith(sectionId.slice(0, 3))
    );
    return {
      mode,
      sectionId: nearest?.id || "start",
      viewIndex: 0,
    };
  }

  let viewIndex = parts[2] ? parseInt(parts[2], 10) : 0;
  if (mode === "live") {
    const visibleViews = getVisibleViews(section, config);
    if (isNaN(viewIndex) || viewIndex < 0 || viewIndex >= visibleViews.length) {
      viewIndex = 0;
    }
  }

  return { mode, sectionId, viewIndex };
}

function buildHash(route: RouteState): string {
  if (route.mode === "live") {
    return `#/live/${route.sectionId}/${route.viewIndex}`;
  }
  return `#/explore/${route.sectionId}`;
}

export function useHashRouter(config: LectureConfig) {
  const [route, setRouteState] = useState<RouteState>(() =>
    parseHash(window.location.hash, config)
  );

  useEffect(() => {
    function onHashChange() {
      setRouteState(parseHash(window.location.hash, config));
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [config]);

  const setRoute = useCallback(
    (next: RouteState) => {
      const hash = buildHash(next);
      if (window.location.hash !== hash) {
        window.location.hash = hash;
      }
      setRouteState(next);
    },
    []
  );

  const navigateToSection = useCallback(
    (sectionId: string) => {
      setRoute({ ...route, sectionId, viewIndex: 0 });
    },
    [route, setRoute]
  );

  const setMode = useCallback(
    (mode: AppMode) => {
      setRoute({ ...route, mode, viewIndex: 0 });
    },
    [route, setRoute]
  );

  return { route, setRoute, navigateToSection, setMode };
}
