// client/src/utils/http.ts
import { redirect } from 'react-router';

const BASE_URL = '/api';

interface RequestOptions {
    method: string;
    path: string;
    params?: Record<string, string>; // Client context: This maps to server's "query"
    body?: unknown;
    headers?: Record<string, string>; // Added for future JWT tokens / API keys
    options?: RequestInit;            // Added for future cookie adjustments (e.g., credentials)
}

async function request({ method, path, params, body }: RequestOptions) {
    const url = new URL(BASE_URL + path, window.location.origin)

    if (params) {
        Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value))
    }

    // const response = await fetch(url.toString())

    const response = await fetch(url.toString(), {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (response.redirected) {
        const redirectedUrl = new URL(response.url);
        throw redirect(redirectedUrl.search);
    }

    if (!response.ok) {
        const text = await response.text();
        throw new Response(`Error! Response: ${text}`, {
            // headers: response.headers, //It may unintentionally leak server headers (cookies, etc.)
            status: response.status,
            statusText: response.statusText,
        });
    }

    return response.json();
}


export const http = {
    get: (path: string, params?: Record<string, string>) => request({ method: 'GET', path, params }),

    post: (path: string, body: unknown) => request({ method: 'POST', path, body }),

    put: (path: string, body: unknown) => request({ method: 'PUT', path, body }),

    delete: (path: string) => request({ method: 'DELETE', path }),
};
