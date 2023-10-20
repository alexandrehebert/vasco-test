import * as targets from '../../data/targets.json'

export function findTargetsPerMonth({ month, year }: Partial<{ month: number, year: number }>) {
  console.log(month, year)
  return targets
}
