// Github Copilot
export function isYesterdayOrOlder(date: Date) {
  const now = new Date();
  const yesterday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1,
  );
  return date <= yesterday;
}
