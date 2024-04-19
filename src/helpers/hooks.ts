import { APIRequestContext } from "@playwright/test";
import { spaceDeleteEndpoint, spaceEndpoint } from "../api/endpoints/clickUp_endpoints";
import { AuthService } from "../api/utils/auth_service";

export class Hooks {
    static async deleteSpaceByName(request: APIRequestContext, spaceName: string) {
        const teamId = process.env.BASE_TEAM_ID as string
        const endpoint = spaceEndpoint.replace('TEAM_ID', teamId)
        const apiKey = AuthService.getApiKey()
        
        const spacesResponse = await request.get(endpoint, { headers: { Authorization: apiKey } })
        const id = (await spacesResponse.json()).spaces.filter(r => r.name === spaceName)[0].id
        await request.delete(spaceDeleteEndpoint + id, { headers: { Authorization: apiKey }})
    }

    static async createSpaceByName(request: APIRequestContext, spaceName: string) {
        const teamId = process.env.BASE_TEAM_ID as string
        const endpoint = spaceEndpoint.replace('TEAM_ID', teamId)
        const apiKey = AuthService.getApiKey()

        await request.post(endpoint, { headers: { Authorization: apiKey }, data: { name: spaceName } })
    }
}