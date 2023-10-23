import { z } from "zod";
import { createRouter } from "../helpers/trpc";
import {
  quarterlyTarget
} from "../application/targets/use-cases/quarterly";
import {
  monthlyTarget
} from "../application/targets/use-cases/monthly";

export const targetsRouter = createRouter()
  .query("perMonth", {
    input: z.object({ month: z.number().gte(1).lte(12), year: z.number() }),
    // TODO refactor and use it as inferred dto type
    // output: z.union([z.object({
    //   acquisitionTarget: z.number(),
    //   expansionTarget: z.number()
    // }), z.object({})]),
    resolve: ({ input }) => monthlyTarget(input),
  })
  .query("perQuarter", {
    input: z.object({ quarter: z.number().gte(1).lte(4), year: z.number() }),
    // TODO refactor and use it as inferred dto type
    // output: z.union([z.object({
    //   acquisitionTarget: z.number(),
    //   expansionTarget: z.number()
    // }), z.object({})]),
    resolve: ({ input }) => quarterlyTarget(input),
  });
