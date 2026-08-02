// packages/api-contract/src/errors.ts

import { ErrorCode } from "@job-applicants/schemas";

export const contractErrors = Object.fromEntries(
  Object.values(ErrorCode).map(code => [code, {}]),
) as {
  [K in (typeof ErrorCode)[keyof typeof ErrorCode]]: {};
};