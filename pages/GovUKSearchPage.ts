import { Page, expect } from "@playwright/test";

export class GovUKSearchPage {
  readonly page: Page;
  readonly searchInput: ReturnType<Page["getByRole"]>;
  readonly searchButton: ReturnType<Page["getByRole"]>;
  readonly rejectCookiesButton: ReturnType<Page["getByRole"]>;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByRole("combobox", { name: "Search" });
    this.searchButton = page.getByRole("button", { name: "Search GOV.UK" });
    this.rejectCookiesButton = page.getByRole("button", { name: "Reject additional cookies" });
  }

  // go to search page
  async goto() {
    await this.page.goto("https://www.gov.uk/");
  }

  // reject optional cookies
  async rejectCookiesIfVisible() {
    if (await this.rejectCookiesButton.isVisible()) {
      await this.rejectCookiesButton.click();
    }
  }

  // search for query
  async search(query: string) {
    await this.searchInput.fill(query);
    await this.searchButton.click();
    await expect(this.page).toHaveURL(/search/);
  }

  async getResultsText(): Promise<string | null> {
  return this.page.textContent(".gem-c-document-list");
}
}