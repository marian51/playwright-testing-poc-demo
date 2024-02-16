import { APIRequest, APIResponse, expect, test } from '@playwright/test';
import { allure } from 'allure-playwright';
import { DataGenerator } from '../../../api/utils/generate_data';
import { ApiUtils } from '../../../api/utils/api_utils';
import { Store } from '../../../api/types/store';
import { TestUtils } from '../../utils/test_utils';

const endpoint: string = '/v2/store/order'

test(`@api Create "Store" in the store`, async ({ request }) => {
    let shipDateISO: string;
    let newStoreRequest: Store;
    let newStoreResponse: APIResponse;

    shipDateISO = await DataGenerator.generateDate();

    newStoreRequest = await DataGenerator.generateStoreWithRandomData(shipDateISO);

    newStoreResponse = await allure.step("Posting new 'store' to the store", async () => { // TODO wrap stepem przenieść gdzieś indziej
        return await ApiUtils.post(request, endpoint, newStoreRequest)
    })
        
    
    await TestUtils.assertStatusCode(newStoreResponse);

    await TestUtils.assertStoreObjectAreEqual(newStoreRequest, newStoreResponse);
})