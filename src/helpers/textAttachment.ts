import { APIResponse } from "@playwright/test";

export class Attachments {

    async responseTextAttachment(response: APIResponse): Promise<string> {
        const responseCode = response.status();
        const responseBodyJson = JSON.stringify(JSON.parse(await response.text()), null, 4)
        let text = ``

        response.headersArray().forEach(h => {
            text = text + h.name + ': ' + h.value + '<br/>'
        });

        let result = `
            <p>Status code: ${responseCode}</p>
            <p><strong>Headers:</strong> <br/>${text}</p>
            <p><strong>Body:</strong> <pre>${responseBodyJson}</pre></p>
        `

        return result;
    }

    async requestTextAttachment(method: string, endpoint: string, headers: { [key: string]: string; }, body?: Object): Promise<string> {
        let text = ''
        for (let h in headers) {
            text = text + h + ": " + headers[h] + '<br/>'
        }

        const bodyJson = JSON.stringify(body, null, 4)

        let result = `
            <p>${method} to ${endpoint}</p>
            <p><strong>Headers:</strong> <br/>${text}</p>
            <p><strong>Body:</strong> <pre>${bodyJson}</pre></p>
        `

        return result;
    }
}