import type { WorkshopDraft } from "../types";

export const coffeeShopExample: WorkshopDraft = {
  version: 1,
  updatedAt: new Date().toISOString(),
  starter: "own",
  projectName: "The Corner Coffee Shop",
  audience:
    "People who want good coffee but find specialty shops intimidating",
  belief: "Good coffee should feel approachable, not exclusive",
  product:
    "Get a good cup, reliably — a short, clear menu with plain-language descriptions",
  experienceMoment:
    "The ordering moment: finding your way in when you don't know the jargon",
  experienceChoice:
    "We want this moment to feel welcoming, so we will use plain language, offer a recommendation for first-timers, and never rush the order",
  world:
    "Open tastings for beginners — a monthly event where the first question is always welcome",
  connection:
    "The menu uses unexplained jargon that contradicts the belief in approachability. Cut it to six drinks, each described in one sentence.",
  nextTest:
    "Watch three first-time customers order. Do any of them ask what something means? Do any leave without ordering?",
};
