// infrastructure, not features.

// queryClient.ts creates the TanStack QueryClient.
// orpc.ts creates the typed oRPC client.

// Every feature imports them.

import { RPCLink } from "@orpc/client/fetch";
import { createORPCClient } from "@orpc/client";
import type { ContractRouterClient } from "@orpc/contract";
import { appContract } from "@job-applicants/api-contract";
// import type { basicInfoContract } from "@job-applicants/api-contract";
// The client should be typed with the implemented router, not a single contract. Example: `import type { appRouter } from "api";` or `import type { AppRouter } from "@job-applicants/api-contract";`

const link = new RPCLink({
  url: `${window.location.origin}/rpc`,
});

// export const orpc = createORPCClient<AppContract>(link); //old API

export const orpc: ContractRouterClient<typeof appContract> = createORPCClient(link); //current API

// later:
// export const basicInfo = client.router<typeof basicInfoContract>();
