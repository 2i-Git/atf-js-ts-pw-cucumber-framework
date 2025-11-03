import { test, expect } from "@playwright/test";

test("Open Wikipedia", async ({ page }) => {
  await page.goto("https://www.wikipedia.org");
  await expect(page).toHaveTitle("Wikipedia");
  await expect(page).toHaveURL("https://www.wikipedia.org/");
  await page.locator("input[name='search']").fill("Playwright");
  await page.locator("button[type='submit']").click();
  await expect(page).toHaveURL(/.*Playwright.*/);
  await expect(page).toHaveTitle(/.*Playwright.*/);
  await page.locator("text=Playwright").click();
  await expect(page).toHaveURL(/.*Playwright.*/);
  await expect(page).toHaveTitle(/.*Playwright.*/);

});
