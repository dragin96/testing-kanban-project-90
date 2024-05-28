import {BasePage} from "../base/base.page";
import {Page} from "@playwright/test";
import {urls} from "../../data/urls";
import {TableComponent} from "../../components/table.component";

export class ListUsersPage extends BasePage {
    url = urls.users.list;
    constructor(page: Page) {
        super(page);
    }

    private buttonCreateUsers = this.page.getByLabel('Create', { exact: true });

    public table = new TableComponent({
        page: this.page,
        locator: this.page.locator('table'),
        columns: ['Id', 'Email', 'First name', 'Last name', 'Created at'],
    });

    async clickCreateUsers(){
        await this.buttonCreateUsers.click();
    }

}
