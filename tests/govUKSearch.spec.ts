import { test, expect } from "@playwright/test";
import { GovUKSearchPage } from "@pages/GovUKSearchPage";

const searchTerms = [
  { query: "passport", expected: "passport" },
  { query: "driving licence", expected: "driving" },
  { query: "visa", expected: "visa" },
];

test.describe("gov.uk search", {tag: ['@govSearch']} ,() => {
  for (const { query, expected } of searchTerms) {
    test(`User can search for "${query}"`, async ({ page }) => {
      const searchPage = new GovUKSearchPage(page);

      await searchPage.goto();
      await searchPage.rejectCookiesIfVisible();
      await searchPage.search(query);

      const bodyText = await searchPage.getResultsText();
      expect(bodyText?.toLowerCase()).toContain(expected);
    });
  }
});
