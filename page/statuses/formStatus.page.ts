import {expect, Page} from "@playwright/test";
import {PageHolder} from "../base/base.page";
import {NoticeMessagesComponent} from "../../components/noticeMessages.component";

export class FormStatusPage extends PageHolder {
    constructor(page: Page) {
        super(page);
    }
    private form = {
        name: this.page.getByLabel('Name'),
        slug: this.page.getByLabel('Slug'),
    }
    messages = new NoticeMessagesComponent(this.page);
    private saveBtn = this.page.getByRole('button', {name: 'Save'})
    private deleteBtn = this.page.getByRole('button', {name: 'Delete'})

    async fillForm(values: any) {
        for (const [keyForm, valueField] of Object.entries(values)) {
            await this.form[keyForm].fill(valueField);
        }
    }

    async checkAllForm() {
        for (const [_, locatorField] of Object.entries(this.form)) {
            await expect(locatorField).toBeVisible()
        }
    }

    async checkVisibleButtonSave() {
        await expect(this.saveBtn).toBeVisible();
    }

    async save() {
        await this.saveBtn.click();
    }

    async open(url: string) {
        await this.page.goto(url);
    }

    async delete(){
        await this.deleteBtn.click();
    }
}
