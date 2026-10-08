import { useState } from "react";
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
  const message = buildBrief(page, { category, details, timing });
  return (
    <div className="sales-brief">
      <p className="sales-eyebrow">A quick project brief</p>
      <h3>A little context goes a long way.</h3>
      <p className="sales-quiet">
        Everything below is optional. You can just say hello.
      </p>
      <fieldset>
        <legend>What brings you here?</legend>
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
        Your brief stays in this page until you choose WhatsApp or email. That
        opens a draft with the details above; you review and send it there.
        Please don’t include confidential or customer information.
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
          Open WhatsApp draft ↗
        </a>
        <a
          className="sales-text-link"
          href={`mailto:aryanchandwani@gmail.com?subject=${encodeURIComponent(page.title + " — project enquiry")}&body=${encodeURIComponent(message)}`}
          data-contact-channel="email"
          data-contact-placement="brief"
          onClick={() => setOpened("your email app")}
        >
          Open email draft ↗
        </a>
      </div>
      <p className="sales-draft-status" role="status">
        {opened
          ? `Continue in ${opened} to review and send. Nothing has been submitted by this website.`
          : "No sign-up. No automatic submission."}
      </p>
    </div>
  );
}

export default function SalesLandingPage({ page }) {
  return (
    <div
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
