// pages/base.ts
// This file contains the base class for all pages
import { Page, Locator } from "@playwright/test";

export class BasePage {
  public page: Page;

  // Shared generic locators for pop-ups / cookies / banners
  readonly cookieAccept: Locator;
  readonly cookieAlt: Locator;
  readonly closeBtn: Locator;
  readonly feedbackClose: Locator;
  readonly minimiseBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    // common pop-ups seen across multiple Wikipedia or other pages
    this.cookieAccept = page.locator("button:has-text('Accept all')");
    this.cookieAlt = page.locator("button:has-text('Accept all cookies')");
    this.closeBtn = page.locator("button[aria-label='Close']");
    this.feedbackClose = page.locator(".frb-conversation-close-icon");
    this.minimiseBtn = page.locator("button:has-text('minimize')");
  }

  async goto(url: string) {
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
