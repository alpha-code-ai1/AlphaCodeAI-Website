import { fireEvent, render, screen } from "@testing-library/react";
import SalesPageContent, {
  ProductPreview,
} from "./components/pages/SalesPageContent";
import offers from "./data/funnelOffers.json";
import plans from "./data/funnelPlans.json";
import {
  ProjectBrief,
  buildBrief,
  trackContact,
  getStarterPlan,
  starterPlanText,
  trackFunnel,
} from "./components/pages/SalesLandingPage";
import salesPages from "./data/salesPages.json";
import authorityPages from "./data/authorityPages.json";

test("five distinct, reachable buying journeys with useful content", () => {
  expect(salesPages).toHaveLength(5);
  expect(
    new Set([...salesPages, ...authorityPages].map((page) => page.path)).size,
  ).toBe(15);
  salesPages.forEach((page) => {
    expect(authorityPages.some((parent) => parent.path === page.parent)).toBe(
      true,
    );
    expect(page.keywords.length).toBeGreaterThanOrEqual(3);
    expect(page.faqs.length).toBeGreaterThanOrEqual(4);
    expect(page.scope).toHaveLength(5);
    expect(page.uses).toHaveLength(3);
    expect(page.description.length).toBeGreaterThan(100);
    expect(authorityPages.some((proof) => proof.path === page.proof.href)).toBe(
      true,
    );
  });
});

test.each(salesPages)("$title has one h1, contact and proof routes", (page) => {
  render(<SalesPageContent page={page} />);
  expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    page.title,
  );
  expect(
    screen.getAllByRole("link", { name: page.cta, exact: true })[0],
  ).toHaveAttribute("href", "#project-brief");
  expect(
    screen.getByRole("link", { name: "Start on WhatsApp ↗" }).href,
  ).toContain("https://wa.me/918850313109?text=");
  expect(
    screen.getByRole("link", { name: /Back to the main site/ }),
  ).toHaveAttribute("href", "/");
});

test("optional brief creates correctly encoded drafts without claiming submission", () => {
  const page = salesPages[0];
  render(<ProjectBrief page={page} />);
  fireEvent.click(screen.getByLabelText("Lead routing"));
  fireEvent.click(
    screen.getByRole("button", { name: "See my starter plan", exact: true }),
  );
  fireEvent.click(screen.getByText("Add project details or timing (optional)"));
  fireEvent.change(screen.getByLabelText(page.briefLabel), {
    target: { value: "CRM & forms + approvals?" },
  });
  fireEvent.change(screen.getByLabelText("When are you looking to start?"), {
    target: { value: "In the next 1–3 months" },
  });
  const whatsapp = screen.getByRole("link", {
    name: "Continue on WhatsApp ↗",
  });
  const draft = new URL(whatsapp.href).searchParams.get("text");
  expect(draft).toContain("CRM & forms + approvals?");
  expect(draft).toContain("Focus: Lead routing");
  expect(draft).toContain(page.path);
  expect(
    screen.getByRole("link", { name: "Prefer email? Open a draft ↗" }).href,
  ).toContain(encodeURIComponent(draft));
  expect(screen.getByRole("status")).toHaveTextContent(
    "No automatic submission",
  );
});

test.each(salesPages)(
  "$title has an interactive, clearly labelled example",
  (page) => {
    render(<ProductPreview page={page} />);
    const scene = offers[page.theme].scenarios[1];
    fireEvent.click(
      screen.getByRole("button", { name: scene.name, exact: true }),
    );
    expect(
      screen.getByRole("button", { name: scene.name, exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(scene.result)).toBeInTheDocument();
    expect(
      screen.getByText(/Illustrative experience, not a live product/),
    ).toBeInTheDocument();
  },
);

test("brief can go back without losing details and does not require a category", () => {
  render(<ProjectBrief page={salesPages[0]} />);
  fireEvent.click(
    screen.getByRole("button", { name: "See my starter plan", exact: true }),
  );
  fireEvent.click(screen.getByText("Add project details or timing (optional)"));
  const field = screen.getByLabelText(salesPages[0].briefLabel);
  fireEvent.change(field, { target: { value: "Keep this brief" } });
  fireEvent.click(
    screen.getByRole("button", { name: "← Change my selection" }),
  );
  fireEvent.click(
    screen.getByRole("button", { name: "See my starter plan", exact: true }),
  );
  expect(screen.getByLabelText(salesPages[0].briefLabel)).toHaveValue(
    "Keep this brief",
  );
  expect(
    screen.getByRole("heading", { name: "Your starting plan is ready." }),
  ).toHaveFocus();
});

test.each(salesPages)(
  "$title gives an ungated, relevant starter plan and useful handoff",
  (page) => {
    const plan = plans[page.theme];
    render(<ProjectBrief page={page} />);
    fireEvent.click(screen.getByLabelText(page.choices[1]));
    fireEvent.change(screen.getByLabelText(plan.question), {
      target: { value: "2" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "See my starter plan" }),
    );
    expect(screen.getByText(plan.directions[2])).toBeInTheDocument();
    expect(screen.getByText(plan.focusActions[1])).toBeInTheDocument();
    expect(screen.getByText(plan.actions[2])).toBeInTheDocument();
    const download = screen.getByRole("link", {
      name: "Download my checklist ↓",
    });
    expect(download).toHaveAttribute(
      "download",
      `alphacodeai-${page.theme}-starter-plan.txt`,
    );
    expect(decodeURIComponent(download.href)).toContain(plan.checkpoint);
    const draft = new URL(
      screen.getByRole("link", { name: "Continue on WhatsApp ↗" }).href,
    ).searchParams.get("text");
    expect(draft).toContain(plan.directions[2]);
    expect(draft).toContain(plan.stages[2]);
    expect(draft).toContain(page.choices[1]);
    expect(screen.queryByLabelText(/email address/i)).not.toBeInTheDocument();
  },
);

test.each(salesPages)(
  "$title starter plan covers every focus and readiness without invented estimates",
  (page) => {
    const plan = plans[page.theme];
    page.choices.forEach((focus, index) => {
      ["0", "1", "2"].forEach((stage) => {
        const result = getStarterPlan(page, focus, stage);
        expect(result.items).toEqual([
          plan.focusActions[index],
          plan.actions[Number(stage)],
          plan.checkpoint,
        ]);
        const text = starterPlanText(page, focus, stage);
        expect(text).toContain(page.cost);
        expect(text).toContain(
          "not a technical assessment, quote or delivery promise",
        );
        expect(text).not.toContain("undefined");
      });
    });
    expect(getStarterPlan(page, "", "").readiness).toBe("Not sure yet");
    expect(getStarterPlan(page, "", "unknown").items).toHaveLength(3);
  },
);

test("funnel events describe intent and do not include entered information", () => {
  window.dataLayer = [];
  trackFunnel(salesPages[0], "starter_plan_view");
  expect(window.dataLayer).toEqual([
    {
      event: "funnel_progress",
      landing_page: salesPages[0].path,
      funnel_stage: "starter_plan_view",
    },
  ]);
  delete window.dataLayer;
  expect(() => trackFunnel(salesPages[0], "starter_plan_view")).not.toThrow();
});

test("empty brief is useful and analytics never include entered content", () => {
  expect(buildBrief(salesPages[0])).not.toContain("undefined");
  window.dataLayer = [];
  trackContact(salesPages[0], "whatsapp", "brief");
  expect(window.dataLayer).toEqual([
    {
      event: "contact_intent",
      landing_page: salesPages[0].path,
      contact_channel: "whatsapp",
      contact_placement: "brief",
    },
  ]);
  delete window.dataLayer;
});
