import test from "@playwright/test";
import { allure } from "allure-playwright";
import { LoginPage } from "../../../gui/pages/LoginPage";
import { MainView } from "../../../gui/pages/MainView";
require("dotenv").config({ override: true });

test.describe("GUI ClickUp basic test on login screen", async () => {
    test.beforeEach(async ({ page }) => {
        await page.route("**/*.css", (route) => {
            route.abort();
        });
    });

    test("@gui-clickup @clickup @login Check if log in to application works correct", async ({ page }) => {
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

    test("@gui-clickup @clickup @login Check if passing incorrect email returns proper message", async ({ page }) => {
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
            await loginPage.mainHeader.focus();
        });

        await test.step("Then the error message is displayed under email input", async () => {
            await loginPage.assertThatErrorMessageUnderEmailInputIsDisplayed();
        });

        await test.step("And the error message has proper test", async () => {
            await loginPage.assertThatErrorEmailMessageHasProperText(properErrorMessage);
        });
    });
});
