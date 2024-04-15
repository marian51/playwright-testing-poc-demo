import test, { Locator, Page, expect } from "@playwright/test";
import { allure } from "allure-playwright";

export class CreateSpaceModal {
    readonly page: Page;
    readonly modalView: Locator
    readonly newSpaceNameInput: Locator
    readonly continueButton: Locator
    readonly createSpaceButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.modalView = page.locator("cu-create-space")
        this.newSpaceNameInput = page.getByPlaceholder("e.g. Marketing, Engineering, HR")
        this.continueButton = page.locator("[data-test=create-space-details__continue-button]")
        this.createSpaceButton = page.locator("[data-test=create-test-workflow__create-space-button]")
    }

    async typeIntoNewSpaceNameInput(text: string) {
        return await test.step(`Typing 'text' into new space name input`, async () => {
            await this.newSpaceNameInput.fill(text)
            await allure.attachment("screenshot.png", await this.page.screenshot(), {
                contentType: "image/png"
            })
        })
    }

    async clickOnContinueButton() {
        return await test.step(`Clicking on 'continue' button`, async () => {
            await this.continueButton.click()
            await allure.attachment("screenshot.png", await this.page.screenshot(), {
                contentType: "image/png"
            })
        })
    }

    async clickOnCreateSpaceButton() {
        return await test.step(`Clicking on 'Create Space' button on modal`, async () => {
            await this.createSpaceButton.click()
            await allure.attachment("screenshot.png", await this.page.screenshot(), {
                contentType: "image/png"
            })
        })
    }

    async waitForModalDisappear() {
        return await test.step(`Waiting for modal dissapear`, async () => {
            await expect(this.modalView).toBeHidden()
            await allure.attachment("screenshot.png", await this.page.screenshot(), {
                contentType: "image/png"
            })
        })
    }
}