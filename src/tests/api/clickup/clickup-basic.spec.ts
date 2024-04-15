import test, { APIResponse } from "@playwright/test";
import { AuthService } from "../../../api/utils/auth_service";
import { TestUtils } from "../../utils/test_utils";
import { DataGenerator } from "../../../api/utils/generate_data";
import { Space } from "../../../api/types/clickUpTypes";
import { postWithHeadersAndBody } from "../../../api/utils/api_utils";
import { TestAssertions } from "../../utils/test_assertions";
import { spaceEndpoint, userEndpoint } from "../../../api/endpoints/clickUp_endpoints";

test.describe("API ClickUp basic functionalities tests", () => {
    test("@api-clickup Create space and check if space is created", async({ request }) => {
        let apiKey: string;
        let newSpace: Space;
        let response: APIResponse;
        const newSpaceName = "API space create test"

        await test.step("Given user can log in to the API of application", async () => {
            apiKey = AuthService.getApiKey();
            const endpoint = userEndpoint
            const userInfo = await (await AuthService.getUserInfo(request, endpoint, apiKey)).json()
            TestUtils.checkIfPropertyIsNotEmpty(userInfo.user, 'id')
        })

        await test.step("When user creates new Space", async () => {
            newSpace = await DataGenerator.generateSpace(newSpaceName);
            TestUtils.checkIfPropertyIsNotEmpty(newSpace, 'name')
        })

        await test.step("And user posts new Space to the application", async () => {
            const teamId = process.env.BASE_TEAM_ID as string
            const endpoint = spaceEndpoint.replace('TEAM_ID', teamId)
            response = await postWithHeadersAndBody(request, endpoint, { Authorization: apiKey }, newSpace, "User posts new Space")
        })

        await test.step("Then response code is '200'", async () => {
            TestAssertions.assertStatusCode(response, 200)
        })

        await test.step("And created space has name as given", async () => {
            TestAssertions.assertObjectHasKeyAndValue(await response.json(), "name", newSpaceName);
        })
    })
})