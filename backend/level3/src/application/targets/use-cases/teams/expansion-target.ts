import { Target } from "../../domain/model";

export function computeExpansionTarget({ downgradeRate, upgradeRate, churnRate }: Pick<Target, 'downgradeRate' | 'upgradeRate' | 'churnRate'>, previousTarget: Pick<Target, 'recurringRevenue'>) {
  const netRetentionRate = 100 - downgradeRate + upgradeRate - churnRate
  return (previousTarget.recurringRevenue / 100) * (100 - netRetentionRate)
}
