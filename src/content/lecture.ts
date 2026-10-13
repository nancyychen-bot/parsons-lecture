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
        body: `Nancy Chen builds tools for how people connect — a personal CRM called the Dossier, community dashboards, event triage systems. None of these have "product design" in their job description. All of them are products.`,
        focus: null,
        presenterNote: `The missing title is the hook for 07 and Q&A. Nancy's title at Notion doesn't include "product," "design," or "engineering" — but she builds products anyway. Say it here and pay it off later.`,
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
      body: `Welcome. This site is a companion to a guest lecture called "Build a World, Not Just a Product." It teaches one idea: that the things we build sit inside experiences, and those experiences sit inside worlds — and that the best products are designed with all three in mind.

You can move through the site in three ways. Live mode follows the lecture in real time, one view at a time. Explore mode — the one you are reading now — lays out every section as a long-form article you can read at your own pace, with extra material the live talk does not have time for. And Workshop mode gives you a canvas to map your own project through the three-ring model, whether or not you attended the lecture.

The single framework here is three concentric circles: Product, Experience, World. By the end, you will be able to name what sits in each ring for something you are building, spot where the rings contradict each other, and have a one-page brief you can carry into your next critique or pitch. The canvas saves locally in your browser — nothing leaves your device.

This site was built by someone who believes that having a point of view about what makes a product good is the one thing AI cannot generate for you. That belief runs through every section. If it does its job, you will leave with your own.`,
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
      body: `We tend to think the product is the thing on the screen. If you are designing an app, the product is the app. If you are redesigning Empower, the product is the ride-share interface. But this is a mistake — and it is the same mistake whether you are working in digital or physical products.

Consider a coffee shop. Ask most people what the product is and they will say "the coffee." But nine things orbit that cup: the menu, the mobile order app, the ordering ritual, the staff interaction, the seating, getting help when something goes wrong, the regulars, the shop's reputation. Which of those count as the product? The answer the lecture builds toward is: all of them. The coffee cup is the core, but the product is the entire system of touchpoints.

The mobile order app is the key insight. It is the only screen in the coffee shop's system, and when you map it onto the three rings, it ends up as one small dot on the inner circle. The screen is literally the smallest part of the product. This is what the reading means: the interface is where one slice of the product appears. The experience — everything around using it — is what the product actually is.

For the students working on Empower: the same reframe applies. The ride-share screen is a touchpoint. The product includes driver onboarding, the payment moment, the feeling of safety, the community of drivers who keep 100% of profit, and the reputation that draws riders in. Try mapping Empower's touchpoints onto the three rings and notice where the screen sits.`,
      extras: [
        `Try the touchpoint exercise for Empower. List nine touchpoints that orbit the Empower ride experience — the app screen, the pickup moment, the payment, the driver profile, the safety check, the rating, word of mouth, the "100% to drivers" promise, and the post-ride receipt. Which ring does each belong to? Do any span two?`,
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
      body: `The single model this lecture teaches is three concentric circles. The inner ring is Product — what someone can do. The middle ring is Experience — how it feels to do it. The outer ring is World — what they become part of. The product sits inside the experience. The experience sits inside the world. That nesting matters: you cannot have a world without an experience, and you cannot have an experience without something useful at the core.

The coffee shop makes this concrete. Product: get a good cup, reliably. Experience: ordering feels welcoming, not intimidating. World: regulars, tastings, "our place" — the identity and culture people help create. Each ring answers a different question. Product asks "what can I do?" Experience asks "how does it feel?" World asks "what am I part of?"

You have heard the coffee-shop example before — every experience design course uses it. Stay with it. The model is simple enough to fit on a napkin, which is a feature, not a limitation. The coffee shop is familiar precisely because it lets you reason about all three rings without needing domain knowledge. From the next section onward, the example will start to break, and that is where the model earns its keep.

Why this model and not others? Frameworks like Jobs to Be Done, the Double Diamond, or the Experience Map are valuable, but they tend to focus on one ring at a time. The three circles ask you to hold all three simultaneously and look for the relationship between them. The key line — the product sits inside the experience, the experience sits inside the world — is not just a description. It is a design constraint. It says: if you change one ring, check the others.`,
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
        body: `The coffee shop's core job is not "serve coffee." It is: get a good cup, reliably. "Good" sets a quality bar. "Reliably" means the experience is repeatable — not a lucky accident on a Tuesday. The core job is always a task someone can complete, not a feature list. A feature list says "we have pour-over, cold brew, and nitro." The core job says "you can get a good cup, and you can count on it."`,
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
      body: `The innermost circle is usefulness. Before charm, before community, before identity — a product must do something someone needs. This is the foundation everything else is built on, and it is the ring most likely to get lost in a pitch deck full of mood boards and brand values.

The coffee shop's core job is not "serve coffee." It is: get a good cup, reliably. That phrasing matters. "Good" sets a quality bar — it says this shop cares about what is in the cup. "Reliably" means the experience is repeatable, not a lucky accident. The core job is always a task someone can complete, stated in terms of what it does for the person, not what it is made of. A feature list says "we have pour-over, cold brew, and nitro." The core job says "you can get a good cup, and you can count on it."

The difference between a feature list and a core job is the difference between describing what you built and describing what someone can do with it. For Empower, the feature list might say "driver profiles, in-app payments, ride tracking, and a rating system." The core job says something like: "For riders who want an affordable ride and drivers who want to keep what they earn, this product makes it possible to connect directly." That sentence forces a choice about who the product is for and what it prioritizes.

AI can generate a solution. It cannot decide which problem deserves your attention. This is the first of three lines in the lecture about AI, and it belongs in the Product ring because choosing the core job — the one task that earns someone's trust — is a judgment call. A generative tool can draft ten feature lists in a minute. It cannot tell you which problem is worth solving, or for whom. That is the designer's job, and it starts here.`,
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
      body: `The experience is everything around using the product: finding your way in, doing the main thing, recovering when something goes wrong. Feeling is not decoration. It comes from choices.

Those choices work through four levers. Language: the words on the menu, the button labels, the error messages — do they assume expertise or meet you where you are? Guidance: is there a path for someone who has never been here, or does the experience assume you already know what to do? Pace: does the interface rush you ("Next!") or give you room to decide? Support: when something goes wrong, does the product make recovery easy, or does it leave you stranded?

The Shop A / Shop B comparison makes this visceral. Both shops serve the same coffee. Shop A has a dense menu of jargon — ristretto, cortado, gibraltar, SO/blend — with no explanation, no guidance, and a curt "Next!" that signals impatience. Shop B has two options described in plain words ("Coffee — smooth, not bitter / Coffee with milk — mild, creamy"), a line for first-timers, and a pace that says "take your time." The difference is visible from the type and spacing alone, before you read a word. That is experience design working.

The three moments — finding your way in, doing the main thing, when something goes wrong — are a tool for auditing any experience. For the coffee shop: finding your way in is the menu and the ordering ritual. Doing the main thing is getting and drinking the coffee. When something goes wrong is what happens when your order is wrong, or you spill, or you cannot find a seat. Most design work focuses on "doing the main thing" and neglects the other two. But people remember the edges — the first moment and the broken moment — far longer than the middle.`,
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
        body: `The coffee shop becomes more than a coffee shop when people start treating it as theirs. The regulars who know each other's names. The local artist who hangs work on the walls without being asked. The study group that meets every Thursday. Sociologists call this a "third place" — somewhere between home and work where community forms on its own terms. The shop did not script this. It created the conditions, and people filled them.`,
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
        body: "Not every useful product needs a fandom. A budgeting app does not need a Discord server. World-building means creating a coherent context — a set of values, a tone, a way of being in the space — not manufactured loyalty or a merch line. The question is not \"how do we build a community?\" but \"what would people naturally do here if we made it easy?\"",
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
      body: `The outer ring is identity. A world exists when people start co-creating meaning around the product — not because you told them to, but because the experience made it natural. This is the hardest ring to design for, because the best parts of a world are the ones you did not make.

The coffee shop becomes "our place" when regulars start recognizing each other, when a local artist hangs work on the walls, when a study group claims Thursday afternoons. Sociologists call this a "third place" — somewhere between home and work where community forms on its own terms. The shop created the conditions: comfortable seating, a tolerance for lingering, a staff that remembers names. People did the rest. That is the pattern. You design the invitation; you cannot script the belonging.

World-building is not the same as community management, and not every product needs a fandom. A budgeting app that helps someone pay off debt is doing important work in the Product ring. Its Experience ring matters — does the app make the user feel ashamed or empowered? But its World ring might be thin, and that is fine. The distinction matters because "build a community" has become a reflex in product strategy, and most of those communities are hollow. A Discord server with a thousand members and no real conversation is not a world. A neighborhood coffee shop with twelve regulars who genuinely belong is.

The test for the World ring in the workshop canvas is deliberate: "something a real person would do without being paid or asked twice." This stops the common move of inventing a community for a product that has no users yet. If you cannot name a behavior someone would genuinely repeat, the world does not exist yet — and that is useful information, not a failure. Start with the Product and Experience rings. The world will follow if the invitation is real.`,
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
        body: `Point of view is not a fourth circle. It is the axis that runs through all three. Take the belief: "Good coffee should feel approachable, not exclusive." In the Product ring, that means a small, clear menu. In the Experience ring, it means basic questions are welcome. In the World ring, it means open tastings for beginners. The axis passes cleanly through all three rings — every ring expresses the same belief in its own language.`,
        focus: "axis",
      },
      {
        id: "connect-contradiction",
        headline: "When the axis breaks",
        body: "The shop says it welcomes everyone, but the menu is full of unexplained jargon. The axis visibly breaks. Where does it break — in the Product, the Experience, or the World?",
        focus: "axis",
        interaction: "contradiction",
        presenterNote: "Students pick the ring where it breaks. Any choice reveals a discussion prompt and a suggested repair. More than one answer can be valid; the point is the argument.",
      },
      {
        id: "connect-ai",
        headline: "AI can draw any of these circles. It can't choose the belief that runs through them.",
        focus: "axis",
      },
      {
        id: "connect-build",
        headline: "Nancy's build: The Dossier",
        body: `A tool for remembering the people you meet — who they are, where you crossed paths, what you talked about. The first version was a messy spreadsheet. The judgment call: organizing by relationship, not by company. The change prompted by real behavior: after a few events, the "meeting notes" field mattered more than the job title.`,
        focus: "axis",
        fallback: "This site itself, using the dry-run change from T−10.",
        cutAt45: true,
        presenterNote: `Nancy's Dossier — a personal CRM she vibe-coded. Product: capture and organize connections. Experience: quick enough to use at an event. World: the network starts generating its own introductions. If 45 min: skip this and save it for Q&A if asked.`,
      },
      {
        id: "connect-keyline",
        headline: "World-building is not adding more things. It is making the things agree.",
        keyLine: true,
        focus: "axis",
      },
    ],
    explore: {
      body: `Point of view is not a fourth circle. It is the axis that runs through all three. A product is coherent when that axis passes through every ring without breaking. A contradiction — saying one thing in the World ring and doing another in the Product ring — makes the axis visibly snap.

The coffee shop example makes this concrete. The belief is: "Good coffee should feel approachable, not exclusive." In the Product ring, that belief means a small, clear menu — no jargon, no unexplained abbreviations. In the Experience ring, it means basic questions are welcome, and no one is made to feel ignorant for asking what a cortado is. In the World ring, it means open tastings for beginners, events where the first question is always welcome. Each ring expresses the same idea in its own terms.

Now break it. The shop says it welcomes everyone — that is the World ring talking. But the menu is full of unexplained jargon: ristretto, gibraltar, SO/blend. The axis snaps. Where does it break? You could argue it breaks at Product (the menu itself is the problem), at Experience (no one explains the menu to newcomers), or at World (the culture signals insider knowledge, not openness). Any answer can be valid. The point is not to find the single correct ring but to practice the argument: to see that coherence means the rings agree, and that a contradiction anywhere makes the whole system feel dishonest.

The repair exercise restores the axis. If you pick Product, the repair is: cut the menu to six drinks, each described in plain words. If you pick Experience: train staff to answer "what would you recommend?" before it is asked. If you pick World: host an open tasting where the first question is always welcome. Each repair is a design choice that brings one ring back into alignment with the belief. The axis straightens because the rings agree again.

AI can draw any of these circles. It can generate a belief statement, fill in a product description, and propose an experience map. But it cannot choose the belief that runs through them. That choice — the point of view that makes the axis hold — is the designer's job, and it is the one job that cannot be automated.`,
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
        body: `You have about 12 minutes. Use the canvas to map your project through the three rings. Start with Empower, or use your own project. A sentence or two per field is enough — the rings fill as you write. These are proposals, not claims about the real product. The goal is a one-page brief you can carry into your next critique.`,
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
        body: "Read your three circles in a row. Does the axis hold? Where does it wobble? If your belief says one thing and your World field says another, that is a contradiction — and finding it now is the point.",
        focus: "axis",
        cutAt45: true,
        presenterNote: "At 45 min this is folded into the share.",
      },
      {
        id: "workshop-share",
        headline: "60-second share",
        body: "Name your project, your belief, and the one thing you'd test first. Keep it to 60 seconds.",
        focus: "all",
        presenterNote: "Pick 3–4 volunteers. Keep it brisk.",
      },
    ],
    explore: {
      body: `The workshop is the most important part. Everything up to this point has been a lecture — ideas explained with examples. The canvas is where those ideas become yours.

Use the canvas to map your project through the three rings. Start with Empower if you are working on it for class, or use your own project if you have one. The fields are designed to force specificity: "We are building for..." asks you to name a real audience, not "everyone." "...and we believe..." asks for a point of view, not a mission statement. "One useful thing they can do" is the Product ring — a core job, not a feature list.

The Experience fields split into two: the moment that matters (finding your way in, doing the main thing, or when something goes wrong) and the choice you will make about that moment ("We want this moment to feel ___, so we will ___"). The World field has a built-in test: "Something a real person would do without being paid or asked twice." This is deliberate. It prevents the common move of inventing a community for a product that has no users. If you cannot pass this test, your World ring is aspirational, and that is fine — just be honest about it.

The Connection field asks you to name a contradiction or gap between your rings. This is where the axis breaks, and finding it is the most useful part of the exercise. The Next Test field asks for something you could observe within a week — not a survey, not a focus group, but a real behavior you could watch. The canvas saves locally in your browser. Nothing is sent anywhere. Copy or print your brief before you close the tab.`,
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
        body: `These three questions are a tool you keep. Ask them about anything you are building, at any stage: What can someone do? That is the Product ring — is there something genuinely useful at the core? How does it feel? That is the Experience ring — have you made choices about language, guidance, pace, and support? What are they part of? That is the World ring — is there an invitation that people might actually accept? If you can answer all three and the answers agree, the axis holds.`,
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
      body: `Three questions for everything you build: What can someone do? How does it feel? What are they part of? These are not interview questions or a framework to put on a slide. They are a habit — a way of checking your work at any stage, from the first sketch to a live product with real users.

This site is itself a case study. Its Product ring is a lecture and a usable canvas — something you can fill out and take with you. Its Experience ring is the journey you just took: the way sections build on each other, the way the rings fill progressively, the way the workshop gives you room to think. Its World ring is what you do with the canvas next — whether you bring it into a critique, use it on a different project, or share the link with someone who was not in the room.

The site was vibe-coded by someone without "engineer" in her title. The judgment — what to include, what to cut, what the axis should be — was hers. The typing was shared with a coding tool. That is the AI thread in the lecture, made literal: AI can draw the circles, but it cannot choose the belief that runs through them. The belief that runs through this site is that having a point of view about what makes a product good is the thing that matters most, and it is the one thing you cannot outsource.`,
      extras: [
        `From canvas to first prototype: once you have a filled canvas, the jump to a first prototype is smaller than it looks. Your Product field is a feature spec in miniature. Your Experience fields tell you what the first flow should feel like. Your World field tells you what to leave room for. <Placeholder label="Nancy's list of beginner pitfalls in vibe-coding — e.g., starting with visual polish before the core job works, building for a demo instead of a real person, skipping the error state." />`,
        `<Placeholder label="Resource links — books, talks, or tools Nancy recommends. Do not invent these." />`,
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
