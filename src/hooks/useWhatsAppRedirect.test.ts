import { describe, expect, it } from "vitest";

import { getWhatsAppFeedbackLabel, getWhatsAppOpenDelay } from "./useWhatsAppRedirect";

describe("WhatsApp redirect helpers", () => {
  it("keeps tap feedback fast for mobile conversion", () => {
    expect(getWhatsAppOpenDelay()).toBeLessThanOrEqual(150);
  });

  it("returns clear labels for idle, loading, and success states", () => {
    expect(getWhatsAppFeedbackLabel("idle", "Book on WhatsApp")).toBe("Book on WhatsApp");
    expect(getWhatsAppFeedbackLabel("opening", "Book on WhatsApp")).toBe("Opening WhatsApp...");
    expect(getWhatsAppFeedbackLabel("success", "Book on WhatsApp")).toBe("WhatsApp opened");
  });
});
