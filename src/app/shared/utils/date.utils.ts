export function getDateDays(date: number): number {
  return date / 24 / 60 / 60 / 1000;
}
export function getDateHours(date: number): number {
  return date / 60 / 60 / 1000;
}
