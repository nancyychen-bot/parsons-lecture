import { useState, useCallback, useRef, useEffect } from "react";
import type { LectureConfig, WorkshopDraft } from "../types";
import { useWorkshopDraft } from "../hooks/useWorkshopDraft";
import { copyBrief, printCanvas } from "../lib/exportBrief";
import { CircleMark } from "./CircleMark";
import "./WorkshopCanvas.css";

type Props = {
  config: LectureConfig;
};

/* ---- Field definitions ---- */

type FieldDef = {
  key: keyof Omit<WorkshopDraft, "version" | "updatedAt" | "starter">;
  label: string;
  helper?: string;
  ring: "product" | "experience" | "world" | "connection";
  multiline: boolean;
  softLimit: number;
  placeholder: string;
};

const FIELDS: FieldDef[] = [
  {
    key: "audience",
    label: "We are building for…",
    ring: "product",
    multiline: false,
    softLimit: 120,
    placeholder: "e.g. First-generation college students managing coursework",
  },
  {
    key: "belief",
    label: "And we believe…",
    helper: "Make a choice. “For everyone” is not a belief.",
    ring: "product",
    multiline: true,
    softLimit: 200,
    placeholder:
      "e.g. Productivity tools should adapt to how students actually work, not how institutions think they should",
  },
  {
    key: "product",
    label: "One useful thing they can do",
    ring: "product",
    multiline: false,
    softLimit: 120,
    placeholder: "e.g. Turn a messy syllabus into a personal task board in under two minutes",
  },
  {
    key: "experienceMoment",
    label: "A moment we want to get right",
    ring: "experience",
    multiline: true,
    softLimit: 200,
    placeholder: "e.g. The first time they open it and see their classes already organized",
  },
  {
    key: "experienceChoice",
    label: "A design choice that shapes it",
    ring: "experience",
    multiline: true,
    softLimit: 200,
    placeholder: "e.g. We show three priorities, not thirty checkboxes",
  },
  {
    key: "world",
    label: "One concrete invitation",
    helper:
      "Something a real person would do without being paid or asked twice.",
    ring: "world",
    multiline: true,
    softLimit: 200,
    placeholder:
      "e.g. Share your setup with a classmate and see how they adapted it",
  },
  {
    key: "connection",
    label: "The contradiction or gap we’ll fix",
    ring: "connection",
    multiline: true,
    softLimit: 200,
    placeholder:
      "e.g. The product says “stay organized” but the onboarding dumps you into a blank page",
  },
  {
    key: "nextTest",
    label: "The assumption we’ll test first",
    helper: "Something you could observe within a week.",
    ring: "connection",
    multiline: true,
    softLimit: 200,
    placeholder:
      "e.g. Watch three students use it for the first time — do they add a second class without prompting?",
  },
];

const RING_GROUPS = [
  { ring: "product" as const, label: "Product: what can they do?" },
  { ring: "experience" as const, label: "Experience: how does it feel?" },
  { ring: "world" as const, label: "World: what are they part of?" },
  { ring: "connection" as const, label: "Connect: does the axis hold?" },
] as const;

/* ---- Helpers ---- */

function getFilledState(draft: WorkshopDraft) {
  return {
    product: draft.product.trim() !== "",
    experience:
      draft.experienceMoment.trim() !== "" ||
      draft.experienceChoice.trim() !== "",
    world: draft.world.trim() !== "",
    axis: draft.connection.trim() !== "",
  };
}

/* ---- Component ---- */

export function WorkshopCanvas({ config: _config }: Props) {
  const { draft, updateDraft, resetDraft, status } = useWorkshopDraft();
  const [fallbackText, setFallbackText] = useState<string | null>(null);
  const [copyConfirm, setCopyConfirm] = useState(false);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fallbackRef = useRef<HTMLTextAreaElement>(null);

  // Auto-select fallback text when it appears
  useEffect(() => {
    if (fallbackText && fallbackRef.current) {
      fallbackRef.current.select();
    }
  }, [fallbackText]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  const handleCopy = useCallback(async () => {
    const result = await copyBrief(draft);
    if (result.ok) {
      setCopyConfirm(true);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopyConfirm(false), 2000);
    } else {
      setFallbackText(result.text);
    }
  }, [draft]);

  const handlePrint = useCallback(() => {
    printCanvas(false);
  }, []);

  const handlePrintBlank = useCallback(() => {
    printCanvas(true);
  }, []);

  const filled = getFilledState(draft);

  /* ---- Previews for the diagram sidebar ---- */
  const previews = [
    { label: "Product", value: draft.product },
    { label: "Experience", value: draft.experienceMoment },
    { label: "World", value: draft.world },
    { label: "Axis", value: draft.connection },
  ];

  /* ---- Render a single field ---- */
  function renderField(field: FieldDef) {
    const value = draft[field.key] as string;
    const charCount = value.length;
    const isOver = charCount > field.softLimit;

    return (
      <div className="workshop-field" key={field.key}>
        <label className="workshop-field-label" htmlFor={`wf-${field.key}`}>
          {field.label}
        </label>
        {field.helper && (
          <span className="workshop-field-helper">{field.helper}</span>
        )}
        {field.multiline ? (
          <textarea
            id={`wf-${field.key}`}
            value={value}
            onChange={(e) => updateDraft(field.key, e.target.value)}
            placeholder={field.placeholder}
            rows={3}
          />
        ) : (
          <input
            id={`wf-${field.key}`}
            type="text"
            value={value}
            onChange={(e) => updateDraft(field.key, e.target.value)}
            placeholder={field.placeholder}
          />
        )}
        {charCount > 0 && (
          <span
            className={`workshop-field-char-guide ${isOver ? "workshop-field-char-guide--over" : ""}`}
          >
            {charCount}/{field.softLimit}
          </span>
        )}
      </div>
    );
  }

  /* ---- Group fields by ring ---- */
  function renderFieldGroup(
    ringKey: string,
    label: string,
  ) {
    const groupFields = FIELDS.filter((f) => f.ring === ringKey);
    return (
      <div className="workshop-ring-section" key={ringKey}>
        <h3 className="workshop-ring-label">{label}</h3>
        {groupFields.map(renderField)}
      </div>
    );
  }

  /* ---- Print-only region (structured for print.css) ---- */
  const printFields: Array<{ label: string; value: string }> = [
    { label: "Project", value: draft.projectName },
    ...FIELDS.map((f) => ({
      label: f.label.replace(/…$/, ""),
      value: draft[f.key] as string,
    })),
  ];

  return (
    <div className="workshop-canvas workshop-canvas-print-root">
      {/* ---- Starter toggle ---- */}
      <div
        className="workshop-starter-toggle"
        role="radiogroup"
        aria-label="Project starter"
      >
        <button
          className={`workshop-starter-btn ${draft.starter === "empower" ? "workshop-starter-btn--active" : ""}`}
          role="radio"
          aria-checked={draft.starter === "empower"}
          onClick={() => updateDraft("starter", "empower")}
        >
          Empower
        </button>
        <button
          className={`workshop-starter-btn ${draft.starter === "own" ? "workshop-starter-btn--active" : ""}`}
          role="radio"
          aria-checked={draft.starter === "own"}
          onClick={() => updateDraft("starter", "own")}
        >
          Your own project
        </button>
      </div>

      {/* ---- Project name ---- */}
      <div className="workshop-field">
        <label className="workshop-field-label" htmlFor="wf-projectName">
          Project name
        </label>
        <input
          id="wf-projectName"
          type="text"
          value={draft.projectName}
          onChange={(e) => updateDraft("projectName", e.target.value)}
          placeholder={
            draft.starter === "empower"
              ? "Empower"
              : "Name your project"
          }
        />
      </div>

      {/* ---- Desktop layout: diagram + fields ---- */}
      <div className="workshop-desktop-layout">
        <div className="workshop-diagram-col">
          <div className="workshop-diagram">
            <CircleMark focus="all" filled={filled} size="lg" />
          </div>
          <div className="workshop-diagram-previews">
            {previews.map(
              (p) =>
                p.value.trim() !== "" && (
                  <div className="workshop-preview-chip" key={p.label}>
                    <span className="workshop-preview-chip-label">
                      {p.label}:
                    </span>
                    {p.value.length > 50
                      ? p.value.slice(0, 50) + "…"
                      : p.value}
                  </div>
                ),
            )}
          </div>
        </div>

        <div className="workshop-fields">
          {RING_GROUPS.map((g) => renderFieldGroup(g.ring, g.label))}
        </div>
      </div>

      {/* ---- Mobile layout: stacked cards ---- */}
      <div className="workshop-mobile-layout">
        <div className="workshop-card">
          <div className="workshop-diagram" style={{ maxWidth: "200px", margin: "0 auto var(--space-lg)" }}>
            <CircleMark focus="all" filled={filled} size="lg" />
          </div>
        </div>

        {RING_GROUPS.map((g) => {
          const groupFields = FIELDS.filter((f) => f.ring === g.ring);
          return (
            <div className="workshop-card" key={g.ring}>
              <div className="workshop-card-ring-label">{g.label}</div>
              {groupFields.map(renderField)}
            </div>
          );
        })}
      </div>

      {/* ---- Privacy note ---- */}
      <p className="workshop-privacy">No answers leave this browser.</p>

      {/* ---- Save status ---- */}
      <p
        className={`workshop-save-status ${
          status.kind === "saved"
            ? "workshop-save-status--saved"
            : "workshop-save-status--warning"
        }`}
        role={status.kind === "warning" ? "alert" : undefined}
      >
        {status.label}
      </p>

      {/* ---- Actions ---- */}
      <div className="workshop-actions">
        <button
          className="workshop-action-btn workshop-action-btn--primary"
          onClick={handleCopy}
          type="button"
        >
          Copy brief
        </button>
        {copyConfirm && (
          <span className="workshop-copy-confirm" aria-live="polite">
            Copied
          </span>
        )}
        <button
          className="workshop-action-btn"
          onClick={handlePrint}
          type="button"
        >
          Print / Save as PDF
        </button>
        <button
          className="workshop-action-btn"
          onClick={handlePrintBlank}
          type="button"
        >
          Print blank canvas
        </button>
        <button
          className="workshop-action-btn workshop-action-btn--danger"
          onClick={resetDraft}
          type="button"
        >
          Reset
        </button>
      </div>

      {/* ---- Clipboard fallback ---- */}
      {fallbackText && (
        <div className="workshop-fallback-box">
          <p>
            Your browser blocked clipboard access. Select all the text below and
            copy it manually.
          </p>
          <textarea
            ref={fallbackRef}
            readOnly
            value={fallbackText}
            onClick={(e) => (e.target as HTMLTextAreaElement).select()}
          />
          <button
            className="workshop-fallback-close"
            onClick={() => setFallbackText(null)}
            type="button"
          >
            Close
          </button>
        </div>
      )}

      {/* ---- Print-only structured output ---- */}
      <div className="print-only" aria-hidden="true">
        <div className="workshop-print-title">
          Build a World, Not Just a Product
        </div>
        <div className="workshop-print-starter">
          Starter: {draft.starter === "empower" ? "Empower" : "Own project"}
        </div>
        <div className="workshop-diagram">
          <CircleMark focus="all" filled={filled} size="lg" />
        </div>
        <div className="workshop-fields-print">
          {printFields.map((f) => (
            <div className="workshop-print-field" key={f.label}>
              <div className="workshop-print-field-label">{f.label}</div>
              <div
                className={`workshop-print-field-value ${
                  f.value.trim() === ""
                    ? "workshop-print-field-value--empty"
                    : ""
                }`}
              >
                {f.value.trim() || "Not yet filled in"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
