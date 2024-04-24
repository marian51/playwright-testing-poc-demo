import { Locator, Page } from "@playwright/test";
import CustomReporter from "../../helpers/reporter";
import { CommonMethods } from "../common_methods";
import { allure } from "allure-playwright";

export class MainView {
    readonly page: Page;
    readonly newTaskInput: Locator;
    readonly newListButton: Locator;
    readonly addListButton: Locator;
    readonly excelCsvBubble: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newTaskInput = page.locator("[data-test=task-row-new__input]");
        this.newListButton = page.getByText(" New List ");
        this.addListButton = page.getByText(" Add list ");
        this.excelCsvBubble = page.locator(
            "[data-pendo=csv-integration-bubble]"
        );
    }

    async waitForNewTaskInput() {
        await this.newTaskInput.waitFor();
    }

    async waitForNewListButton() {
        await this.newListButton.waitFor();
        CustomReporter.logAction(`Main view has been refreshed`);
    }

    async waitForExcelCsvBubble() {
        return allure.step("Waiting for 'Excel & CSV' bubble", async () => {
            await this.excelCsvBubble.waitFor();
            CustomReporter.logAction(`'Excel & CSV' bubble has been loaded`);
            await allure.attachment(
                "screenshot.png",
                await this.page.screenshot(),
                {
                    contentType: "image/png",
                }
            );
        });
    }

    async clickOnAddListButton() {
        return allure.step("Clicking on 'Add list' button", async () => {
            await CommonMethods.clickOnElement(this.addListButton);
            CustomReporter.logAction(
                `Clicked on 'Add list' button on main view`
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
