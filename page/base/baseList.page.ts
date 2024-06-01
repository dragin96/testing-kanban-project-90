import {BasePage} from "./base.page";
import {TableComponent} from "../../components/table.component";
import {Page} from "@playwright/test";

export interface SettingBaseListPage {
    page: Page,
    columns: string[],
}

export class BaseListPage extends BasePage {
    table: TableComponent;

    private buttonCreate = this.page.getByLabel('Create', { exact: true });

    constructor(settings: SettingBaseListPage) {
        super(settings.page);
        this.table = new TableComponent({
            page: this.page,
            locator: this.page.locator('table'),
            columns: settings.columns,
        });
    }

    async clickCreate(){
        await this.buttonCreate.click();
    }
}
