import { Locator, Page } from "@playwright/test";

export class GlobalBar {
    readonly page: Page;
    readonly userSettingImage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userSettingImage = page.locator("[data-test=user-main-settings-menu__dropdown-toggle]")
    }

    async waitForLoad() {
        await this.userSettingImage.waitFor()
    }
}