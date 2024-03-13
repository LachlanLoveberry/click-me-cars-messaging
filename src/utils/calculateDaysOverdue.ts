export function calculateDaysOverdue(dueDate: Date): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0); // set the current time to the start of the day
  dueDate.setHours(0, 0, 0, 0); // set the due date time to the start of the day

  const diffInMs = Math.abs(now.getTime() - dueDate.getTime());
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  return diffInDays;
}
