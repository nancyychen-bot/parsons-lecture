import { useEffect } from "react";

const INTERACTIVE_TAGS = new Set([
  "INPUT",
  "TEXTAREA",
  "SELECT",
  "BUTTON",
]);

function isInInteractiveElement(): boolean {
  const el = document.activeElement;
  if (!el) return false;
  if (INTERACTIVE_TAGS.has(el.tagName)) return true;
  if ((el as HTMLElement).isContentEditable) return true;
  if (el.getAttribute("role") === "textbox") return true;
  return false;
}

type KeyboardNavHandlers = {
  onNext: () => void;
  onPrev: () => void;
  onEscape?: () => void;
  onPresenter?: () => void;
  enabled: boolean;
};

export function useKeyboardNav({
  onNext,
  onPrev,
  onEscape,
  onPresenter,
  enabled,
}: KeyboardNavHandlers) {
  useEffect(() => {
    if (!enabled) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (isInInteractiveElement()) return;

      switch (e.key) {
        case "ArrowRight":
        case " ":
          e.preventDefault();
          onNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          onPrev();
          break;
        case "Escape":
          if (onEscape) {
            e.preventDefault();
            onEscape();
          }
          break;
        case "p":
        case "P":
          if (onPresenter) {
            e.preventDefault();
            onPresenter();
          }
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enabled, onNext, onPrev, onEscape, onPresenter]);
}
