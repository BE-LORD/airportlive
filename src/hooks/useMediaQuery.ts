"use client";

import { useSyncExternalStore } from "react";

type MediaQuerySubscribe = (onChange: () => void) => () => void;

const emptyUnsubscribe = () => {};

function createMediaQuerySubscribe(query: string): MediaQuerySubscribe {
  return (onChange) => {
    if (typeof window === "undefined") return emptyUnsubscribe;
    const mql = window.matchMedia(query);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  };
}

function createMediaQuerySnapshot(query: string): () => boolean {
  return () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  };
}

const serverSnapshot = () => false;

const cache = new Map<
  string,
  { subscribe: MediaQuerySubscribe; getSnapshot: () => boolean }
>();

function getOrCreate(query: string) {
  let entry = cache.get(query);
  if (!entry) {
    entry = {
      subscribe: createMediaQuerySubscribe(query),
      getSnapshot: createMediaQuerySnapshot(query),
    };
    cache.set(query, entry);
  }
  return entry;
}

export function useMediaQuery(query: string): boolean {
  const { subscribe, getSnapshot } = getOrCreate(query);
  return useSyncExternalStore(subscribe, getSnapshot, serverSnapshot);
}
