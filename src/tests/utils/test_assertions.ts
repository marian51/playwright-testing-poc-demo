import { APIResponse, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { Store } from "../../api/types/store";

export class TestAssertions {

    static async assertStatusCode(response: APIResponse, expectedCode: number): Promise<void> {
        return allure.step(`Checking if response status code is as expected (equal to ${expectedCode})`, async () => {
             expect(response.status()).toEqual(expectedCode);
             allure.attachment("response status", response.status().toString(), { contentType: "text/plain"})
        })
    }

    static async assertStoreObjectAreEqual(requestObject: Store | Object, responseObject: APIResponse): Promise<void> {
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

    static async assertResponseHasProperCountObjects(responseObject: any, count: number): Promise<void> {
        return allure.step(`Checking if response object contains ${count} elements`, async () => {
            const countOfElements = Object.keys(responseObject).length
            expect(countOfElements).toEqual(count)

            allure.attachment("response object", JSON.stringify(responseObject, null, 4), { contentType: "text/plain" })
            allure.attachment("count of elements", countOfElements.toString(), { contentType: "text/plain" })
        })
    }

    
    static assertObjectsAreSortedByDateTime(responseObject: any, property: string, direction: string) {
        const directionWord = direction == 'DESC' ? 'Descending' : direction == "ASC" ? 'Ascending ' : 'Unknown'
        return allure.step(`Checking if elements are sorted by "${property}" property with "${directionWord}" direction`, async () => {
            if (direction == 'DESC') {
                for (let i = 0; i < responseObject.length-1 ; i++) {
                    expect(new Date(responseObject[i][property]).getTime()).toBeGreaterThan(new Date(responseObject[i+1][property]).getTime())
                }
            } else if (direction == 'ASC') {
                for (let i = 0; i < responseObject.length-1 ; i++) {
                    expect(new Date(responseObject[i][property]).getTime()).toBeLessThan(new Date(responseObject[i+1][property]).getTime())
                }
            } else {
                throw new Error("Unknown sorting direction!"); 
            }
        })
    }
}