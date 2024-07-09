
import {expect, Page} from "@playwright/test";
import {BaseComponent} from "../../base/base.page";

export class Cards extends BaseComponent {
    static getCardByTitle(title: string, page: Page) {
        const regTitle = new RegExp(`^${title} `)
        return new Cards({
            page,
            locator: page.getByRole('button', {name: regTitle})
        })
    }

    override async expectVisible(){
        await this.locator.scrollIntoViewIfNeeded();
        await expect(this.locator).toBeVisible({timeout: 40_000});
    }
    async expectDeleted() {
        await expect(this.locator).toBeHidden();
    }
    async edit() {
        await this.locator.getByLabel('Edit').click();
    }

    getLocator() {
        return this.locator;
    }

    async open() {
        await this.locator.getByLabel('Show').click();
    }
}
