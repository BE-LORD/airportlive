"use client";

import { useState, useEffect } from "react";
import { getDeviceTier, type DeviceTier } from "@/lib/device";

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>(() => getDeviceTier());

  useEffect(() => {
    const updateTier = () => setTier(getDeviceTier());
    window.addEventListener("resize", updateTier);
    return () => window.removeEventListener("resize", updateTier);
  }, []);

  return tier;
}
