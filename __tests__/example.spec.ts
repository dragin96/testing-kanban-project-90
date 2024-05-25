import { test, expect } from '@playwright/test';

test.beforeEach(async ({page})=> {
  await page.goto('http://localhost:5173/');
});

test('has title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Vite \+ React/);
});

test('Наличие формы авторизацие', async ({ page }) => {
  // Click the get started link.
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.locator('.RaLogin-card')).toBeVisible();
});



