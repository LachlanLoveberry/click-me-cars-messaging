export function calculateDaysOverdue(dueDate: Date): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0); // set the current time to the start of the day
  dueDate.setHours(0, 0, 0, 0); // set the due date time to the start of the day

  let diffInDays = 0;
  for (let d = new Date(dueDate); d <= now; d.setDate(d.getDate() + 1)) {
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      // 0 is Sunday, 6 is Saturday
      diffInDays++;
    }
  }

  return diffInDays - 1;
}
