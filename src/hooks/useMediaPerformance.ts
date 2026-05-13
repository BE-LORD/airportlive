"use client";

import { useEffect, useState } from "react";
import { getDeviceTier, isMobile } from "@/lib/device";
import { useReducedMotion } from "./useReducedMotion";

export function useMediaPerformance() {
  const reducedMotion = useReducedMotion();
  const [state, setState] = useState({
    isMobile: false,
    lowPower: false,
    saveData: false,
    canUseParallax: false,
    canUseSmoothScroll: false,
  });

  useEffect(() => {
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    const saveData = Boolean(connection?.saveData);
    const slowConnection =
      connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g";
    const mobile = isMobile() || window.matchMedia("(pointer: coarse)").matches;
    const lowPower = getDeviceTier() === "low" || saveData || slowConnection;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    // eslint-disable-next-line
    setState({
      isMobile: mobile,
      lowPower,
      saveData,
      canUseParallax: !reducedMotion && !mobile && !lowPower,
      canUseSmoothScroll: !reducedMotion && !mobile && !lowPower && finePointer,
    });
  }, [reducedMotion]);

  return state;
}
