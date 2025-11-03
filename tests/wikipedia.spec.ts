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

      await test.step(`Assert contains: ${c.mustContain.join(", ")}`, async () => {
        const text = await steps.readArticleText();
        for (const w of c.mustContain) {
          expect.soft(text, `Missing word: ${w}`).toContain(w.toLowerCase());
        }
      });
    });
  }
});
