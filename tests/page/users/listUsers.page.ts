import {Page} from "@playwright/test";
import {BaseListPage} from "../base/baseList.page";
import {urls} from "../../data/urls";

export class ListUsersPage extends BaseListPage {
    url = urls.users.list;
    constructor(page: Page) {
        super({
            columns: ['Id', 'Email', 'First name', 'Last name', 'Created at'],
            page: page
        });
    }
}
