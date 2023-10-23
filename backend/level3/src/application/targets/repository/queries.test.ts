import {
  queryLastTargetBeforeQuarter,
  querySortedTargetsForQuarter
} from "./queries";

describe("Level 3 / repository / targets", () => {
  test("should find targets by quarter", () => {
    const actualTargets = querySortedTargetsForQuarter(2, 2022)
    expect(actualTargets).toStrictEqual([
      { "churnRate": 1, "downgradeRate": 3, "month": 4, "recurringRevenue": 135000, "upgradeRate": 2, "year": 2022 },
      { "churnRate": 1, "downgradeRate": 3, "month": 5, "recurringRevenue": 140000, "upgradeRate": 2, "year": 2022 },
      { "churnRate": 1, "downgradeRate": 3, "month": 6, "recurringRevenue": 145000, "upgradeRate": 2, "year": 2022 }]
    )
  })
  test("should find last target before quarter", () => {
    const actualTarget = queryLastTargetBeforeQuarter(2, 2022)
    expect(actualTarget).toStrictEqual(
      { "churnRate": 1, "downgradeRate": 3, "month": 3, "recurringRevenue": 120000, "upgradeRate": 2, "year": 2022 },
    )
  })
  test("should not find last target before first quarter", () => {
    const actualTargetPreviousYear = queryLastTargetBeforeQuarter(1, 2022)
    expect(actualTargetPreviousYear).toBeUndefined()
  })
  test("should return empty array when there is no matching targets", () => {
    const actualTargets = querySortedTargetsForQuarter(2, 2021)
    expect(actualTargets).toStrictEqual([])
  })
})
