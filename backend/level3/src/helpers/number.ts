
export function roundTo(rate: number, decimals = 3) {
  return Math.round(rate * (10 ** decimals)) / (10 ** decimals)
}
