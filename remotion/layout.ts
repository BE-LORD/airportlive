// Layout descriptor shared by every scene so a single component tree renders
// correctly at both 1920x1080 (desktop) and 1080x1920 (vertical / reels).

export type LayoutName = "desktop" | "vertical";

export type LayoutInfo = {
  name: LayoutName;
  vertical: boolean;
  /** Multiplier applied to base font sizes tuned for a 1920px-wide frame. */
  fontScale: number;
};

export function getLayout(name: LayoutName): LayoutInfo {
  const vertical = name === "vertical";
  return {
    name,
    vertical,
    // The vertical frame is narrower, so text tuned for 1920px must shrink a
    // little to keep line lengths short, but not so much it becomes unreadable.
    fontScale: vertical ? 0.92 : 1,
  };
}
