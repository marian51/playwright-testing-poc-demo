import { Page } from "@playwright/test";
import { BaseMenuContext } from "./BaseMenuContext";

export class TaskMenuContext extends BaseMenuContext {
    constructor(page: Page) {
        super(page);
        this.menuElement = "task";
        this.contextMenu = page.locator("[data-test=quick-actions-menu_nav-controls]");
    }
}
