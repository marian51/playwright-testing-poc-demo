import { Page } from "@playwright/test";
import { BaseMenuContext } from "./BaseMenuContext";

export class ListMenuContext extends BaseMenuContext {
    constructor(page: Page) {
        super(page);
        this.menuElement = "list";
        this.contextMenu = page.locator("[data-test=dropdown__menu__sidebar]");
    }
}
