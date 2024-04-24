import { Page } from "@playwright/test";
import { BaseMenuContext } from "./BaseMenuContext";

export class SpaceMenuContext extends BaseMenuContext {
    constructor(page: Page) {
        super(page);
        this.menuElement = "space";
        this.contextMenu = page.locator("[data-test=project-menu__controls]");
    }
}
