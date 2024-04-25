import test, { Locator, Page } from "@playwright/test";
import { CommonMethods } from "../../common_methods";
import CustomReporter from "../../../helpers/reporter";
import { allure } from "allure-playwright";
import { BaseDeleteModal } from "./BaseDeleteModal";

export class DeleteListModal implements BaseDeleteModal {
    readonly page: Page;
    readonly modalView: Locator;
    readonly deleteButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.modalView = this.page.locator("cu-subcategory-confirm-delete");
        this.deleteButton = this.page.locator("[data-test=confirmation-modal__confirm-button]");
    }

    async clickOnDeleteButton() {
        return await test.step(`Clicking on 'Delete' button`, async () => {
            await CommonMethods.clickOnElement(this.deleteButton);
            CustomReporter.logAction(`Clicked on 'Delete' button`);
            await allure.attachment("screenshot.png", await this.page.screenshot(), {
                contentType: "image/png",
            });
        });
    }
}
