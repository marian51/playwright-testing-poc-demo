import test, { Locator, Page } from "@playwright/test";
import { allure } from "allure-playwright";
require("dotenv").config({path:"./.env"})

export class LoginPage {
    readonly page: Page;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailField = page.getByLabel(" Email ")
        this.passwordField = page.getByLabel(" Password ")
        this.loginButton = page.locator('[data-test=login-submit]')
    }

    async goto() {
        const baseUrl = process.env.BASE_URL as string
        await this.page.goto(baseUrl);
    }

    async typeIntoEmailField(text: string) {
        return await test.step(`Typing '${text}' into email field`, async () => {
            await this.emailField.fill(text);
            await allure.attachment("screenshot1.png", await this.page.screenshot(), {
                contentType: "image/png"
            })
        })
    }

    async typeIntoPasswordField(text: string) {
        return await test.step(`Typing '********' into password field`, async () => {
            await this.passwordField.fill(text);
            await allure.attachment("screenshot2.png", await this.page.screenshot(), {
                contentType: "image/png"
            })
        })
    }

    async clickLogIn() {
        return await test.step(`Clicking on 'Log In' button`, async () => {
            await this.loginButton.click()
            await allure.attachment("screenshot3.png", await this.page.screenshot(), {
                contentType: "image/png"
            })
        })
    }
}