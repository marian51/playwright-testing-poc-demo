export class Headers {
    defaultHeaders(): { [key: string]: string; } {
        return {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        }
    }
}