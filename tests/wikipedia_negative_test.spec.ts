import { test, expect } from "@playwright/test";
import { WikiSteps } from "../steps/wiki-steps";

// Negative test: searching for a nonsense topic should show search results page
test("Wikipedia — unknown topic shows search results", async ({ page }) => {
    const steps = new WikiSteps(page);
    await steps.openWikipedia();
    await steps.queryTopic("ajsdhajsdhkajshdkajshd"); // nonsense
    await expect(page.locator("#mw-content-text")).toContainText("Search results");
});
