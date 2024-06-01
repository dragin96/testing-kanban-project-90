import {BaseComponent, SettingsComponents} from "../page/base/base.page";

export class InputComponent extends BaseComponent {
    constructor(settings: SettingsComponents) {
        super(settings);
    }

    async fill(value: string) {
        await this.locator.fill(value);
    }
}
