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
import { ListMenuContext } from "../../../gui/pages/contextMenus/ListMenuContext";
import { DeleteListModal } from "../../../gui/pages/DeleteListModal";
import { TaskMenuContext } from "../../../gui/pages/contextMenus/TaskContextMenu";
require("dotenv").config({ override: true });

test.describe("GUI Clickup basic functionalities tests", () => {
    test.beforeEach(async ({ page }) => {
        await page.route("**/*.css", (route) => {
            route.abort();
        });
    });

    test("@gui-clickup @clickup Create space and check if space is created", async ({ page, request }) => {
        await allure.tag("GUI");
        await allure.tag("Space");

        const newSpaceName = "GUI space create test";
        const username = process.env.USERNAME as string;
        const password = process.env.PASSWORD as string;
        const loginPage = new LoginPage(page);
        const globalBar = new GlobalBar(page);
        const leftSideBar = new LeftSideBar(page);
        const mainview = new MainView(page);

        await allure.parameter("User name", username);
        await allure.parameter("User password", password, { mode: "masked" });

        await test.step("Given user can log in to the application", async () => {
            await loginPage.goto();
            await loginPage.typeIntoEmailField(username);
            await loginPage.typeIntoPasswordField(password);
            await loginPage.clickLogIn();

            await mainview.waitForExcelCsvBubble();
        });

        await test.step("When user creates new space", async () => {
            const newSpaceModal = new CreateSpaceModal(page);

            await leftSideBar.clickOnCreateSpaceButton();
            await newSpaceModal.typeIntoNewSpaceNameInput(newSpaceName);
            await newSpaceModal.clickOnContinueButton();
            await newSpaceModal.clickOnCreateSpaceButton();
            await newSpaceModal.waitForModalDisappear();

            await mainview.waitForNewListButton();
        });

        await test.step("Then new space is created", async () => {
            await leftSideBar.assertThatLeftSideBarContainsElement(newSpaceName);
        });

        await Hooks.deleteSpaceByName(request, newSpaceName);
    });

    test("@gui-clickup @clickup Delete space and check if space is deleted", async ({ page, request }) => {
        await allure.tag("GUI");
        await allure.tag("Space");

        const newSpaceName = "GUI space create test";
        const username = process.env.USERNAME as string;
        const password = process.env.PASSWORD as string;
        const loginPage = new LoginPage(page);
        const globalBar = new GlobalBar(page);
        const leftSideBar = new LeftSideBar(page);

        await allure.parameter("User name", username);
        await allure.parameter("User password", password, { mode: "masked" });

        await Hooks.createSpaceByName(request, newSpaceName);

        await test.step("Given user can log in to the application", async () => {
            await loginPage.goto();
            await loginPage.typeIntoEmailField(username);
            await loginPage.typeIntoPasswordField(password);
            await loginPage.clickLogIn();

            await new MainView(page).waitForExcelCsvBubble();
        });

        await test.step("When user deletes existing space", async () => {
            await leftSideBar.rightClickOnElement(newSpaceName);
            const spaceMenuContext = new SpaceMenuContext(page);
            await spaceMenuContext.clickOnDeleteOption();

            const deleteSpaceModal = new DeleteSpaceModal(page);
            await deleteSpaceModal.typeIntoNameInput(newSpaceName);
            await deleteSpaceModal.clickOnDeleteButton();
        });

        await test.step("Then new space is deleted", async () => {
            await leftSideBar.assertThatLeftSideBarDoesNotContainElement(newSpaceName);
        });
    });

    test("@gui-clickup @clickup Create list and check if list is created", async ({ page, request }) => {
        await allure.tag("GUI");
        await allure.tag("List");

        const newSpaceName = "GUI space create test";
        const newListName = "GUI list create test";
        const username = process.env.USERNAME as string;
        const password = process.env.PASSWORD as string;
        const loginPage = new LoginPage(page);
        const globalBar = new GlobalBar(page);
        const leftSideBar = new LeftSideBar(page);
        const mainView = new MainView(page);

        await allure.parameter("User name", username);
        await allure.parameter("User password", password, { mode: "masked" });

        await Hooks.createSpaceByName(request, newSpaceName);

        await test.step("Given user can log in to the application", async () => {
            await loginPage.goto();
            await loginPage.typeIntoEmailField(username);
            await loginPage.typeIntoPasswordField(password);
            await loginPage.clickLogIn();

            await mainView.waitForExcelCsvBubble();
        });

        await test.step("And there is space created by user", async () => {
            await leftSideBar.checkIfElementExist(newSpaceName, true);
        });

        await test.step("When user created new list in existing space", async () => {
            await leftSideBar.clickOnElement(newSpaceName);
            await mainView.clickOnAddListButton();

            const newListModal = new CreateListModal(page);
            await newListModal.typeIntoNewListNameInput(newListName);
            await newListModal.clickOnCreateListButton();
            await newListModal.waitForModalDisappear();
        });

        await test.step("Then new list is created", async () => {
            await leftSideBar.assertThatLeftSideBarContainsElement(newListName);
        });

        await Hooks.deleteSpaceByName(request, newSpaceName);
    });

    test("@gui-clickup @clickup Delete list and check if list is deleted", async ({ page, request }) => {
        await allure.tag("GUI");
        await allure.tag("List");

        const newSpaceName = "GUI space create test";
        const newListName = "GUI list create test";
        const username = process.env.USERNAME as string;
        const password = process.env.PASSWORD as string;
        const loginPage = new LoginPage(page);
        const globalBar = new GlobalBar(page);
        const leftSideBar = new LeftSideBar(page);

        await allure.parameter("User name", username);
        await allure.parameter("User password", password, { mode: "masked" });

        const spaceId = await Hooks.createSpaceByName(request, newSpaceName);
        const listId = await Hooks.createListByName(request, spaceId, newListName);

        await test.step("Given user can log in to the application", async () => {
            await loginPage.goto();
            await loginPage.typeIntoEmailField(username);
            await loginPage.typeIntoPasswordField(password);
            await loginPage.clickLogIn();

            await new MainView(page).waitForExcelCsvBubble();
        });

        await test.step("When user deletes existing list", async () => {
            await leftSideBar.clickOnElement(newSpaceName);
            await leftSideBar.rightClickOnElement(newListName);
            const listMenuContext = new ListMenuContext(page);
            await listMenuContext.clickOnDeleteOption();

            const deleteListModal = new DeleteListModal(page);
            await deleteListModal.clickOnDeleteButton();
        });

        await test.step("Then new list is deleted", async () => {
            await leftSideBar.assertThatLeftSideBarDoesNotContainElement(newListName);
        });

        await Hooks.deleteSpaceById(request, spaceId);
    });

    test("@gui-clickup @clickup Create task and check if task is created", async ({ page, request }) => {
        await allure.tag("GUI");
        await allure.tag("Task");

        const newSpaceName = "GUI space create test";
        const newListName = "GUI list create test";
        const newTaskName = "GUI task create test";
        const username = process.env.USERNAME as string;
        const password = process.env.PASSWORD as string;
        const loginPage = new LoginPage(page);
        const leftSideBar = new LeftSideBar(page);
        const mainView = new MainView(page);

        await allure.parameter("User name", username);
        await allure.parameter("User password", password, { mode: "masked" });

        const spaceId = await Hooks.createSpaceByName(request, newSpaceName);
        await Hooks.createListByName(request, spaceId, newListName);

        await test.step("Given user can log in to the application", async () => {
            await loginPage.goto();
            await loginPage.typeIntoEmailField(username);
            await loginPage.typeIntoPasswordField(password);
            await loginPage.clickLogIn();

            await mainView.waitForExcelCsvBubble();
        });

        await test.step("And there is space created by user", async () => {
            await leftSideBar.checkIfElementExist(newSpaceName, true);
            await leftSideBar.clickOnElement(newSpaceName);
        });

        await test.step("And there is list created by user", async () => {
            await leftSideBar.checkIfElementExist(newListName, false);
            await leftSideBar.clickOnElement(newListName);
        });

        await test.step("When user creates new task in existing list", async () => {
            await mainView.clickOnNewTaskInput();
            await mainView.typeIntoNewTaskInput(newTaskName);
            await mainView.clickOnSaveTaskButton();
        });

        await test.step("Then new list is deleted", async () => {
            await mainView.assertThatTaskIsDisplayedOnTheList(newTaskName);
        });

        await Hooks.deleteSpaceById(request, spaceId);
    });

    test("@gui-clickup @clickup Delete task and check if task is deleted", async ({ page, request }) => {
        await allure.tag("GUI");
        await allure.tag("Task");

        const newSpaceName = "GUI space create test";
        const newListName = "GUI list create test";
        const newTaskName = "GUI task create test";
        const username = process.env.USERNAME as string;
        const password = process.env.PASSWORD as string;
        const loginPage = new LoginPage(page);
        const leftSideBar = new LeftSideBar(page);
        const mainView = new MainView(page);

        await allure.parameter("User name", username);
        await allure.parameter("User password", password, { mode: "masked" });

        const spaceId = await Hooks.createSpaceByName(request, newSpaceName);
        const listId = await Hooks.createListByName(request, spaceId, newListName);
        const taskId = await Hooks.createTaskByName(request, listId, newTaskName);

        await test.step("Given user can log in to the application", async () => {
            await loginPage.goto();
            await loginPage.typeIntoEmailField(username);
            await loginPage.typeIntoPasswordField(password);
            await loginPage.clickLogIn();

            await mainView.waitForExcelCsvBubble();
        });

        await test.step("When user deletes existing task", async () => {
            await leftSideBar.clickOnElement(newSpaceName);
            await leftSideBar.clickOnElement(newListName);

            await mainView.rightClickOnElement(newTaskName);

            await new TaskMenuContext(page).clickOnDeleteOption();
        });

        await test.step("Then new task is deleted", async () => {
            await mainView.assertThatTaskIsNotDisplayedOnTheList(newTaskName);
        });

        await Hooks.deleteSpaceById(request, spaceId);
    });
});
