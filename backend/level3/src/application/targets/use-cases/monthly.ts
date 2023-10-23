import {
  queryPreviousMonthTarget,
  queryTargetForMonth
} from "../repository/queries";
import {
  MonthlyTargetOutput,
  MonthlyTargetInput,
} from "../domain/dto";
import { computeAcquisitionTarget } from "./teams/acquisition-target";
import { computeExpansionTarget } from "./teams/expansion-target";

export function monthlyTarget(filters: MonthlyTargetInput): MonthlyTargetOutput {
  const target = queryTargetForMonth(filters.month, filters.year)
  if (!target) return {}
  const previousTarget = queryPreviousMonthTarget(filters.month, filters.year)
  const { churnRate, downgradeRate, upgradeRate, ...additionalTargetFields } = target
  return {
    churnRate: churnRate / 100,
    downgradeRate: downgradeRate / 100,
    upgradeRate: upgradeRate / 100,
    acquisitionTarget: computeAcquisitionTarget(target, previousTarget),
    expansionTarget: computeExpansionTarget(target, previousTarget),
    ...additionalTargetFields,
  }
}
