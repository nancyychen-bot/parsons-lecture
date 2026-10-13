import { useState, useCallback, useEffect, useRef } from "react";
import type { WorkshopDraft } from "../types";

const STORAGE_KEY = "baw.workshop.v1";
const DEBOUNCE_MS = 400;

const EMPTY_DRAFT: WorkshopDraft = {
  version: 1,
  updatedAt: "",
  starter: "empower",
  projectName: "",
  audience: "",
  belief: "",
  product: "",
  experienceMoment: "",
  experienceChoice: "",
  world: "",
  connection: "",
  nextTest: "",
};

export type SaveStatus =
  | { kind: "saved"; label: string }
  | { kind: "warning"; label: string };

function storageAvailable(): boolean {
  try {
    const key = "__baw_test__";
    localStorage.setItem(key, "1");
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

function readFromStorage(): WorkshopDraft | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "version" in parsed &&
      (parsed as WorkshopDraft).version === 1
    ) {
      return parsed as WorkshopDraft;
    }
    return null;
  } catch {
    return null;
  }
}

function writeToStorage(draft: WorkshopDraft): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    return true;
  } catch {
    // Storage full or unavailable
    return false;
  }
}

function hasContent(draft: WorkshopDraft): boolean {
  return (
    draft.projectName !== "" ||
    draft.audience !== "" ||
    draft.belief !== "" ||
    draft.product !== "" ||
    draft.experienceMoment !== "" ||
    draft.experienceChoice !== "" ||
    draft.world !== "" ||
    draft.connection !== "" ||
    draft.nextTest !== ""
  );
}

export function useWorkshopDraft() {
  const canPersist = useRef(storageAvailable());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [draft, setDraftState] = useState<WorkshopDraft>(() => {
    if (canPersist.current) {
      return readFromStorage() ?? { ...EMPTY_DRAFT };
    }
    return { ...EMPTY_DRAFT };
  });

  const [status, setStatus] = useState<SaveStatus>(() => {
    if (!canPersist.current) {
      return {
        kind: "warning",
        label:
          "This browser won’t save your answers. Copy or print before closing.",
      };
    }
    const existing = readFromStorage();
    if (existing && hasContent(existing)) {
      return { kind: "saved", label: "Saved in this browser" };
    }
    return { kind: "saved", label: "Saved in this browser" };
  });

  // Debounced save whenever draft changes
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      if (!canPersist.current) return;
      const ok = writeToStorage(draft);
      if (ok) {
        setStatus({ kind: "saved", label: "Saved in this browser" });
      } else {
        canPersist.current = false;
        setStatus({
          kind: "warning",
          label:
            "This browser won’t save your answers. Copy or print before closing.",
        });
      }
    }, DEBOUNCE_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [draft]);

  const updateDraft = useCallback(
    (field: keyof Omit<WorkshopDraft, "version">, value: string) => {
      setDraftState((prev) => ({
        ...prev,
        [field]: value,
        updatedAt: new Date().toISOString(),
      }));
    },
    [],
  );

  const resetDraft = useCallback(() => {
    if (hasContent(draft)) {
      const confirmed = window.confirm(
        "This will clear all your answers. Are you sure?",
      );
      if (!confirmed) return;
    }
    const fresh = { ...EMPTY_DRAFT, updatedAt: new Date().toISOString() };
    setDraftState(fresh);
    if (canPersist.current) {
      writeToStorage(fresh);
    }
  }, [draft]);

  return { draft, updateDraft, resetDraft, status, hasContent: hasContent(draft) } as const;
}
