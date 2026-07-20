import { isRouteErrorResponse, useRouteError } from "react-router";

export function ApplicantsError() {
    const error = useRouteError();

    console.error(error);

    if (isRouteErrorResponse(error)) {
        return (
            <section>
                <h1>{error.status}</h1>
                <p>{error.statusText}</p>
            </section>
        );
    }

    if (error instanceof Error) {
        return (
            <section>
                <h1>Application error</h1>
                <p>{error.message}</p>
            </section>
        );
    }

    return <p>Unknown error occurred.</p>;
}
