export type MonthlyTargetInput = {
  month: number,
  year: number
}
export type QuarterlyTargetInput = {
  quarter: number,
  year: number
}

export type MonthlyTargetOutput = {
  month: number
  year: number
  recurringRevenue: number
  churnRate: number
  downgradeRate: number
  upgradeRate: number
  acquisitionTarget: number
  expansionTarget: number
} | {}

export type QuarterlyTargetOutput = {
  quarter: number
  year: number
  recurringRevenue: number
  churnRate: number
  downgradeRate: number
  upgradeRate: number
  acquisitionTarget: number
  expansionTarget: number
} | {}
