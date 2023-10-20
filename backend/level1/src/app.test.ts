import { appRouter, createContext } from "./app";

// =======================
// DO NOT MODIFY THIS FILE
// =======================

describe("Level 1/app", () => {
  test("renders targets for a month", async () => {
    const ctx = await createContext();
    const caller = appRouter.createCaller(ctx);

    const perMonth = await caller.query("targets.perMonth", {
      month: 6,
      year: 2022,
    });

    expect(perMonth).toMatchObject({
      month: 6,
      year: 2022,
      recurringRevenue: 145000.0,
      churnRate: 0.01,
      downgradeRate: 0.03,
      upgradeRate: 0.02,
    });
  });
});
