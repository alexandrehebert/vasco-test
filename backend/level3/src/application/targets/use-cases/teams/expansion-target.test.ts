import { computeExpansionTarget } from "./expansion-target";

describe("Level 3 / use cases / teams / expansion", () => {
  test('should compute expansion target', () => {
    expect(computeExpansionTarget(
      {
        "churnRate": 1,
        "downgradeRate": 3,
        "upgradeRate": 2,
      },
      {
        "recurringRevenue": 140000,
      }
    )).toStrictEqual(2800)
  })
  test('should compute expansion target even for small revenues', () => {
    expect(computeExpansionTarget(
      {
        "churnRate": 1,
        "downgradeRate": 3,
        "upgradeRate": 2,
      },
      {
        "recurringRevenue": 14,
      }
    )).toStrictEqual(0.28)
  })
})
