import {Page} from "@playwright/test";
import {urls} from "../../data/urls";
import {BaseListPage} from "../base/baseList.page";

export class ListLabelsPage extends BaseListPage  {
    url = urls.labels.list;
    constructor(page: Page) {
        super({
            columns: ['Id', 'Email', 'Name', 'Created at'],
            page: page
        });
    }
}
