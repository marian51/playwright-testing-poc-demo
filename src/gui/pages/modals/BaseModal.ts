import { Locator, Page } from "@playwright/test";

export interface BaseModal {
    readonly page: Page;
    readonly modalView: Locator;
}
