import test, { APIResponse } from "@playwright/test";
import { AuthService } from '../../../api/utils/auth_service';
import { getWithHeaders } from "../../../api/utils/api_utils";
import { TestAssertions } from "../../utils/test_assertions";
import { TestUtils } from "../../utils/test_utils";

test.describe("API Action Log basic tests", () => {
    test('@action-log Użytkownik administracyjny może odczytać action logi instytucji', async({ request }) => {
        let accessToken: string;
        let response: APIResponse;
        const institutionAlias: string = "AMED_URSUS"

        await test.step('Zakładając, że użytkownik "Cezary Kruk" z uprawnieniami ADMIN może się autoryzować w API aplikacji', async () => {
            accessToken = await AuthService.getAccessToken(request) 
        })

        await test.step(`pobiera metodą GET action logi instytucji z aliasem "${institutionAlias}"`, async () => {
            const endpoint = "/api/dicom-viewer/action_log"
            const filters: string = await TestUtils.prepareFilters({ institutionUuid: TestUtils.getInstitutionParam(institutionAlias, "uuid") })
            response = await getWithHeaders(request, endpoint + filters, { Authorization: `Bearer ${accessToken}` }, "Getting ActionLogs") 
        })

        await test.step('Wtedy endpoint zwraca response o kodzie 200', () => {
            TestAssertions.assertStatusCode(response, 200)
        })

        await test.step('I payload responsa zawiera listę action logów dla instytucji\nI liczba wyświetlonych action logów jest równa 25', async () => {
            TestAssertions.assertResponseHasProperCountObjects((await response.json()).response, 25)
        })

        await test.step('I lista wyświetlonych action logów jest posortowana po polu creationTime w kierunku "DESC"', async () => {
            TestAssertions.assertObjectsAreSortedByDateTime((await response.json()).response, 'creationTime', 'DESC')
        })    
    })
    
    test('@action-log Użytkownik administracyjny może odczytać action logi nie podając instytucji', async({ request }) => {
        
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
            TestAssertions.assertStatusCode(response, 200)
        })
        
        await test.step('I payload responsa zawiera listę action logów\nI liczba wyświetlonych action logów jest równa 25', async () => {
            TestAssertions.assertResponseHasProperCountObjects((await response.json()).response, 25)
        })
        
        await test.step('I lista wyświetlonych action logów jest posortowana po polu creationTime w kierunku "DESC"', async () => {
            TestAssertions.assertObjectsAreSortedByDateTime((await response.json()).response, 'creationTime', 'DESC')
        })       
    })

    test('@action-log Użytkownik administracyjny może odczytać action logi użytkownika bez podania instytucji', async ({ request }) => {
        let accessToken: string;
        let response: APIResponse;
        const userFullName: string = "Anna Urban"
        
        await test.step('Zakładając, że użytkownik "Cezary Kruk" z uprawnieniami ADMIN może się autoryzować w API aplikacji', async () => {
            accessToken = await AuthService.getAccessToken(request) 
        }) 

        await test.step(`Kiedy pobiera metodą GET action logi użytkownika "${userFullName}"`, async () => {
            const endpoint = "/api/dicom-viewer/action_log"
            const filters: string = await TestUtils.prepareFilters({ userUuid: TestUtils.getUserParam(userFullName, "uuid") })
            response = await getWithHeaders(request, endpoint + filters, { Authorization: `Bearer ${accessToken}` }, "Getting ActionLogs") 
        })

        await test.step('Wtedy endpoint zwraca response o kodzie 200', () => {
            TestAssertions.assertStatusCode(response, 200)
        })

        await test.step('I payload responsa zawiera listę action logów dla instytucji\nI liczba wyświetlonych action logów jest równa 25', async () => {
            TestAssertions.assertResponseHasProperCountObjects((await response.json()).response, 25)
        })

        await test.step('I lista wyświetlonych action logów jest posortowana po polu creationTime w kierunku "DESC"', async () => {
            TestAssertions.assertObjectsAreSortedByDateTime((await response.json()).response, 'creationTime', 'DESC')
        })   
    })
})