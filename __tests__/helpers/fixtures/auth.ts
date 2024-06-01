import { test as base } from '@playwright/test';
import {AuthPage} from "../../page/auth.page";
import {validAuthData} from "../../data/users";
import {App} from "../../page/app";


export const authTest = base.extend({
    page: async ({ page }, use) => {
        const authPage = new AuthPage(page);

        await authPage.open();
        await authPage.fillForm(validAuthData.login, validAuthData.password);
        await use(page);
    },
});

export const test = authTest.extend<{app: App}>({
    app: async ({page}, use) => {
        const app = new App(page);
        await use(app);
    }
})


export { expect } from '@playwright/test';
