import test, { Locator, Page, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { CommonMethods } from "../common_methods";
import CustomReporter from "../../helpers/reporter";
require("dotenv").config({ path: "./.env" });

export class LoginPage {
    readonly page: Page;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly mainHeader: Locator;
    readonly errorEmailMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailField = page.getByLabel(" Email ");
        this.passwordField = page.getByLabel(" Password ");
        this.loginButton = page.locator("[data-test=login-submit]");
        this.mainHeader = page.getByText("Welcome back!");
        this.errorEmailMessage = page.locator("[data-test=form__error-email]");
    }

    async goto() {
        const baseUrl = process.env.BASE_URL as string;
        await this.page.goto(baseUrl);
    }

    async typeIntoEmailField(text: string) {
        // return await test.step(`Typing '${text}' into email field`, async () => {
        await CommonMethods.typeIntoField(this.emailField, text);
        CustomReporter.logAction(`Typed text: ${text} into email field`);
        // await allure.attachment("screenshot1.png", await this.page.screenshot(), {
        //     contentType: "image/png",
        // });
        // });
    }

    async typeIntoPasswordField(text: string) {
        // return await test.step(`Typing '********' into password field`, async () => {
        await CommonMethods.typeIntoField(this.passwordField, text);
        CustomReporter.logAction(`Typed text: ******** into password field`);
        // await allure.attachment("screenshot2.png", await this.page.screenshot(), {
        //     contentType: "image/png",
        // });
        // });
    }

    async clickLogIn() {
        // return await test.step(`Clicking on 'Log In' button`, async () => {
        await this.loginButton.focus();
        await CommonMethods.clickOnElement(this.loginButton);
        CustomReporter.logAction(`Clicked on 'Log In' button`);
        // await allure.attachment("screenshot3.png", await this.page.screenshot(), {
        //     contentType: "image/png",
        // });
        // });
    }

    async checkIfMainHeaderIsDisplayed() {
        // return await test.step(`Checking if main header is displayed`, async () => {
        CustomReporter.logAction(`Checking if main header is displayed`);
        await CommonMethods.waitForElement(this.mainHeader, 5000);
        // await allure.attachment("screenshot.png", await this.page.screenshot(), {
        //     contentType: "image/png",
        // });
        // });
    }

    async checkIfLoginButtonIsDisplayed() {
        // return await test.step(`Checking if login button is displayed`, async () => {
        CustomReporter.logAction(`Checking if login button is displayed`);
        await CommonMethods.waitForElement(this.loginButton, 5000);
        // await allure.attachment("screenshot.png", await this.page.screenshot(), {
        //     contentType: "image/png",
        // });
        // });
    }

    async assertThatErrorMessageUnderEmailInputIsDisplayed() {
        // return await test.step("Checking if error message under email input is displayed", async () => {
        CustomReporter.logAction(`Checking if error message under email input is displayed`);
        await expect(this.emailField.locator("..").locator(this.errorEmailMessage)).toBeVisible();
        // await allure.attachment("screenshot.png", await this.page.screenshot(), {
        //     contentType: "image/png",
        // });
        // });
    }

    async assertThatErrorEmailMessageHasProperText(properText: string) {
        // return await test.step("Checking if error email message has proper text", async () => {
        CustomReporter.logAction(`Checking if error message under email input is displayed`);
        await expect(this.errorEmailMessage).toHaveText(properText);
        // await allure.attachment("Proper text", properText, {
        //     contentType: "text/plain",
        // });
        // await allure.attachment("screenshot.png", await this.page.screenshot(), {
        //     contentType: "image/png",
        // });
        // });
    }
}
