import { APIResponse, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { Store } from "../../api/types/store";

export class TestUtils {

    static async assertStatusCode(response: APIResponse): Promise<void> {
        return allure.step("Checking if response status code is as expected", async () => {
             expect(response.status()).toEqual(200);
             allure.attachment("response status", response.status().toString(), { contentType: "text/plain"})
        })
    }

    static async assertStoreObjectAreEqual(requestObject: Store, responseObject: APIResponse): Promise<void> {
        return allure.step("Checking if response object is as request object", async () => {

            const responseObjectJson = await responseObject.json()

            for (const prop in responseObjectJson) {
                expect(requestObject.hasOwnProperty(prop)).toBeTruthy()
                expect(responseObjectJson[prop]).toEqual(requestObject[prop])
            }

            allure.attachment("expected object", JSON.stringify(requestObject, null, 4), { contentType: 'text/plain' })
            allure.attachment("response object", JSON.stringify(responseObjectJson, null, 4), { contentType: 'text/plain' })
        })
        
    }
}