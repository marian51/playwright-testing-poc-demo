import { APIRequestContext, APIResponse } from "@playwright/test"
import { FormType, HeadersType, SecretKey } from "../types/basicTypes"
import { getWithHeaders, postWithHeadersAndForm } from "./api_utils"
import dotenv from 'dotenv'

dotenv.config()

export class AuthService {
    static async getAccessToken(request: APIRequestContext): Promise<string> {

        const secretUsername: SecretKey = process.env.SECRET_USERNAME
        const secretPassword: SecretKey = process.env.SECRET_PASSWORD
        const userUsername: SecretKey = process.env.USERNAME as string
        const userPassword: SecretKey = process.env.PASSWORD as string

        const credentialsBase64: string = btoa(secretUsername + ":" + secretPassword)

        const headers: HeadersType = {
            accept: "*/*",
            authorization: `Basic ${credentialsBase64}`,
            "content-Type": "application/x-www-form-urlencoded"
        }

        const form: FormType = {
            username: userUsername,
            password: userPassword,
            grant_type: "password"
        }

        const endpoint = "/auth/realms/xrai/protocol/openid-connect/token"

        let response: APIResponse = await postWithHeadersAndForm(request, endpoint, headers, form, "Getting token")

        return (await response.json()).access_token
    } 

    static getApiKey(): string {
        return process.env.API_KEY as string
    }

    static async getUserInfo(request: APIRequestContext, endpoint: string, apiKey: string): Promise<APIResponse> {
        return await getWithHeaders(request, endpoint, { Authorization: apiKey }, "Getting user info")
    }
}