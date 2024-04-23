import test, { Locator, Page, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { CommonMethods } from "../common_methods";
import CustomReporter from "../../helpers/reporter";

export class LeftSideBar {
    readonly page: Page;
    readonly createSpaceButton: Locator;
    readonly listOfElements: Locator

    constructor(page: Page) {
        this.page = page
        this.createSpaceButton = page.locator("cu-create-project-row")
        this.listOfElements = page.locator("cdk-tree-node span span")
    }

    async clickOnCreateSpaceButton() {
        return await test.step("Cilcking on 'Create Space' button in left side bar", async () => {
            await CommonMethods.clickOnElement(this.createSpaceButton)
            CustomReporter.logAction(`Clicked on 'Create Space' button in the left side bar`)
            await allure.attachment("screenshot.png", await this.page.screenshot(), {
                contentType: "image/png"
            })
        })
        
    }

    async getLeftMenuSpans(): Promise<string[]> {
        return await test.step("Returning list of element on left side bar", async () => {
            await allure.attachment("screenshot.png", await this.page.screenshot(), {
                contentType: "image/png"
            })
            await CommonMethods.markElementsWithColor(this.page.locator("cdk-tree-node span span"))
            const list = await this.page.locator("cdk-tree-node span span").allTextContents()
            CustomReporter.logAction(`Got list of elements from left side bar`)
            await allure.attachment("List of elements", list.toString(), {
                contentType: "text/plain"
            })

            return list
        })
    }

    async checkIfElementExist(elementName: string): Promise<void> {
        return await test.step(`Checking if element '${elementName} is on left side bar`, async () => {
            elementName = " " + elementName + " "
            if (!(await this.getLeftMenuSpans()).includes(elementName)) {
                await allure.attachment("screenshot.png", await this.page.screenshot(), {
                    contentType: "image/png"
                })
                throw new Error(`The Space with name '${elementName}' does not exist!`); 
            }
            await allure.attachment("screenshot.png", await this.page.screenshot(), {
                contentType: "image/png"
            })
        })
    }

    async clickOnElement(elementName: string) {
        elementName = " " + elementName + " "
        const element = this.page.locator("cdk-tree-node span span").getByText(elementName)
        await CommonMethods.clickOnElement(element)
    }

    async rightClickOnElement(elementName: string) {
        elementName = " " + elementName + " "
        const element = this.page.locator("cdk-tree-node span span").getByText(elementName)
        await CommonMethods.rightClickOnElement(element)
    }

    async assertThatLeftSideBarContainsElement(element: string) {
        return await test.step("Checking if left side bar contains element", async () => {
            element = " " + element + " "
            await expect(this.listOfElements.getByText(element)).toHaveCount(1)
            await CommonMethods.markElementsWithColor(this.listOfElements.getByText(element))
            await allure.attachment("Given element", element, {
                contentType: "text/plain"
            })
            await allure.attachment("screenshot.png", await this.page.screenshot(), {
                contentType: "image/png"
            })
        })
    }

    async assertThatLeftSideBarDoesNotContainElement(element: string) { // TODO try to combine this and above assertion
        return await test.step("Checking if left side bar does not contain element", async () => {
            element = " " + element + " "
            await expect(this.listOfElements.getByText(element)).toHaveCount(0)
            await allure.attachment("Given element", element, {
                contentType: "text/plain"
            })
            await allure.attachment("screenshot.png", await this.page.screenshot(), {
                contentType: "image/png"
            })
        })
    }
}