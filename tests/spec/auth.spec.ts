import {expect} from "@playwright/test";
import {test} from "../helpers/fixtures/auth";

test('Авторизация', async ({page}) => {
    await expect(page.getByLabel('Profile')).toBeVisible();
});

test('Выход', async ({ page})=> {
    await page.getByLabel('Profile').click();
    await page.getByRole('menuitem', {name: "Logout"}).click();

    await expect(page.locator('.MuiPaper-root')).toBeVisible();
});
