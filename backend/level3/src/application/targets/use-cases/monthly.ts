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

export function monthlyTarget({ month, year }: MonthlyTargetInput): MonthlyTargetOutput {
  const target = queryTargetForMonth(month, year)
  if (!target) return {}
  const previousTarget = queryPreviousMonthTarget(month, year)
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
