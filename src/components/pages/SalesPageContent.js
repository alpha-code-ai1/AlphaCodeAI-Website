import React from "react";

// Kept free of browser dependencies: this exact content is also rendered at build time.
export default function SalesPageContent({ page, contact, themeControl }) {
  const whatsapp = `https://wa.me/918850313109?text=${encodeURIComponent(`Hi AlphaCodeAI, I'd like to discuss ${page.title}.\nPage: https://www.alphacodeai.com${page.path}`)}`;
  return (
    <div className={`sales-page sales-page--${page.theme}`}>
      <a className="sales-skip" href="#sales-main">
        Skip to content
      </a>
      <header className="sales-header">
        <a href="/" className="sales-brand" aria-label="AlphaCodeAI home">
          <span aria-hidden="true">a.</span>AlphaCodeAI
        </a>
        <div className="sales-header-actions">
          {themeControl}
          <a className="sales-button sales-button--small" href="#project-brief">
            Let’s talk <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>
      <main id="sales-main">
        <section className="sales-hero sales-shell">
          <div className="sales-hero-copy">
            <p className="sales-eyebrow">
              <span className="sales-dot" />
              {page.eyebrow}
            </p>
            <h1>
              <span className="sales-service-name">{page.title}</span>
              {page.headline}
            </h1>
            <p className="sales-lede">{page.lede}</p>
            <div className="sales-actions">
              <a className="sales-button" href="#project-brief">
                {page.cta}
                <span aria-hidden="true">↗</span>
              </a>
              <a
                className="sales-text-link"
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                data-contact-channel="whatsapp"
                data-contact-placement="hero"
              >
                Or chat on WhatsApp ↗
              </a>
            </div>
            <p className="sales-quiet">
              A direct conversation. No long form. No obligation to build.
            </p>
          </div>
          <div
            className="sales-blueprint"
            aria-label={`Illustrative workflow: ${page.flowTitle}`}
          >
            <div className="sales-blueprint-top">
              <span>ALPHA / FIELD NOTES</span>
              <span>↗</span>
            </div>
            <div className="sales-blueprint-heading">
              <span className="sales-spark" aria-hidden="true">
                ✳
              </span>
              <h2>{page.flowTitle}</h2>
            </div>
            <ol className="sales-flow">
              {page.flow.map((step, index) => (
                <li key={step.label}>
                  <span className="sales-flow-number" aria-hidden="true">
                    {index + 1}
                  </span>
                  <div>
                    <small>{step.label}</small>
                    <strong>{step.title}</strong>
                    <p>{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="sales-blueprint-note">
              Illustrative flow · tailored to your systems
            </p>
          </div>
        </section>
        <div className="sales-strip">
          <div className="sales-shell">
            <span>{page.audience}</span>
            <span>Mumbai-based. Built for teams everywhere. ↗</span>
          </div>
        </div>
        <section
          className="sales-section sales-shell"
          aria-labelledby="sales-problem"
        >
          <div className="sales-section-heading">
            <p className="sales-eyebrow">01 / The opportunity</p>
            <h2 id="sales-problem">{page.problemTitle}</h2>
            <p>{page.problemBody}</p>
          </div>
          <div className="sales-use-grid">
            {page.uses.map((use, index) => (
              <article className="sales-use-card" key={use.title}>
                <span className="sales-card-index">
                  0{index + 1}
                  <span aria-hidden="true">↗</span>
                </span>
                <h3>{use.title}</h3>
                <p>{use.body}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="sales-scope-band">
          <div className="sales-shell sales-scope-grid">
            <div>
              <p className="sales-eyebrow">02 / A useful first build</p>
              <h2>{page.scopeTitle}</h2>
              <p className="sales-scope-intro">
                Clear deliverables. Clear boundaries. Something your team can
                actually use.
              </p>
              <a className="sales-text-link" href="#project-brief">
                Talk through your scope <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div>
              <ul className="sales-checklist">
                {page.scope.map((item) => (
                  <li key={item}>
                    <span aria-hidden="true">↗</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="sales-cost">
                <strong>What affects cost & timing?</strong>
                <p>{page.cost}</p>
              </div>
            </div>
          </div>
        </section>
        <section
          className="sales-section sales-shell sales-proof"
          aria-labelledby="sales-proof-heading"
        >
          <a
            className="sales-proof-art"
            href={page.proof.href}
            aria-label={`Read the ${page.proof.client} case study`}
          >
            <img
              className="sales-image-light"
              src={page.proof.image}
              alt=""
              width="1536"
              height="1024"
              loading="lazy"
            />
            <img
              className="sales-image-dark"
              src={page.proof.darkImage}
              alt=""
              width="1536"
              height="1024"
              loading="lazy"
            />
            <span>{page.proof.client} / Selected work ↗</span>
          </a>
          <div>
            <p className="sales-eyebrow">03 / The thinking behind the work</p>
            <h2 id="sales-proof-heading">{page.proof.title}</h2>
            <p>{page.proof.body}</p>
            <a href={page.proof.href} className="sales-text-link">
              Read the {page.proof.client} case study{" "}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
        <section
          className="sales-section sales-shell sales-process"
          aria-labelledby="sales-process-heading"
        >
          <div className="sales-section-heading">
            <p className="sales-eyebrow">04 / From question to first release</p>
            <h2 id="sales-process-heading">
              Small enough to start.
              <br />
              Clear enough to move.
            </h2>
          </div>
          <ol className="sales-process-grid">
            {page.steps.map((step, index) => (
              <li key={step.title}>
                <span>0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="sales-fit">
            <div>
              <strong>A good fit</strong>
              <p>{page.fit}</p>
            </div>
            <div>
              <strong>Worth knowing first</strong>
              <p>{page.notFit}</p>
            </div>
          </div>
        </section>
        <section
          className="sales-section sales-shell sales-faq"
          aria-labelledby="sales-faq-heading"
        >
          <div>
            <p className="sales-eyebrow">05 / Before you decide</p>
            <h2 id="sales-faq-heading">
              Good questions.
              <br />
              Straight answers.
            </h2>
          </div>
          <div>
            {page.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  {faq.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section
          className="sales-contact-band"
          id="project-brief"
          aria-labelledby="sales-contact-heading"
        >
          <div className="sales-shell sales-contact-grid">
            <div>
              <p className="sales-eyebrow">Your next move</p>
              <h2 id="sales-contact-heading">{page.offer}</h2>
              <p>{page.offerBody}</p>
              <div className="sales-contact-person">
                <span aria-hidden="true">AC↗</span>
                <div>
                  <strong>Talk to AlphaCodeAI</strong>
                  <small>Mumbai, India · Working with teams worldwide</small>
                </div>
              </div>
              <a
                className="sales-text-link"
                href="tel:+918850313109"
                data-contact-channel="phone"
                data-contact-placement="brief"
              >
                Prefer a call? +91 88503 13109 ↗
              </a>
            </div>
            <div className="sales-brief-card">
              {contact || (
                <>
                  <h3>Let’s talk about your project.</h3>
                  <p>
                    No detailed specification needed. A short description is
                    enough to start.
                  </p>
                  <a
                    className="sales-button"
                    href={whatsapp}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Start on WhatsApp ↗
                  </a>
                  <a
                    className="sales-text-link"
                    href={`mailto:aryanchandwani@gmail.com?subject=${encodeURIComponent(page.title)}`}
                  >
                    Or email Aryan ↗
                  </a>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer className="sales-footer sales-shell">
        <a className="sales-brand" href="/">
          AlphaCodeAI<span aria-hidden="true">↗</span>
        </a>
        <div>
          <a href={page.parent}>{page.parentLabel}</a>
          <a href="/">Back to the main site</a>
          <a href="mailto:aryanchandwani@gmail.com">Email us</a>
        </div>
        <p>Thoughtful engineering. Useful outcomes.</p>
      </footer>
    </div>
  );
}
