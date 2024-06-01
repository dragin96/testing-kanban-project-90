import {Page} from "@playwright/test";
import {BaseFormPage} from "../base/baseForm.page";
import {InputComponent} from "../../components/input.component";

export class FormLabelPage extends BaseFormPage {
    constructor(page: Page) {
        super({
            form: {
                name: new InputComponent({page, locator: page.getByLabel('Name')}),
            },
            page
        });
    }
}
