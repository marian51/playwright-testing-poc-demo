import test, { Locator, Page, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { CommonMethods } from "../../common_methods";
import CustomReporter from "../../../helpers/reporter";

export class CreateSpaceModal {
    readonly page: Page;
    readonly modalView: Locator;
    readonly newSpaceNameInput: Locator;
    readonly continueButton: Locator;
    readonly createSpaceButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.modalView = page.locator("cu-create-space");
        this.newSpaceNameInput = page.getByPlaceholder("e.g. Marketing, Engineering, HR");
        this.continueButton = page.locator("[data-test=create-space-details__continue-button]");
        this.createSpaceButton = page.locator("[data-test=create-test-workflow__create-space-button]");
    }

    async typeIntoNewSpaceNameInput(text: string) {
        return await test.step(`Typing '${text}' into new space name input`, async () => {
            await CommonMethods.typeIntoField(this.newSpaceNameInput, text);
            CustomReporter.logAction(`Typed '${text}' into new space name input`);
            await allure.attachment("screenshot.png", await this.page.screenshot(), {
                contentType: "image/png",
            });
        });
    }

    async clickOnContinueButton() {
        return await test.step(`Clicking on 'continue' button`, async () => {
            await CommonMethods.clickOnElement(this.continueButton);
            CustomReporter.logAction(`Clicked on 'continue' button`);
            await allure.attachment("screenshot.png", await this.page.screenshot(), {
                contentType: "image/png",
            });
        });
    }

    async clickOnCreateSpaceButton() {
        return await test.step(`Clicking on 'Create Space' button on modal`, async () => {
            await CommonMethods.clickOnElement(this.createSpaceButton);
            CustomReporter.logAction(`Clicked on 'Create Space' button on modal`);
            await allure.attachment("screenshot.png", await this.page.screenshot(), {
                contentType: "image/png",
            });
        });
    }

    async waitForModalDisappear() {
        return await test.step(`Waiting for modal dissapear`, async () => {
            await expect(this.modalView).toBeHidden();
            CustomReporter.logAction(`Modal window has dissapeared`);
            await allure.attachment("screenshot.png", await this.page.screenshot(), {
                contentType: "image/png",
            });
        });
    }
}
