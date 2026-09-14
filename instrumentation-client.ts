import posthog from "posthog-js"

function initPostHog() {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
    defaults: '2025-05-24',
    capture_exceptions: true, // This enables capturing exceptions using Error Tracking
    debug: process.env.NODE_ENV === "development",
  })
}

// Defer past hydration: injecting posthog's loader script before React
// hydrates mutates the DOM and triggers hydration mismatch warnings.
if (document.readyState === "complete") {
  initPostHog()
} else {
  window.addEventListener("load", initPostHog, { once: true })
}
