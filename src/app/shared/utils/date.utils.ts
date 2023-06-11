export function getDateDays(date: number): number {
  return date / 24 / 60 / 60 / 1000;
}
export function millisToSeconds(millis: number): number {
  return millis / 1000;
}
export function millisToHours(millis: number): number {
  return millis / 60 / 60 / 1000;
}
