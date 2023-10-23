import targets from '../../data/targets.json'

export type Target = typeof targets[0]

export function findTargetByMonth(filters: {
  month: number,
  year: number
}): Target {
  const [targetByMonth, ...moreTargets] = targets.filter(({ month, year }) => filters.month === month && filters.year === year)
  if (moreTargets.length) throw new Error('found multiple targets for a single month')
  return targetByMonth
}

export function findSortedTargetsByQuarter(filters: {
  quarter: number,
  year: number
}): Target[] {
  const targetsByQuarter = targets.filter(({ month, year }) => {
    return (Math.ceil(month / 3) === filters.quarter && filters.year === year)
  })
  if (targetsByQuarter.length > 3) throw new Error('unexpected number of months in the quarter')
  return targetsByQuarter.sort((m1, m2) => m1.month - m2.month)
}

export function findLastTargetBeforeQuarter({ quarter, year }: {
  quarter: number,
  year: number
}): Target {
  const lastMonthPreviousQuarter = { year: year - 1, month: 12 }
  if (quarter === 1) return findTargetByMonth(lastMonthPreviousQuarter) || {
    recurringRevenue: 100000,
    ...lastMonthPreviousQuarter,
  }
  return findTargetByMonth({ year, month: (quarter * 3) - 3 })
}
