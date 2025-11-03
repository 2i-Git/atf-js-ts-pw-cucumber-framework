import { expect } from "@playwright/test";
import { BasePage } from "./base";

export class WikipediaPage extends BasePage {
    readonly searchInput = this.page.locator("input[name='search']");
    readonly heading = this.page.locator("#firstHeading");
    readonly content = this.page.locator("#mw-content-text");

    async gotoHome() {
        await this.goto("https://www.wikipedia.org/");
        await expect(this.searchInput).toBeVisible();
    }

    async searchAndOpen(topic: string) {
        await this.searchInput.fill(topic);
        await this.searchInput.press("Enter");
        await expect(this.heading).toBeVisible();
    }

    async getArticleTitle() {
        return (await this.heading.innerText()).trim();
    }

    async getArticleText() {
        return (await this.content.innerText()).toLowerCase();
    }
}
