import {BaseFormPage} from "../base/baseForm.page";
import {Page} from "@playwright/test";
import {SelectComponent} from "../../components/select.component";
import {InputComponent} from "../../components/input.component";

export class FormTasksPage extends BaseFormPage {
    constructor(page: Page) {
        super({
            form: {
                title: new InputComponent({
                    page,
                    locator: page.getByLabel('Title')
                }),
                content: new InputComponent({
                    page,
                    locator: page.getByLabel('Content', { exact: true })
                }),
                assignee: new SelectComponent({
                    locator: page.getByLabel('Assignee'),
                    page
                }),
                status: new SelectComponent({
                    page,
                    locator: page.getByLabel('Status')
                }),
                label: new SelectComponent({
                    page,
                    locator: page.getByLabel('Label')
                }),
            },
            page
        });
    }
}
