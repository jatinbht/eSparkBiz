- [x] add 'shadcn' as table/data-grid: to enable sorting, filtering, searching
- [ ] Shared API Contracts
- [ ] learn about microservices architecture:

- [ ] add authentication (stub but it helps imagine the future direction)

```md
modules/
    applicants/
        basic-info/
        education/
        experience/
        technologies/
```

or even

```md
modules/
    applicants/
        controller.ts
        service.ts
        repository.ts

        basic-info/
        education/
        experience/
```

```md
server/src/modules/

    applicants/
        router.ts
        controller.ts
        service.ts
        repository.ts

        basic-info/
            mapper.ts
            schema.ts

        education/
            ...

        experience/
            ...

        technologies/
            ...
```

- [ ] modules

```md
modules/

    applicants/
    auth/
    users/
```

```md
job-applicants/

client/
server/

packages/
    schemas/
    ui/
    common/

server/
    modules/

        applicants/
            router.ts
            controller.ts
            service.ts
            repository.ts

            basic-info/
            education/
            experience/
            technologies/

        auth/
            router.ts
            controller.ts
            service.ts

        users/
            ...

client/
    modules/

        applicants/
            basic-info/
            education/
            experience/
            technologies/

        auth/

        users/
```

```md
job-applicants/

apps/
    web/
    api/

packages/
    schemas/
    shared/
    ui/
    api-client/

docs/
postman/

Then:

apps/api/src/modules/
    applicants/
    auth/
    users/

and

apps/web/src/modules/
    applicants/
    auth/
    users/
```