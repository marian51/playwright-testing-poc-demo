import test, { APIResponse } from "@playwright/test";
import { AuthService } from '../../../api/utils/auth_service';
import { getWithHeaders } from "../../../api/utils/api_utils";
import { TestUtils } from "../../utils/test_utils";

test.describe("API Action Log basic tests", () => {
    test('@action-log Admin user is able to read action logs', async({ request }) => {
        
        let accessToken: string;
        let response: APIResponse;

        await test.step('Zakładając, że użytkownik "Cezary Kruk" z uprawnieniami ADMIN może się autoryzować w API aplikacji', async () => {
            accessToken = await AuthService.getAccessToken(request) 
        })
        
        await test.step('Kiedy pobiera metodą GET action logi', async () => {
            const endpoint = "/api/dicom-viewer/action_log"
            response = await getWithHeaders(request, endpoint, { Authorization: `Bearer ${accessToken}` }, "Getting ActionLogs") 
        })
        
        await test.step('Wtedy endpoint zwraca response o kodzie 200', () => {
            TestUtils.assertStatusCode(response, 200)
        })
        
        await test.step('I payload responsa zawiera listę action logów\nI liczba wyświetlonych action logów jest równa 25', async () => {
            TestUtils.assertResponseHasProperCountObjects((await response.json()).response, 25)
        })
        
        await test.step('I lista wyświetlonych action logów jest posortowana po polu creationTime w kierunku "DESC"', async () => {
            TestUtils.assertObjectsAreSortedByDateTime((await response.json()).response, 'creationTime', 'DESC')
        })       
    })
})