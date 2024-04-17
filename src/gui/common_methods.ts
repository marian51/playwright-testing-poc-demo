import { Locator } from "@playwright/test";

export class CommonMethods {

    private static async markWithColor(element: Locator) {
        await element.evaluate(node => node.style.backgroundColor = 'lightblue')
    }

    static async typeIntoField(element: Locator, text: string) {
        await this.markWithColor(element)
        await element.fill(text)
    }

    static async clickOnElement(element: Locator) {
        await this.markWithColor(element)
        await element.click()
    }
}