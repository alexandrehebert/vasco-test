import * as trpcExpress from "@trpc/server/adapters/express";
import * as trpc from "@trpc/server";

export const createContext = async (ctx: Partial<trpcExpress.CreateExpressContextOptions> = {}) => ctx
type Context = trpc.inferAsyncReturnType<typeof createContext>;

export function createRouter() {
  return trpc.router<Context>();
}
