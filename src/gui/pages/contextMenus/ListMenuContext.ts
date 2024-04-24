import test, { Locator, Page } from "@playwright/test";
import { CommonMethods } from "../../common_methods";
import CustomReporter from "../../../helpers/reporter";
import { allure } from "allure-playwright";

export class ListMenuContext {
    readonly page: Page;
    readonly contextMenu: Locator;
    readonly deleteButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.contextMenu = page.locator("[data-test=dropdown__menu__sidebar]");
        this.deleteButton = page.locator("a").getByText(" Delete ");
    }

    async clickOnDeleteOption() {
        return await test.step("Clicking on 'Delete' option on list context menu", async () => {
            await CommonMethods.clickOnElement(this.deleteButton);
            CustomReporter.logAction(
                "Clicked on 'Delete' option on list context menu"
            );
            await allure.attachment(
                "screenshot.png",
                await this.page.screenshot(),
                {
                    contentType: "image/png",
                }
            );
        });
    }
}
