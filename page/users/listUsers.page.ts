import {BasePage} from "../base/base.page";
import {Page} from "@playwright/test";
import {urls} from "../../data/urls";
import {BaseListPage} from "../base/baseList.page";

export class ListUsersPage extends BaseListPage {
    url = urls.users.list;
    constructor(page: Page) {
        super({
            columns: ['Id', 'Email', 'First name', 'Last name', 'Created at'],
            page: page
        });
    }
}
