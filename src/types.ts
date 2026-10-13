export type CircleId = "product" | "experience" | "world";

export type View = {
  id: string;
  headline: string;
  body?: string;
  focus?: CircleId | "all" | "axis" | null;
  interaction?: "touchpoints" | "circleExplorer" | "beforeAfter"
    | "exampleCards" | "contradiction" | "workshop" | "siteReadBack";
  keyLine?: boolean;
  presenterNote?: string;
  placeholder?: string;
  fallback?: string;
  cutAt45?: boolean;
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
