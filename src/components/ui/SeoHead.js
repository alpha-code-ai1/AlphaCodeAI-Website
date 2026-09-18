import { useEffect } from 'react';

const SITE_URL = 'https://www.alphacodeai.com';
const DEFAULT_IMAGE = `${SITE_URL}/cosmic-hero-poster.webp`;

const ensureMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
};

const ensureLink = (rel, href) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

const SeoHead = ({ page }) => {
  useEffect(() => {
    if (!page) return undefined;

    const canonical = `${SITE_URL}${page.path}`;
    const title = `${page.title} | AlphaCodeAI`;
    const image = page.heroImage ? `${SITE_URL}${page.heroImage}` : DEFAULT_IMAGE;
    const schema = page.kind === 'case-study'
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: page.title,
          description: page.description,
          image,
          mainEntityOfPage: canonical,
          author: { '@type': 'Organization', name: 'AlphaCodeAI', url: SITE_URL },
          publisher: {
            '@type': 'Organization',
            name: 'AlphaCodeAI',
            url: SITE_URL,
            logo: { '@type': 'ImageObject', url: `${SITE_URL}/alpha.png` }
          }
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: page.title,
          description: page.description,
          url: canonical,
          areaServed: page.kind === 'location'
            ? { '@type': 'City', name: 'Mumbai' }
            : [{ '@type': 'Country', name: 'India' }, 'Worldwide'],
          provider: {
            '@type': 'Organization',
            name: 'AlphaCodeAI',
            url: SITE_URL,
            telephone: '+91-8850313109',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Mumbai',
              addressRegion: 'Maharashtra',
              addressCountry: 'IN'
            }
          }
        };

    document.title = title;
    ensureMeta('meta[name="description"]', { name: 'description', content: page.description });
    ensureMeta('meta[name="robots"]', { name: 'robots', content: 'index, follow, max-image-preview:large' });
    ensureMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    ensureMeta('meta[property="og:description"]', { property: 'og:description', content: page.description });
    ensureMeta('meta[property="og:type"]', { property: 'og:type', content: page.kind === 'case-study' ? 'article' : 'website' });
    ensureMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    ensureMeta('meta[property="og:image"]', { property: 'og:image', content: image });
    ensureMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    ensureLink('canonical', canonical);

    let structuredData = document.head.querySelector('script[data-seo-structured]');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.type = 'application/ld+json';
      structuredData.dataset.seoStructured = 'true';
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify(schema);

    return () => {
      structuredData?.remove();
    };
  }, [page]);

  return null;
};

export default SeoHead;
