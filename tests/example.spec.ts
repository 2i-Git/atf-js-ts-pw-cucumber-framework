import { test, expect } from "@playwright/test";

test("Search Playwright on Google", async ({ page }) => {
  // Go to Google (allow for regional redirect)
  await page.goto("https://www.google.com");

  // Handle cookie consent if visible
  const acceptButton = page.getByRole("button", { name: /Accept|Agree/i });
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  // Locate the search box (by class or role)
  const searchBox = page.locator('textarea[name="q"]');
  await searchBox.fill("Playwright");
  await searchBox.press("Enter");

  await expect(page).toHaveURL(/.*playwright.*/);
  //will be a error because is show the recaptcha

});
