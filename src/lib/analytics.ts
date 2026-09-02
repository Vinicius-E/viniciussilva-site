/* =========================================================================
   Analytics foundation. Approved spec §G / §17.

   No third-party script loads in preview — there is nothing to point it at
   yet. This module only:
     1. defines the event names used across the site (data-analytics="...")
     2. ships a tiny click delegator that forwards those events to whatever
        privacy-friendly provider is wired in later (Cloudflare Web Analytics
        custom events, or Plausible), and no-ops until then.

   TODO[analytics]: choose provider (Cloudflare Web Analytics or Plausible),
   add its script tag in BaseHead, and set PROVIDER below.
   ========================================================================= */

export type AnalyticsEvent =
  | 'cta_hero_work'
  | 'cta_hero_contact'
  | 'cta_footer_contact'
  | 'cta_case_contact'
  | 'resume_download'
  | 'case_open'
  | 'case_back'
  | 'contact_email'
  | 'contact_email_copy'
  | 'out_linkedin'
  | 'out_github';

export const PROVIDER: 'none' | 'plausible' | 'cloudflare' = 'none';

/** Inlined verbatim into a <script> in BaseHead. Keep tiny and dependency-free. */
export const clientScript = `
(function () {
  function send(name, props) {
    try {
      if (window.plausible) { window.plausible(name, props ? { props: props } : undefined); return; }
      if (window.__cfBeacon && window.__cfBeacon.trackEvent) { window.__cfBeacon.trackEvent(name, props || {}); return; }
    } catch (e) {}
  }
  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest ? e.target.closest('[data-analytics]') : null;
    if (!el) return;
    send(el.getAttribute('data-analytics'), el.getAttribute('data-analytics-label') || undefined);
  }, { passive: true });
})();
`.trim();
