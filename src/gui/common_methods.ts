import { Locator } from "@playwright/test";

export class CommonMethods {
    static async markWithColor(element: Locator) {
        await element.evaluate((node) => (node.style.backgroundColor = "lightblue"));
    }

    static async markElementsWithColor(elements: Locator) {
        await elements.evaluateAll((node) =>
            node.forEach((elem) => {
                elem.style.backgroundColor = "lightblue";
            })
        );
    }

    static async typeIntoField(element: Locator, text: string) {
        await this.markWithColor(element);
        await element.fill(text);
    }

    static async clickOnElement(element: Locator) {
        await this.markWithColor(element);
        await element.click({ timeout: 5000 });
    }

    static async rightClickOnElement(element: Locator) {
        await this.markWithColor(element);
        await element.click({
            button: "right",
            timeout: 5000,
        });
    }

    static async waitForElement(element: Locator, timeoutNumber?: number) {
        await element.waitFor({ timeout: timeoutNumber });
        await this.markWithColor(element);
    }
}
