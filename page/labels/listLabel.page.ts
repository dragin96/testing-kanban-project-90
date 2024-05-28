import {BasePage} from "../base/base.page";
import {Page} from "@playwright/test";
import {urls} from "../../data/urls";
import {TableComponent} from "../../components/table.component";

export class ListLabelsPage extends BasePage {
    url = urls.labels.list;
    constructor(page: Page) {
        super(page);
    }

    private buttonCreateUsers = this.page.getByLabel('Create', { exact: true });

    public table = new TableComponent({
        page: this.page,
        locator: this.page.locator('table'),
        columns: ['Id', 'Email', 'Name', 'Created at'],
    });

    async clickCreateLabel(){
        await this.buttonCreateUsers.click();
    }

}
