import {BaseComponent, SettingsComponents} from "../page/base/base.page";
import {expect} from "@playwright/test";

export interface SettingTable extends SettingsComponents {
    columns: string[];
}

export enum TableActions {
    delete = 'Delete'
}

export class TableComponent extends BaseComponent {
    private readonly columns: string[];
    headSelector = this.page.locator('thead');
    cellSelector =  this.page.locator('tbody td');
    rowSelector = this.page.locator('tbody tr');

    checkboxSelectAll = this.page.getByLabel('Select all');

    constructor(settings: SettingTable) {
        super(settings);
        this.columns = settings.columns;
    }

    async clickBySelectAll() {
        await this.checkboxSelectAll.click();
    }

    async clickActions(actions: TableActions) {
        await this.page.getByLabel(actions).click();
    }

    async checkHeaders() {
        for (const column of this.columns) {
            const tdHeadLocator = this.headSelector.getByText(column)
            await expect(tdHeadLocator).toBeVisible();
        }
    }

    async clickByRowText(text: string) {
        await this.rowSelector.filter({hasText: text}).click();
    }

    async expectDataRow(expectRowData: object, options: {isExist: boolean}) {
        options = { isExist: true, ...options};
        await this.expectVisible();
        for (const value of Object.values(expectRowData)) {
            const tableCellByText = this.rowSelector.getByText(value)
            await expect(tableCellByText).toBeVisible({visible: options.isExist});
        }
    }

    // async getDataTable(): Promise<Record<string, string>[]> {
    //     const data: Record<string, string>[] = [];
    //     const rowsCount = await this.rowSelector.all()
    //
    //     for (let i = 0; i < rowsCount.length; i++) {
    //         const row = this.rowSelector.nth(i);
    //         const cells = await row.locator('td').all();
    //         const rowData: Record<string, string> = {};
    //         for (let j = 1; j < cells.length; j++) {
    //             const cell = cells[j];
    //             const columnName = this.columns[j];
    //             const cellText = await cell.innerText();
    //             rowData[columnName] = cellText;
    //         }
    //         data.push(rowData);
    //     }
    //     return data;
    // }
}
