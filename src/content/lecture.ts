import type { Section, View, LectureConfig } from "../types";

export const defaultConfig: LectureConfig = {
  variant: "m60",
  notionApproved: false,
  studentsOnDevices: true,
  publicUrl: "",
};

export const sections: Section[] = [
  // 01 — Start
  {
    id: "start",
    number: "01",
    navLabel: "Start",
    reading: "You are building more than you think.",
    minutes: { m45: 1, m60: 2, m75: 3 },
    views: [
      {
        id: "start-title",
        headline: "Build a World, Not Just a Product",
        body: "How products become experiences, and experiences become worlds",
        focus: null,
      },
      {
        id: "start-about",
        headline: "About Nancy",
        placeholder: `Bio and optional headshot. Lead with the job title that lacks "product," "design" and "engineering," then one line on what she builds anyway.`,
        focus: null,
        presenterNote: "The missing title is the hook for 07 and Q&A. Say it here and pay it off later.",
      },
      {
        id: "start-link",
        headline: "Follow along",
        body: "Open this on your device to explore at your own pace.",
        focus: null,
        presenterNote: "Only show if students are on devices.",
      },
    ],
    explore: {
      body: "Welcome. This site accompanies a guest lecture on how products become experiences, and experiences become worlds. You can explore each section at your own pace, or jump straight to the workshop.",
    },
  },

  // 02 — What is a product?
  {
    id: "what-is-a-product",
    number: "02",
    navLabel: "What is a product?",
    reading: "The screen is the smallest part of it.",
    minutes: { m45: 3, m60: 4, m75: 5 },
    views: [
      {
        id: "product-prompt",
        headline: "What counts as the product?",
        body: "Think about a coffee shop. What is the product?",
        focus: null,
        presenterNote: "Let them answer. Most will say 'the coffee.' That's the hook.",
      },
      {
        id: "product-touchpoints",
        headline: "Every touchpoint is part of the product",
        body: "Nine things orbit the coffee cup. Which ones count?",
        focus: null,
        interaction: "touchpoints",
      },
      {
        id: "product-reveal",
        headline: "See the bigger picture",
        body: "Every touchpoint belongs to a ring — some span two.",
        focus: "all",
      },
      {
        id: "product-keyline",
        headline: "The interface is where the product appears. The experience is what the product actually is.",
        keyLine: true,
        focus: "all",
      },
    ],
    explore: {
      body: "We tend to think the product is the thing on the screen. But every touchpoint — the ordering ritual, the staff interaction, the mobile order app, the seating — is part of it. The screen is just where one slice appears.",
      extras: [
        "Try the touchpoint exercise for Notion.",
        "Try the touchpoint exercise for Empower.",
      ],
    },
  },

  // 03 — The three circles
  {
    id: "three-circles",
    number: "03",
    navLabel: "Three circles",
    reading: "Everything you make has an orbit.",
    minutes: { m45: 5, m60: 5, m75: 7 },
    views: [
      {
        id: "circles-product",
        headline: "Product: What can I do?",
        body: "The useful core. Get a good cup, reliably.",
        focus: "product",
        interaction: "circleExplorer",
      },
      {
        id: "circles-experience",
        headline: "Experience: How does it feel?",
        body: "Everything around using it. Ordering feels welcoming, not intimidating.",
        focus: "experience",
        interaction: "circleExplorer",
      },
      {
        id: "circles-world",
        headline: "World: What am I part of?",
        body: `The identity, culture and community people help create. Regulars, tastings, "our place."`,
        focus: "world",
        interaction: "circleExplorer",
      },
      {
        id: "circles-keyline",
        headline: "The product sits inside the experience. The experience sits inside the world.",
        keyLine: true,
        focus: "all",
      },
      {
        id: "circles-prompt",
        headline: "Your turn",
        body: "Think of a product you used today. Name one thing in each ring.",
        focus: "all",
        presenterNote: "Spoken prompt — turn to the person next to you, or type it in chat.",
      },
    ],
    explore: {
      body: "The single model: three concentric circles. Product is what someone can do. Experience is how it feels to do it. World is what they become part of. The product sits inside the experience. The experience sits inside the world.",
    },
  },

  // 04 — Product
  {
    id: "product",
    number: "04",
    navLabel: "Product",
    reading: "Be useful first. Charm comes later.",
    minutes: { m45: 2, m60: 4, m75: 6 },
    views: [
      {
        id: "product-core",
        headline: "The core job",
        body: "The coffee shop's core job: get a good cup, reliably. Everything else is built on top of that.",
        focus: "product",
      },
      {
        id: "product-notion",
        headline: "A task, not a feature list",
        body: "Organizing a class project in a shared notes app — not the feature list, but the thing you're trying to do.",
        focus: "product",
        fallback: `The same beat using a generic "shared notes app," drawn as an abstract wireframe.`,
        cutAt45: true,
        presenterNote: "If Notion approved: use the Notion task example. If not: use the generic shared notes app.",
      },
      {
        id: "product-ai",
        headline: "AI can generate a solution. It can't decide which problem deserves your attention.",
        focus: "product",
        cutAt45: true,
      },
      {
        id: "product-prompt",
        headline: "Your turn",
        body: "For ___, this product makes it possible to ___.",
        focus: "product",
        presenterNote: "Spoken prompt.",
        cutAt45: true,
      },
      {
        id: "product-keyline",
        headline: "A world needs a reason to enter. Start with something useful.",
        keyLine: true,
        focus: "product",
      },
    ],
    explore: {
      body: "The innermost circle is usefulness. Before charm, before community, before identity — a product must do something someone needs. The coffee shop's core job: get a good cup, reliably.",
    },
  },

  // 05 — Experience
  {
    id: "experience",
    number: "05",
    navLabel: "Experience",
    reading: "People will forget the features. They'll remember whether it trusted them.",
    minutes: { m45: 5, m60: 6, m75: 8 },
    views: [
      {
        id: "experience-toggle",
        headline: "Same coffee, two shops",
        body: "One ordering moment, two versions. What changed?",
        focus: "experience",
        interaction: "beforeAfter",
      },
      {
        id: "experience-moments",
        headline: "Three moments that define the experience",
        body: "Finding your way in. Doing the main thing. When something goes wrong.",
        focus: "experience",
      },
      {
        id: "experience-notion",
        headline: "Blank page vs. guided template",
        focus: "experience",
        fallback: `An abstract wireframe in the site's own visual language, labeled "illustrative." Do not build a Notion look-alike mockup.`,
        placeholder: "Approved Notion screenshots: blank page vs. a guided class-project template, framed as screenshots.",
        presenterNote: "If Notion approved: use real screenshots. If not: abstract wireframe, labeled illustrative.",
      },
      {
        id: "experience-prompt",
        headline: "Your turn",
        body: "We want this moment to feel ___, so we will ___.",
        focus: "experience",
        presenterNote: "Spoken prompt.",
      },
      {
        id: "experience-keyline",
        headline: "'Welcoming' is not a visual style. It is something the experience must prove.",
        keyLine: true,
        focus: "experience",
      },
    ],
    explore: {
      body: "The middle ring is feeling. Experience design is not decoration — it's the set of choices that determine whether someone feels guided or lost, trusted or interrogated. Four levers: language, guidance, pace, support.",
    },
  },

  // 06 — World
  {
    id: "world",
    number: "06",
    navLabel: "World",
    reading: "The best parts of a world are the ones you didn't make.",
    minutes: { m45: 4, m60: 6, m75: 8 },
    views: [
      {
        id: "world-place",
        headline: "\"Our place\"",
        body: `The coffee shop becomes more than a coffee shop. Regulars, a local artist's gathering. Sociologists call this a "third place."`,
        focus: "world",
      },
      {
        id: "world-examples",
        headline: "Three kinds of world-building",
        focus: "world",
        interaction: "exampleCards",
        placeholder: "Three example cards: (1) a template that expresses its creator's identity; (2) a gathering or ritual; (3) a shared joke, phrase or user archetype. Each card: What people made → What the product made possible → What the experience encouraged.",
        fallback: "Public, non-Notion examples of the same three kinds, or Nancy's own community work outside Notion.",
      },
      {
        id: "world-distinction",
        headline: "World ≠ fandom",
        body: "Not every useful product needs a fandom. World-building means a coherent context, not manufactured loyalty.",
        focus: "world",
        cutAt45: true,
      },
      {
        id: "world-keyline",
        headline: "You can design the invitation. You cannot script belonging.",
        keyLine: true,
        focus: "world",
      },
    ],
    explore: {
      body: "The outer ring is identity. A world exists when people start co-creating meaning around the product — not because you told them to, but because the experience made it natural.",
    },
  },

  // 07 — Connect the circles
  {
    id: "connect",
    number: "07",
    navLabel: "Connect",
    reading: "Your product is saying something. Make sure it's one thing.",
    minutes: { m45: 4, m60: 6, m75: 8 },
    views: [
      {
        id: "connect-axis",
        headline: "Point of view is the axis",
        body: `"Good coffee should feel approachable, not exclusive." Product: small, clear menu. Experience: basic questions welcome. World: open tastings for beginners. The axis passes cleanly through all three rings.`,
        focus: "axis",
      },
      {
        id: "connect-contradiction",
        headline: "When the axis breaks",
        body: "The shop says it welcomes everyone, but the menu is full of unexplained jargon.",
        focus: "axis",
        interaction: "contradiction",
        presenterNote: "Students pick the ring where it breaks. Any choice reveals a discussion prompt and a suggested repair. More than one answer can be valid.",
      },
      {
        id: "connect-ai",
        headline: "AI can draw any of these circles. It can't choose the belief that runs through them.",
        focus: "axis",
      },
      {
        id: "connect-build",
        headline: "Nancy's build",
        focus: "axis",
        placeholder: "What it lets someone do; the first imperfect version; one judgment call; one change prompted by real behavior.",
        fallback: "This site itself, using the dry-run change from T−10.",
        cutAt45: true,
        presenterNote: "If 45 min: skip this and save it for Q&A if asked.",
      },
      {
        id: "connect-keyline",
        headline: "World-building is not adding more things. It is making the things agree.",
        keyLine: true,
        focus: "axis",
      },
    ],
    explore: {
      body: "Point of view is not a fourth circle. It is the axis that runs through all three. A product is coherent when the axis passes through every ring without breaking. A contradiction — saying one thing in the world ring and doing another in the product ring — makes the axis visibly snap.",
    },
  },

  // 08 — Build your world
  {
    id: "workshop",
    number: "08",
    navLabel: "Workshop",
    reading: "Your turn. Be specific.",
    minutes: { m45: 14, m60: 15, m75: 18 },
    views: [
      {
        id: "workshop-brief",
        headline: "The brief",
        body: "Use the canvas to map your project through three rings. Start with Empower, or use your own project. These are proposals, not claims about the real product.",
        focus: "all",
        presenterNote: "Give timing: you have about 12 minutes.",
      },
      {
        id: "workshop-canvas",
        headline: "Your canvas",
        focus: "all",
        interaction: "workshop",
      },
      {
        id: "workshop-check",
        headline: "Check the connection",
        body: "Read your three circles in a row. Does the axis hold? Where does it wobble?",
        focus: "axis",
        cutAt45: true,
        presenterNote: "At 45 min this is folded into the share.",
      },
      {
        id: "workshop-share",
        headline: "60-second share",
        body: "Name your project, your belief, and the one thing you'd test first.",
        focus: "all",
        presenterNote: "Pick 3–4 volunteers. Keep it brisk.",
      },
    ],
    explore: {
      body: "The workshop is the most important part. Use the canvas to map your project through the three rings. Start with Empower or use your own project.",
    },
  },

  // 09 — Take it with you
  {
    id: "closing",
    number: "09",
    navLabel: "Closing",
    reading: "Make one change. Watch someone use it.",
    minutes: { m45: 1, m60: 2, m75: 2 },
    views: [
      {
        id: "closing-questions",
        headline: "Three questions for everything you build",
        body: "What can someone do? How does it feel? What are they part of?",
        focus: "all",
      },
      {
        id: "closing-readback",
        headline: "This site, read through its own three circles",
        body: "Product: a lecture and a usable canvas. Experience: the journey you just took. World: what you do with it next.",
        focus: "all",
        interaction: "siteReadBack",
        presenterNote: "Name it: this site was vibe-coded by someone without 'engineer' in her title. The judgment was hers; the typing was shared.",
      },
      {
        id: "closing-line",
        headline: "Build something useful. Make the experience meaningful. Leave room for people to make it their own.",
        keyLine: true,
        focus: "all",
      },
    ],
    explore: {
      body: "Three questions for everything you build: What can someone do? How does it feel? What are they part of?",
      extras: [
        "From canvas to first prototype: PLACEHOLDER for Nancy's list of beginner pitfalls in vibe coding.",
        "Resource links: PLACEHOLDER.",
      ],
    },
  },
];

export function getSectionById(id: string): Section | undefined {
  return sections.find((s) => s.id === id);
}

export function getVisibleViews(section: Section, config: LectureConfig): View[] {
  return section.views.filter((v) => {
    if (config.variant === "m45" && v.cutAt45) return false;
    return true;
  });
}

export function getTotalViewIndex(sectionId: string, viewIndex: number): number {
  let total = 0;
  for (const section of sections) {
    if (section.id === sectionId) return total + viewIndex;
    total += section.views.length;
  }
  return total;
}

export function getFilledCircles(sectionIndex: number): {
  product: boolean;
  experience: boolean;
  world: boolean;
  axis: boolean;
} {
  // Per PRD §1: 01–02 outlines only, 03–04 product fills,
  // 05 experience fills, 06 world fills, 07 axis appears
  return {
    product: sectionIndex >= 3, // sections[3] = "product" (04)
    experience: sectionIndex >= 4, // sections[4] = "experience" (05)
    world: sectionIndex >= 5, // sections[5] = "world" (06)
    axis: sectionIndex >= 6, // sections[6] = "connect" (07)
  };
}
