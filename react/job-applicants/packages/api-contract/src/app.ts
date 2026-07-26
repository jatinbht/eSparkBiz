import { basicInfoContract } from "./applicants/basic-info";

export const appContract = {
  applicants: {
    basicInfo: basicInfoContract,
  },

  auth: {},

  users: {},
};

export type AppContract = typeof appContract;