import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.wikipedia.org/');
  await page.getByRole('button', { name: 'minimize' }).click();
  await page.locator('.frb-conversation-close-icon').click();
  await page.getByRole('searchbox', { name: 'Search Wikipedia' }).click();
  await page.getByRole('searchbox', { name: 'Search Wikipedia' }).fill('Playw');
  await page.getByRole('link', { name: 'Playwright (software) End-to-' }).click();
  await page.locator('#firstHeading').getByText('Playwright (software)').click();
  await page.getByRole('searchbox', { name: 'Search Wikipedia' }).click();
  await page.getByRole('combobox', { name: 'Search Wikipedia' }).fill('London');
  await page.getByRole('link', { name: 'London Capital of both' }).click();
  await page.locator('#firstHeading').getByText('London').click();
  await page.getByRole('searchbox', { name: 'Search Wikipedia' }).click();
  await page.getByRole('combobox', { name: 'Search Wikipedia' }).fill('Testing fram');
  await page.getByRole('link', { name: 'Unit testing Validating the' }).click();
  await page.locator('#firstHeading').getByText('Unit testing').click();
  await page.getByRole('searchbox', { name: 'Search Wikipedia' }).click();
  await page.getByRole('link', { name: 'Test automation Use of' }).click();
  await page.locator('#firstHeading').getByText('Test automation').click();
});
