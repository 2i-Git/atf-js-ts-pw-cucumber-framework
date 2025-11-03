import { test, expect } from '@playwright/test';
import { searchGovUK } from '@helpers/govUKhelpers';

test.describe('gov.uk search', () => {
  test('User can search for "passport"', async ({ page }) => {
    await searchGovUK(page, 'passport');

    const bodyText = await page.textContent('body');
    expect(bodyText?.toLowerCase()).toContain('passport');
  });

  test('User can search for "driving licence"', async ({ page }) => {
    await searchGovUK(page, 'driving licence');

    const bodyText = await page.textContent('body');
    expect(bodyText?.toLowerCase()).toContain('driving');
  });

  test('User can search for "visa"', async ({ page }) => {
    await searchGovUK(page, 'visa');

    const bodyText = await page.textContent('body');
    expect(bodyText?.toLowerCase()).toContain('visa');
  });
});
