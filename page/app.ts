import {AuthPage} from "./auth.page";
import {PageHolder} from "./base/base.page";
import {FormUserPage} from "./users/formUser.page";
import {Page} from "@playwright/test";
import {ListUsersPage} from "./users/listUsers.page";
import {ListLabelsPage} from "./labels/listLabel.page";
import {FormLabelPage} from "./labels/formLabel.page";

export class App extends PageHolder {
    constructor(page: Page) {
        super(page);
    }
    authPage = new AuthPage(this.page);
    formUserPage = new FormUserPage(this.page);
    listUsers = new ListUsersPage(this.page);
    listLabels = new ListLabelsPage(this.page);
    formLabelPage = new FormLabelPage(this.page);

}
