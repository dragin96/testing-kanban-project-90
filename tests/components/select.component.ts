import {BaseComponent, SettingsComponents} from "../page/base/base.page";

export class SelectComponent extends BaseComponent {
    constructor(settings: SettingsComponents) {
        super(settings);
    }
    async fill(values: string | string[]): Promise<void> {
        const getOptionsByText = (value: string) => this.locator
            .getByRole('option', { name: value })
            .first();
        await this.locator.click();

        if (Array.isArray(values)) {
            for (const value of values) {
                await getOptionsByText(value).click();
            }
            await this.page.locator('#menu-label_id').click();
        } else {
            await getOptionsByText(values).click();
        }
    }
}
