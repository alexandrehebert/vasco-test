import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { z } from "zod";
import { queryTargetsPerMonth } from "./queries";

// Context
// =======

export const createContext = async (ctx: Partial<trpcExpress.CreateExpressContextOptions> = {}) => ctx
type Context = trpc.inferAsyncReturnType<typeof createContext>;

function createRouter() {
  return trpc.router<Context>();
}

// Procedures
// ==========

const targetsRouter = createRouter().query("perMonth", {
  input: z.object({ month: z.number(), year: z.number() }),
  resolve: ({ input }) => queryTargetsPerMonth(input),
});

// Root Router
// ==========

export const appRouter = trpc.router<Context>().merge("targets.", targetsRouter);

export type AppRouter = typeof appRouter;
