import { redirect } from 'react-router';

const BASE_URL = '/api';

interface RequestOptions {
    method: string;
    path: string;
    params?: Record<string, string | number | boolean>;
    body?: unknown;
    headers?: Record<string, string>;
    options?: RequestInit;
}

async function request<T>({ method, path, params, body }: RequestOptions): Promise<T> {
    const url = new URL(BASE_URL + path, window.location.origin);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                url.searchParams.set(key, String(value));
            }
        });
    }

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
            status: response.status,
            statusText: response.statusText,
        });
    }

    return response.json() as Promise<T>;
}

export const http = {
    get: <T>(path: string, params?: Record<string, string | number | boolean>) => request<T>({ method: 'GET', path, params }),

    post: <T>(path: string, body: unknown) => request<T>({ method: 'POST', path, body }),

    put: <T>(path: string, body: unknown) => request<T>({ method: 'PUT', path, body }),

    delete: <T>(path: string) => request<T>({ method: 'DELETE', path }),
};
