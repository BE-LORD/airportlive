"use client";

import { useCallback, useRef, useState } from "react";

export type WhatsAppRedirectState = "idle" | "opening" | "success";

const WHATSAPP_OPEN_DELAY_MS = 120;

export function getWhatsAppOpenDelay() {
  return WHATSAPP_OPEN_DELAY_MS;
}

export function getWhatsAppFeedbackLabel(
  state: WhatsAppRedirectState,
  idleLabel: string
) {
  if (state === "opening") return "Opening WhatsApp...";
  if (state === "success") return "WhatsApp opened";
  return idleLabel;
}

export function useWhatsAppRedirect(url: string, idleLabel = "Book on WhatsApp") {
  const [state, setState] = useState<WhatsAppRedirectState>("idle");
  const timerRef = useRef<number | null>(null);

  const open = useCallback(
    (event?: React.MouseEvent<HTMLElement>) => {
      event?.preventDefault();
      if (state === "opening") return;

      setState("opening");
      timerRef.current = window.setTimeout(() => {
        window.open(url, "_blank", "noopener,noreferrer");
        setState("success");
        window.setTimeout(() => setState("idle"), 1200);
      }, WHATSAPP_OPEN_DELAY_MS);
    },
    [state, url]
  );

  const clear = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  return {
    state,
    open,
    clear,
    label: getWhatsAppFeedbackLabel(state, idleLabel),
    isOpening: state === "opening",
  } as const;
}
