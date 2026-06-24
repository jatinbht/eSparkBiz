// client/src/utils/http.ts
import { redirect } from 'react-router'

const BASE_URL = '/api'

async function get(path: string, params?: Record<string, string>) {
    const url = new URL(BASE_URL + path, window.location.origin)
    
    if (params) {
        Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value))
    }

    const response = await fetch(url.toString())

    if (response.redirected) {
        const redirectedUrl = new URL(response.url)
        throw redirect(redirectedUrl.search)
    }

    if (!response.ok) {
        const text = await response.text()
        throw new Response(`Error! Response: ${text}`, {
            // headers: response.headers, //It may unintentionally leak server headers (cookies, etc.)
            status: response.status,
            statusText: response.statusText,
        })
    }

    return response.json()
}

export const http = { get }