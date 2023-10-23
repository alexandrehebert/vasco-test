import { queryTargetPerMonth, queryTargetPerQuarter } from "./queries";

describe("Level 2/queries", () => {
  describe("query target per month", () => {
    test("should format rates as floats", () => {
      const actualTargets = queryTargetPerMonth({
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
    test("should return empty object when there is no matching targets", () => {
      const actualTargets = queryTargetPerMonth({
        month: 6,
        year: 2023,
      })
      expect(actualTargets).toStrictEqual({})
    })
  })

  describe("query target per quarter", () => {
    test("should compute quarter data", () => {
      const actualTarget = queryTargetPerQuarter({
        quarter: 2,
        year: 2022,
      })
      expect(actualTarget).toStrictEqual({
        "quarter": 2,
        "year": 2022,
        "recurringRevenue": 145000,
        "churnRate": 0.028,
        "downgradeRate": 0.085,
        "upgradeRate": 0.056
      })
    })
  })
})
