import { oc } from '@orpc/contract';
import {
    CreateBasicInfoSchema,
    BasicInfoSchema,
} from '@job-applicants/schemas';

export const basicInfoContract = oc.router({
  create: oc
    .route({
      method: "POST",
    //   path: "/api/applicants",
    path: "/applicants"
    })
    .input(CreateBasicInfoSchema)
    .output(BasicInfoSchema),
});
