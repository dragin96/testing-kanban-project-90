import {test as base} from '@playwright/test';
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
    },
    apiCalls: [async ({ page }, use) => {
        const apiCalls: Array<any> = [];

        page.on('request', request => {
            const requestStartTime = Date.now();
            const requestData = {
                url: request.url(),
                method: request.method(),
                headers: request.headers(),
                postData: request.postData(),
                response: null,
                startTime: requestStartTime
            };

            // Отслеживание ответов
            request.on('response', async response => {
                const responseEndTime = Date.now();
                const responseTime = responseEndTime - requestStartTime;

                requestData.response = {
                    status: response.status(),
                    statusText: response.statusText(),
                    headers: response.headers(),
                    responseTime,
                    body: await response.text()
                };

                apiCalls.push(requestData);
            });
        })

        await use(apiCalls);
    }, { auto: true}],
})


export { expect } from '@playwright/test';
