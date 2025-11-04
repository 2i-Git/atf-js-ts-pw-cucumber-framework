// tests/wikipedia.spec.ts
// This file contains the Wikipedia test suite
import { test, expect } from "@playwright/test";
import { WIKI_CASES } from "../models/wiki-data";
import { WikiSteps } from "../steps/wiki-steps";

test.describe("Wikipedia — query topics and assert words", () => {
  for (const c of WIKI_CASES) {
    test(`Topic: ${c.topic}`, async ({ page }) => {
      const steps = new WikiSteps(page);

      await test.step("Open Wikipedia", async () => {
        await steps.openWikipedia();
      });

      await test.step(`Search for "${c.topic}"`, async () => {
        const title = await steps.queryTopic(c.topic);
        expect.soft(title.length, "Article title should be present").toBeGreaterThan(0);
      });

      await test.step(`Assert article contains required words`, async () => {
        await steps.assertArticleContainsWords(c.mustContain);
      });
    });
  }
});

// Negative test: searching for a nonsense topic should show search results page
test("Wikipedia — unknown topic shows search results", async ({ page }) => {
  const steps = new WikiSteps(page);
  await steps.openWikipedia();
  await steps.queryTopic("ajsdhajsdhkajshdkajshd"); // nonsense
  await expect(page.locator("#mw-content-text")).toContainText("Search results");
});
