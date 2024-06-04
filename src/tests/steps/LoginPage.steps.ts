import { After, Before, Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber";
import { LoginPage } from "../../gui/cucumber-pages/LoginPage";
// import { page } from "./world";
import { MainView } from "../../gui/cucumber-pages/MainView";
import { Browser, Page, chromium, firefox } from "@playwright/test";
require("dotenv").config({ override: true });

let browser: Browser;
let page: Page;

let loginPage: LoginPage; // = new LoginPage(page);
let mainView; // = new MainView(page);

const username = process.env.USERNAME as string;
const password = process.env.PASSWORD as string;

setDefaultTimeout(1000 * 60 * 5);

Before(async () => {
    browser = await firefox.launch({
        headless: false,
        // channel: "firefox",
    });
    page = await browser.newPage();
});

Given("User can log in to the application", async () => {
    loginPage = new LoginPage(page);
    mainView = new MainView(page);

    await loginPage.goto();
    await loginPage.typeIntoEmailField(username);
    await loginPage.typeIntoPasswordField(password);
    await loginPage.clickLogIn();

    await mainView.waitForExcelCsvBubble();
    console.log("Given");
});

When("User creates new space", async () => {
    console.log("When");
});

Then("new space is created", async () => {
    console.log("Then");
});

After(async () => {
    await browser.close();
});
