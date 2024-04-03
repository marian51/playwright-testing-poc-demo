import { APIRequestContext, APIResponse } from "@playwright/test";
import { allure } from "allure-playwright";
import { Attachments } from "../../helpers/textAttachment"
import { Headers } from "../../helpers/headers";
import { HeadersType, FormType, ParamsType } from "../types/basicTypes";

const attachments = new Attachments();
const headers = new Headers();
const baseUrl = process.env.BASE_URL

export async function postWithBody(request: APIRequestContext, endpoint: string, body: Object, stepMessage: string): Promise<APIResponse> {
    return allure.step(stepMessage, async () => {
        const defaultHeaders = headers.defaultHeaders();
        let response: APIResponse = await request.post(endpoint, { headers: defaultHeaders, data: body })

        allure.attachment("endpoint", baseUrl + endpoint, { contentType: "text/plain" })
        allure.attachment("request", await attachments.requestTextAttachment('POST', response.url(), defaultHeaders, body), { contentType: "text/html" })
        allure.attachment("response", await attachments.responseTextAttachment(response), { contentType: "text/html" })

        return response
    })
    
}

export async function postWithHeadersAndForm(request: APIRequestContext, endpoint: string, headers: HeadersType, form: FormType, stepMessage: string): Promise<APIResponse> {
    return allure.step(stepMessage, async () => {
        let response: APIResponse = await request.post(endpoint, { headers: headers, form: form })

        return response;
    })
}

export async function postWithHeadersAndBody(request: APIRequestContext, endpoint: string, headers: HeadersType, body: object, stepMessage: string): Promise<APIResponse> {
    return allure.step(stepMessage, async () => {
        let response: APIResponse = await request.post(endpoint, { headers: headers, data: body })

        allure.attachment("endpoint", baseUrl + endpoint, { contentType: "text/plain" })
        allure.attachment("request", await attachments.requestTextAttachment('POST', response.url(), headers, body), { contentType: "text/html" })
        allure.attachment("response", await attachments.responseTextAttachment(response), { contentType: "text/html" })

        return response;
    })
}

export async function getById(request: APIRequestContext, endpoint: string, stepMessage: string): Promise<APIResponse> {
    return allure.step(stepMessage, async () => {
        let response: APIResponse = await request.get(endpoint)

        allure.attachment("endpoint", baseUrl + endpoint, { contentType: "text/plain" })
        allure.attachment("response", await attachments.responseTextAttachment(response), { contentType: "text/html" })

        return response 
    })

}

export async function getWithHeaders(request: APIRequestContext, endpoint: string, headers: HeadersType, stepMessage: string): Promise<APIResponse> {
    return allure.step(stepMessage, async () => {
        let response: APIResponse = await request.get(endpoint, { headers: headers })

        allure.attachment("endpoint", baseUrl + endpoint, { contentType: "text/plain" })
        allure.attachment("request", await attachments.requestTextAttachment('GET', response.url(), headers, {}), { contentType: "text/html" })
        allure.attachment("response", await attachments.responseTextAttachment(response), { contentType: "text/html" })
    
        return response
    })
}

export async function getWithHeadersAndParams(request: APIRequestContext, endpoint: string, headers: HeadersType, params: ParamsType, stepMessage: string): Promise<APIResponse> {
    return allure.step(stepMessage, async () => {
        let response: APIResponse = await request.get(endpoint, { headers: headers, params: params })

        allure.attachment("endpoint", baseUrl + endpoint, { contentType: "text/plain" })
        allure.attachment("request", await attachments.requestTextAttachment('GET', response.url(), headers, {}), { contentType: "text/html" })
        allure.attachment("response", await attachments.responseTextAttachment(response), { contentType: "text/html" })

        return response
    })
}

export async function deleteById(request: APIRequestContext, endpoint: string, stepMessage: string): Promise<APIResponse> {
    return allure.step(stepMessage, async () => {
        let response: APIResponse = await request.delete(endpoint)

        allure.attachment("endpoint", baseUrl + endpoint, { contentType: "text/plain" })
        allure.attachment("response", await attachments.responseTextAttachment(response), { contentType: "text/html" })

        return response;
    })
}

