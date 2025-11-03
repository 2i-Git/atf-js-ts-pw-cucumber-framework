import { Page } from "@playwright/test";
import { WikipediaPage } from "../pages/wikipedia.page";

export class WikiSteps {
    private readonly wiki: WikipediaPage;

    // --- step actions ---
    constructor(page: Page) {
        this.wiki = new WikipediaPage(page);
    }

    async openWikipedia() {
        await this.wiki.gotoHome();
    }

    async queryTopic(topic: string) {
        await this.wiki.searchAndOpen(topic);
        return this.wiki.getArticleTitle();
    }

    async readArticleText() {
        return this.wiki.getArticleText();
    }
}
