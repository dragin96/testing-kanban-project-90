import {expect, test} from "@playwright/test";


test.beforeEach(async ({page})=> {
    const authData = {
        login: 'nickname',
        password: 'password'
    }

    await page.goto('http://localhost:5173/');
    await page.getByLabel('username').fill(authData.login);
    await page.getByLabel('password').fill(authData.password);
    await page.getByRole('button', { name: 'Sign in' }).click();
});

test('Авторизация', async ({page}) => {
    await expect(page.getByLabel('Profile')).toBeVisible();
});

test('Выход', async ({ page})=> {
    await page.getByLabel('Profile').click();
    await page.getByRole('menuitem', {name: "Logout"}).click();

    await expect(page.locator('.MuiPaper-root')).toBeVisible();
});
