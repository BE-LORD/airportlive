import { describe, expect, it } from "vitest";

import {
  buildRevealVariants,
  motionDurations,
  motionEases,
  motionTokens,
} from "./motion";

describe("premium motion tokens", () => {
  it("exposes the approved cinematic easing curves", () => {
    expect(motionEases.mainEase).toEqual([0.22, 1, 0.36, 1]);
    expect(motionEases.softEase).toEqual([0.16, 1, 0.3, 1]);
    expect(motionEases.quickEase).toEqual([0.2, 0.8, 0.2, 1]);
  });

  it("keeps mobile reveal travel shorter than desktop reveal travel", () => {
    expect(motionTokens.distance.mobile).toBeLessThan(motionTokens.distance.section);
    expect(motionTokens.distance.mobile).toBeGreaterThanOrEqual(12);
    expect(motionTokens.distance.mobile).toBeLessThanOrEqual(20);
  });

  it("builds reduced-motion-safe reveal variants", () => {
    const regular = buildRevealVariants({ y: 40, duration: motionDurations.sectionReveal });
    const reduced = buildRevealVariants({
      y: 40,
      duration: motionDurations.sectionReveal,
      reducedMotion: true,
    });

    expect(regular.hidden).toMatchObject({ opacity: 0, y: 40 });
    expect(regular.visible.transition).toMatchObject({ duration: motionDurations.sectionReveal });
    expect(reduced.hidden).toEqual({ opacity: 0 });
    expect(reduced.visible).toEqual({ opacity: 1, transition: { duration: 0.01 } });
  });
});
