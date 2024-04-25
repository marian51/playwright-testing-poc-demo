import { Locator } from "@playwright/test";
import { BaseModal } from "./BaseModal";

export interface BaseCreateModal extends BaseModal {
    readonly newEntryNameInput: Locator;
    readonly createEntryButton: Locator;

    typeIntoNewEntryNameInput: (text: string) => Promise<void>;
    clickOnCreateButton: () => Promise<void>;
    waitForModalDisappear: () => Promise<void>;
}
