import { Locator } from "@playwright/test";
import { BaseModal } from "./BaseModal";

export interface BaseDeleteModal extends BaseModal {
    readonly deleteButton: Locator;

    clickOnDeleteButton: () => Promise<void>;
}
