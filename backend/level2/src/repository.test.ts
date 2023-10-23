import {
  findLastTargetBeforeQuarter,
  findSortedTargetsByQuarter
} from "./repository";

describe("Level 1/repository", () => {
  test("should find targets by quarter", () => {
    const actualTargets = findSortedTargetsByQuarter({
      quarter: 2,
      year: 2022,
    })
    expect(actualTargets).toStrictEqual([
      { "churnRate": 1, "downgradeRate": 3, "month": 4, "recurringRevenue": 135000, "upgradeRate": 2, "year": 2022 },
      { "churnRate": 1, "downgradeRate": 3, "month": 5, "recurringRevenue": 140000, "upgradeRate": 2, "year": 2022 },
      { "churnRate": 1, "downgradeRate": 3, "month": 6, "recurringRevenue": 145000, "upgradeRate": 2, "year": 2022 }]
    )
  })
  test("should find last target before quarter", () => {
    const actualTarget = findLastTargetBeforeQuarter({
      quarter: 2,
      year: 2022,
    })
    expect(actualTarget).toStrictEqual(
      { "churnRate": 1, "downgradeRate": 3, "month": 3, "recurringRevenue": 120000, "upgradeRate": 2, "year": 2022 },
    )
  })
  test("should find last target before first quarter", () => {
    const actualTargetPreviousYear = findLastTargetBeforeQuarter({
      quarter: 1,
      year: 2022,
    })
    expect(actualTargetPreviousYear).toStrictEqual(
      { "year": 2021, "month": 12, "recurringRevenue": 100000 },
    )
  })
  test("should return empty array when there is no matching targets", () => {
    const actualTargets = findSortedTargetsByQuarter({
      quarter: 2,
      year: 2021,
    })
    expect(actualTargets).toStrictEqual([])
  })
})
