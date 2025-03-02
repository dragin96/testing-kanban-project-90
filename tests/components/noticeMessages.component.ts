import {BaseComponent} from "../page/base/base.page";
import {expect, Page} from "@playwright/test";
import {step} from "../helpers/allure";

export enum NoticeMessages {
    created = 'Element created',
    updated = 'Element updated',
    deleted =  'Element deleted',
    multiDeleted = 'elements deleted'
}
export class NoticeMessagesComponent extends BaseComponent {
    constructor(page: Page) {
        super({
            locator: page.getByRole('alert'),
            page
        });
    }

    @step('Проверяем, что задача создана')
    async expectMessages(title: string){
        await expect(this.locator.getByText(title)).toBeVisible();
        await expect(this.locator).toHaveText(title);
    }
}
