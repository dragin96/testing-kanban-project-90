import {BasePage} from "../base/base.page";
import {Task} from "../../data/task.type";
import {expect} from "@playwright/test";

export class TaskPage extends BasePage {
    buttonDelete = this.page.getByRole('button', {name: 'Delete'})
    async checkData(dataTask: Task) {
        for (const value of Object.values(dataTask)) {
            await expect(this.page.getByText(value).first()).toBeVisible()
        }
    }
    async delete(){
        await this.buttonDelete.click();
    }

}
