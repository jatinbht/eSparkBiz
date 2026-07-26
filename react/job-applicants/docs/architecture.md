# Naming conventions

## Database

snake_case

## TypeScript

camelCase

## React

camelCase

## JSON API

camelCase

## Mapping

Database rows are converted to domain models in the repository layer using:

- camelizeKeys()
- Zod validation

Components and services never perform case conversion.

---

# DateField

```md
Button
    ↓
Popover
    ↓
Calendar (react-day-picker)
```

## Dataflow

```md
TanStack Form
        ↓
field.state.value      // "2002-06-18" or ""
        ↓
convert to Date
        ↓
Calendar
        ↓
Date selected
        ↓
convert back to ISO string (yyyy-MM-dd)
        ↓
field.handleChange(...)
```

> Notice the conversions:

```md
Form value      Calendar value
---;            ---;
""          ⇄   undefined
"2024-07-08" ⇄  Date
```

## ORPC

- api-contract → @orpc/contract only
- server-core → @orpc/server
- web → @orpc/client, @orpc/react
- apps/api → Express, HTTP server, environment loading, server startup

Replace this flow:

``` md
React
    │
    ▼
api-client
    │
    ▼
http.post("/applicants")
    │
    ▼
Express REST route
    │
    ▼
service
```

with

```md
React
    │
    ▼
oRPC Client
    │
    ▼
RPCHandler
    │
    ▼
appRouter
    │
    ▼
basicInfo.create.handler(...)
    │
    ▼
service
```

Notice that your service layer should not change. Only the transport changes.