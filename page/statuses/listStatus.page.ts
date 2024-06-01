import {Page} from "@playwright/test";
import {urls} from "../../data/urls";
import {BaseListPage} from "../base/baseList.page";

export class ListStatusPage extends BaseListPage {
    url = urls.statuses.list;
    constructor(page: Page) {
        super({
            columns: ['Id', 'Name', 'Slug', 'Created at'],
            page: page
        });
    }
}
