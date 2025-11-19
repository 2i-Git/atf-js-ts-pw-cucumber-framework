// This file contains the base class for all pages
import { Page, Locator } from "@playwright/test";
import { currentEnv } from "../config/env.config";

export class BasePage {
  public page: Page;
  public baseUrl: string;

  // Shared generic locators for pop-ups / cookies / banners
  readonly cookieAccept: Locator;
  readonly cookieAlt: Locator;
  readonly closeBtn: Locator;
  readonly feedbackClose: Locator;
  readonly minimiseBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = currentEnv.services.ui.govAppUIBaseUrl;

    // common pop-ups seen across multiple Wikipedia or other pages
    this.cookieAccept = page.locator("button:has-text('Accept all')");
    this.cookieAlt = page.locator("button:has-text('Accept all cookies')");
    this.closeBtn = page.locator("button[aria-label='Close']");
    this.feedbackClose = page.locator(".frb-conversation-close-icon");
    this.minimiseBtn = page.locator("button:has-text('minimize')");
  }

  async goto(path: string) {
    const url = `${this.baseUrl}${path}`;
    await this.page.goto(url, { waitUntil: "domcontentloaded" });
    await this.dismissOverlays();
  }

  async dismissOverlays() {
    const locators = [
      this.cookieAccept,
      this.cookieAlt,
      this.closeBtn,
      this.feedbackClose,
      this.minimiseBtn,
    ];

    for (const loc of locators) {
      const candidate = loc.first();
      if (await candidate.isVisible({ timeout: 500 }).catch(() => false)) {
        await candidate.click().catch(() => {});
      }
    }
  }
}
