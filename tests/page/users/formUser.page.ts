import {BaseFormPage} from "../base/baseForm.page";
import {Page} from "@playwright/test";
import {InputComponent} from "../../components/input.component";


export class FormUserPage extends BaseFormPage {
    constructor(page: Page) {
        super({
            form: {
                email: new InputComponent({page, locator: page.getByLabel('Email')}),
                firstName: new InputComponent({page, locator: page.getByLabel('First name')}),
                lastName: new InputComponent({page, locator: page.getByLabel('Last name')}),
                password: new InputComponent({page, locator: page.getByLabel('Password')}),
            },
            page
        });
    }
}
