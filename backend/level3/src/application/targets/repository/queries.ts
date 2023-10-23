import targets from '../../../../../data/targets.json'
import { Target } from "../domain/model";

export function queryTargetForMonth(month: number, year: number): Target {
  const [targetByMonth, ...moreTargets] = targets.filter(target => target.month === month && target.year === year)
  if (moreTargets.length) throw new Error('found multiple targets for a single month')
  return targetByMonth
}

export function querySortedTargetsForQuarter(quarter: number, year: number): Target[] {
  const targetsByQuarter = targets.filter(target => {
    return (Math.ceil(target.month / 3) === quarter && target.year === year)
  })
  if (targetsByQuarter.length > 3) throw new Error('unexpected number of months in the quarter')
  return targetsByQuarter.sort((m1, m2) => m1.month - m2.month)
}

export function queryLastTargetBeforeQuarter(quarter: number, year: number): Target {
  if (quarter === 1) {
    return queryTargetForMonth(12, year - 1)
  }
  return queryTargetForMonth((quarter * 3) - 3, year)
}

export function queryPreviousMonthTarget(month: number, year: number): Target {
  if (month === 1) {
    return queryTargetForMonth(12, year - 1)
  }
  return queryTargetForMonth(month - 1, year)
}
