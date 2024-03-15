export function formatDateWithoutYear(date: Date): string {
  return date.toLocaleDateString(undefined, { month: "long", day: "numeric" });
}
