export type CircleId = "product" | "experience" | "world";
export type MarkState = 0 | 1 | 2 | 3 | "axis";

export type Cutout = {
  src: string;
  alt: string;
  fig: string;
  meaning: string;
};

export type Interaction =
  | "touchpoints"
  | "circleExplorer"
  | "beforeAfter"
  | "exampleCards"
  | "contradiction"
  | "workshop"
  | "siteReadBack";

export type View = {
  id: string;
  mockup: string;
  headline: string;
  body?: string;
  reading?: string;
  interaction?: Interaction;
  start?: string;
  keyLineSection?: "02" | "04" | "05" | "06" | "07";
  spokenPromptSection?: "04" | "05" | "06" | "07";
  cutout?: Cutout;
  plate?: string;
  meta: string;
  markState: MarkState;
  cutAt45?: boolean;
  placeholder?: string;
  fallback?: string;
  presenterNote?: string;
  focus?: CircleId | "all" | "axis" | null;
  keyLine?: boolean;
};

export type Section = {
  id: string;
  number: string;
  navLabel: string;
  reading: string;
  minutes: { m45: number; m60: number; m75: number };
  views: View[];
  explore?: { body: string; extras?: string[] };
};

export type LectureConfig = {
  variant: "m45" | "m60" | "m75";
  notionApproved: boolean;
  studentsOnDevices: boolean;
  publicUrl: string;
};

export type AppMode = "live" | "explore";

export type RouteState = {
  mode: AppMode;
  sectionId: string;
  viewIndex: number;
};

export type WorkshopDraft = {
  version: 1;
  updatedAt: string;
  starter: "empower" | "own";
  projectName: string;
  audience: string;
  belief: string;
  product: string;
  experienceMoment: string;
  experienceChoice: string;
  world: string;
  connection: string;
  nextTest: string;
};
