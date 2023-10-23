import { quarterlyTarget } from "./quarterly";

describe("Level 3 / use cases / quarterlyTarget", () => {
  test("should compute quarter data", () => {
    const actualTarget = quarterlyTarget({
      quarter: 2,
      year: 2022,
    })
    expect(actualTarget).toStrictEqual({
      "quarter": 2,
      "year": 2022,
      "recurringRevenue": 145000,
      "churnRate": 0.028,
      "downgradeRate": 0.085,
      "upgradeRate": 0.056,
      "acquisitionTarget": 25000,
      "expansionTarget": 7900,
    })
  })
})
