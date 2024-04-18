import { Locator, Page } from "@playwright/test";
import CustomReporter from "../../helpers/reporter";

export class MainView {
    readonly page: Page
    readonly newTaskInput: Locator
    readonly newListButton: Locator

    constructor(page: Page) {
        this.page = page
        this.newTaskInput = page.locator("[data-test=task-row-new__input]")
        this.newListButton = page.getByText(" New List ")
    }

    async waitForNewTaskInput() {
        await this.newTaskInput.waitFor()
    }

    async waitForNewListButton() {
        await this.newListButton.waitFor()
        CustomReporter.logAction(`Main view has been refreshed`)
    }

}