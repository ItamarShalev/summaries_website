import { describe, it, vi, beforeEach, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import HealthyCard from "@/components/Healthy/HealthyCard";
import i18n from "@/locales";

const renderComponent = () =>
  render(
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>
        <HealthyCard />
      </I18nextProvider>
    </MemoryRouter>
  );

// Mock fetch with real Response type
function mockFetch(statusValue: boolean): typeof fetch {
  return vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ status: statusValue }),
    } as unknown as Response)
  );
}

describe("HealthyStatus component (zero-delay)", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("applies success class when healthy", async () => {
    globalThis.fetch = mockFetch(true);
    renderComponent();

    const heading = await screen.findByRole("heading", { level: 2 });
    expect(heading.className).toMatch(/healthyHeading--success/);
  });

  it("applies error class when unhealthy", async () => {
    globalThis.fetch = mockFetch(false);
    renderComponent();

    const heading = await screen.findByRole("heading", { level: 2 });
    expect(heading.className).toMatch(/healthyHeading--error/);
  });

  it("applies error class on fetch failure", async () => {
    globalThis.fetch = vi.fn(() => Promise.reject("network error")) as typeof fetch;
    renderComponent();

    const heading = await screen.findByRole("heading", { level: 2 });
    expect(heading.className).toMatch(/healthyHeading--error/);
  });

  it("shows loading class initially before fetch", () => {
    globalThis.fetch = vi.fn(() => new Promise(() => {})) as typeof fetch;
    renderComponent();

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading.className).toMatch(/healthyHeading--checking/);
  });
});
