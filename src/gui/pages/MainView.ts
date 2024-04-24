import { Locator, Page, expect } from "@playwright/test";
import CustomReporter from "../../helpers/reporter";
import { CommonMethods } from "../common_methods";
import { allure } from "allure-playwright";

export class MainView {
    readonly page: Page;
    readonly newTaskInput: Locator;
    readonly newListButton: Locator;
    readonly addListButton: Locator;
    readonly excelCsvBubble: Locator;
    readonly saveTaskButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newTaskInput = page.locator("[data-test=task-row-new__input]");
        this.newListButton = page.getByText(" New List ");
        this.addListButton = page.getByText(" Add list ");
        this.excelCsvBubble = page.locator("[data-pendo=csv-integration-bubble]");
        this.saveTaskButton = page.getByRole("button", { name: "Save" });
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
            await allure.attachment("screenshot.png", await this.page.screenshot(), {
                contentType: "image/png",
            });
        });
    }

    async clickOnAddListButton() {
        return allure.step("Clicking on 'Add list' button", async () => {
            await CommonMethods.clickOnElement(this.addListButton);
            CustomReporter.logAction(`Clicked on 'Add list' button on main view`);
            await allure.attachment("screenshot.png", await this.page.screenshot(), {
                contentType: "image/png",
            });
        });
    }

    async clickOnNewTaskInput() {
        return allure.step("Clicking on new task input", async () => {
            await CommonMethods.clickOnElement(this.newTaskInput);
            CustomReporter.logAction("Clicked on new task input");
            await allure.attachment("screenshot.png", await this.page.screenshot(), {
                contentType: "image/png",
            });
        });
    }

    async clickOnSaveTaskButton() {
        return allure.step("Clicking on 'Save' task button", async () => {
            await CommonMethods.clickOnElement(this.saveTaskButton);
            CustomReporter.logAction("Clicked on 'Save' task input");
            await allure.attachment("screenshot.png", await this.page.screenshot(), {
                contentType: "image/png",
            });
        });
    }

    async rightClickOnElement(elementName: string) {
        elementName = " " + elementName + " ";
        const element = this.page.locator("main").getByText(elementName);
        await CommonMethods.rightClickOnElement(element);
    }

    async typeIntoNewTaskInput(text: string) {
        return allure.step("Typing into new task input", async () => {
            await CommonMethods.typeIntoField(this.newTaskInput, text);
            CustomReporter.logAction(`Typed 'text' into new task input`);
            await allure.attachment("screenshot.png", await this.page.screenshot(), {
                contentType: "image/png",
            });
        });
    }

    async assertThatTaskIsDisplayedOnTheList(taskName: string) {
        return allure.step(`Checking if task with name ${taskName} is displayed on the list`, async () => {
            const element = this.page.locator(`[data-test="task-row-main__link-text__${taskName}"]`);
            await allure.attachment("Given element", taskName, {
                contentType: "text/plain",
            });
            await allure.attachment("screenshot.png", await this.page.screenshot(), {
                contentType: "image/png",
            });
            await expect(element).toBeVisible();
        });
    }

    async assertThatTaskIsNotDisplayedOnTheList(taskName: string) {
        return allure.step(`Checking if task with name '${taskName}' is NOT displayed on the list`, async () => {
            const element = this.page.locator(`[data-test="task-row-main__link-text__${taskName}"]`);
            await allure.attachment("Given element", taskName, {
                contentType: "text/plain",
            });
            await allure.attachment("screenshot.png", await this.page.screenshot(), {
                contentType: "image/png",
            });
            await expect(element).not.toBeVisible();
        });
    }
}
