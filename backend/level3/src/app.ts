import { createRouter } from "./helpers/trpc";
import { targetsRouter } from "./routes/targets";

export const appRouter = createRouter().merge("targets.", targetsRouter);

export type AppRouter = typeof appRouter;
