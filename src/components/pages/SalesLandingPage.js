import { useEffect, useRef, useState } from "react";
import plans from "../../data/funnelPlans.json";
import SeoHead from "../ui/SeoHead";
import ThemeSwitch from "../ui/ThemeSwitch";
import WhatsAppIcon from "../ui/WhatsAppIcon";
import SalesPageContent from "./SalesPageContent";
import "./SalesLandingPage.css";
import "./SalesCampaign.css";

export function buildBrief(
  page,
  {
    category = "",
    details = "",
    timing = "",
    readiness = "",
    recommendation = "",
  } = {},
) {
  return [
    `Hi AlphaCodeAI, I'd like to discuss ${page.title}.`,
    category && `Focus: ${category}`,
    readiness && `Starting point: ${readiness}`,
    recommendation && `Starter checklist suggests: ${recommendation}`,
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

export function getStarterPlan(page, category = "", readiness = "") {
  const plan = plans[page.theme];
  const stage = ["0", "1", "2"].includes(String(readiness))
    ? Number(readiness)
    : 0;
  const focus = page.choices.indexOf(category);
  return {
    title: plan.directions[stage],
    readiness: readiness === "" ? "Not sure yet" : plan.stages[stage],
    items: [
      plan.focusActions[focus < 0 ? 3 : focus],
      plan.actions[stage],
      plan.checkpoint,
    ],
  };
}

export function starterPlanText(page, category, readiness) {
  const plan = plans[page.theme];
  const result = getStarterPlan(page, category, readiness);
  return [
    `AlphaCodeAI — ${plan.label}`,
    "",
    `Focus: ${category || "Still exploring"}`,
    `Starting point: ${result.readiness}`,
    "",
    result.title,
    ...result.items.map((item, index) => `${index + 1}. ${item}`),
    "",
    `Evaluate: ${plan.metric}`,
    `Bring to a conversation: ${plan.bring}`,
    `Cost factors: ${page.cost}`,
    "",
    "This is a rules-based starter checklist, not a technical assessment, quote or delivery promise.",
    `Discuss it: https://www.alphacodeai.com${page.path}`,
    "WhatsApp: +91 88503 13109",
  ].join("\n");
}

export function trackFunnel(page, stage) {
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: "funnel_progress",
      landing_page: page.path,
      funnel_stage: stage,
    });
  }
}

export function ProjectBrief({ page }) {
  const [category, setCategory] = useState("");
  const [details, setDetails] = useState("");
  const [timing, setTiming] = useState("");
  const [readiness, setReadiness] = useState("");
  const [opened, setOpened] = useState("");
  const [step, setStep] = useState(0);
  const heading = useRef(null);
  const interacted = useRef(false);
  const plan = plans[page.theme];
  const result = getStarterPlan(page, category, readiness);
  const goToStep = (next) => {
    interacted.current = true;
    setStep(next);
    if (next === 1) trackFunnel(page, "starter_plan_view");
  };
  useEffect(() => {
    if (interacted.current) heading.current?.focus();
  }, [step]);
  const message = buildBrief(page, {
    category,
    details,
    timing,
    readiness: step === 1 ? result.readiness : "",
    recommendation: step === 1 ? result.title : "",
  });
  return (
    <div className="sales-brief">
      <div className="funnel-form-progress" aria-hidden="true">
        <span className="is-active" />
        <span className={step === 1 ? "is-active" : ""} />
      </div>
      <p className="sales-eyebrow">
        {plan.label} · {step + 1} of 2
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
      <h2 ref={heading} tabIndex={-1} className="funnel-step-heading">
        {step === 0
          ? "Find your best first step."
          : "Your starting plan is ready."}
      </h2>
      <p className="sales-quiet">
        {step === 0
          ? plan.deliverable
          : "Use this checklist yourself, or ask us to help you build it."}
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
          <label className="sales-field" htmlFor="project-readiness">
            {plan.question}
            <select
              id="project-readiness"
              value={readiness}
              onChange={(event) => setReadiness(event.target.value)}
            >
              <option value="">Not sure yet</option>
              {plan.stages.map((stage, index) => (
                <option key={stage} value={index}>
                  {stage}
                </option>
              ))}
            </select>
          </label>
          <button
            className="sales-button funnel-continue"
            type="button"
            onClick={() => goToStep(1)}
          >
            See my starter plan <span aria-hidden="true">→</span>
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
            Free instant result. No contact details required.
          </p>
        </>
      ) : (
        <>
          {category && (
            <span className="funnel-selection">Your focus: {category}</span>
          )}
          <div className="campaign-plan-result">
            <span className="funnel-small-label">SUGGESTED STARTING POINT</span>
            <h4>{result.title}</h4>
            <ol className="campaign-plan-list">
              {result.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
            <a
              className="sales-text-link"
              download={`alphacodeai-${page.theme}-starter-plan.txt`}
              href={`data:text/plain;charset=utf-8,${encodeURIComponent(starterPlanText(page, category, readiness))}`}
              onClick={() => trackFunnel(page, "starter_plan_download")}
            >
              Download my checklist ↓
            </a>
            <p>
              Based on your selections, not a technical assessment or quote.
            </p>
          </div>
          <div className="campaign-human-handoff">
            <span aria-hidden="true"><img className="campaign-brand-icon" src="/alpha.png" alt="" width="37" height="37" /></span>
            <div>
              <strong>Want help putting this into practice?</strong>
              <p>Discuss your plan with the AlphaCodeAI team.</p>
            </div>
          </div>
          <details className="campaign-add-context">
            <summary>Add project details or timing (optional)</summary>
            <p className="sales-privacy">
              Please don’t include confidential or customer information.
            </p>
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
          </details>
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
          <p className="sales-privacy">
            Your selections and optional details open in a draft. Review and
            send it in your chosen app.
          </p>
          <p className="sales-draft-status" role="status">
            {opened
              ? `Continue in ${opened} to review and send. Nothing has been submitted by this website.`
              : "No sign-up. No automatic submission."}
          </p>
          <p className="campaign-next-step">
            After you send: we review the fit, clarify the scope with you and
            agree an estimate before a paid build. No automatic booking or
            obligation.
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
    const card = pageRoot.current?.querySelector(".sales-brief-card");
    if (!card || typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setBriefVisible(entry.isIntersecting),
      { threshold: 0.01 },
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, [page.path]);
  return (
    <div
      ref={pageRoot}
      className={briefVisible ? "funnel-contact-visible" : undefined}
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
