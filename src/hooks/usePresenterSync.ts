import { useState, useEffect, useCallback, useRef } from "react";

export type PresenterMessage =
  | { type: "navigate"; sectionId: string; viewIndex: number }
  | { type: "ping" }
  | { type: "pong" };

type UsePresenterSyncOptions = {
  onNavigate: (sectionId: string, viewIndex: number) => void;
};

type UsePresenterSyncReturn = {
  /** false when BroadcastChannel is unavailable */
  supported: boolean;
  /** true when a peer tab has responded to a ping */
  connected: boolean;
  /** Broadcast a navigate message to the other tab */
  broadcast: (sectionId: string, viewIndex: number) => void;
};

export function usePresenterSync({
  onNavigate,
}: UsePresenterSyncOptions): UsePresenterSyncReturn {
  const supported = typeof BroadcastChannel !== "undefined";
  const [connected, setConnected] = useState(false);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const pingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pongTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Store the latest onNavigate in a ref so the channel listener
  // never becomes stale without re-creating the channel.
  const onNavigateRef = useRef(onNavigate);
  useEffect(() => {
    onNavigateRef.current = onNavigate;
  }, [onNavigate]);

  useEffect(() => {
    if (!supported) return;

    const channel = new BroadcastChannel("baw-presenter");
    channelRef.current = channel;

    channel.onmessage = (event: MessageEvent<PresenterMessage>) => {
      const msg = event.data;
      switch (msg.type) {
        case "navigate":
          onNavigateRef.current(msg.sectionId, msg.viewIndex);
          break;
        case "ping":
          channel.postMessage({ type: "pong" } satisfies PresenterMessage);
          break;
        case "pong":
          setConnected(true);
          // Reset the pong timeout — peer is alive
          if (pongTimeoutRef.current) {
            clearTimeout(pongTimeoutRef.current);
          }
          pongTimeoutRef.current = setTimeout(() => {
            // If we don't hear a pong after 6s, mark disconnected.
            // The next ping cycle will try again.
            setConnected(false);
          }, 6000);
          break;
      }
    };

    // Ping every 3 seconds to check for peer
    const sendPing = () => {
      channel.postMessage({ type: "ping" } satisfies PresenterMessage);
    };
    sendPing(); // initial ping
    pingIntervalRef.current = setInterval(sendPing, 3000);

    return () => {
      channel.close();
      channelRef.current = null;
      if (pingIntervalRef.current) clearInterval(pingIntervalRef.current);
      if (pongTimeoutRef.current) clearTimeout(pongTimeoutRef.current);
    };
  }, [supported]);

  const broadcast = useCallback(
    (sectionId: string, viewIndex: number) => {
      channelRef.current?.postMessage({
        type: "navigate",
        sectionId,
        viewIndex,
      } satisfies PresenterMessage);
    },
    []
  );

  return { supported, connected, broadcast };
}
