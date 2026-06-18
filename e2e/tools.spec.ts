import { test, expect } from '@playwright/test';

test('JSON Formatter page loads and works', async ({ page }) => {
  await page.goto('/tools/json-formatter');
  await expect(page).toHaveTitle(/JSON Formatter/);
  
  // Fill input
  await page.fill('textarea[placeholder="Paste your JSON here..."]', '{"test":1}');
  await page.click('button:has-text("Format JSON")');
  
  // Check output
  const output = await page.inputValue('textarea[placeholder="Formatted JSON will appear here..."]');
  expect(output).toContain('"test": 1');
});

test('AI Bug Fix Prompt Generator page loads', async ({ page }) => {
  await page.goto('/ai-prompt-generators/ai-bug-fix-prompt-generator');
  await expect(page).toHaveTitle(/AI Bug Fix Prompt Generator/);
  
  await page.fill('input[id="language"]', 'TypeScript');
  await page.fill('textarea[id="error"]', 'Cannot read properties of undefined (reading "map")');
  await page.click('button:has-text("Generate Prompt")');
  
  const output = await page.inputValue('textarea[readonly]');
  expect(output).toContain('Act as an expert software debugger specializing in TypeScript');
  expect(output).toContain('Cannot read properties of undefined (reading "map")');
});
