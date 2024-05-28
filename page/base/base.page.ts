import {expect, Locator, Page} from "@playwright/test";

export abstract class PageHolder {
    protected page: Page;
    protected constructor(page: Page) {
        this.page = page;
    }
}

export interface SettingsComponents {
    page: Page,
    locator: Locator
}
export abstract class BaseComponent extends PageHolder {
    protected locator: Locator;
    protected constructor(settings: SettingsComponents) {
        super(settings.page);
        this.locator = settings.locator;
    }
    async expectVisible(timeout = 5_000) {
        await expect(this.locator).toBeVisible({timeout})
    }
}

export abstract class BasePage extends PageHolder{
    abstract url: string

    async open(){
        await this.page.goto(this.url)
    }
}


