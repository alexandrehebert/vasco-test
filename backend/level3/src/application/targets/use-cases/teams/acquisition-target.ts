import { Target } from "../../domain/model";

export function computeAcquisitionTarget(target: Target, previousTarget: Target) {
  return target.recurringRevenue - previousTarget.recurringRevenue
}
