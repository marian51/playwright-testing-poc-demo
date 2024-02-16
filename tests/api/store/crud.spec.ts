import { APIResponse, test } from '@playwright/test';
import { allure } from 'allure-playwright';
import { DataGenerator } from '../../../api/utils/generate_data';
import { ApiUtils } from '../../../api/utils/api_utils';
import { Store } from '../../../api/types/store';
import { TestUtils } from '../../utils/test_utils';

test.describe("API Store CRUD tests", () => {
    let storeId: number;
    let newStoreRequest: Store;

    test(`@api Create "Store" in the store`, async ({ request }) => {
        const endpoint: string = '/v2/store/order'
        const shipDateISO: string = await DataGenerator.generateDate();

        newStoreRequest = await DataGenerator.generateStoreWithRandomData(shipDateISO);

        const newStoreResponse: APIResponse = await allure.step("Posting new 'store' to the store", async () => { // TODO wrap stepem przenieść gdzieś indziej
            return await ApiUtils.post(request, endpoint, newStoreRequest)
        })

        storeId = (await newStoreResponse.json()).id;
            
        await TestUtils.assertStatusCode(newStoreResponse);

        await TestUtils.assertStoreObjectAreEqual(newStoreRequest, newStoreResponse);
    })

    test("@api Read store order by id", async ({ request }) => {
        const endpoint: string = `/v2/store/order/${storeId}`
        
        const storeResponse: APIResponse = await allure.step("Getting store order by order id", async () => {
            return await ApiUtils.get(request, endpoint)
        })

        await TestUtils.assertStatusCode(storeResponse);
        await TestUtils.assertStoreObjectAreEqual(newStoreRequest, storeResponse);
    })
})
