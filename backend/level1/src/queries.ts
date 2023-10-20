import targets from '../../data/targets.json'

export function queryTargetsPerMonth(filters: Partial<{
  month: number,
  year: number
}>) {
  const targetsForMonth = targets.filter(({
    month,
    year
  }) => (!filters.month || filters.month === month) && (!filters.year || filters.year === year))
    .map(({ churnRate, downgradeRate, upgradeRate, ...target }) => ({
      churnRate: churnRate / 100,
      downgradeRate: downgradeRate / 100,
      upgradeRate: upgradeRate / 100,
      ...target,
    }))
  if (!targetsForMonth.length) return {}
  if (targetsForMonth.length > 1) throw new Error('found multiple targets for a single month')
  return targetsForMonth.pop()
}
