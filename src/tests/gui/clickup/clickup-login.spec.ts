import test from "@playwright/test";
import { allure } from "allure-playwright";
import { LoginPage } from "../../../gui/pages/LoginPage";
import { MainView } from "../../../gui/pages/MainView";
require("dotenv").config({ override: true });

test.describe("GUI ClickUp basic test on login screen", { annotation: { type: "category", description: "Login screen tests" } }, async () => {
    test.beforeEach(async ({ page }) => {
        await page.route("**/*.css", (route) => {
            route.abort();
        });
    });

    test("Check if log in to application works correct", { tag: ["@gui-clickup", "@clickup", "@login"] }, async ({ page }) => {
        allure.tag("GUI");
        allure.tag("Login");

        const username = process.env.USERNAME as string;
        const password = process.env.PASSWORD as string;
        const loginPage = new LoginPage(page);
        const mainView = new MainView(page);

        await allure.addParameter("User name", username);
        await allure.addParameter("User password", password, { mode: "masked" });

        await test.step("Given login view of application is opened", async () => {
            await loginPage.goto();
            await loginPage.checkIfMainHeaderIsDisplayed();
            await loginPage.checkIfLoginButtonIsDisplayed();
        });

        await test.step("When user passes correct email to email input", async () => {
            await loginPage.typeIntoEmailField(username);
        });

        await test.step("And user passes correct password to password input", async () => {
            await loginPage.typeIntoPasswordField(password);
        });

        await test.step("And user clicks on login button", async () => {
            await loginPage.clickLogIn();
        });

        await test.step("Then user logs in application correctly", async () => {
            await mainView.assertThatMainViewIsLoaded();
        });
    });

    test("Check if passing incorrect email returns proper message", { tag: ["@gui-clickup", "@clickup", "@login"] }, async ({ page }) => {
        allure.tag("GUI");
        allure.tag("Login");

        const notCorrectUsername = "notcorrect@email.com";
        const properErrorMessage = "Email not found. Click here to create an account!";
        const loginPage = new LoginPage(page);

        await allure.addParameter("Incorrect user name", notCorrectUsername);

        await test.step("Given login view of application is opened", async () => {
            await loginPage.goto();
            await loginPage.checkIfMainHeaderIsDisplayed();
            await loginPage.checkIfLoginButtonIsDisplayed();
        });

        await test.step("When user passes incorrect email to email input", async () => {
            await loginPage.typeIntoEmailField(notCorrectUsername);
            await loginPage.passwordField.focus();
        });

        await test.step("Then the error message is displayed under email input", async () => {
            await loginPage.assertThatErrorMessageUnderEmailInputIsDisplayed();
        });

        await test.step("And the error message has proper text", async () => {
            await loginPage.assertThatErrorEmailMessageHasProperText(properErrorMessage);
        });
    });
});
