import {Page} from "@playwright/test";
import {SelectComponent} from "../../../components/select.component";
import {BaseFormPage} from "../../base/baseForm.page";

export class Filter extends BaseFormPage {
    constructor(page: Page) {
        super({
            page,
            form: {
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
            }
        });
    }
}
