import {BasePage} from "./base.page";
import {expect, Page} from "@playwright/test";
import {NoticeMessagesComponent} from "../../components/noticeMessages.component";
import {SelectComponent} from "../../components/select.component";
import {InputComponent} from "../../components/input.component";

export interface SettingsBaseForm {
    page: Page,
    form: Record<string, InputComponent | SelectComponent>
}

export class BaseFormPage extends BasePage {
    private readonly form: SettingsBaseForm['form'];

    constructor(settings: SettingsBaseForm) {
        super(settings.page);
        this.form = settings.form;
    }

    messages = new NoticeMessagesComponent(this.page);
    private saveBtn = this.page.getByRole('button', {name: 'Save'})
    private deleteBtn = this.page.getByRole('button', {name: 'Delete'})

    async fillForm<T>(values: T) {
        for (const [keyForm, valueField] of Object.entries(values)) {
            await this.form[keyForm].fill(valueField as string);
        }
    }

    async checkAllForm() {
        for (const [_, locatorField] of Object.entries(this.form)) {
            await locatorField.expectVisible()
        }
    }

    async checkVisibleButtonSave() {
        await expect(this.saveBtn).toBeVisible();
    }

    async save() {
        await this.saveBtn.click();
    }

    override async open(url: string) {
        await this.page.goto(url);
    }

    async delete(){
        await this.deleteBtn.click();
    }
}
