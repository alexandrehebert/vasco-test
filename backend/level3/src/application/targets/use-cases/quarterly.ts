import {
  querySortedTargetsForQuarter, queryLastTargetBeforeQuarter,
} from "../repository/queries";
import { QuarterlyTargetInput, QuarterlyTargetOutput } from "../domain/dto";
import { Target } from "../domain/model";
import { computeAcquisitionTarget } from "./teams/acquisition-target";
import { computeExpansionTarget } from "./teams/expansion-target";
import { roundTo3Decimals } from "../../../utils/number";

function computeQuarterlyRecurringRevenue(quarterTargets: Target[]) {
  return quarterTargets.reduce((acc, { recurringRevenue }) => acc + recurringRevenue, 0) / 3
}

function computeQuarterlyAmountForRate(rate: "churnRate" | "downgradeRate" | "upgradeRate", quarterTargets: Target[], amountAccumulator = 0) {
  if (quarterTargets.length < 2) return amountAccumulator
  const [lastTarget, currentTarget] = quarterTargets
  const currentRate = currentTarget[rate]
  return computeQuarterlyAmountForRate(rate, quarterTargets.slice(1), amountAccumulator + (lastTarget.recurringRevenue * currentRate / 100))
}

function computeQuarterlyRate(rate: "churnRate" | "downgradeRate" | "upgradeRate", quarterTargets: Target[], recurringRevenue: number) {
  return computeQuarterlyAmountForRate(rate, quarterTargets) / recurringRevenue
}

export function quarterlyTarget(filters: QuarterlyTargetInput): QuarterlyTargetOutput {
  const lastTargetBeforeQuarter = queryLastTargetBeforeQuarter(filters.quarter, filters.year) || {
    recurringRevenue: 100000,
  }
  const targets = querySortedTargetsForQuarter(filters.quarter, filters.year)
  const targetsWithLast = [lastTargetBeforeQuarter, ...targets]
  if (!targets.length) return {}

  const averageQuarterlyRecurringRevenue = computeQuarterlyRecurringRevenue(targets)
  const churnQuarterlyRate = computeQuarterlyRate('churnRate', targetsWithLast, averageQuarterlyRecurringRevenue)
  const upgradeQuarterlyRate = computeQuarterlyRate('upgradeRate', targetsWithLast, averageQuarterlyRecurringRevenue)
  const downgradeQuarterlyRate = computeQuarterlyRate('downgradeRate', targetsWithLast, averageQuarterlyRecurringRevenue)
  const acquisitionTarget = targets
    .map((target, i) => computeAcquisitionTarget(target, i ? targets[i - 1] : lastTargetBeforeQuarter))
    .reduce((acc, monthAcquisitionTarget) => acc + monthAcquisitionTarget, 0)
  const expansionTarget = targets
    .map((target, i) => computeExpansionTarget(target, i ? targets[i - 1] : lastTargetBeforeQuarter))
    .reduce((acc, monthAcquisitionTarget) => acc + monthAcquisitionTarget, 0)

  return {
    recurringRevenue: targets[targets.length - 1].recurringRevenue,
    churnRate: roundTo3Decimals(churnQuarterlyRate),
    downgradeRate: roundTo3Decimals(downgradeQuarterlyRate),
    upgradeRate: roundTo3Decimals(upgradeQuarterlyRate),
    acquisitionTarget,
    expansionTarget,
    ...filters
  }
}
