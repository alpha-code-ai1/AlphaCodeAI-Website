const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const authority = require("../src/data/authorityPages.json");
const sales = require("../src/data/salesPages.json");
const offers = require('../src/data/funnelOffers.json');
const root = path.resolve(__dirname, "../build");
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const allPages = [...authority, ...sales];
for (const page of allPages) {
  const html = fs.readFileSync(
    path.join(root, page.path, "index.html"),
    "utf8",
  );
  for (const pattern of [
    /<link\b[^>]*rel="canonical"[^>]*>/g,
    /<meta\b[^>]*name="description"[^>]*>/g,
    /<meta\b[^>]*name="robots"[^>]*>/g,
    /<meta\b[^>]*property="og:url"[^>]*>/g,
    /<h1[ >]/g,
  ]) {
    assert.equal(
      [...html.matchAll(pattern)].length,
      1,
      `${page.path}: duplicate or missing ${pattern}`,
    );
  }
  assert.ok(
    html.includes(
      `rel="canonical" href="https://www.alphacodeai.com${page.path}"`,
    ),
  );
  assert.ok(!html.includes("noindex"));
  assert.ok(
    sitemap.includes(`<loc>https://www.alphacodeai.com${page.path}</loc>`),
  );
  const schema = JSON.parse(
    html.match(
      /<script type="application\/ld\+json" data-seo-structured>(.*?)<\/script>/s,
    )[1],
  );
  assert.equal(
    schema["@graph"].find((entity) => entity["@type"] === "FAQPage").mainEntity
      .length,
    page.faqs.length,
  );
  if (page.theme) {
    assert.ok(html.includes('data-theme="dark"'), `${page.path}: dark first paint`);
    assert.ok(html.includes('class="app-root app-dark"'), `${page.path}: dark static content`);
    assert.ok(html.includes('class="campaign-brand-icon" src="/alpha.png"'), `${page.path}: original logo`);
    assert.ok(html.includes(offers[page.theme].headline.replaceAll("'", '&#x27;')));
    assert.ok(html.includes(offers[page.theme].highlight.replaceAll("'", '&#x27;')));
    assert.ok(html.includes("https://wa.me/918850313109?text="));
    assert.ok(html.includes("mailto:aryanchandwani@gmail.com"));
    assert.ok(html.includes('id="project-brief"'));
    const parent = fs.readFileSync(
      path.join(root, page.parent, "index.html"),
      "utf8",
    );
    assert.ok(
      parent.includes(`href="${page.path}"`),
      `Missing incoming link: ${page.path}`,
    );
    assert.ok(html.includes('content="#000000"'), `${page.path}: black browser theme`);
    assert.ok(html.includes(`src="${page.heroImage}"`), `${page.path}: hero image`);
    for (const image of [page.proof.image, page.proof.darkImage, page.heroImage, page.heroImage.replace('.webp', '-640.webp')])
      assert.ok(fs.existsSync(path.join(root, image)), image);
    for (const section of page.uses)
      assert.ok(html.includes(section.title.replaceAll("&", "&amp;")));
  }
}
assert.equal([...sitemap.matchAll(/<url>/g)].length, allPages.length + 1);
console.log(
  `Verified ${allPages.length} crawlable pages: unique metadata, canonicals, schema, sitemap, sales content, assets and incoming links.`,
);
