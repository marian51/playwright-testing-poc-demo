import test, { expect } from "@playwright/test";
import { LoginPage } from "../../../gui/pages/LoginPage";
import { GlobalBar } from "../../../gui/pages/GlobalBar";
import { LeftSideBar } from "../../../gui/pages/LeftSideBar";
import { CreateSpaceModal } from "../../../gui/pages/CreateSpaceModal";
import { MainView } from "../../../gui/pages/MainView";
import { allure } from "allure-playwright";
import { Hooks } from "../../../helpers/hooks";
import { CreateListModal } from "../../../gui/pages/CreateListModal";
import { SpaceMenuContext } from "../../../gui/pages/contextMenus/SpaceMenuContext";
import { DeleteSpaceModal } from "../../../gui/pages/DeleteSpaceModal";
require("dotenv").config({ override: true });

test.describe("GUI Clickup basic functionalities tests", () => {
    test("@gui-clickup @clickup Create space and check if space is created", async ({
        page, request
    }) => {
        await allure.tag("GUI")
        await allure.tag("Space")

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

    test("@gui-clickup @clickup Delete space and check if space is deleted", async ({
        page, request
    }) => {
        await allure.tag("GUI")
        await allure.tag("Space")

        const newSpaceName = "GUI space create test";
        const username = process.env.USERNAME as string;
        const password = process.env.PASSWORD as string;
        const loginPage = new LoginPage(page);
        const globalBar = new GlobalBar(page);
        const leftSideBar = new LeftSideBar(page);

        await allure.parameter("User name", username)
        await allure.parameter("User password", password, { mode: "masked" })

        await Hooks.createSpaceByName(request, newSpaceName)

        await test.step("Given user can log in to the application", async () => {
            await loginPage.goto();
            await loginPage.typeIntoEmailField(username);
            await loginPage.typeIntoPasswordField(password);
            await loginPage.clickLogIn();

            await globalBar.waitForLoad();
        });

        await test.step("When user deletes existing space", async () => {
            await leftSideBar.rightClickOnElement(newSpaceName)
            const spaceMenuContext = new SpaceMenuContext(page)
            await spaceMenuContext.clickOnDeleteOption()
            
            const deleteSpaceModal = new DeleteSpaceModal(page)
            await deleteSpaceModal.typeIntoNameInput(newSpaceName)
            await deleteSpaceModal.clickOnDeleteButton()
        });

        await test.step("Then new space is deleted", async () => {
            await leftSideBar.assertThatLeftSideBarDoesNotContainElement(newSpaceName);
        });
    });

    test('@gui-clickup @clickup Create list and check if list is created', async ({ page, request }) => {
        await allure.tag("GUI")
        await allure.tag("List")

        const newSpaceName = "GUI space create test";
        const newListName = "GUI list create test"
        const username = process.env.USERNAME as string;
        const password = process.env.PASSWORD as string;
        const loginPage = new LoginPage(page);
        const globalBar = new GlobalBar(page);
        const leftSideBar = new LeftSideBar(page);

        await allure.parameter("User name", username)
        await allure.parameter("User password", password, { mode: "masked" })

        await Hooks.createSpaceByName(request, newSpaceName)

        await test.step("Given user can log in to the application", async () => {
            await loginPage.goto();
            await loginPage.typeIntoEmailField(username);
            await loginPage.typeIntoPasswordField(password);
            await loginPage.clickLogIn();

            await globalBar.waitForLoad();
        })

        await test.step("And there is space created by user", async () => {
            await leftSideBar.checkIfElementExist(newSpaceName);
        })

        await test.step("When user created new list in existing space", async () => {
            await leftSideBar.clickOnElement(newSpaceName);
            await new MainView(page).clickOnAddListButton();

            const newListModal = new CreateListModal(page);
            await newListModal.typeIntoNewListNameInput(newListName);
            await newListModal.clickOnCreateListButton();
            await newListModal.waitForModalDisappear();
        })

        await test.step("Then new list is created", async () => {
            await leftSideBar.assertThatLeftSideBarContainsElement(newListName);
        })

        await Hooks.deleteSpaceByName(request, newSpaceName);
    })
});
