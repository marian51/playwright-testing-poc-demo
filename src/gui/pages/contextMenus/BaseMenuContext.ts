import test, { Locator, Page } from "@playwright/test";
import { CommonMethods } from "../../common_methods";
import CustomReporter from "../../../helpers/reporter";
import { allure } from "allure-playwright";

export class BaseMenuContext {
    protected menuElement: string;
    protected page: Page;
    protected contextMenu: Locator;
    protected deleteButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.deleteButton = page.locator("a").getByText(" Delete ");
    }

    async clickOnDeleteOption() {
        return await test.step(`Clicking on 'Delete' option on ${this.menuElement} context menu`, async () => {
            await CommonMethods.clickOnElement(this.deleteButton);
            CustomReporter.logAction(`Clicked on 'Delete' option on ${this.menuElement} context menu`);
            await allure.attachment("screenshot.png", await this.page.screenshot(), {
                contentType: "image/png",
            });
        });
    }
}
