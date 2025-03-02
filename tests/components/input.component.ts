import {BaseComponent, SettingsComponents} from "../page/base/base.page";
import {step} from "../helpers/allure";


export class InputComponent extends BaseComponent {
    constructor(settings: SettingsComponents) {
        super(settings);
    }

    @step('Заполняем инпут значением $0')
    async fill(value: string) {
        await this.locator.fill(value);
    }
}
