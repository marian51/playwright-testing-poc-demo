import test, { Locator, Page, expect } from "@playwright/test";
import { CommonMethods } from "../../common_methods";
import CustomReporter from "../../../helpers/reporter";
import { allure } from "allure-playwright";
import { BaseCreateModal } from "./BaseCreateModal";

export class CreateListModal implements BaseCreateModal {
    readonly page: Page;
    readonly modalView: Locator;
    readonly newEntryNameInput: Locator;
    readonly createEntryButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.modalView = this.page.locator("cu-simple-input-modal");
        this.newEntryNameInput = this.page.getByPlaceholder("List");
        this.createEntryButton = this.page.locator("[data-test=simple-input-modal__button]");
    }

    async typeIntoNewEntryNameInput(text: string): Promise<void> {
        return await test.step(`Typing '${text}' into new list name input`, async () => {
            await CommonMethods.typeIntoField(this.newEntryNameInput, text);
            CustomReporter.logAction(`Typed '${text}' into new list name input`);
            await allure.attachment("screenshot.png", await this.page.screenshot(), {
                contentType: "image/png",
            });
        });
    }

    async clickOnCreateButton(): Promise<void> {
        return await test.step(`Clicking on 'Create List' button on modal`, async () => {
            await CommonMethods.clickOnElement(this.createEntryButton);
            CustomReporter.logAction(`Clicked on 'Create List' button on modal`);
            await allure.attachment("screenshot.png", await this.page.screenshot(), {
                contentType: "image/png",
            });
        });
    }

    async waitForModalDisappear(): Promise<void> {
        return await test.step(`Waiting for modal disappear`, async () => {
            await expect(this.modalView).toBeHidden();
            CustomReporter.logAction(`Modal window has disappeared`);
            await allure.attachment("screenshot.png", await this.page.screenshot(), {
                contentType: "image/png",
            });
        });
    }
}
