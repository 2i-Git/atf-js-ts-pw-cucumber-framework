import { Page, expect } from '@playwright/test';

/**
 * Performs a search on the gov.uk site
 * @param page Page object
 * @param query Search term 
 */

export async function searchGovUK(page: Page, query: string): Promise<void> {
  await page.goto('https://www.gov.uk/');

  // handle cookie banner if visible
  const rejectButton = page.getByRole('button', { name: 'Reject additional cookies' });
  if (await rejectButton.isVisible()) {
    await rejectButton.click();
  }

  // fill in the search query and submit
  await page.getByRole('combobox', { name: 'Search' }).fill(query);
  await page.getByRole('button', { name: 'Search GOV.UK' }).click();

  // verify correct navigation to search results
  await expect(page).toHaveURL(/search/);
}
