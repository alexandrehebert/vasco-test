import { monthlyTarget } from "./monthly";

describe("Level 3 / use cases / monthlyTarget", () => {
  test("should format rates as floats", () => {
    const actualTargets = monthlyTarget({
      month: 6,
      year: 2022,
    })
    expect(actualTargets).toStrictEqual({
      month: 6,
      year: 2022,
      recurringRevenue: 145000,
      churnRate: 0.01,
      downgradeRate: 0.03,
      upgradeRate: 0.02,
      acquisitionTarget: 5000,
      expansionTarget: 2800,
    })
  })
  test("should return empty object when there is no matching targets", () => {
    const actualTargets = monthlyTarget({
      month: 6,
      year: 2023,
    })
    expect(actualTargets).toStrictEqual({})
  })
})
