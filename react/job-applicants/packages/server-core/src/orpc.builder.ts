import { implement } from "@orpc/server";
import { appContract } from "@job-applicants/api-contract";

export const os = implement(appContract);