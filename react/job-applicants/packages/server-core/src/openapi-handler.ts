import { OpenAPIHandler } from "@orpc/openapi/node";
import { 
    ORPCError,
    // isORPCError,
    ValidationError, 
    onError 
} from "@orpc/server";

import { appRouter } from "./routes";

export const openApiHandler = new OpenAPIHandler(appRouter, {
  interceptors: [
    onError((error) => {
        if (!(error instanceof ORPCError)) {
            return;
        }

        console.error(error);

        if (error.cause instanceof ValidationError) {
            console.dir(error.cause.issues, { depth: null });
        }
    })
  ],
});