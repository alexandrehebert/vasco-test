import {
  querySortedTargetsForQuarter, queryLastTargetBeforeQuarter,
} from "../repository/queries";
import { QuarterlyTargetInput, QuarterlyTargetOutput } from "../domain/dto";
import { Target } from "../domain/model";
import { computeAcquisitionTarget } from "./teams/acquisition-target";
import { computeExpansionTarget } from "./teams/expansion-target";
import { roundTo } from "../../../utils/number";

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

export function quarterlyTarget({
  quarter,
  year
}: QuarterlyTargetInput): QuarterlyTargetOutput {
  const lastTargetBeforeQuarter = queryLastTargetBeforeQuarter(quarter, year) || {
    recurringRevenue: 100000,
  }
  const targets = querySortedTargetsForQuarter(quarter, year)
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
    churnRate: roundTo(churnQuarterlyRate, 3),
    downgradeRate: roundTo(downgradeQuarterlyRate, 3),
    upgradeRate: roundTo(upgradeQuarterlyRate, 3),
    acquisitionTarget,
    expansionTarget,
    year,
    quarter
  }
}
