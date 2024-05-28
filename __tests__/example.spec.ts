import { test, expect } from '@playwright/test';

test.beforeEach(async ({page})=> {
  await page.goto('http://localhost:5173/');
});

test('has title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Vite \+ React/);
});


