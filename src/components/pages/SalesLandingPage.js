import { useEffect, useRef, useState } from "react";
import offers from "../../data/funnelOffers.json";
import SeoHead from "../ui/SeoHead";
import ThemeSwitch from "../ui/ThemeSwitch";
import WhatsAppIcon from "../ui/WhatsAppIcon";
import SalesPageContent from "./SalesPageContent";
import "./SalesLandingPage.css";

export function buildBrief(
  page,
  { category = "", details = "", timing = "" } = {},
) {
  return [
    `Hi AlphaCodeAI, I'd like to discuss ${page.title}.`,
    category && `Focus: ${category}`,
    details.trim() && `Project: ${details.trim()}`,
    timing && `Timing: ${timing}`,
    `Page: https://www.alphacodeai.com${page.path}`,
  ]
    .filter(Boolean)
    .join("\n\n");
}

// Contact intent only, never a claim that a message was sent. No brief text or PII.
export function trackContact(page, channel, placement) {
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: "contact_intent",
      landing_page: page.path,
      contact_channel: channel,
      contact_placement: placement,
    });
  }
}

export function ProjectBrief({ page }) {
  const [category, setCategory] = useState("");
  const [details, setDetails] = useState("");
  const [timing, setTiming] = useState("");
  const [opened, setOpened] = useState("");
  const [step, setStep] = useState(0);
  const heading = useRef(null);
  const interacted = useRef(false);
  const goToStep = (next) => {
    interacted.current = true;
    setStep(next);
  };
  useEffect(() => {
    if (interacted.current) heading.current?.focus();
  }, [step]);
  const message = buildBrief(page, { category, details, timing });
  return (
    <div className="sales-brief">
      <div className="funnel-form-progress" aria-hidden="true">
        <span className="is-active" />
        <span className={step === 1 ? "is-active" : ""} />
      </div>
      <p className="sales-eyebrow">
        {offers[page.theme].offerName} · {step + 1} of 2
      </p>
      {step === 1 && (
        <button
          className="funnel-back"
          type="button"
          onClick={() => goToStep(0)}
        >
          ← Change my selection
        </button>
      )}
      <h3 ref={heading} tabIndex={-1} className="funnel-step-heading">
        {step === 0
          ? "What would you like to improve?"
          : "Let’s start the conversation."}
      </h3>
      <p className="sales-quiet">
        {step === 0
          ? "Pick a starting point. We’ll work out the details together."
          : "A sentence or two helps. You can also leave this blank."}
      </p>
      {step === 0 ? (
        <>
          <fieldset>
            <legend>Choose your focus (optional)</legend>
            <div className="sales-choices">
              {page.choices.map((choice) => (
                <label key={choice}>
                  <input
                    type="radio"
                    name="project-focus"
                    value={choice}
                    checked={category === choice}
                    onChange={() => setCategory(choice)}
                  />
                  <span>{choice}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <button
            className="sales-button funnel-continue"
            type="button"
            onClick={() => goToStep(1)}
          >
            Continue <span aria-hidden="true">→</span>
          </button>
          <a
            className="funnel-direct"
            href={`https://wa.me/918850313109?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noreferrer"
            data-contact-channel="whatsapp"
            data-contact-placement="skip-brief"
          >
            Prefer to chat now? Open WhatsApp ↗
          </a>
          <p className="sales-draft-status">
            No account. No obligation. You choose when to send.
          </p>
        </>
      ) : (
        <>
          {category && (
            <span className="funnel-selection">Your focus: {category}</span>
          )}
          <label className="sales-field" htmlFor="project-details">
            {page.briefLabel}
            <textarea
              id="project-details"
              rows="3"
              maxLength={600}
              placeholder={page.briefPlaceholder}
              value={details}
              onChange={(event) => setDetails(event.target.value)}
            />
          </label>
          <label className="sales-field" htmlFor="project-timing">
            When are you looking to start?
            <select
              id="project-timing"
              value={timing}
              onChange={(event) => setTiming(event.target.value)}
            >
              <option value="">Still exploring</option>
              <option>As soon as practical</option>
              <option>In the next 1–3 months</option>
              <option>Later this year</option>
            </select>
          </label>
          <p className="sales-privacy">
            Your brief stays in this page until you choose WhatsApp or email.
            That opens a draft with the details above; you review and send it
            there. Please don’t include confidential or customer information.
          </p>
          <div className="sales-brief-actions">
            <a
              className="sales-button"
              href={`https://wa.me/918850313109?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noreferrer"
              data-contact-channel="whatsapp"
              data-contact-placement="brief"
              onClick={() => setOpened("WhatsApp")}
            >
              <WhatsAppIcon />
              Continue on WhatsApp ↗
            </a>
            <a
              className="sales-text-link"
              href={`mailto:aryanchandwani@gmail.com?subject=${encodeURIComponent(page.title + " — project enquiry")}&body=${encodeURIComponent(message)}`}
              data-contact-channel="email"
              data-contact-placement="brief"
              onClick={() => setOpened("your email app")}
            >
              Prefer email? Open a draft ↗
            </a>
          </div>
          <p className="sales-draft-status" role="status">
            {opened
              ? `Continue in ${opened} to review and send. Nothing has been submitted by this website.`
              : "No sign-up. No automatic submission."}
          </p>
        </>
      )}
    </div>
  );
}

export default function SalesLandingPage({ page }) {
  const pageRoot = useRef(null);
  const [briefVisible, setBriefVisible] = useState(false);
  useEffect(() => {
    const card = pageRoot.current?.querySelector('.sales-brief-card');
    if (!card || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(([entry]) => setBriefVisible(entry.isIntersecting), { threshold: 0.01 });
    observer.observe(card);
    return () => observer.disconnect();
  }, [page.path]);
  return (
    <div
      ref={pageRoot}
      className={briefVisible ? 'funnel-contact-visible' : undefined}
      onClick={(event) => {
        const link = event.target.closest("a[data-contact-channel]");
        if (link)
          trackContact(
            page,
            link.dataset.contactChannel,
            link.dataset.contactPlacement,
          );
      }}
    >
      <SeoHead page={page} />
      <SalesPageContent
        page={page}
        contact={<ProjectBrief page={page} />}
        themeControl={<ThemeSwitch compact />}
      />
    </div>
  );
}
