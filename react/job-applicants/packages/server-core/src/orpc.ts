import { RPCHandler } from "@orpc/server/node";
import { implement, onError } from "@orpc/server";

import { basicInfoRouter } from "./applicants/basic-info/procedure";
import { appContract } from '@job-applicants/api-contract';

export const appRouter = {
  applicants: {
    basicInfo: basicInfoRouter,
  },

  auth: {},

  users: {},
};

export const rpcHandler = new RPCHandler(appRouter, {
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

export const os = implement(appContract);