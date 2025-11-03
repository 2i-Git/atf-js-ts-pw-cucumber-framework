import { test, expect } from '@playwright/test';
import { GovUKSearchPage } from '@pages/GovUKSearchPage';

test.describe('gov.uk search', () => {
  test('User can search for "passport"', async ({ page }) => {
    const searchPage = new GovUKSearchPage(page);

    await searchPage.goto();
    await searchPage.rejectCookiesIfVisible();
    await searchPage.search('passport');

    const bodyText = await searchPage.getBodyText();
    expect(bodyText?.toLowerCase()).toContain('passport');
  });

  test('User can search for "driving licence"', async ({ page }) => {
    const searchPage = new GovUKSearchPage(page);

    await searchPage.goto();
    await searchPage.rejectCookiesIfVisible();
    await searchPage.search('driving licence');

    const bodyText = await searchPage.getBodyText();
    expect(bodyText?.toLowerCase()).toContain('driving');
  });

  test('User can search for "visa"', async ({ page }) => {
    const searchPage = new GovUKSearchPage(page);

    await searchPage.goto();
    await searchPage.rejectCookiesIfVisible();
    await searchPage.search('visa');

    const bodyText = await searchPage.getBodyText();
    expect(bodyText?.toLowerCase()).toContain('visa');
  });
});
