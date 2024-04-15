import { APIResponse, test } from '@playwright/test';
import { allure } from 'allure-playwright';
import { DataGenerator } from '../../../api/utils/generate_data';
import { Store } from '../../../api/types/store';
import { TestUtils } from '../../utils/test_utils';
import * as ApiUtils from '../../../api/utils/api_utils'
import { BasicResponseType } from '../../../api/types/basicTypes';
import { TestAssertions } from "../../utils/test_assertions";

test.describe("API Store CRUD tests", () => {
    let storeId: number;
    let newStoreRequest: Store;

    test(`@api Create "Store" in the store`, async ({ request }) => {
        const endpoint: string = '/v2/store/order'
        const shipDateISO: string = await DataGenerator.generateDate();

        newStoreRequest = await DataGenerator.generateStoreWithRandomData(shipDateISO);
        const newStoreResponse: APIResponse = await ApiUtils.postWithBody(request, endpoint, newStoreRequest, "Posting new 'store' to the store")
        storeId = (await newStoreResponse.json()).id;
            
        await TestAssertions.assertStatusCode(newStoreResponse, 200);
        await TestAssertions.assertStoreObjectAreEqual(newStoreRequest, newStoreResponse);
    })

    test("@api Read store order by id", async ({ request }) => {
        const endpoint: string = `/v2/store/order/${storeId}`
        
        const storeResponse: APIResponse = await ApiUtils.getById(request, endpoint, "Getting store order by order id")

        await TestAssertions.assertStatusCode(storeResponse, 200);
        await TestAssertions.assertStoreObjectAreEqual(newStoreRequest, storeResponse);
    })

    test("@api Delete store order by id", async ({ request }) => {
        const endpoint: string = `/v2/store/order/${storeId}`

        const deleteResponse: APIResponse = await ApiUtils.deleteById(request, endpoint, "Deleting store order by order id")

        const expectedResponse: BasicResponseType = {
            code: 200,
            message: storeId.toString(), 
            type: "unknown"
        }

        await TestAssertions.assertStatusCode(deleteResponse, 200)
        await TestAssertions.assertStoreObjectAreEqual(expectedResponse, deleteResponse)
    })
})
