# AlphaCodeAI sales funnel analysis

Date: 8 October 2026. Business: custom AI development services. Funnel: lead generation into a scoped sales conversation. Scope: the five service campaigns, not the main website or existing authority pages. Method: the installed `market-funnel` skill, live workflow-page inspection, shared component and route inspection, and the existing keyword research.

## Executive summary

The original five campaigns explained services, but offered little immediate value before asking visitors to start a conversation. The main CTA led past several sections to an optional two-step brief. Relevant work appeared farther down the page, and cost context was collapsed. These are plausible friction points, not measured drop-off findings.

The remake puts a free, service-specific starter planner in the hero. Visitors choose a focus and their current readiness, see a rules-based checklist immediately, and can download it without supplying an email address. A direct WhatsApp shortcut remains for high-intent buyers. The result leads into a contextual WhatsApp or email draft; neither is misrepresented as a submitted enquiry.

The visual system is independent of the main site: ink, warm neutral surfaces and a high-contrast lime action colour. The persuasion sequence is outcome and offer → business case → illustrative solution and fit → relevant work → implementation scope → commercial expectations → process and objections. Proof links now appear beside the first offer, while the detailed case-study block preserves limitations on adjacent evidence.

The largest unresolved operational risk is the transition from an external draft to a sent message, qualified conversation and won project. No CRM, analytics destination or email delivery service is configured in this implementation. A visually complete campaign is not an automated sales pipeline, and there is no basis to promise more revenue or search rankings.

Overall pre-remake heuristic health: 62/100, including the unmeasured/off-site handoff. This is an expert UX judgement, not a conversion score. Do not use it as a marketing claim. Post-remake performance must be established with real enquiries and sales outcomes.

## Funnel map

```text
Relevant search / referral / approved campaign
  ↓  visitor count and source mix: unknown
Service-specific landing page
  ├─ High intent: open WhatsApp directly
  └─ Choose focus + readiness (both optional)
       ↓  planner-view rate: unmeasured
     Instant starter checklist
       ├─ Download and use independently (no lead claimed)
       └─ Optional context → WhatsApp or email draft
            ↓  contact intent ≠ sent enquiry
          Visitor reviews and sends in external app
            ↓  confirmed receipt tracked by the business
          Fit review → scoped conversation → proposal → won/lost
```

No default conversion percentages are substituted for missing data.

## Page-by-page analysis

Scores describe the pre-remake design on a 0–10 heuristic scale. Friction is scored inversely: 10 means easier. Scores do not estimate conversion or revenue.

| Campaign path | Clarity | Continuity | Motivation | Friction | Trust | Mean | Main change |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| `/ai-workflow-automation-mumbai/` | 7 | 8 | 5 | 6 | 7 | 6.6 | Process-readiness checklist and integration checkpoint |
| `/whatsapp-chatbot-development-india/` | 7 | 8 | 5 | 6 | 6 | 6.4 | Account/setup, approved answers and human-handoff checklist |
| `/ai-mvp-development/` | 6 | 7 | 5 | 6 | 7 | 6.2 | Stage-specific scope boundary and evaluation checklist |
| `/ai-document-processing/` | 8 | 8 | 6 | 6 | 6 | 6.8 | Sample/schema readiness and field-quality pilot checklist |
| `/real-estate-ai-chatbot/` | 7 | 8 | 5 | 6 | 6 | 6.4 | Project information, qualification and CRM ownership checklist |

### Step 1 — Campaign landing

URLs: the five paths above on `https://www.alphacodeai.com`. Type: service landing page. Primary action: get the matching starter plan; next step: planner in the same hero. Secondary exit points: relevant case study, home logo, service footer and direct chat. These are lower emphasis than the primary action.

Trust: real named case studies, explicit related-work labels, Mumbai identity, visible cost factors and limitations. No invented testimonials, performance percentages, scarcity, delivery dates, free consultation promises or exact build prices. Illustrations remain labelled examples, not live products. The main navigation remains absent from these campaigns, and these campaigns remain absent from the main menu.

Load complexity: static HTML plus the existing React bundle, CSS-built demo and lazy-loaded case-study imagery. No new external scripts or fonts were added. Field load time is unknown; visual browser testing is not a Core Web Vitals measurement.

### Step 2 — Starter planner and result

URL: each campaign with `#project-brief`. Type: ungated self-service tool. Primary action: view a starting checklist, then discuss it if useful. Two screens, two optional selections; optional free text and timing are disclosed only after the result. No identity collection, signup or data persistence.

The recommendation changes with readiness; the checklist changes with both focus and readiness. The text download includes the checklist, a measurement goal, conversation preparation and cost factors. It excludes any separately entered project details. The result explicitly says it is not a technical assessment or quote.

Remaining friction: buyers may prefer not to use a planner; the direct chat shortcut covers that path. The plan is intentionally a small quick win, not a bespoke architecture document. It does not replace a human scoping conversation.

### Step 3 — Contact handoff

Destination: `https://wa.me/918850313109` or the existing `mailto:aryanchandwani@gmail.com`. Type: external draft. Primary action: review and send in the chosen app. Next step: a human receives the message. Drafts carry the service URL, chosen focus/readiness, suggested starting point and optional context.

Trust: exact disclosure that the website has not submitted anything, no confidential information requested, no auto-booking claim. Friction: WhatsApp/app switching; email-client setup may fail for some visitors. Alternative: the existing phone link. Receipt, response latency and downstream sales outcomes cannot be verified by the browser.

### Step 4 — Human qualification and proposal

No automatic page or integration exists for this stage. The business should confirm receipt, identify an owner, clarify the use case and constraints, and agree scope before estimating. Only a received enquiry counts as a lead. Only a buyer with an agreed relevant need and a viable next step counts as qualified.

## Funnel metrics

| Measure | Current status | Measurement rule |
| --- | --- | --- |
| Visitors, traffic mix, engagement, bounce and device mix | Unknown | Connect suitable, consent-aware analytics |
| Planner views and downloads | Optional browser events implemented | `funnel_progress`, with `starter_plan_view` or `starter_plan_download` |
| WhatsApp/email/phone click | Optional browser event implemented | `contact_intent`; never label it a completed lead |
| Received enquiries and qualified leads | Unknown | Record actual receipt and qualification in the CRM |
| Opportunities, proposals and won revenue | Unknown | Record human-confirmed stage and value |
| AOV, LTV, CAC and revenue per visitor | Unknown | Calculate from actual attributed sales and acquisition costs |

Events only push to an existing `window.dataLayer`. No analytics destination is installed or connected here. Payloads contain the page and fixed stage/channel/placement labels, not the selected focus, readiness, free text or other personal data. Repeated interactions may emit repeated events; deduplicate by visitor/session when analysing conversion.

The skill contains generic numerical benchmarks and lift estimates without a source or matching traffic definition. They are not treated as verified benchmarks for this business. Establish a baseline by source, campaign and device before comparing variants.

## Revenue impact analysis

Let V = relevant visitors, L = received-lead rate, Q = qualified fraction, W = qualified-to-win rate, and A = average won project revenue. Expected attributed revenue = V × L × Q × W × A. RPV = actual attributed revenue / V. Use consistent attribution windows and exclude duplicate enquiries.

Illustration only, not a forecast: 1,000 visitors × 2% received leads × 40% qualified × 25% won × ₹100,000 = ₹200,000. If only the received-lead rate changes to 3%, the same assumptions yield ₹300,000. None of these inputs is known for AlphaCodeAI. Extra clicks or downloads alone do not establish this uplift. Long sales cycles and small samples make early conclusions unreliable.

## Prioritised recommendations

| Priority | Action | Expected impact | Effort | Status |
| --- | --- | --- | --- | --- |
| P1 | Specific headline, immediate offer, proof near CTA | Clearer relevance and reason to act; lift unmeasured | Low | Implemented on all five |
| P1 | Ungated relevant checklist plus direct-chat shortcut | Value for researching buyers without blocking ready buyers; lift unmeasured | Medium | Implemented |
| P1 | Disclose cost drivers, scope and handoff | Fewer avoidable uncertainties; lift unmeasured | Low | Implemented |
| P1 | Track actual receipt and ownership | Essential for avoiding lost enquiries | Low operational effort | Business follow-through required |
| P2 | Connect consent-appropriate analytics and CRM stages | Reveals which traffic produces qualified opportunities | Medium | Not connected |
| P2 | Collect permissioned service-specific case evidence | Stronger relevant proof, particularly WhatsApp and document extraction | Medium | Requires real completed work and permission |
| P2 | Consider reliable server-side enquiry delivery and receipt UI | Avoids app-switch friction for visitors who prefer a web form | Medium | Requires approved provider/configuration and data handling |
| P3 | Test one headline or offer variation per adequate traffic cohort | Potential improvement, direction and lift unknown | Medium | Await baseline; no experiment claimed |

## Pricing assessment

These are custom implementation services, not subscription plans. Three made-up tiers, an invented “most popular” label or a guaranteed fixed timeline would mislead. Instead, cost factors are visible before commitment, a small pilot is encouraged, and setup costs are distinguished from recurring platform/model costs. Exact fees, timing and exclusions must be agreed after scoping.

## Lead magnet assessment

Implemented magnet: service-specific rules-based starter checklist, viewable immediately and downloadable as plain text. No email gate; therefore the download is engagement, not a captured lead. Relevant to the implementation service and usable before buying.

Heuristic scores: relevance 9/10, specificity 8/10, immediate usefulness 8/10, product alignment 9/10 and access friction 10/10. Willingness to pay/perceived monetary value is unknown and is not assigned a dollar value. Compared with a generic guide, this tool gives a narrower next decision, but it needs behavioural testing before being called more effective.

## Email nurture integration

No emails, campaigns or automated follow-ups were sent or enabled. Respond to inbound enquiries in their chosen channel. Promotional sequences require appropriate consent; a checklist download is not consent or a contact record.

Suggested manual follow-up drafts for genuine inbound enquiries, adapted to their topic:

1. Receipt and qualification: “Thanks for sharing your [service] enquiry. You mentioned [focus]. Could you tell us [one relevant missing fact]? That will help us assess whether a focused first build makes sense.” Do not claim a reply SLA unless the team can support it.
2. Useful preparation after engagement: “For our discussion, the most useful thing to bring is [the page’s preparation checklist]. Here is [relevant case study], which shows [the actual related capability]. Your implementation will need separate scoping.”
3. Agreed next step: “Based on our conversation, here is the proposed first milestone, dependencies and open questions. Shall we review these before we prepare an estimate?”
4. One respectful check-in if appropriate: “Is [problem] still a priority? Happy to continue when the timing is right; let us know if you’d prefer no further follow-up.” Stop if asked. Do not automatically enrol the recipient in marketing.

After a signed project, agree kickoff inputs, owners, checkpoints and success measures. Cross-sell only when related to a demonstrated need; no automated post-purchase campaign is part of this change.

## Traffic source alignment

The existing `keyword-research.json` remains the qualitative keyword map; no volume or CPC claim is added. Send workflow-intent searches to workflow, WhatsApp implementation searches to WhatsApp, AI product build searches to MVP, document extraction searches to documents, and property qualification searches to property. Keep ad/email promises consistent with the actual starter offer. No paid campaign was launched.

Researching visitors can use the checklist. Ready buyers can chat immediately. Branded visitors can return to the main site. Existing service-page links and the sitemap preserve discoverability without adding these pages to the main menu. Avoid near-duplicate city variants; these five represent different buying problems.

## Next steps

1. Track received enquiries, source page, owner, qualification, next action and won/lost outcome. Do not equate contact clicks with sales.
2. Connect analytics and an approved CRM/form provider when their access and data-handling choices are available.
3. Inspect actual search queries and enquiry quality, then test the weakest confirmed step. No ranking, conversion or revenue uplift is guaranteed by this redesign.
