import {BaseComponent} from "../page/base/base.page";
import {expect, Page} from "@playwright/test";

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

    async expectMessages(title: NoticeMessages){
        await expect(this.locator.getByText(title)).toBeVisible();
    }
}
