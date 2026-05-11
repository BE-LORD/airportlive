"use client";

import { useState, useEffect } from "react";

export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsTouch(
        "ontouchstart" in window ||
          (navigator.maxTouchPoints !== undefined &&
            navigator.maxTouchPoints > 0)
      );
    };

    check();
    window.addEventListener("touchstart", check, { once: true });
    return () => window.removeEventListener("touchstart", check);
  }, []);

  return isTouch;
}
