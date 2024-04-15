import test, { Locator, Page, expect } from "@playwright/test";
import { allure } from "allure-playwright";

export class LeftSideBar {
    readonly page: Page;
    readonly createSpaceButton: Locator;

    constructor(page: Page) {
        this.page = page
        this.createSpaceButton = page.locator("cu-create-project-row")
    }

    async clickOnCreateSpaceButton() {
        return await test.step("Cilcking on 'Create Space' button in left side bar", async () => {
            await this.createSpaceButton.click();
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
            const list = await this.page.locator("cdk-tree-node span span").allTextContents()
            await allure.attachment("List of elements", list.toString(), {
                contentType: "text/plain"
            })

            return list
        })
    }

    async assertThatLeftSideBarContainsElement(element: string) {
        return await test.step("Returning list of element on left side bar", async () => {
            let list = await this.getLeftMenuSpans();
            list.forEach((element, index) => {
                list[index] = element.replace(/ /g, "");
            });

            expect(list).toContain(element.replace(/ /g, ""))

            await allure.attachment("screenshot.png", await this.page.screenshot(), {
                contentType: "image/png"
            })
        })
    }
}