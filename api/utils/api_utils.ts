import { APIRequestContext, APIResponse } from "@playwright/test";
import { allure } from "allure-playwright";
import { Attachments } from "../../helpers/textAttachment"
import { Headers } from "../../helpers/headers";
import { Params } from "../types/basicTypes";

const attachments = new Attachments();
const headers = new Headers();

// np. pomocnicze funkcje do testowania API, takie jak wysyłanie żądań i sprawdzanie odpowiedzi
export class ApiUtils {
    static async post(request: APIRequestContext, endpoint: string, body: Object): Promise<APIResponse> {
        const defaultHeaders = headers.defaultHeaders();
        let response: APIResponse = await request.post(endpoint, { headers: defaultHeaders, data: body})
    
        allure.attachment("endpoint", endpoint, {contentType: "text/plain"})
        allure.attachment("request", await attachments.requestTextAttachment('POST', endpoint, defaultHeaders, body), {contentType: "text/html"})
        allure.attachment("response", await attachments.responseTextAttachment(response), {contentType: "text/html"})
        
        return response
    }

    static async get(request: APIRequestContext, endpoint: string): Promise<APIResponse> {
        let response: APIResponse = await request.get(endpoint)

        allure.attachment("endpoint", endpoint, {contentType: "text/plain"})
        allure.attachment("response", await attachments.responseTextAttachment(response), {contentType: "text/html"})

        return response
    }
}