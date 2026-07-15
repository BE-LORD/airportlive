"use client";

/**
 * Analytics — Spec: 11_SEO_ANALYTICS_QA.md #4
 * Event tracking for conversion funnel analysis.
 * All events are prefixed by action and suffixed by location.
 */

export type AnalyticsEvent =
  | "whatsapp_click"
  | "whatsapp_click_hero"
  | "whatsapp_click_nav"
  | "whatsapp_click_nav_mobile"
  | "whatsapp_click_route"
  | "whatsapp_click_hiw"
  | "whatsapp_click_final"
  | "whatsapp_click_bar"
  | "whatsapp_click_footer"
  | "call_click"
  | "call_click_hero"
  | "call_click_nav"
  | "call_click_nav_mobile"
  | "call_click_final"
  | "call_click_bar"
  | "call_click_footer"
  | "email_click"
  | "email_click_final"
  | "email_click_footer"
  | "booking_submit"
  | "hero_cta_click"
  | "nav_link_click"
  | "faq_expand"
  | "copy_booking_format"
  | "scroll_depth";

export function trackEvent(
  event: AnalyticsEvent,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;

  try {
    // Google Analytics 4
    if (typeof window.gtag === "function") {
      window.gtag("event", event, params);
    }

    // Fallback: console log in development
    if (process.env.NODE_ENV === "development") {
      console.log("[Analytics]", event, params);
    }
  } catch {
    // Silently fail if analytics is not available
  }
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
