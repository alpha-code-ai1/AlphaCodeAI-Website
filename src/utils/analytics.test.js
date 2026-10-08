import { GA4_MEASUREMENT_ID, trackAnalyticsEvent, trackSiteContact } from './analytics';
import { trackContact, trackFunnel } from '../components/pages/SalesLandingPage';

afterEach(() => {
  delete window.gtag;
  delete window.dataLayer;
});

test('events target only GA4, not an unconfigured Ads conversion', () => {
  window.gtag = jest.fn();
  trackAnalyticsEvent('funnel_progress', { funnel_stage: 'starter_plan_view' });
  expect(window.gtag).toHaveBeenCalledWith('event', 'funnel_progress', {
    send_to: GA4_MEASUREMENT_ID,
    funnel_stage: 'starter_plan_view',
  });
});

test('campaign tracking sends fixed labels without brief text', () => {
  window.gtag = jest.fn();
  const page = { path: '/landing/', details: 'private enquiry' };
  trackContact(page, 'whatsapp', 'brief');
  trackFunnel(page, 'starter_plan_download');
  expect(window.gtag).toHaveBeenNthCalledWith(1, 'event', 'contact_intent', {
    send_to: GA4_MEASUREMENT_ID,
    landing_page: '/landing/',
    contact_channel: 'whatsapp',
    contact_placement: 'brief',
  });
  expect(JSON.stringify(window.gtag.mock.calls)).not.toContain('private enquiry');
  expect(window.gtag.mock.calls[1][2].funnel_stage).toBe('starter_plan_download');
});

test('main-site contact tracking omits link query strings and message text', () => {
  window.gtag = jest.fn();
  const link = document.createElement('a');
  link.href = 'https://wa.me/918850313109?text=private-enquiry';
  const child = document.createElement('span');
  link.append(child);
  trackSiteContact({ target: child });
  expect(window.gtag).toHaveBeenCalledWith('event', 'contact_intent', {
    send_to: GA4_MEASUREMENT_ID,
    landing_page: '/',
    contact_channel: 'whatsapp',
    contact_placement: 'website',
  });
  expect(JSON.stringify(window.gtag.mock.calls)).not.toContain('private-enquiry');
});

test('unrelated links and unavailable tracking are harmless', () => {
  expect(() => trackAnalyticsEvent('contact_intent', {})).not.toThrow();
  window.gtag = jest.fn();
  const link = document.createElement('a');
  link.href = '/services/';
  trackSiteContact({ target: link });
  expect(window.gtag).not.toHaveBeenCalled();
});
