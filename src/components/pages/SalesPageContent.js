import React, { useState } from "react";
import offers from "../../data/funnelOffers.json";
import plans from "../../data/funnelPlans.json";

const Arrow = () => <span aria-hidden="true">↗</span>;
const Check = () => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="m4 10 4 4 8-8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function ProductPreview({ page }) {
  const offer = offers[page.theme];
  const [selected, setSelected] = useState(0);
  const scene = offer.scenarios[selected];
  return (
    <div className={`funnel-preview funnel-preview--${page.theme}`}>
      <div className="funnel-preview-glow" aria-hidden="true" />
      <div className="funnel-product">
        <div className="funnel-product-chrome">
          <span className="funnel-product-mark"><img className="campaign-brand-icon" src="/alpha.png" alt="" width="32" height="32" /></span>
          <span>
            {page.theme === "whatsapp"
              ? "Your business on WhatsApp"
              : "Your next business workflow"}
          </span>
          <span className="funnel-example-badge">EXAMPLE</span>
        </div>
        <div
          className="funnel-demo-tabs"
          role="group"
          aria-label="Explore example scenarios"
        >
          {offer.scenarios.map((scenario, index) => (
            <button
              key={scenario.name}
              type="button"
              aria-pressed={index === selected}
              onClick={() => setSelected(index)}
            >
              {scenario.name}
            </button>
          ))}
        </div>
        <div className="funnel-demo-body" aria-live="polite">
          {page.theme === "whatsapp" ? (
            <>
              <div className="funnel-chat-heading">
                <span className="funnel-avatar">YB</span>
                <div>
                  <strong>Your business</strong>
                  <small>
                    <i />
                    Business assistant
                  </small>
                </div>
                <span aria-hidden="true">···</span>
              </div>
              <div className="funnel-chat-bubble funnel-chat-bubble--customer">
                {scene.question}
                <small>Customer</small>
              </div>
              <div className="funnel-chat-bubble">
                {scene.reply}
                <small>Your assistant</small>
              </div>
              <div className="funnel-chat-bubble funnel-chat-bubble--customer">
                {scene.choice}
                <span className="funnel-read" aria-hidden="true">
                  ✓✓
                </span>
              </div>
              <div className="funnel-chat-input">
                A more helpful first conversation
                <span aria-hidden="true">➤</span>
              </div>
            </>
          ) : page.theme === "documents" ? (
            <div className="funnel-document-demo">
              <div className="funnel-document-sheet">
                <span className="funnel-file-icon">PDF</span>
                <strong>{scene.input}</strong>
                <div className="funnel-document-lines" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <span className="funnel-highlight-field">
                  Source fields identified
                </span>
              </div>
              <div className="funnel-extract-arrow" aria-hidden="true">
                ↓
              </div>
              <div className="funnel-data-card">
                <small>EXTRACTION + VALIDATION</small>
                <strong>{scene.action}</strong>
                <p>
                  Source reference attached <Check />
                </p>
                <p>
                  Review required before export <Check />
                </p>
              </div>
            </div>
          ) : page.theme === "mvp" ? (
            <div className="funnel-mvp-demo">
              <div className="funnel-mini-sidebar" aria-hidden="true">
                <b><img className="campaign-brand-icon" src="/alpha.png" alt="" width="32" height="32" /></b>
                <i />
                <i />
                <i />
              </div>
              <div className="funnel-mini-workspace">
                <span className="funnel-small-label">YOUR FIRST RELEASE</span>
                <h3>{scene.input}</h3>
                <div className="funnel-app-panel">
                  <span className="funnel-app-orb" aria-hidden="true">
                    ✳
                  </span>
                  <strong>{scene.action}</strong>
                  <p>One clear journey, designed around the user.</p>
                </div>
                <div className="funnel-mini-task">
                  <Check />
                  Scope the core experience
                </div>
                <div className="funnel-mini-task">
                  <Check />
                  Test the important edge cases
                </div>
                <div className="funnel-mini-progress">
                  <i />
                </div>
                <small>Illustrative product workspace</small>
              </div>
            </div>
          ) : page.theme === "property" ? (
            <div className="funnel-property-demo">
              <div className="funnel-property-scene" aria-hidden="true">
                <svg viewBox="0 0 400 180">
                  <path
                    d="M0 180V155H400V180"
                    fill="currentColor"
                    opacity=".08"
                  />
                  <path
                    d="M70 155V67L145 25L218 67V155M218 155V83L292 43L349 77V155"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M101 155V110H137V155M166 83H192V109H166ZM245 97H271V121H245ZM296 88H322V113H296Z"
                    fill="currentColor"
                    opacity=".2"
                  />
                  <path d="M43 156H366" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span>YOUR PROJECT / YOUR INFORMATION</span>
              </div>
              <div className="funnel-property-question">“{scene.input}”</div>
              <div className="funnel-lead-fields">
                <span>ASSISTANT’S NEXT STEP</span>
                <strong>{scene.action}</strong>
                <p>Approved information. Relevant questions. Clear handoff.</p>
              </div>
            </div>
          ) : (
            <div className="funnel-automation-demo">
              <div className="funnel-node">
                <span className="funnel-node-icon">↙</span>
                <div>
                  <small>TRIGGER</small>
                  <strong>{scene.input}</strong>
                </div>
                <span className="funnel-node-status">01</span>
              </div>
              <div className="funnel-connector" aria-hidden="true">
                <i />↓
              </div>
              <div className="funnel-node funnel-node--ai">
                <span className="funnel-node-icon">✳</span>
                <div>
                  <small>AI + YOUR BUSINESS RULES</small>
                  <strong>{scene.action}</strong>
                </div>
                <span className="funnel-node-status">02</span>
              </div>
              <div className="funnel-connector" aria-hidden="true">
                <i />↓
              </div>
              <div className="funnel-node">
                <span className="funnel-node-icon">✓</span>
                <div>
                  <small>HUMAN CHECKPOINT</small>
                  <strong>Review. Approve. Move forward.</strong>
                </div>
                <span className="funnel-node-status">03</span>
              </div>
              <div className="funnel-tool-row">
                <span>Email</span>
                <span>CRM</span>
                <span>Tasks</span>
                <span>Your team</span>
              </div>
            </div>
          )}
        </div>
        <div className="funnel-result">
          <span className="funnel-result-icon">
            <Check />
          </span>
          <div>
            <small>THE NEXT STEP</small>
            <strong>{scene.result}</strong>
          </div>
        </div>
      </div>
      <p className="funnel-demo-caption">
        Illustrative experience, not a live product. Explore the examples above.
      </p>
    </div>
  );
}

// Shared by client and static rendering, including all public offer and FAQ content.
export default function SalesPageContent({ page, contact, themeControl }) {
  const offer = offers[page.theme];
  const plan = plans[page.theme];
  const whatsapp = `https://wa.me/918850313109?text=${encodeURIComponent(`Hi AlphaCodeAI, I'd like to discuss ${page.title}.\nPage: https://www.alphacodeai.com${page.path}`)}`;
  const cta = (
    <>
      {page.cta}
      <Arrow />
    </>
  );
  const planner = (
            <div className="campaign-planner" id="project-brief">
              <div className="campaign-planner-label">
                <span>YOUR NEXT MOVE, MADE CLEAR</span>
                <span>↘</span>
              </div>
              <div className="sales-brief-card">
                {contact || (
                  <>
                    <span className="funnel-small-label">{plan.label}</span>
                    <h3>A useful starting point. No guesswork.</h3>
                    <p>
                      {plan.deliverable} Choose your focus for a useful starting checklist, or speak directly to the builders:
                    </p>
                    <ol className="campaign-plan-list">
                      <li>{plan.focusActions[3]}</li>
                      <li>{plan.actions[0]}</li>
                      <li>{plan.checkpoint}</li>
                    </ol>
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
              <p className="campaign-planner-note">
                01 / Choose your focus <span>→</span> 02 / Get your starting
                plan
              </p>
            </div>
  );
  return (
    <div className={`sales-page sales-page--${page.theme}`}>
      <a className="sales-skip" href="#sales-main">
        Skip to content
      </a>
      <header className="sales-header sales-shell">
        <a href="/" className="sales-brand" aria-label="AlphaCodeAI home">
          <span className="funnel-logo" aria-hidden="true">
            <img className="campaign-brand-icon" src="/alpha.png" alt="" width="40" height="40" />
          </span>
          AlphaCodeAI
          <span className="funnel-brand-label">BUILD BETTER BUSINESS</span>
        </a>
        <div className="sales-header-actions">
          {themeControl}
          <a className="sales-button sales-button--small" href={whatsapp} target="_blank" rel="noreferrer" data-contact-channel="whatsapp" data-contact-placement="header">
            Let’s talk <Arrow />
          </a>
        </div>
      </header>
      <main id="sales-main">
        <div className="funnel-hero-band">
          <section className="sales-hero sales-shell">
            <div className="sales-hero-copy">
              <p className="sales-eyebrow">
                <span className="sales-dot" />
                {page.eyebrow}
              </p>
              <h1>
                <span className="sales-service-name">{page.title}. </span>
                {offer.headline}
                <em>{offer.highlight}</em>
              </h1>
              <p className="sales-lede">{offer.intro}</p>
              <div className="campaign-hero-actions">
                <a className="sales-button sales-button--hero" href={whatsapp} target="_blank" rel="noreferrer" data-contact-channel="whatsapp" data-contact-placement="hero">
                  {offer.contactCta} <Arrow />
                </a>
                <a className="campaign-plan-link" href="#project-brief">{cta} <span aria-hidden="true">↓</span></a>
              </div>
              <p className="sales-quiet">Talk directly to the builders. No long form.</p>
              <ul className="funnel-hero-benefits">
                {offer.benefits.map((benefit) => (
                  <li key={benefit}>
                    <Check />
                    {benefit}
                  </li>
                ))}
              </ul>
              <a className="campaign-proof-link" href={page.proof.href}>
                <span className="campaign-proof-monogram" aria-hidden="true">
                  {page.proof.client.slice(0, 1)}
                </span>
                <span>
                  <small>{plan.proofLabel}</small>
                  <strong>Explore our {page.proof.client} work ↗</strong>
                </span>
              </a>
            </div>
            <figure className="campaign-hero-art">
              <picture>
                <source media="(max-width: 760px)" srcSet={page.heroImage.replace(".webp", "-640.webp")} />
                <img src={page.heroImage} alt={offer.heroAlt} width="1200" height="800" fetchpriority="high" />
              </picture>
              <figcaption><span className="campaign-art-dot" />{offer.visualLabel}</figcaption>
            </figure>
          </section>
        </div>
        <section
          className="funnel-credibility sales-shell"
          aria-label="Selected product work"
        >
          <div>
            <span>SELECTED CLIENT WORK</span>
            <p>
              From the team behind
              <br />
              <strong>real shipped products.</strong>
            </p>
          </div>
          <div className="funnel-work-names">
            <span>
              Proofit<small>Property services</small>
            </span>
            <span>
              Shapotools<small>Business workflows</small>
            </span>
            <span>
              Opro<small>Project operations</small>
            </span>
          </div>
          <p>
            Mumbai-based.
            <br />
            Working with teams worldwide.
          </p>
        </section>
        <section
          className="sales-section sales-shell funnel-change"
          aria-labelledby="sales-problem"
        >
          <div className="sales-section-heading">
            <p className="sales-eyebrow">01 / The business case</p>
            <h2 id="sales-problem">{offer.transition}</h2>
            <p>{page.problemBody}</p>
          </div>
          <div className="funnel-comparison">
            <div className="funnel-before">
              <span className="funnel-small-label">THE FRICTION TODAY</span>
              <h3>More effort than it should take.</h3>
              <ul>
                {offer.before.map((item) => (
                  <li key={item}>
                    <span aria-hidden="true">−</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="funnel-after">
              <span className="funnel-small-label">WHAT WE BUILD TOWARDS</span>
              <h3>A clear path to the next step.</h3>
              <ul>
                {offer.after.map((item) => (
                  <li key={item}>
                    <Check />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section className="campaign-solution sales-shell">
          <div>
            <p className="sales-eyebrow">
              02 / What the solution could look like
            </p>
            <h2>{plan.fitTitle}</h2>
            <p>{page.fit}</p>
            <div className="campaign-measure">
              <span>AGREE SUCCESS BEFORE BUILDING</span>
              <strong>{plan.metric}</strong>
            </div>
            <p className="campaign-caveat">{page.notFit}</p>
            <a href="#project-brief" className="sales-text-link">
              Find your starting point <Arrow />
            </a>
          </div>
          <ProductPreview page={page} />
        </section>
        <section className="funnel-proof-band">
          <div className="sales-shell sales-proof">
            <div className="sales-proof-art">
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
              <span>SELECTED WORK / {page.proof.client}</span>
            </div>
            <div>
              <p className="sales-eyebrow">03 / {plan.proofLabel}</p>
              <h2>{page.proof.title}</h2>
              <p>{page.proof.body}</p>
              <a href={page.proof.href} className="sales-text-link">
                Read the {page.proof.client} case study <Arrow />
              </a>
            </div>
          </div>
        </section>
        <section className="sales-section sales-shell funnel-value">
          <div className="sales-section-heading">
            <p className="sales-eyebrow">04 / A focused implementation</p>
            <h2>{page.scopeTitle}</h2>
          </div>
          <div className="sales-use-grid">
            {page.uses.map((use, index) => (
              <article className="sales-use-card" key={use.title}>
                <span className="funnel-value-icon" aria-hidden="true">
                  {["↗", "◎", "⇄"][index]}
                </span>
                <h3>{use.title}</h3>
                <p>{use.body}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="campaign-planning sales-shell" aria-labelledby="campaign-planning-heading">
          <div className="campaign-planning-copy">
            <p className="sales-eyebrow">YOUR FIRST STEP, NOT A BIG COMMITMENT</p>
            <h2 id="campaign-planning-heading">Start with one<br />useful change.</h2>
            <p>Not sure where to begin? Choose your focus and get a short starting checklist. No email required.</p>
            <p>Already have a task in mind? Tell us what happens today and what you want to improve.</p>
            <a className="sales-text-link" href={whatsapp} target="_blank" rel="noreferrer" data-contact-channel="whatsapp" data-contact-placement="planner">Talk it through with us <Arrow /></a>
          </div>
          {planner}
        </section>
        <section
          className="sales-contact-band"
          aria-labelledby="sales-contact-heading"
        >
          <div className="sales-shell sales-contact-grid">
            <div className="funnel-offer-copy">
              <p className="sales-eyebrow">
                05 / From starting plan to scoped project
              </p>
              <h2 id="sales-contact-heading">{offer.offerIntro}</h2>
              <p className="funnel-offer-lede">
                You bring the business problem. We’ll talk through:
              </p>
              <ul className="funnel-offer-list">
                {offer.offerDetails.map((item) => (
                  <li key={item}>
                    <Check />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="funnel-no-pressure">
                <strong>A conversation, not a commitment.</strong>
                <p>
                  We’ll discuss fit and scope before quoting a build. No
                  detailed specification needed.
                </p>
              </div>
              <a
                className="sales-text-link"
                href="tel:+918850313109"
                data-contact-channel="phone"
                data-contact-placement="brief"
              >
                Prefer to call? +91 88503 13109 <Arrow />
              </a>
            </div>
            <div className="campaign-engagement">
              <span className="funnel-small-label">
                KNOW WHAT YOU’RE SAYING YES TO
              </span>
              <h3>
                Small scope first.
                <br />
                Clear costs before you commit.
              </h3>
              <p>{page.cost}</p>
              <dl>
                <div>
                  <dt>Bring to the conversation</dt>
                  <dd>{plan.bring}</dd>
                </div>
                <div>
                  <dt>Before a paid build</dt>
                  <dd>
                    Agree deliverables, dependencies, acceptance checks, timing
                    and an estimate. Recurring tool and model costs are
                    considered separately.
                  </dd>
                </div>
              </dl>
              <a className="sales-button" href="#project-brief">
                {cta}
              </a>
              <p className="campaign-engagement-note">
                The instant checklist is free. Custom implementation is quoted
                after scope review.
              </p>
            </div>
          </div>
        </section>
        <section className="sales-section sales-shell funnel-expectations">
          <div className="sales-section-heading">
            <p className="sales-eyebrow">06 / If we decide to work together</p>
            <h2>
              Start focused.
              <br />
              Expand on evidence.
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
          <details className="funnel-build-details">
            <summary>
              What’s included, what affects cost, and when we’re a good fit{" "}
              <span aria-hidden="true">+</span>
            </summary>
            <div className="funnel-detail-grid">
              <div>
                <h3>Proposed build scope</h3>
                <ul>
                  {page.scope.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Cost & timing</h3>
                <p>{page.cost}</p>
                <h3>Is it a fit?</h3>
                <p>{page.fit}</p>
                <p>{page.notFit}</p>
              </div>
            </div>
          </details>
        </section>
        <section className="sales-section sales-shell sales-faq">
          <div>
            <p className="sales-eyebrow">Before we talk</p>
            <h2>
              A few things
              <br />
              you might be wondering.
            </h2>
            <a className="sales-text-link" href="#project-brief">
              Ask us something else <Arrow />
            </a>
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
        <section className="funnel-final sales-shell">
          <span className="funnel-small-label">YOUR NEXT MOVE</span>
          <h2>
            {offer.headline}
            <em>{offer.highlight}</em>
          </h2>
          <a href={whatsapp} className="sales-button" target="_blank" rel="noreferrer" data-contact-channel="whatsapp" data-contact-placement="final">
            {offer.contactCta} <Arrow />
          </a>
          <p>One conversation. A clearer next step.</p>
        </section>
      </main>
      <footer className="sales-footer sales-shell">
        <a href="/" className="sales-brand">
          <span className="funnel-logo" aria-hidden="true"><img className="campaign-brand-icon" src="/alpha.png" alt="" width="40" height="40" /></span>
          AlphaCodeAI
        </a>
        <div>
          <a href={page.parent}>{page.parentLabel}</a>
          <a href="/">Back to the main site</a>
          <a href="mailto:aryanchandwani@gmail.com">Email us</a>
        </div>
        <p>AI product engineering · Mumbai, India</p>
      </footer>
      <div className="funnel-sticky">
        <div>
          <strong>Let’s build something useful.</strong>
          <span>Speak directly to our team.</span>
        </div>
        <a href={whatsapp} className="sales-button" target="_blank" rel="noreferrer" data-contact-channel="whatsapp" data-contact-placement="sticky">
          Let’s talk <Arrow />
        </a>
      </div>
    </div>
  );
}
