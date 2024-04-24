import test, { Locator, Page } from "@playwright/test";
import { CommonMethods } from "../common_methods";
import CustomReporter from "../../helpers/reporter";
import { allure } from "allure-playwright";

export class DeleteSpaceModal {
    readonly page: Page;
    readonly modalView: Locator;
    readonly deleteSpaceNameInput: Locator;
    readonly deleteButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.modalView = this.page.locator("cu-project-confirm-delete");
        this.deleteSpaceNameInput = this.modalView.locator("input");
        this.deleteButton = this.page.locator(
            "[data-test=confirmation-modal__confirm-button]"
        );
    }

    async typeIntoNameInput(text: string) {
        return await test.step(`Typing '${text}' into delete space name input`, async () => {
            await CommonMethods.typeIntoField(this.deleteSpaceNameInput, text);
            CustomReporter.logAction(
                `Typed '${text}' into delete space name input`
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

    async clickOnDeleteButton() {
        return await test.step(`Clicking on 'Delete' button`, async () => {
            await CommonMethods.clickOnElement(this.deleteButton);
            CustomReporter.logAction(`Clicked on 'Delete' button`);
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
