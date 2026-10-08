export const GA4_MEASUREMENT_ID = 'G-2D235NHGT3';

// Only fixed event labels belong here. Never include draft messages or link URLs.
export function trackAnalyticsEvent(event, parameters) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, {
      send_to: GA4_MEASUREMENT_ID,
      ...parameters,
    });
  }
}

export function trackSiteContact(event) {
  const link = event.target.closest?.('a[href]');
  if (!link) return;
  const href = link.getAttribute('href') || '';
  const channel = /^https:\/\/(?:wa\.me|api\.whatsapp\.com)\//i.test(href)
    ? 'whatsapp'
    : /^mailto:/i.test(href)
      ? 'email'
      : /^tel:/i.test(href)
        ? 'phone'
        : null;
  if (!channel) return;
  trackAnalyticsEvent('contact_intent', {
    landing_page: window.location.pathname,
    contact_channel: channel,
    contact_placement: 'website',
  });
}
