import type { Cutout, LectureConfig, Section, View } from "../types";

export const defaultConfig: LectureConfig = {
  variant: "m60",
  notionApproved: false,
  studentsOnDevices: true,
  publicUrl: "",
};

// Shared cutout definitions, keyed by filename stem.
const CUTS: Record<string, Cutout> = {
  jupiter: {
    src: "/cutouts/jupiter.png",
    alt: "Engraved Jupiter with three of its moons",
    fig: "Fig. 01 · Jupiter",
    meaning: "A world with its own moons",
  },
  telescope: {
    src: "/cutouts/telescope.png",
    alt: "Engraved brass telescope on a tripod",
    fig: "Fig. 02 · Telescope",
    meaning: "Your product, seen from outside",
  },
  telescopeShare: {
    src: "/cutouts/telescope.png",
    alt: "Engraved brass telescope on a tripod",
    fig: "Fig. 08 · Telescope",
    meaning: "Seen from outside, by someone else",
  },
  nautilus: {
    src: "/cutouts/nautilus.png",
    alt: "Engraved chambered nautilus shell",
    fig: "Fig. 03 · Nautilus",
    meaning: "Growth in proportion",
  },
  appleHalf: {
    src: "/cutouts/apple-half.png",
    alt: "Engraved apple cut in half, showing its core and seeds",
    fig: "Fig. 04 · Apple, halved",
    meaning: "The core, cut open",
  },
  stagBeetle: {
    src: "/cutouts/stag-beetle.png",
    alt: "Engraved stag beetle seen from above",
    fig: "Fig. 04 · Stag beetle",
    meaning: "The product, examined",
  },
  hawkMoth: {
    src: "/cutouts/hawk-moth.png",
    alt: "Engraved hawk moth with open wings",
    fig: "Fig. 05 · Hawk moth",
    meaning: "Drawn to the light, not told to come",
  },
  constellation: {
    src: "/cutouts/constellation.png",
    alt: "Engraved constellation: stars joined by lines on a black field",
    fig: "Fig. 06 · Constellation",
    meaning: "A shape people agree to see",
  },
  raven: {
    src: "/cutouts/raven.png",
    alt: "Engraved raven in flight, wings spread",
    fig: "Fig. 06 · Raven",
    meaning: "The regular who keeps coming back",
  },
  quartz: {
    src: "/cutouts/quartz-cluster.png",
    alt: "Engraved cluster of quartz crystals",
    fig: "Fig. 06.3 · Quartz cluster",
    meaning: "Many small parts, one thing",
  },
  wingedKey: {
    src: "/cutouts/winged-key.png",
    alt: "Engraved key with wings on its bow",
    fig: "Fig. 06 · Winged key",
    meaning: "The invitation",
  },
  alembic: {
    src: "/cutouts/alembic.png",
    alt: "Engraved alembic, a still with a coiled copper tube",
    fig: "Fig. 07 · Alembic",
    meaning: "A rough version, refined",
  },
  anchor: {
    src: "/cutouts/anchor.png",
    alt: "Engraved ship's anchor wrapped in rope",
    fig: "Fig. 07 · Anchor",
    meaning: "The core that holds",
  },
  ouroboros: {
    src: "/cutouts/ouroboros.png",
    alt: "Engraved serpent curled into a ring, biting its own tail",
    fig: "Fig. 09 · Ouroboros",
    meaning: "A ring that feeds itself",
  },
  fern: {
    src: "/cutouts/fern.png",
    alt: "Engraved fern frond, its leaves repeating the shape of the whole",
    fig: "Fig. 09 · Fern",
    meaning: "A pattern that keeps growing",
  },
};

// -----------------------------------------------------------------------------
// Section 01 — Start
// -----------------------------------------------------------------------------

const start: Section = {
  id: "start",
  number: "01",
  navLabel: "Start",
  reading:
    "A lecture by Nancy Chen on how products become experiences, and experiences become worlds.",
  minutes: { m45: 2, m60: 3, m75: 3 },
  views: [
    {
      id: "start-title",
      mockup: "Main",
      meta: "01 / 09 · Start",
      plate: "A lecture by Nancy Chen",
      headline: "Build a world, not just a product",
      body: "How products become experiences, and experiences become worlds",
      cutout: CUTS.jupiter,
      markState: 0,
    },
    {
      id: "start-about",
      mockup: "About",
      meta: "01 / 09 · Start · Your guide",
      plate: "Draft bio — confirm before class",
      headline: 'No "product," "design" or "engineering" in my title.',
      body:
        "I build products anyway: dashboards, backends, tools vibe-coded into Notion. Before that, six businesses across food, wine, e-commerce and music.",
      placeholder: "Headshot (optional)",
      markState: 0,
    },
    {
      id: "start-follow-along",
      mockup: "FollowAlong",
      meta: "01 / 09 · Start · Follow along",
      plate: "Show only if students are on their own devices",
      headline: "Open this on your laptop or phone.",
      body: "Nothing to sign up for. Your answers stay on your device.",
      placeholder: "QR code, generated at build from the public URL",
      markState: 0,
    },
  ],
};

// -----------------------------------------------------------------------------
// Section 02 — What is a product?
// -----------------------------------------------------------------------------

const whatIsAProduct: Section = {
  id: "what-is-a-product",
  number: "02",
  navLabel: "What is a product?",
  reading: "The screen is the smallest part of it.",
  minutes: { m45: 4, m60: 6, m75: 7 },
  views: [
    {
      id: "wiap-prompt",
      mockup: "WhatIsProduct",
      meta: "02 / 09 · What is a product?",
      plate: "Plate 02 · no rings yet",
      reading: "The screen is the smallest part of it.",
      headline: "Where does the product begin, and where does it end?",
      body: "Pick one. Call out where it stops. There's no wrong answer.",
      markState: 0,
    },
    {
      id: "wiap-touchpoints-orbit",
      mockup: "Touchpoints",
      meta: "02 / 09 · What is a product? · Touchpoints",
      headline: "Count the touchpoints.",
      interaction: "touchpoints",
      start: "orbit",
      cutout: CUTS.telescope,
      markState: 0,
    },
    {
      id: "wiap-touchpoints-mapped",
      mockup: "Touchpoints",
      meta: "02 / 09 · What is a product? · Touchpoints",
      headline: "See the bigger picture.",
      interaction: "touchpoints",
      start: "mapped",
      cutout: CUTS.telescope,
      markState: 0,
      cutAt45: true,
    },
    {
      id: "wiap-key-line",
      mockup: "KeyLine02",
      meta: "02 / 09 · What is a product?",
      plate: "Plate 02 · No rings yet",
      headline:
        "The interface is where the product appears. The experience is what the product actually is.",
      cutout: CUTS.telescope,
      keyLineSection: "02",
      keyLine: true,
      markState: 0,
    },
  ],
};

// -----------------------------------------------------------------------------
// Section 03 — The three circles
// -----------------------------------------------------------------------------

const circles: Section = {
  id: "circles",
  number: "03",
  navLabel: "The three circles",
  reading: "Everything you make has an orbit.",
  minutes: { m45: 4, m60: 5, m75: 6 },
  views: [
    {
      id: "circles-product",
      mockup: "Circles1",
      meta: "03 / 09 · The three circles · Product",
      plate: "Plate 03 · r = 1",
      headline: "Start with the Product ring.",
      interaction: "circleExplorer",
      start: "product",
      cutout: CUTS.nautilus,
      markState: 1,
    },
    {
      id: "circles-experience",
      mockup: "CircleExplorer",
      meta: "03 / 09 · The three circles · + Experience",
      plate: "Plate 03 · r = 1 : 2",
      headline: "Add the Experience ring.",
      interaction: "circleExplorer",
      start: "experience",
      cutout: CUTS.nautilus,
      markState: 1,
    },
    {
      id: "circles-world",
      mockup: "Circles3",
      meta: "03 / 09 · The three circles · + World",
      plate: "Plate 03 · r = 1 : 2 : 3",
      headline: "Add the World ring.",
      interaction: "circleExplorer",
      start: "world",
      cutout: CUTS.nautilus,
      markState: 1,
    },
    {
      id: "circles-sketch",
      mockup: "Sketch",
      meta: "03 / 09 · The three circles",
      plate: "Plate 03 · r = 1 : 2 : 3",
      reading: "Everything you make has an orbit.",
      headline:
        "Think of a product you used today. Name one thing in each ring.",
      body:
        "The product sits inside the experience. The experience sits inside the world.",
      markState: 1,
    },
  ],
};

// -----------------------------------------------------------------------------
// Section 04 — Product
// -----------------------------------------------------------------------------

const product: Section = {
  id: "product",
  number: "04",
  navLabel: "Product",
  reading: "Be useful first. Charm comes later.",
  minutes: { m45: 5, m60: 7, m75: 8 },
  views: [
    {
      id: "product-core-job",
      mockup: "CoreJob",
      meta: "04 / 09 · Product · Core",
      plate: "Plate 04 · r = 1 · core",
      reading: "Be useful first. Charm comes later.",
      headline: "Before a product means something, it has to do something.",
      body:
        "At the coffee shop, the product is a good cup, reliably. A beautiful room can't save a bad cup.",
      cutout: CUTS.appleHalf,
      markState: 1,
    },
    {
      id: "product-one-task",
      mockup: "OneTask",
      meta: "04 / 09 · Product · Core",
      plate: "Plate 04 · one task",
      headline: "Organizing a class project.",
      body: "That's the job. Every feature either serves it or waits.",
      placeholder: "Approved Notion screenshot replaces this",
      markState: 1,
      cutAt45: true,
    },
    {
      id: "product-prompt",
      mockup: "Prompt",
      meta: "04 / 09 · Product · Core",
      plate: "Plate 04 · r = 1 · your turn",
      headline: "For ___, this product makes it possible to ___.",
      body: "No feature lists. No buzzwords.",
      spokenPromptSection: "04",
      markState: 1,
      cutAt45: true,
    },
    {
      id: "product-key-line",
      mockup: "KeyLine04",
      meta: "04 / 09 · Product · Core",
      plate: "Plate 04 · r = 1",
      headline: "A world needs a reason to enter. Start with something useful.",
      cutout: CUTS.stagBeetle,
      keyLineSection: "04",
      keyLine: true,
      markState: 1,
    },
  ],
};

// -----------------------------------------------------------------------------
// Section 05 — Experience
// -----------------------------------------------------------------------------

const experience: Section = {
  id: "experience",
  number: "05",
  navLabel: "Experience",
  reading: "People will forget the features. They'll remember whether it trusted them.",
  minutes: { m45: 6, m60: 9, m75: 11 },
  views: [
    {
      id: "exp-before-after",
      mockup: "BeforeAfter",
      meta: "05 / 09 · Experience · Near orbit",
      plate: "Plate 05 · r = 2 · four levers",
      headline: "Same coffee, two shops.",
      body:
        "Four levers decide the feeling: pacing, labels, defaults, repair.",
      interaction: "beforeAfter",
      start: "B",
      markState: 2,
    },
    {
      id: "exp-three-moments",
      mockup: "ThreeMoments",
      meta: "05 / 09 · Experience · Near orbit",
      plate: "Plate 05 · r = 2 · three moments",
      reading:
        "People will forget the features. They'll remember whether it trusted them.",
      headline: "Three moments decide how it feels.",
      markState: 2,
    },
    {
      id: "exp-blank-vs-template",
      mockup: "BlankVsTemplate",
      meta: "05 / 09 · Experience · Near orbit",
      plate: "Plate 05 · r = 2 · guidance",
      headline: "Same tool. Different feeling.",
      body:
        "Guidance, labels and defaults change the feeling. The tool underneath stays the same.",
      placeholder: "Approved Notion screenshots replace both panels",
      markState: 2,
      cutAt45: true,
    },
    {
      id: "exp-prompt",
      mockup: "Prompt05",
      meta: "05 / 09 · Experience · Near orbit",
      plate: "Plate 05 · r = 2 · your turn",
      headline:
        "We want this moment to feel ___, so we will ___.",
      body: "Pick one moment. Name one feeling, then one choice that creates it.",
      spokenPromptSection: "05",
      markState: 2,
    },
    {
      id: "exp-key-line",
      mockup: "KeyLine05",
      meta: "05 / 09 · Experience · Near orbit",
      plate: "Plate 05 · r = 2",
      headline:
        "'Welcoming' is not a visual style. It is something the experience must prove.",
      cutout: CUTS.hawkMoth,
      keyLineSection: "05",
      keyLine: true,
      markState: 2,
    },
  ],
};

// -----------------------------------------------------------------------------
// Section 06 — World
// -----------------------------------------------------------------------------

const world: Section = {
  id: "world",
  number: "06",
  navLabel: "World",
  reading: "The best parts of a world are the ones you didn't make.",
  minutes: { m45: 5, m60: 8, m75: 10 },
  views: [
    {
      id: "world-our-place",
      mockup: "OurPlace",
      meta: "06 / 09 · World · Far orbit",
      plate: "Plate 06 · r = 3 · far orbit",
      reading: "The best parts of a world are the ones you didn't make.",
      headline: 'Then it becomes "our place."',
      body:
        "Regulars recognize one another. A local artist hosts a gathering. The shop sets the conditions. People make the world.",
      cutout: CUTS.constellation,
      markState: 3,
    },
    {
      id: "world-examples",
      mockup: "ExampleCards",
      meta: "06 / 09 · World · Far orbit",
      plate: "Plate 06 · r = 3 · field notes",
      headline: "Look for what people made.",
      body: "Three kinds of world-building: identity, ritual, language.",
      cutout: CUTS.raven,
      interaction: "exampleCards",
      placeholder: "Three community examples (none invented)",
      markState: 3,
    },
    {
      id: "world-distinction",
      mockup: "Distinction",
      meta: "06 / 09 · World · Far orbit",
      plate: "Plate 06 · r = 3 · coherence, not loyalty",
      headline: "Not every useful product needs a fandom.",
      body:
        "World-building means a coherent context people can join. Not manufactured loyalty.",
      cutout: CUTS.quartz,
      markState: 3,
      cutAt45: true,
    },
    {
      id: "world-key-line",
      mockup: "KeyLine",
      meta: "06 / 09 · World · Far orbit",
      plate: "Plate 06 · r = 3",
      headline: "You can design the invitation. You cannot script belonging.",
      cutout: CUTS.wingedKey,
      keyLineSection: "06",
      keyLine: true,
      markState: 3,
    },
  ],
};

// -----------------------------------------------------------------------------
// Section 07 — Connect the circles
// -----------------------------------------------------------------------------

const connect: Section = {
  id: "connect",
  number: "07",
  navLabel: "Connect the circles",
  reading: "The axis is point of view: not a fourth ring.",
  minutes: { m45: 4, m60: 6, m75: 8 },
  views: [
    {
      id: "connect-coherent",
      mockup: "PointOfView",
      meta: "07 / 09 · Connect the circles",
      plate: "Plate 07 · the axis, intact",
      headline: "Point of view runs through all three rings.",
      interaction: "contradiction",
      start: "coherent",
      markState: "axis",
    },
    {
      id: "connect-broken",
      mockup: "Contradiction",
      meta: "07 / 09 · Connect the circles",
      plate: "Plate 07 · the axis, broken",
      headline: "A contradiction breaks the axis. Pick a ring and repair it.",
      interaction: "contradiction",
      start: "broken",
      markState: "axis",
    },
    {
      id: "connect-nancys-build",
      mockup: "NancysBuild",
      meta: "07 / 09 · Connect the circles",
      plate: "Plate 07 · first version, then a real change",
      headline: "One of my builds, read through the three circles.",
      cutout: CUTS.alembic,
      placeholder: "Nancy's build story",
      fallback: "This site, and the change from the dry run.",
      markState: "axis",
      cutAt45: true,
    },
    {
      id: "connect-key-line",
      mockup: "KeyLine07",
      meta: "07 / 09 · Connect the circles",
      plate: "Plate 07 · The axis",
      headline:
        "World-building is not adding more things. It is making the things agree.",
      cutout: CUTS.anchor,
      keyLineSection: "07",
      keyLine: true,
      markState: "axis",
    },
  ],
};

// -----------------------------------------------------------------------------
// Section 08 — Build your world (Workshop)
// -----------------------------------------------------------------------------

const workshop: Section = {
  id: "workshop",
  number: "08",
  navLabel: "Build your world",
  reading: "Your turn. Be specific.",
  minutes: { m45: 10, m60: 15, m75: 18 },
  views: [
    {
      id: "workshop-brief",
      mockup: "WorkshopBrief",
      meta: "08 / 09 · Build your world · 15 min",
      plate: "Not polished screens",
      reading: "Your turn. Be specific.",
      headline: "Build your world",
      body:
        "Empower or your own project. Output: one canvas, one point of view, one next test.",
      markState: "axis",
    },
    {
      id: "workshop-live",
      mockup: "WorkshopLive",
      meta: "08 / 09 · Build your world · Canvas",
      plate: "Open the canvas at [public URL] · or take a paper one",
      headline:
        "We are building for ___, and we believe ___.",
      body: "Make a choice. 'For everyone' is not a belief.",
      interaction: "workshop",
      markState: "axis",
    },
    {
      id: "workshop-check",
      mockup: "CheckConnection",
      meta: "08 / 09 · Build your world · Check",
      plate: "Plate 08 · the axis, tested",
      headline: "Do all three circles say the same thing?",
      body: "Find one contradiction or gap. Change one choice to fix it.",
      markState: "axis",
      cutAt45: true,
    },
    {
      id: "workshop-share",
      mockup: "Share",
      meta: "08 / 09 · Build your world · Share",
      plate: "Plate 08 · one next test",
      headline: "Sixty seconds. Three circles.",
      body:
        "Walk your partner through them. They name the strongest connection, and one assumption to test with a real person.",
      cutout: CUTS.telescopeShare,
      markState: "axis",
    },
  ],
};

// -----------------------------------------------------------------------------
// Section 09 — Take it with you
// -----------------------------------------------------------------------------

const takeIt: Section = {
  id: "take-it",
  number: "09",
  navLabel: "Take it with you",
  reading: "What can I do? How does it feel? What am I part of?",
  minutes: { m45: 3, m60: 4, m75: 5 },
  views: [
    {
      id: "take-three-questions",
      mockup: "ThreeQuestions",
      meta: "09 / 09 · Take it with you",
      plate: "Plate 09 · r = 1 : 2 : 3",
      headline: "The three questions",
      body:
        "The interface still matters. It is one part of the invitation, not the whole thing.",
      markState: "axis",
    },
    {
      id: "take-readback",
      mockup: "Readback",
      meta: "09 / 09 · Take it with you",
      headline: "This site, read through its own three circles",
      cutout: CUTS.ouroboros,
      interaction: "siteReadBack",
      markState: "axis",
    },
    {
      id: "take-closing",
      mockup: "Closing",
      meta: "09 / 09 · Take it with you",
      plate: "Plate 09 · closing",
      reading: "Make one change. Watch someone use it.",
      headline:
        "Build something useful. Make the experience meaningful. Leave room for people to make it their own.",
      cutout: CUTS.fern,
      markState: "axis",
    },
    {
      id: "take-with-you",
      mockup: "TakeItWithYou",
      meta: "09 / 09 · Take it with you",
      plate: "Plate 09 · the world is what you do next",
      headline: "Keep the canvas. Use it this week.",
      placeholder: "Resources for a first prototype (none invented)",
      markState: "axis",
    },
  ],
};

// -----------------------------------------------------------------------------
// Q&A
// -----------------------------------------------------------------------------

const qa: Section = {
  id: "qa",
  number: "QA",
  navLabel: "Questions",
  reading: "The missing title. The tools. The work. Anything.",
  minutes: { m45: 6, m60: 10, m75: 12 },
  views: [
    {
      id: "qa-questions",
      mockup: "QandA",
      meta: "Q&A · 10 min",
      plate: "Build a world, not just a product",
      headline: "Questions",
      body: "The missing title. The tools. The work. Anything.",
      markState: "axis",
    },
  ],
};

// -----------------------------------------------------------------------------

export const sections: Section[] = [
  start,
  whatIsAProduct,
  circles,
  product,
  experience,
  world,
  connect,
  workshop,
  takeIt,
  qa,
];

export function getVisibleViews(
  section: Section,
  config: LectureConfig,
): View[] {
  if (config.variant !== "m45") return section.views;
  return section.views.filter((v) => !v.cutAt45);
}

export function getSection(id: string): Section | undefined {
  return sections.find((s) => s.id === id);
}

export function getView(
  sectionId: string,
  viewIndex: number,
  config: LectureConfig,
): View | undefined {
  const section = getSection(sectionId);
  if (!section) return undefined;
  const views = getVisibleViews(section, config);
  return views[viewIndex];
}
