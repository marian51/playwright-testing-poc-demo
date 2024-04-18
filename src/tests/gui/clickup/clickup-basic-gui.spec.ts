import test, { expect } from "@playwright/test";
import { LoginPage } from "../../../gui/pages/LoginPage";
import { GlobalBar } from "../../../gui/pages/GlobalBar";
import { LeftSideBar } from "../../../gui/pages/LeftSideBar";
import { CreateSpaceModal } from "../../../gui/pages/CreateSpaceModal";
import { MainView } from "../../../gui/pages/MainView";
import { allure } from "allure-playwright";
import { Hooks } from "../../../helpers/hooks";
require("dotenv").config({ override: true });

test.describe("GUI Clickup basic functionalities tests", () => {
    test("@gui-clickup @clickup Create space and check if space is created", async ({
        page, request
    }) => {
        await allure.tag("GUI")

        const newSpaceName = "GUI space create test";
        const username = process.env.USERNAME as string;
        const password = process.env.PASSWORD as string;
        const loginPage = new LoginPage(page);
        const globalBar = new GlobalBar(page);
        const leftSideBar = new LeftSideBar(page);

        await allure.parameter("User name", username)
        await allure.parameter("User password", password, { mode: "masked" })

        await test.step("Given user can log in to the application", async () => {
            await loginPage.goto();
            await loginPage.typeIntoEmailField(username);
            await loginPage.typeIntoPasswordField(password);
            await loginPage.clickLogIn();

            await globalBar.waitForLoad();
        });

        await test.step("When user creates new space", async () => {
            const newSpaceModal = new CreateSpaceModal(page);

            await leftSideBar.clickOnCreateSpaceButton();
            await newSpaceModal.typeIntoNewSpaceNameInput(newSpaceName);
            await newSpaceModal.clickOnContinueButton();
            await newSpaceModal.clickOnCreateSpaceButton();
            await newSpaceModal.waitForModalDisappear();

            const mainview = new MainView(page)
            await mainview.waitForNewListButton();
        });

        await test.step("Then new space is created", async () => {
            await leftSideBar.assertThatLeftSideBarContainsElement(newSpaceName);
        });

        await Hooks.deleteSpaceByName(request, newSpaceName);
    });
});
