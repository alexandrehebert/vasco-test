import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { z } from "zod";
import { queryTargetPerMonth, queryTargetPerQuarter } from "./queries";

// Context
// =======

export const createContext = async (ctx: Partial<trpcExpress.CreateExpressContextOptions> = {}) => ctx
type Context = trpc.inferAsyncReturnType<typeof createContext>;

function createRouter() {
  return trpc.router<Context>();
}

// Procedures
// ==========

const targetsRouter = createRouter()
  .query("perMonth", {
    input: z.object({ month: z.number().gte(1).lte(12), year: z.number() }),
    resolve: ({ input }) => queryTargetPerMonth(input),
  })
  .query("perQuarter", {
    input: z.object({ quarter: z.number().gte(1).lte(4), year: z.number() }),
    resolve: ({ input }) => queryTargetPerQuarter(input),
  });

// Root Router
// ==========

export const appRouter = createRouter().merge("targets.", targetsRouter);

export type AppRouter = typeof appRouter;
