import test from "@playwright/test";
import { AuthService } from '../../../api/utils/auth_service';
import { getWithHeaders } from "../../../api/utils/api_utils";
import { TestUtils } from "../../utils/test_utils";

test.describe("API Action Log basic tests", () => {
    test('@action-log Admin user is able to read action logs', async({ request }) => {
        
        
        
        
        // I liczba wyświetlonych action logów jest równa 25
        // I lista wyświetlonych action logów jest posortowana po polu creationTime w kierunku "DESC"

        // Zakładając, że użytkownik "Cezary Kruk" z uprawnieniami ADMIN może się autoryzować w API aplikacji
        const accessToken = await AuthService.getAccessToken(request) 

        // Kiedy pobiera metodą GET action logi
        const endpoint = "https://raygenic-stage.onwelo.net/api/dicom-viewer/action_log"
        const response = await getWithHeaders(request, endpoint, { Authorization: `Bearer ${accessToken}` }, "Getting ActionLogs") 

        // Wtedy endpoint zwraca response o kodzie 200
        TestUtils.assertStatusCode(response)

        // I payload responsa zawiera listę action logów
        TestUtils.assertResponseHasProperCountObjects((await response.json()).response, 25)
    })
})