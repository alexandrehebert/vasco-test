import {
  findTargetByMonth, findSortedTargetsByQuarter, findLastTargetBeforeQuarter,
} from "./repository";
import type { Target } from './repository'

export function queryTargetPerMonth(...filters: Parameters<typeof findTargetByMonth>): {} | Target {
  const target = findTargetByMonth(...filters)
  if (!target) return {}
  const { churnRate, downgradeRate, upgradeRate, ...additionalTargetFields } = target
  return {
    churnRate: churnRate / 100,
    downgradeRate: downgradeRate / 100,
    upgradeRate: upgradeRate / 100,
    ...additionalTargetFields,
  }
}

function computeQuarterlyRecurringRevenue(quarterTargets: Target[]) {
  return quarterTargets.reduce((acc, { recurringRevenue }) => acc + recurringRevenue, 0) / 3
}

function computeQuarterlyAmountForRate(rate: "churnRate" | "downgradeRate" | "upgradeRate", quarterTargets: Target[], accumulator = 0) {
  if (quarterTargets.length < 2) return accumulator
  const [lastTarget, currentTarget] = quarterTargets
  const currentRate = currentTarget[rate]
  return computeQuarterlyAmountForRate(rate, quarterTargets.slice(1), accumulator + (lastTarget.recurringRevenue * currentRate / 100))
}

export function queryTargetPerQuarter(filters: {
  quarter: number,
  year: number
}): {} | Target {
  const lastTargetBeforeQuarter = findLastTargetBeforeQuarter(filters) || {
    recurringRevenue: 100000,
  }
  const targets = findSortedTargetsByQuarter(filters)
  const targetsWithLast = [lastTargetBeforeQuarter, ...targets]
  if (!targets.length) return {}

  const averageQuarterlyRecurringRevenue = computeQuarterlyRecurringRevenue(targets)

  const churnQuarterlyAmount = computeQuarterlyAmountForRate('churnRate', targetsWithLast)
  const churnQuarterlyRate = churnQuarterlyAmount / averageQuarterlyRecurringRevenue

  const upgradeQuarterlyAmount = computeQuarterlyAmountForRate('upgradeRate', targetsWithLast)
  const upgradeQuarterlyRate = upgradeQuarterlyAmount / averageQuarterlyRecurringRevenue

  const downgradeQuarterlyAmount = computeQuarterlyAmountForRate('downgradeRate', targetsWithLast)
  const downgradeQuarterlyRate = downgradeQuarterlyAmount / averageQuarterlyRecurringRevenue

  function roundTo3Decimals(rate: number) {
    return Math.round(rate * 1000) / 1000
  }

  return {
    recurringRevenue: targets[targets.length - 1].recurringRevenue,
    churnRate: roundTo3Decimals(churnQuarterlyRate),
    downgradeRate: roundTo3Decimals(downgradeQuarterlyRate),
    upgradeRate: roundTo3Decimals(upgradeQuarterlyRate),
    ...filters,
  }
}
