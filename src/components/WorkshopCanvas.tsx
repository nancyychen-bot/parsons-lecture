import { useState, useRef, useCallback } from "react";
import { useWorkshopDraft } from "../hooks/useWorkshopDraft";
import { copyBrief, printCanvas } from "../lib/exportBrief";
import type { WorkshopDraft } from "../types";
import "./WorkshopCanvas.css";

function hasText(v: string): boolean {
  return !!(v && v.trim());
}

function cut(v: string, n: number): string {
  const s = (v || "").trim();
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

type FieldKey = Exclude<keyof WorkshopDraft, "version" | "updatedAt" | "starter">;

type ActionStatus =
  | { kind: "idle" }
  | { kind: "copied" }
  | { kind: "copyFailed"; text: string };

export default function WorkshopCanvas() {
  const { draft, updateDraft, resetDraft, status } = useWorkshopDraft();
  const [confirming, setConfirming] = useState(false);
  const [actionStatus, setActionStatus] = useState<ActionStatus>({ kind: "idle" });
  const fallbackRef = useRef<HTMLTextAreaElement | null>(null);

  const product = hasText(draft.product);
  const experience =
    hasText(draft.experienceMoment) || hasText(draft.experienceChoice);
  const world = hasText(draft.world);
  const hasAxis = hasText(draft.connection);

  const anyContent =
    hasText(draft.projectName) ||
    hasText(draft.audience) ||
    hasText(draft.belief) ||
    product ||
    experience ||
    world ||
    hasAxis ||
    hasText(draft.nextTest);

  const starterLabel =
    draft.starter === "empower" ? "Starting from Empower" : "Your own project";

  const titleText = hasText(draft.projectName)
    ? draft.projectName
    : "Untitled project";
  const audiencePreview = hasText(draft.audience) ? cut(draft.audience, 90) : "…";
  const beliefPreview = hasText(draft.belief)
    ? cut(draft.belief, 90)
    : "Your belief goes here.";

  const previewProduct = product ? cut(draft.product, 26) : "Not yet filled in";
  const previewExperience = experience
    ? cut(
        hasText(draft.experienceMoment)
          ? draft.experienceMoment
          : draft.experienceChoice,
        26,
      )
    : "Not yet filled in";
  const previewWorld = world ? cut(draft.world, 26) : "Not yet filled in";

  const onFieldChange = useCallback(
    (key: FieldKey) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      updateDraft(key, e.target.value);
      if (actionStatus.kind !== "idle") setActionStatus({ kind: "idle" });
    },
    [updateDraft, actionStatus.kind],
  );

  const onCopy = useCallback(async () => {
    const result = await copyBrief(draft);
    if (result.ok) {
      setActionStatus({ kind: "copied" });
    } else {
      setActionStatus({ kind: "copyFailed", text: result.text });
      // Try to focus the fallback box so the user can select it
      requestAnimationFrame(() => {
        fallbackRef.current?.focus();
        fallbackRef.current?.select();
      });
    }
  }, [draft]);

  const onPrint = useCallback(() => {
    printCanvas(false);
  }, []);

  const onPrintBlank = useCallback(() => {
    printCanvas(true);
  }, []);

  const onAskReset = useCallback(() => {
    if (anyContent) {
      setConfirming(true);
    } else {
      resetDraft();
    }
  }, [anyContent, resetDraft]);

  const onConfirmReset = useCallback(() => {
    // Call resetDraft but intercept its native confirm by clearing first
    // Our hook uses window.confirm, so we must bypass. Instead write empties directly.
    const fields: FieldKey[] = [
      "projectName",
      "audience",
      "belief",
      "product",
      "experienceMoment",
      "experienceChoice",
      "world",
      "connection",
      "nextTest",
    ];
    fields.forEach((f) => updateDraft(f, ""));
    setConfirming(false);
    setActionStatus({ kind: "idle" });
  }, [updateDraft]);

  const onCancelReset = useCallback(() => {
    setConfirming(false);
  }, []);

  const coreClass = product ? "orr-core" : "orr-core--unfilled";
  const productRingClass = product ? "orr-ring" : "orr-ring orr-ring--unfilled";
  const experienceRingClass = experience
    ? "orr-ring"
    : "orr-ring orr-ring--unfilled";
  const worldRingClass = world
    ? "orr-ring orr-ring--world"
    : "orr-ring orr-ring--unfilled";

  const headerMarkCore = product ? "orr-core" : "orr-core--unfilled";
  const headerC1 = product ? "orr-ring" : "orr-ring orr-ring--unfilled";
  const headerC2 = experience ? "orr-ring" : "orr-ring orr-ring--unfilled";
  const headerC3 = world
    ? "orr-ring orr-ring--world"
    : "orr-ring orr-ring--unfilled";

  const statusLabel =
    actionStatus.kind === "copied"
      ? "Brief copied"
      : actionStatus.kind === "copyFailed"
        ? "Copy blocked here. Select the text and copy it yourself."
        : status.kind === "warning"
          ? status.label
          : "Saved in this browser";

  return (
    <div className="workshop-canvas-root">
      <header className="workshop-canvas-header">
        <a href="#/" className="workshop-canvas-sitename">
          Build a world, not just a product
        </a>
        <div className="workshop-canvas-header-right">
          <div role="group" aria-label="Mode" className="workshop-canvas-mode">
            <a className="orr-btn" href="#/live/start/0">
              Live
            </a>
            <a
              className="orr-btn"
              aria-current="page"
              href="#/explore/start"
              style={{ marginLeft: "-1px", background: "var(--ink)", color: "var(--ground)" }}
            >
              Explore
            </a>
          </div>
          <svg
            className="orr-svg orr-mark"
            viewBox="0 0 40 40"
            width={40}
            height={40}
            role="img"
            aria-label="Progress mark: your canvas"
          >
            <circle className={headerMarkCore} cx={20} cy={20} r={1.5} />
            <circle className={headerC1} cx={20} cy={20} r={6} />
            <circle className={headerC2} cx={20} cy={20} r={12} />
            <circle className={headerC3} cx={20} cy={20} r={18} />
            {hasAxis && (
              <g transform="rotate(-58 20 20)">
                <line className="orr-axis" x1={0} y1={20} x2={40} y2={20} />
              </g>
            )}
          </svg>
        </div>
      </header>

      <main className="workshop-canvas-main">
        <div className="workshop-canvas-intro">
          <div className="workshop-canvas-intro-text">
            <p className="orr-label orr-muted" style={{ margin: 0 }}>
              08 / 09 · Build your world · Canvas
            </p>
            <p
              className="reading"
              style={{ margin: 0, fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
            >
              Your turn. Be specific.
            </p>
            <h1 className="display workshop-canvas-h1">Build your world</h1>
            <p className="body" style={{ margin: 0, maxWidth: 640 }}>
              Start with Empower or your own project. A sentence or two per field
              is enough. The rings fill as you write.
            </p>
          </div>
          <figure className="workshop-canvas-figure">
            <figcaption className="workshop-canvas-figcaption">
              <span className="orr-label">Fig. 08 · Platonic solids</span>
              <span className="orr-label orr-muted">Build from first principles</span>
            </figcaption>
            <img
              className="orr-cutout"
              src="/cutouts/platonic-solids.png"
              alt="Engraved geometric solids stacked on a cube"
              style={{ height: 280, width: "auto" }}
            />
          </figure>
        </div>

        <div className="workshop-canvas-grid">
          <section
            aria-label="Your canvas"
            className="workshop-canvas-left"
          >
            <div className="workshop-canvas-left-head">
              <p className="orr-label orr-muted" style={{ margin: 0 }}>
                {starterLabel}
              </p>
              <p className="workshop-canvas-title">{titleText}</p>
              <p className="workshop-canvas-audience orr-muted">
                For {audiencePreview}
              </p>
              <p className="workshop-canvas-belief">{beliefPreview}</p>
            </div>
            <svg
              className="orr-svg workshop-diagram"
              viewBox="0 0 560 560"
              role="img"
              aria-label="Your three rings, filling as you answer"
              style={{ width: "100%", height: "auto" }}
            >
              <circle className={coreClass} cx={280} cy={280} r={15} />
              <circle className={productRingClass} cx={280} cy={280} r={60} />
              <circle className={experienceRingClass} cx={280} cy={280} r={120} />
              <circle className={worldRingClass} cx={280} cy={280} r={180} />
              {hasAxis && (
                <g transform="rotate(-58 280 280)">
                  <line className="orr-axis" x1={78} y1={280} x2={482} y2={280} />
                  <line className="orr-axis" x1={78} y1={273} x2={78} y2={287} />
                  <line className="orr-axis" x1={482} y1={273} x2={482} y2={287} />
                </g>
              )}
              <text x={250} y={232} style={{ textAnchor: "middle", fontSize: 12 }}>
                PRODUCT
              </text>
              <text
                className="orr-belief"
                x={250}
                y={250}
                style={{
                  textAnchor: "middle",
                  fontSize: 15,
                  fill: product ? "var(--ink)" : "var(--muted)",
                }}
              >
                {previewProduct}
              </text>
              <text x={220} y={180} style={{ textAnchor: "middle", fontSize: 12 }}>
                EXPERIENCE
              </text>
              <text
                className="orr-belief"
                x={220}
                y={198}
                style={{
                  textAnchor: "middle",
                  fontSize: 15,
                  fill: experience ? "var(--ink)" : "var(--muted)",
                }}
              >
                {previewExperience}
              </text>
              <text x={190} y={128} style={{ textAnchor: "middle", fontSize: 12 }}>
                WORLD
              </text>
              <text
                className="orr-belief"
                x={190}
                y={146}
                style={{
                  textAnchor: "middle",
                  fontSize: 15,
                  fill: world ? "var(--ink)" : "var(--muted)",
                }}
              >
                {previewWorld}
              </text>
            </svg>
            <p className="orr-muted" style={{ margin: 0, fontSize: 15, lineHeight: 1.5 }}>
              The axis appears when you name the gap you’ll fix.
            </p>
          </section>

          <form
            aria-label="Your brief"
            className="workshop-canvas-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <fieldset className="workshop-canvas-fieldset workshop-starter-toggle">
              <legend className="orr-label" style={{ padding: 0, marginBottom: 10 }}>
                Starting point
              </legend>
              <div className="workshop-canvas-starter-buttons">
                <button
                  type="button"
                  className="orr-btn"
                  aria-pressed={draft.starter === "empower"}
                  onClick={() => updateDraft("starter", "empower")}
                >
                  Empower
                </button>
                <button
                  type="button"
                  className="orr-btn"
                  aria-pressed={draft.starter !== "empower"}
                  onClick={() => updateDraft("starter", "own")}
                  style={{ marginLeft: "-1px" }}
                >
                  Your own project
                </button>
              </div>
              <small
                className="orr-muted workshop-canvas-helper"
                style={{ fontSize: 15, lineHeight: 1.45 }}
              >
                These are proposals, not claims about the real product.
              </small>
            </fieldset>

            <div className="orr-field workshop-field">
              <label className="orr-label" htmlFor="f-name">
                01 · Project name
              </label>
              <input
                id="f-name"
                type="text"
                value={draft.projectName}
                onChange={onFieldChange("projectName")}
              />
            </div>

            <div className="orr-field workshop-field">
              <label className="orr-label" htmlFor="f-audience">
                02 · We are building for…
              </label>
              <textarea
                id="f-audience"
                rows={2}
                value={draft.audience}
                onChange={onFieldChange("audience")}
              />
            </div>

            <div className="orr-field workshop-field">
              <label className="orr-label" htmlFor="f-belief">
                03 · …and we believe…
              </label>
              <textarea
                id="f-belief"
                rows={2}
                value={draft.belief}
                onChange={onFieldChange("belief")}
                aria-describedby="h-belief"
              />
              <small id="h-belief">
                Make a choice. ‘For everyone’ is not a belief.
              </small>
            </div>

            <div
              className="orr-field workshop-field"
              style={{ paddingTop: 24, borderTop: "1px solid var(--ink)" }}
            >
              <label className="orr-label" htmlFor="f-product">
                04 · Product — one useful thing they can do
              </label>
              <textarea
                id="f-product"
                rows={2}
                value={draft.product}
                onChange={onFieldChange("product")}
                aria-describedby="h-product"
              />
              <small id="h-product">
                For them, this product makes it possible to…
              </small>
            </div>

            <div className="orr-field workshop-field">
              <label className="orr-label" htmlFor="f-moment">
                05 · Experience — the moment that matters
              </label>
              <textarea
                id="f-moment"
                rows={2}
                value={draft.experienceMoment}
                onChange={onFieldChange("experienceMoment")}
                aria-describedby="h-moment"
              />
              <small id="h-moment">
                Finding your way in, doing the main thing, or when something goes wrong.
              </small>
            </div>

            <div className="orr-field workshop-field">
              <label className="orr-label" htmlFor="f-choice">
                06 · Experience — the choice you’ll make
              </label>
              <textarea
                id="f-choice"
                rows={2}
                value={draft.experienceChoice}
                onChange={onFieldChange("experienceChoice")}
                aria-describedby="h-choice"
              />
              <small id="h-choice">
                We want this moment to feel ___, so we will ___.
              </small>
            </div>

            <div className="orr-field workshop-field">
              <label className="orr-label" htmlFor="f-world">
                07 · World — one concrete invitation
              </label>
              <textarea
                id="f-world"
                rows={2}
                value={draft.world}
                onChange={onFieldChange("world")}
                aria-describedby="h-world"
              />
              <small id="h-world">
                Something a real person would do without being paid or asked twice.
              </small>
            </div>

            <div
              className="orr-field workshop-field"
              style={{ paddingTop: 24, borderTop: "1px solid var(--ink)" }}
            >
              <label className="orr-label" htmlFor="f-connection">
                08 · Connection — the contradiction or gap we’ll fix
              </label>
              <textarea
                id="f-connection"
                rows={2}
                value={draft.connection}
                onChange={onFieldChange("connection")}
              />
            </div>

            <div className="orr-field workshop-field">
              <label className="orr-label" htmlFor="f-test">
                09 · Next test — an assumption to test with a real person
              </label>
              <textarea
                id="f-test"
                rows={2}
                value={draft.nextTest}
                onChange={onFieldChange("nextTest")}
                aria-describedby="h-test"
              />
              <small id="h-test">Something you could observe within a week.</small>
            </div>

            <div className="workshop-canvas-footer">
              <div className="workshop-actions">
                <button
                  type="button"
                  className="orr-btn orr-btn--primary"
                  onClick={onCopy}
                >
                  Copy brief
                </button>
                <button type="button" className="orr-btn" onClick={onPrint}>
                  Print
                </button>
                <button
                  type="button"
                  className="orr-btn orr-btn--text"
                  onClick={onPrintBlank}
                >
                  Print blank canvas
                </button>
                <button
                  type="button"
                  className="orr-btn orr-btn--text"
                  onClick={onAskReset}
                >
                  Reset
                </button>
              </div>

              {confirming && (
                <div
                  role="alertdialog"
                  aria-label="Clear every answer?"
                  className="workshop-canvas-confirm"
                >
                  <p className="body" style={{ margin: 0 }}>
                    Clear every answer? This can’t be undone.
                  </p>
                  <button type="button" className="orr-btn" onClick={onConfirmReset}>
                    Clear answers
                  </button>
                  <button
                    type="button"
                    className="orr-btn orr-btn--text"
                    onClick={onCancelReset}
                  >
                    Keep them
                  </button>
                </div>
              )}

              {actionStatus.kind === "copyFailed" && (
                <div className="workshop-fallback-box">
                  <p
                    className="orr-label orr-muted"
                    style={{ margin: 0, marginBottom: 6 }}
                  >
                    Manual copy
                  </p>
                  <textarea
                    ref={fallbackRef}
                    readOnly
                    value={actionStatus.text}
                    rows={10}
                    style={{
                      width: "100%",
                      fontFamily: "var(--font-mono)",
                      fontSize: 14,
                      lineHeight: 1.5,
                      padding: 8,
                      border: "1px solid var(--ink)",
                      background: "transparent",
                      color: "var(--ink)",
                    }}
                  />
                </div>
              )}

              <div role="status" className="workshop-save-status">
                <p
                  className="orr-label orr-muted"
                  style={{ margin: 0 }}
                >
                  {statusLabel.toUpperCase()}
                </p>
                <p
                  className="orr-muted workshop-privacy"
                  style={{ margin: 0, fontSize: 15, lineHeight: 1.45 }}
                >
                  Your answers stay on this device. Nothing is sent anywhere.
                </p>
              </div>
            </div>
          </form>
        </div>

        {/* Print-only region */}
        <div className="workshop-canvas-print-root print-only">
          <div className="workshop-print-title">
            {hasText(draft.projectName) ? draft.projectName : "Build your world"}
          </div>
          <div className="workshop-print-starter">{starterLabel}</div>

          <svg
            className="orr-svg workshop-diagram"
            viewBox="0 0 200 200"
            role="img"
            aria-hidden="true"
          >
            <circle className={coreClass} cx={100} cy={100} r={5} />
            <circle className={productRingClass} cx={100} cy={100} r={22} />
            <circle className={experienceRingClass} cx={100} cy={100} r={44} />
            <circle className={worldRingClass} cx={100} cy={100} r={66} />
            {hasAxis && (
              <g transform="rotate(-58 100 100)">
                <line className="orr-axis" x1={30} y1={100} x2={170} y2={100} />
              </g>
            )}
          </svg>

          <div className="workshop-fields-print">
            {([
              ["01 · Project name", draft.projectName],
              ["02 · We are building for", draft.audience],
              ["03 · And we believe", draft.belief],
              ["04 · Product — one useful thing they can do", draft.product],
              ["05 · Experience — the moment that matters", draft.experienceMoment],
              ["06 · Experience — the choice you’ll make", draft.experienceChoice],
              ["07 · World — one concrete invitation", draft.world],
              ["08 · Connection — the gap we’ll fix", draft.connection],
              ["09 · Next test", draft.nextTest],
            ] as const).map(([label, value]) => (
              <div key={label} className="workshop-print-field">
                <div className="workshop-print-field-label">{label}</div>
                <div
                  className={
                    "workshop-print-field-value" +
                    (hasText(value) ? "" : " workshop-print-field-value--empty")
                  }
                >
                  {hasText(value) ? value : "Not yet filled in"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
