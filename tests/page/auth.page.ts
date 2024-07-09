import {urls} from "../data/urls";
import {BasePage} from "./base/base.page";
import {Page} from "@playwright/test";

export class AuthPage extends BasePage {
    url = urls.auth;
    form = {
        username: this.page.getByLabel('username'),
        password: this.page.getByLabel('password')
    }
    buttonSubmit = this.page.getByRole('button', { name: 'Sign in' });

    constructor(page: Page) {
        super(page);
    }
    async fillUsername(username: string) {
        await this.form.username.fill(username);
    }

    async  fillPassword(password: string) {
        await this.form.password.fill(password);
    }

    async clickSubmit() {
        await this.buttonSubmit.click();
    }

    async fillForm(username: string, password: string) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickSubmit();
    }
}
