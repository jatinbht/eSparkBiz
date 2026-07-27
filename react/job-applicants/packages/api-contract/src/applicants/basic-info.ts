import { oc } from "@orpc/contract";

import {
  IdSchema,
  BasicInfoSchema,
  CreateBasicInfoSchema,
  BasicInfoQuerySchema,
  createPaginatedResultSchema,
  BasicInfoFilterOptionsSchema,
} from "@job-applicants/schemas";

export const basicInfoContract = oc.router({
  create: oc
    .route({
      method: "POST",
      path: "/applicants",
    })
    .input(CreateBasicInfoSchema)
    .output(BasicInfoSchema),

  show: oc
    .route({
      method: "GET",
      path: "/applicants/:id",
    })
    .input(IdSchema)
    .output(BasicInfoSchema),

  list: oc
    .route({
      method: "GET",
      path: "/applicants",
    })
    .input(BasicInfoQuerySchema)
    .output(createPaginatedResultSchema(BasicInfoSchema)),

  filterOptions: oc
    .route({
      method: "GET",
      path: "/applicants/filter-options",
    })
    .output(BasicInfoFilterOptionsSchema),
});