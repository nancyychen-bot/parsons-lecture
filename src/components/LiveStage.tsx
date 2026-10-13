import { useLayoutEffect, useRef, useEffect } from "react";
import type { View, LectureConfig, Section } from "../types";
import { CircleMark } from "./CircleMark";
import { SectionNav } from "./SectionNav";
import { Cutout } from "./Cutout";
import { Placeholder } from "./Placeholder";
import { KeyLine } from "./KeyLine";
import { SpokenPrompt } from "./SpokenPrompt";
import { TouchpointSelect } from "./TouchpointSelect";
import { CircleExplorer } from "./CircleExplorer";
import { BeforeAfter } from "./BeforeAfter";
import { ExampleCards } from "./ExampleCards";
import { ContradictionRepair } from "./ContradictionRepair";
import { getViewComponent, VIEW_COMPONENTS } from "./views";
import "./LiveStage.css";

/* ----------------------------------------------------------------------------
 * ViewRenderer — the dispatcher.
 *
 * Decides which component to render for a given View. Interactive components
 * are expected to exist as named imports above. If one does not exist yet, we
 * fall back to a labeled Placeholder so other agents can see where to plug in.
 * ----------------------------------------------------------------------------
 */
function ViewRenderer({ view, config }: { view: View; config: LectureConfig }) {
  // 1. KeyLine wrapper views
  if (view.keyLineSection) {
    return <KeyLine section={view.keyLineSection} />;
  }

  // 2. Spoken prompt wrapper views
  if (view.spokenPromptSection) {
    return <SpokenPrompt section={view.spokenPromptSection} />;
  }

  // 3. Interactions — each has a slot. Fallback to Placeholder with the slot
  //    name if the real component is not available yet.
  if (view.interaction === "touchpoints") {
    return <TouchpointSelect start={(view.start as "orbit" | "mapped") ?? "orbit"} />;
  }
  if (view.interaction === "circleExplorer") {
    return (
      <CircleExplorer
        start={(view.start as "product" | "experience" | "world") ?? "product"}
      />
    );
  }
  if (view.interaction === "beforeAfter") {
    return <BeforeAfter start={(view.start as "A" | "B") ?? "B"} />;
  }
  if (view.interaction === "exampleCards") {
    return <ExampleCards variant={config.variant} />;
  }
  if (view.interaction === "contradiction") {
    return (
      <ContradictionRepair
        start={(view.start as "coherent" | "broken") ?? "coherent"}
      />
    );
  }
  if (view.interaction === "workshop") {
    // Projected view of the workshop canvas during Live mode — show the
    // dedicated static view (WorkshopLive) that mirrors the field prompts.
    const Dedicated = VIEW_COMPONENTS[view.id];
    if (Dedicated) return <Dedicated view={view} config={config} />;
    return (
      <Placeholder label="WorkshopCanvas (projected variant)" />
    );
  }
  if (view.interaction === "siteReadBack") {
    // Site-read-back is the ReadbackView; it reads the student draft if any.
    const Dedicated = VIEW_COMPONENTS[view.id];
    if (Dedicated) return <Dedicated view={view} config={config} />;
    return <Placeholder label="SiteReadBack" />;
  }

  // 4. Dedicated static view component, if one is registered for this id.
  const Dedicated = getViewComponent(view);
  if (Dedicated) {
    return <Dedicated view={view} config={config} />;
  }

  // 5. Fallback static view: reading, headline, body, optional cutout.
  return <StaticView view={view} />;
}

function StaticView({ view }: { view: View }) {
  return (
    <div className="live-static">
      <div className="live-static__text">
        {view.reading && (
          <p className="live-static__reading">{view.reading}</p>
        )}
        <h1 className="live-static__headline" tabIndex={-1}>
          {view.headline}
        </h1>
        {view.body && <p className="live-static__body">{view.body}</p>}
        {view.placeholder && (
          <Placeholder label={view.placeholder} />
        )}
      </div>
      {view.cutout && (
        <Cutout
          src={view.cutout.src}
          alt={view.cutout.alt}
          fig={view.cutout.fig}
          meaning={view.cutout.meaning}
          variant="right"
          height={260}
          className="live-static__cutout"
        />
      )}
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * LiveStage — fixed 1280×720 letterbox + corner anatomy + ViewRenderer.
 * ----------------------------------------------------------------------------
 */

type Props = {
  section: Section;
  view: View;
  viewIndex: number;
  totalVisibleViews: number;
  onNext: () => void;
  onPrev: () => void;
  onJumpToSection: (sectionId: string) => void;
  config: LectureConfig;
};

export function LiveStage({
  section,
  view,
  viewIndex,
  totalVisibleViews,
  onNext,
  onPrev,
  onJumpToSection,
  config,
}: Props) {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const liveRegionRef = useRef<HTMLDivElement | null>(null);

  // Uniform scaling to fit the window.
  useLayoutEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    function compute() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const scale = Math.min(w / 1280, h / 720);
      el!.style.setProperty("--stage-scale", String(scale));
    }
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  // Focus the H1 (or the stage container) and announce the view change.
  useEffect(() => {
    const headline = headlineRef.current?.querySelector<HTMLElement>(
      "h1[tabindex]",
    );
    if (headline) {
      headline.focus({ preventScroll: true });
    }
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = `${section.navLabel}, view ${viewIndex + 1} of ${totalVisibleViews}`;
    }
  }, [view.id, section.navLabel, viewIndex, totalVisibleViews]);

  return (
    <div
      className="live-stage-outer"
      ref={outerRef}
      data-theme="live"
    >
      <div
        className="live-stage"
        role="region"
        aria-label={`${section.navLabel}, view ${viewIndex + 1} of ${totalVisibleViews}`}
      >
        {/* Top left: meta label */}
        <p className="live-corner live-corner--tl orr-label orr-muted">
          {view.meta}
        </p>

        {/* Top right: progress mark */}
        <div className="live-corner live-corner--tr">
          <CircleMark state={view.markState} size={64} />
        </div>

        {/* Content area */}
        <div
          className="live-stage__content"
          ref={headlineRef}
          key={view.id}
        >
          <ViewRenderer view={view} config={config} />
        </div>

        {/* Bottom left: plate */}
        {view.plate && (
          <p className="live-corner live-corner--bl orr-label orr-muted">
            {view.plate}
          </p>
        )}

        {/* Bottom right: section dots + previous/next */}
        <nav
          className="live-corner live-corner--br"
          aria-label="Sections"
        >
          <SectionNav
            currentSectionId={section.id}
            onJump={onJumpToSection}
          />
          <button
            type="button"
            className="orr-btn orr-btn--text live-nav__btn"
            onClick={onPrev}
          >
            Previous
          </button>
          <button
            type="button"
            className="orr-btn orr-btn--text live-nav__btn"
            onClick={onNext}
          >
            Next
          </button>
        </nav>

        {/* Polite live region for announcements */}
        <div
          ref={liveRegionRef}
          role="status"
          aria-live="polite"
          className="live-stage__sr-only"
        />
      </div>
    </div>
  );
}
