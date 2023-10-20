import { queryTargetsPerMonth } from "./queries";

describe("Level 1/queries", () => {
  test("should format rates as floats", () => {
    const actualTargets = queryTargetsPerMonth({
      month: 6,
      year: 2022,
    })
    expect(actualTargets).toStrictEqual({
      month: 6,
      year: 2022,
      recurringRevenue: 145000.0,
      churnRate: 0.01,
      downgradeRate: 0.03,
      upgradeRate: 0.02,
    })
  })
  test("should not find multiple targets", () => {
    expect(() => queryTargetsPerMonth({
      year: 2022,
    })).toThrowError("found multiple targets for a single month")
  })
  test("should return empty object when there is no matching targets", () => {
    const actualTargets = queryTargetsPerMonth({
      month: 6,
      year: 2023,
    })
    expect(actualTargets).toStrictEqual({})
  })
})
