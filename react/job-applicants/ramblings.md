```javascript
// client/src/utils/http.ts
import { redirect } from 'react-router'

const BASE_URL = '/api'

async function get(path: string, params?: Record<string, string>) {
    const url = new URL(BASE_URL + path, window.location.origin)
    
    if (params) {
        Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
    }

    const response = await fetch(url.toString())

    if (response.redirected) {
        const redirectedUrl = new URL(response.url)
        throw redirect(redirectedUrl.search)
    }

    if (!response.ok) {
        const text = await response.text()
        throw new Response(`Error! Response: ${text}`, {
            status: response.status,
            statusText: response.statusText,
        })
    }

    return response.json()
}

export const http = { get }
```

```
function matchedData(req: {
 [k: string]: any;
 body: any;
 cookies?: Record<string, any>;
 headers?: Record<string, any>;
 params?: Record<string, any>;
 query?: Record<string, any>;
}, options?: {
 includeOptionals: boolean | undefined;
 locations: ("query" | "params" | "body" | "cookies" | "headers")[] | undefined;
 onlyValidData: boolean | undefined;
}): {}
```