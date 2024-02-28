import { faker } from '@faker-js/faker'
import test from '@playwright/test'
import { allure } from 'allure-playwright';
import { Store } from '../types/store';

export class DataGenerator {

    static async generateStoreWithRandomData(shipDate: string): Promise<Store> {
        return test.step("Generating new 'store' object", async () => {
            const data: Store = {
                id: faker.number.int({ min: 1, max: 10}),
                petId: faker.number.int({ min: 1000, max: 9999}),
                quantity: faker.number.int({ min: 1, max: 10}),
                shipDate: shipDate,
                status: this.getStatus(),
                complete: faker.datatype.boolean()
            }

            allure.attachment("generated store", JSON.stringify(data, null, 4), {contentType: "application/json"})
            return data;
        })

    }

    static async generateDate(): Promise<string> {
        return test.step("Generating 'shipDate' value", async () => {
            let date: string = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString();
            date = date.replace("Z", "+0000")
            allure.attachment("generated date", date, {contentType: "text/plain"})
            return date;
        })
    }

    static getStatus = (): string => {
        return faker.helpers.arrayElement(["available", "pending", "sold", "available", "pending", "sold", "available", "pending", "sold"])
    }
}