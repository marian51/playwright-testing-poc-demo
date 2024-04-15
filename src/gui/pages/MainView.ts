import { Locator, Page } from "@playwright/test";

export class MainView {
    readonly page: Page
    readonly newTaskInput: Locator

    constructor(page: Page) {
        this.page = page
        this.newTaskInput = page.locator("[data-test=task-row-new__input]")
    }

    async waitForNewTaskInput() {
        await this.newTaskInput.waitFor()
    }

}