import { Page, Locator, expect } from "@playwright/test";

export class GovUKSearchPage {
  private readonly page: Page;

  // Locators
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly rejectCookiesButton: Locator;
  private readonly resultsList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByRole("combobox", { name: "Search" });
    this.searchButton = page.getByRole("button", { name: "Search GOV.UK" });
    this.rejectCookiesButton = page.getByRole("button", { name: "Reject additional cookies" });
    this.resultsList = page.locator(".gem-c-document-list");
  }

  // vavigate to the gov.uk homepage
  async goto() {
    await this.page.goto("https://www.gov.uk/");
  }

  // reject optional cookies if visible
  async rejectCookiesIfVisible() {
    if (await this.rejectCookiesButton.isVisible()) {
      await this.rejectCookiesButton.click();
    }
  }

  // perform search
  async search(query: string) {
    await this.searchInput.fill(query);
    await this.searchButton.click();
    await expect(this.page).toHaveURL(/search/); // ensure navigation worked
  }

  // get search results text
  async getResultsText(): Promise<string | null> {
    return this.resultsList.textContent();
  }

  // check search results contain required text
  async expectResultsToContain(text: string) {
    const results = await this.getResultsText();
    expect(results).toContain(text);
  }
}
