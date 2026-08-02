// I (chatgpt) would not register every error on every endpoint.

// For example:

// show
//  - NOT_FOUND
// create
//  - CONFLICT
// authenticated endpoints
//  - UNAUTHORIZED
//  - FORBIDDEN

// This makes the contract accurately describe each endpoint and gives the client better TypeScript narrowing. Registering all errors everywhere is easier, but it weakens the value of the contract because every endpoint appears to throw every error.

import { oc } from "@orpc/contract";

import {
  IdSchema,
  BasicInfoSchema,
  CreateBasicInfoSchema,
  BasicInfoListQuerySchema,
  BasicInfoListResponseSchema,
  BasicInfoFilterOptionsSchema,
} from "@job-applicants/schemas";

// Selective re-exports of schemas specifically involved in HTTP API contracts
export {
  IdSchema,
  BasicInfoSchema,
  CreateBasicInfoSchema,
  BasicInfoListQuerySchema,
  BasicInfoListResponseSchema,
  BasicInfoFilterOptionsSchema,
};
import { contractErrors } from "../errors";

export const basicInfoContract = oc.router({
  create: oc
    .route({
      method: "POST",
      path: "/applicants",
      description: "...",
      tags: ["Applicants"],
    })
    .errors({
      CONFLICT: contractErrors.CONFLICT,
      VALIDATION_ERROR: contractErrors.VALIDATION_ERROR,
      INTERNAL_SERVER_ERROR: contractErrors.INTERNAL_SERVER_ERROR //after findById(id) returns nothing immediately after insert.
    })
    .input(CreateBasicInfoSchema)
    .output(BasicInfoSchema),

    show: oc
      .route({
        method: "GET",
        path: "/applicants/{id}",
      })
      .errors({
        NOT_FOUND: contractErrors.NOT_FOUND,
      })
  // show: oc
  //   .route({
  //     method: "POST",
  //     path: "/applicants/show",
  //   })
    .input(IdSchema)
    .output(BasicInfoSchema),

  list: oc
    .route({
      method: "GET",
      path: "/applicants",
    })
    .input(BasicInfoListQuerySchema)
    .output(BasicInfoListResponseSchema),

  filterOptions: oc
    .route({
      method: "GET",
      path: "/applicants/filter-options",
    })
    .output(BasicInfoFilterOptionsSchema),
});