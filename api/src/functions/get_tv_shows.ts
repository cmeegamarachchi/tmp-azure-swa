import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function get_tv_shows(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        const url = new URL(`https://api.tvmaze.com/search/shows?q=golden%20girls`);
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Accept': 'application/json'
            },
        });
        if (response.ok) {
            const data = await response.json();
            return {
                status: 200,
                body: JSON.stringify(data, null, 2)
            };
        } else {
            console.error(response.status);
            return {
                status: response.status,
                body: "Call failed",
            };
        }
    } catch (error) {
        console.error(error);
        return {
            status: 501,
            body: error,
        };
    }
};

app.http('get_tv_shows', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: get_tv_shows
});
