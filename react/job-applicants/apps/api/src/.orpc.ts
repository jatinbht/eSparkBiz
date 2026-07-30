// //! MOVED TO packages/api-services/src/orpc.ts
// // export const appRouter = {
// //     applicants: {
// //         basicInfo,
// //         education,
// //         ...
// //     },
// //     auth,
// //     users,
// // }

// // appRouter is simply a tree of procedures:
// // export const appRouter = {
// //     basicInfo: {
// //         create,
// //     },
// // };


// // This gives you 2 exports:

// // appRouter — useful for typing the client later.
// // rpcHandler — what Express will use.

// //the following has been moved to 'packages/api-contracts'
// import { RPCHandler } from "@orpc/server/node";
// import { implement, onError } from "@orpc/server";
// import { appContract } from "@job-applicants/api-contract";
// import { basicInfoRouter } from "@job-applicants/server-core";

// // import { router as basicInfoRouter } from "./modules/applicants/basic-info/.procedure";

// const os = implement(appContract); //implemented in `react\job-applicants\apps\api\src\modules\applicants\basic-info\procedure.ts`

// export const appRouter = {
//     applicants: {
//         basicInfo: basicInfoRouter,
//     },
// };

// export const rpcHandler = new RPCHandler(appRouter, {
//   interceptors: [
//     onError((error) => {
//       console.error(error);
//     }),
//   ],
// });