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
      method: "POST",
      path: "/applicants/show",
    })
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