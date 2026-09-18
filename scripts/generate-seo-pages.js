const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE_URL = 'https://www.alphacodeai.com';
const pages = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'src', 'data', 'authorityPages.json'), 'utf8')
);
const mode = process.argv[2] || 'public';
const targetRoot = path.join(ROOT, mode === 'build' ? 'build' : 'public');

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const absoluteUrl = (value) => `${SITE_URL}${value}`;

const renderSchema = (page) => {
  const mainEntity = page.kind === 'case-study'
    ? {
        '@type': 'Article',
        headline: page.title,
        description: page.description,
        image: absoluteUrl(page.heroImage),
        mainEntityOfPage: absoluteUrl(page.path),
        author: { '@type': 'Organization', name: 'AlphaCodeAI', url: SITE_URL },
        publisher: {
          '@type': 'Organization',
          name: 'AlphaCodeAI',
          url: SITE_URL,
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/alpha.png` }
        }
      }
    : {
        '@type': 'Service',
        name: page.title,
        description: page.description,
        url: absoluteUrl(page.path),
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

  return {
    '@context': 'https://schema.org',
    '@graph': [
      mainEntity,
      {
        '@type': 'FAQPage',
        mainEntity: page.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer }
        }))
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'AlphaCodeAI', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: page.title, item: absoluteUrl(page.path) }
        ]
      }
    ]
  };
};

const renderStaticBody = (page) => `
<main class="authority-page authority-page--${escapeHtml(page.kind)}">
  <header class="authority-hero">
    <div class="authority-shell authority-hero__inner">
      <nav class="authority-breadcrumb" aria-label="Breadcrumb"><a href="/">AlphaCodeAI</a><span>/</span><span>${page.kind === 'case-study' ? 'Case study' : 'AI services'}</span></nav>
      <div class="authority-hero__copy">
        <p class="authority-eyebrow">${escapeHtml(page.eyebrow)}</p>
        <h1>${escapeHtml(page.title)}</h1>
        <p class="authority-hero__lede">${escapeHtml(page.lede)}</p>
        <div class="authority-hero__actions"><a class="authority-button authority-button--primary" href="mailto:aryanchandwani@gmail.com?subject=AlphaCodeAI%20project%20enquiry">Discuss a project</a></div>
      </div>
      <aside class="authority-hero__signal"><span>AlphaCodeAI / ${escapeHtml(page.kind.replace('-', ' '))}</span><strong>${escapeHtml(page.promise)}</strong><i></i><small>Production-grade systems · Mumbai / Worldwide</small></aside>
    </div>
  </header>
  ${page.heroImage ? `<div class="authority-shell authority-project-image"><img src="${escapeHtml(page.heroImage)}" alt="${escapeHtml(page.title)} project view" width="1536" height="1024"></div>` : ''}
  <section class="authority-service-nav" aria-label="Related capabilities"><div class="authority-shell"><span>Explore</span><div>${page.services.map((service) => `<a href="${escapeHtml(service.href)}">${escapeHtml(service.label)}</a>`).join('')}</div></div></section>
  <div class="authority-shell authority-sections">
    ${page.sections.map((section, index) => `
      <section class="authority-section">
        <div class="authority-section__heading"><span>0${index + 1}</span><div><p class="authority-eyebrow">${escapeHtml(section.kicker)}</p><h2>${escapeHtml(section.title)}</h2></div></div>
        <div class="authority-section__content"><p>${escapeHtml(section.body)}</p><ul>${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></div>
      </section>`).join('')}
  </div>
  ${page.proof.length ? `<section class="authority-proof"><div class="authority-shell"><div class="authority-proof__intro"><p class="authority-eyebrow">Selected work</p><h2>Evidence over adjectives.</h2><p>Real operating problems shaped into products people can understand and use.</p></div><div class="authority-proof__grid">${page.proof.map((proof) => `<a class="authority-proof-card" href="${escapeHtml(proof.href)}"><img src="${escapeHtml(proof.image)}" alt="" width="1536" height="1024"><span>${escapeHtml(proof.client)}</span><h3>${escapeHtml(proof.title)}</h3><b>Read case study</b></a>`).join('')}</div></div></section>` : ''}
  <section class="authority-faq"><div class="authority-shell authority-faq__grid"><div><p class="authority-eyebrow">Common questions</p><h2>Clear answers before we start.</h2></div><div class="authority-faq__list">${page.faqs.map((faq) => `<details open><summary>${escapeHtml(faq.question)}</summary><p>${escapeHtml(faq.answer)}</p></details>`).join('')}</div></div></section>
  <section class="authority-cta"><div class="authority-shell authority-cta__inner"><p class="authority-eyebrow">Start with the real workflow</p><h2>Bring us the complicated part.</h2><p>Tell us what your team is trying to improve, what information is available and where the current process breaks.</p><a class="authority-button authority-button--primary" href="mailto:aryanchandwani@gmail.com?subject=AlphaCodeAI%20project%20enquiry">aryanchandwani@gmail.com</a></div></section>
</main>`;

const updateHead = (html, page) => {
  const title = `${page.title} | AlphaCodeAI`;
  const canonical = absoluteUrl(page.path);
  const image = absoluteUrl(page.heroImage || '/cosmic-hero-poster.webp');
  const structuredData = JSON.stringify(renderSchema(page)).replaceAll('<', '\\u003c');

  return html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta\s+name="description"[\s\S]*?>/i, `<meta name="description" content="${escapeHtml(page.description)}" />`)
    .replace('</head>', `  <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:type" content="${page.kind === 'case-study' ? 'article' : 'website'}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${image}" />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json" data-seo-structured>${structuredData}</script>
  </head>`)
    .replace(/<div id="root"><\/div>/i, `<div id="root">${renderStaticBody(page)}</div>`);
};

const renderSitemap = () => {
  const urls = ['/', ...pages.map((page) => page.path)];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${absoluteUrl(url)}</loc><lastmod>2026-09-19</lastmod><changefreq>${url === '/' ? 'weekly' : 'monthly'}</changefreq></url>`).join('\n')}
</urlset>\n`;
};

fs.mkdirSync(targetRoot, { recursive: true });
fs.writeFileSync(path.join(targetRoot, 'sitemap.xml'), renderSitemap());

if (mode === 'build') {
  const baseHtml = fs.readFileSync(path.join(targetRoot, 'index.html'), 'utf8');
  pages.forEach((page) => {
    const directory = path.join(targetRoot, page.path.replace(/^\//, ''));
    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(path.join(directory, 'index.html'), updateHead(baseHtml, page));
  });
  process.stdout.write(`Generated ${pages.length} crawlable landing pages and sitemap.\n`);
} else {
  process.stdout.write(`Generated sitemap with ${pages.length + 1} URLs.\n`);
}
