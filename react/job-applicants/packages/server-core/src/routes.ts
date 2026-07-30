import { basicInfoRouter } from "./applicants/basic-info/procedure";

export const appRouter = {
    applicants: {
        basicInfo: basicInfoRouter,
    },

    auth: {},

    users: {},
};

console.dir(appRouter, { depth: 5 });