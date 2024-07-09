import {Page} from "@playwright/test";
import {BaseListPage} from "../base/baseList.page";
import { urls } from "../../data/urls";

export class ListStatusPage extends BaseListPage {
    url = urls.statuses.list;
    constructor(page: Page) {
        super({
            columns: ['Id', 'Name', 'Slug', 'Created at'],
            page: page
        });
    }
}
