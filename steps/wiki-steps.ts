// steps/wiki-steps.ts
// This file contains the step definitions for Wikipedia tests
import { Page, expect } from "@playwright/test";
import { WikipediaPage } from "../pages/wikipedia.page";

export class WikiSteps {
    private readonly wiki: WikipediaPage;

    // --- step actions ---
    constructor(page: Page) {
        this.wiki = new WikipediaPage(page);
    }
    // Open Wikipedia homepage
    async openWikipedia() {
        await this.wiki.gotoHome();
    }
    // Search for a topic and return the article title
    async queryTopic(topic: string) {
        await this.wiki.searchAndOpen(topic);
        return this.wiki.getArticleTitle();
    }
    // Read the article text
    async readArticleText() {
        return this.wiki.getArticleText();
    }
    // Assert that the article contains the expected words
    async assertArticleContainsWords(expectedWords: string[]) {
        const articleText = await this.wiki.getArticleText();

        for (const word of expectedWords) {
            expect(articleText, `Article is missing word: ${word}`).toContain(word.toLowerCase());
        }
    }
}
