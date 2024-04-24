import { APIRequestContext } from "@playwright/test";
import {
    listCreateEndpoint,
    spaceDeleteEndpoint,
    spaceEndpoint,
} from "../api/endpoints/clickUp_endpoints";
import { AuthService } from "../api/utils/auth_service";

export class Hooks {
    static async deleteSpaceByName(
        request: APIRequestContext,
        spaceName: string
    ) {
        const teamId = process.env.BASE_TEAM_ID as string;
        const endpoint = spaceEndpoint.replace("TEAM_ID", teamId);
        const apiKey = AuthService.getApiKey();

        const spacesResponse = await request.get(endpoint, {
            headers: { Authorization: apiKey },
        });
        const id = (await spacesResponse.json()).spaces.filter(
            (r) => r.name === spaceName
        )[0].id;
        await request.delete(spaceDeleteEndpoint + id, {
            headers: { Authorization: apiKey },
        });
    }

    static async deleteSpaceById(request: APIRequestContext, spaceId: string) {
        const teamId = process.env.BASE_TEAM_ID as string;
        const endpoint = spaceEndpoint.replace("TEAM_ID", teamId);
        const apiKey = AuthService.getApiKey();

        await request.delete(spaceDeleteEndpoint + spaceId, {
            headers: { Authorization: apiKey },
        });
    }

    static async createSpaceByName(
        request: APIRequestContext,
        spaceName: string
    ): Promise<string> {
        const teamId = process.env.BASE_TEAM_ID as string;
        const endpoint = spaceEndpoint.replace("TEAM_ID", teamId);
        const apiKey = AuthService.getApiKey();

        const response = await request.post(endpoint, {
            headers: { Authorization: apiKey },
            data: { name: spaceName },
        });

        return (await response.json()).id;
    }

    static async createListByName(
        request: APIRequestContext,
        spaceId: string,
        listName: string
    ): Promise<string> {
        const teamId = process.env.BASE_TEAM_ID as string;
        const endpoint = listCreateEndpoint.replace("SPACE_ID", spaceId);
        const apiKey = AuthService.getApiKey();

        const response = await request.post(endpoint, {
            headers: { Authorization: apiKey },
            data: { name: listName },
        });

        return (await response.json()).id;
    }
}
