"use client";

import { useState, useEffect } from "react";
import { getDeviceTier, type DeviceTier } from "@/lib/device";

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>("high");

  useEffect(() => {
    setTier(getDeviceTier());
  }, []);

  return tier;
}
