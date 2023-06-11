export function getDateDays(date: number): number {
  return date / 24 / 60 / 60 / 1000;
}
export function getDateSeconds(date: number): number {
  return date / 1000;
}
