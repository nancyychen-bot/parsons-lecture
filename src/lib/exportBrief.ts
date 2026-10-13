import type { WorkshopDraft } from "../types";

const FIELD_LABELS: Array<{ key: keyof WorkshopDraft; label: string }> = [
  { key: "projectName", label: "Project" },
  { key: "audience", label: "We are building for" },
  { key: "belief", label: "And we believe" },
  { key: "product", label: "One useful thing they can do" },
  { key: "experienceMoment", label: "A moment we want to get right" },
  { key: "experienceChoice", label: "A design choice that shapes it" },
  { key: "world", label: "One concrete invitation" },
  { key: "connection", label: "The contradiction or gap we will fix" },
  { key: "nextTest", label: "The assumption we will test first" },
];

function buildBriefText(draft: WorkshopDraft): string {
  const starterLabel =
    draft.starter === "empower" ? "Empower (provided)" : "Own project";

  const lines = [
    "Build a World, Not Just a Product",
    `Starter: ${starterLabel}`,
    "",
  ];

  for (const { key, label } of FIELD_LABELS) {
    const value = draft[key];
    const display =
      typeof value === "string" && value.trim() !== ""
        ? value.trim()
        : "Not yet filled in";
    lines.push(`${label}: ${display}`);
  }

  return lines.join("\n");
}

/**
 * Copy the brief to clipboard. If clipboard API fails, returns the text
 * so the caller can show it in a selectable fallback.
 */
export async function copyBrief(
  draft: WorkshopDraft,
): Promise<{ ok: true } | { ok: false; text: string }> {
  const text = buildBriefText(draft);

  try {
    await navigator.clipboard.writeText(text);
    return { ok: true };
  } catch {
    return { ok: false, text };
  }
}

/**
 * Trigger window.print(). The print.css stylesheet handles layout.
 * Optionally sets a data attribute so the print stylesheet can
 * distinguish between filled and blank canvas printing.
 */
export function printCanvas(blank: boolean = false): void {
  if (blank) {
    document.documentElement.setAttribute("data-print-blank", "");
  }
  window.print();
  // Clean up after print dialog closes
  // Use a slight delay since onafterprint fires synchronously in some browsers
  const cleanup = () => {
    document.documentElement.removeAttribute("data-print-blank");
    window.removeEventListener("afterprint", cleanup);
  };
  window.addEventListener("afterprint", cleanup);
  // Fallback cleanup after 10 seconds
  setTimeout(cleanup, 10_000);
}
