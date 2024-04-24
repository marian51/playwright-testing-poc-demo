import test, { Locator, Page, expect } from "@playwright/test";
import { CommonMethods } from "../common_methods";
import CustomReporter from "../../helpers/reporter";
import { allure } from "allure-playwright";

export class CreateListModal {
    readonly page: Page;
    readonly modalView: Locator;
    readonly newListNameInput: Locator;
    readonly createListButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.modalView = this.page.locator("cu-simple-input-modal");
        this.newListNameInput = this.page.getByPlaceholder("List");
        this.createListButton = this.page.locator(
            "[data-test=simple-input-modal__button]"
        );
    }

    async typeIntoNewListNameInput(text: string) {
        return await test.step(`Typing '${text}' into new list name input`, async () => {
            await CommonMethods.typeIntoField(this.newListNameInput, text);
            CustomReporter.logAction(
                `Typed '${text}' into new list name input`
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

    async clickOnCreateListButton() {
        return await test.step(`Clicking on 'Create List' button on modal`, async () => {
            await CommonMethods.clickOnElement(this.createListButton);
            CustomReporter.logAction(
                `Clicked on 'Create List' button on modal`
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

    async waitForModalDisappear() {
        return await test.step(`Waiting for modal disappear`, async () => {
            await expect(this.modalView).toBeHidden();
            CustomReporter.logAction(`Modal window has disappeared`);
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
