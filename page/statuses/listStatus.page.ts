import {BasePage} from "../base/base.page";
import {Page} from "@playwright/test";
import {urls} from "../../data/urls";
import {TableComponent} from "../../components/table.component";

export class ListStatusPage extends BasePage {
    url = urls.statuses.list;
    constructor(page: Page) {
        super(page);
    }

    private buttonCreateUsers = this.page.getByLabel('Create', { exact: true });

    public table = new TableComponent({
        page: this.page,
        locator: this.page.locator('table'),
        columns: ['Id', 'Name', 'Slug', 'Created at'],
    });

    async clickCreate(){
        await this.buttonCreateUsers.click();
    }
}
