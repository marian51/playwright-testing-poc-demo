import { APIRequestContext, APIResponse } from "@playwright/test"
import { FormType, HeadersType, SecretKey } from "../types/basicTypes"
import { postWithHeadersAndForm } from "./api_utils"
import dotenv from 'dotenv'

dotenv.config()

export class AuthService {
    static async getAccessToken(request: APIRequestContext): Promise<string> {

        const secretUsername: SecretKey = process.env.XRAI_SECRET_USERNAME
        const secretPassword: SecretKey = process.env.XRAI_SECRET_PASSWORD
        const userUsername: SecretKey = process.env.XRAI_ACTIONLOG_USERNAME as string
        const userPassword: SecretKey = process.env.XRAI_ACTIONLOG_PASSWORD as string

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
}