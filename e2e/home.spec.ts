import { test, expect } from '@playwright/test';

test('homepage loads and displays correct title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/FreeDevTools AI/);
  
  // Main CTA or text
  await expect(page.locator('h1')).toContainText('Free Developer Tools & AI Prompt Generators');
});

test('navigation links work', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Developer Tools');
  await expect(page).toHaveURL(/.*\/tools/);
  await expect(page.locator('h1')).toContainText('Developer Tools');
});
