import type { ComponentType } from "react";
import type { View, LectureConfig } from "../../types";

import { TitleView } from "./TitleView";
import { AboutView } from "./AboutView";
import { FollowAlongView } from "./FollowAlongView";
import { WhatIsProductView } from "./WhatIsProductView";
import { SketchView } from "./SketchView";
import { CoreJobView } from "./CoreJobView";
import { OneTaskView } from "./OneTaskView";
import { ThreeMomentsView } from "./ThreeMomentsView";
import { BlankVsTemplateView } from "./BlankVsTemplateView";
import { OurPlaceView } from "./OurPlaceView";
import { DistinctionView } from "./DistinctionView";
import { NancysBuildView } from "./NancysBuildView";
import { WorkshopBriefView } from "./WorkshopBriefView";
import { WorkshopLiveView } from "./WorkshopLiveView";
import { CheckConnectionView } from "./CheckConnectionView";
import { ShareView } from "./ShareView";
import { ThreeQuestionsView } from "./ThreeQuestionsView";
import { ReadbackView } from "./ReadbackView";
import { ClosingView } from "./ClosingView";
import { TakeItWithYouView } from "./TakeItWithYouView";
import { QandAView } from "./QandAView";

export type ViewComponentProps = { view: View; config: LectureConfig };
export type ViewComponent = ComponentType<ViewComponentProps>;

/**
 * Dispatcher for static views in `#/live/...` mode.
 * Keys match View.id in src/content/lecture.ts. Interactive, keyLine and
 * spokenPrompt views are handled by LiveStage directly (checks those flags
 * first), so they are intentionally absent from this map.
 */
export const VIEW_COMPONENTS: Record<string, ViewComponent> = {
  // 01 Start
  "start-title": TitleView,
  "start-about": AboutView,
  "start-follow-along": FollowAlongView,

  // 02 What is a product?
  "wiap-prompt": WhatIsProductView,

  // 03 Circles
  "circles-sketch": SketchView,

  // 04 Product
  "product-core-job": CoreJobView,
  "product-one-task": OneTaskView,

  // 05 Experience
  "exp-three-moments": ThreeMomentsView,
  "exp-blank-vs-template": BlankVsTemplateView,

  // 06 World
  "world-our-place": OurPlaceView,
  "world-distinction": DistinctionView,

  // 07 Connect
  "connect-nancys-build": NancysBuildView,

  // 08 Workshop
  "workshop-brief": WorkshopBriefView,
  "workshop-live": WorkshopLiveView,
  "workshop-check": CheckConnectionView,
  "workshop-share": ShareView,

  // 09 Take it with you
  "take-three-questions": ThreeQuestionsView,
  "take-readback": ReadbackView,
  "take-closing": ClosingView,
  "take-with-you": TakeItWithYouView,

  // Q&A
  "qa-questions": QandAView,
};

/**
 * Returns the dedicated view component for a plain static view, or
 * undefined if the view should be routed through LiveStage's own
 * dispatcher (KeyLine, SpokenPrompt, or an interaction).
 */
export function getViewComponent(view: View): ViewComponent | undefined {
  if (view.keyLineSection) return undefined;
  if (view.spokenPromptSection) return undefined;
  if (view.interaction) return undefined;
  return VIEW_COMPONENTS[view.id];
}

export {
  TitleView,
  AboutView,
  FollowAlongView,
  WhatIsProductView,
  SketchView,
  CoreJobView,
  OneTaskView,
  ThreeMomentsView,
  BlankVsTemplateView,
  OurPlaceView,
  DistinctionView,
  NancysBuildView,
  WorkshopBriefView,
  WorkshopLiveView,
  CheckConnectionView,
  ShareView,
  ThreeQuestionsView,
  ReadbackView,
  ClosingView,
  TakeItWithYouView,
  QandAView,
};
