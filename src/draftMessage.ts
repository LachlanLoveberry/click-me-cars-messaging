import { MessageData } from "./types";
import { calculateDaysOverdue } from "./utils/calculateDaysOverdue";
import { formatDateWithoutYear } from "./utils/formatDate";

const map = {
  debt1: ({ other, name, subscription, toll, grandTotal }: MessageData) => {
    return `Hi ${name},

This is a friendly reminder that a payment of $${grandTotal} is now overdue.
    
${
  subscription.total &&
  `$${subscription.total} due ${
    subscription.dueDate && "on " + formatDateWithoutYear(subscription.dueDate)
  } for subscription.\n`
}${
      toll.total
        ? `\n$${toll.total} due ${
            toll.dueDate
              ? `on ${formatDateWithoutYear(toll.dueDate)} for toll`
              : "for tolls"
          }.\n`
        : ""
    }${
      other.total
        ? `\n$${other.total} due ${
            other.dueDate
              ? `on ${formatDateWithoutYear(
                  other.dueDate,
                )} for other due amount`
              : "for other due amounts"
          }.\n`
        : ""
    }
If you have already made payment and it simply has not reached our bank, thank you.
    
ClickMe Cars`;
  },

  debt2: ({ grandTotal }: MessageData) => `Your account is now overdue.

Payment required: $${grandTotal}

If payment is not received today, we may charge you a $30 late payment fee and require you to return the car.

The Damage Cover no longer applies when your account is overdue. You now have full accident liability until your payment is caught up.

Please contact us if you need to discuss your account.

ClickMe Cars`,

  debt3A: ({ grandTotal }: MessageData) => `URGENT:

Due to non-payment, you must return the car to our office by 2pm (next day).

Please contact us to organise a return time. The car must be clean and refuelled.

We can hold the car for up to 7 days for you.

Car return can be avoided by immediate payment of $${grandTotal}

ClickMe Cars
10 Northey Street, Windsor`,

  debt3R: ({ grandTotal }: MessageData) => `REMINDER:

Car return is required by 2pm today due to overdue subscription.

Car return can be avoided by immediate payment of $${grandTotal}

Would you please confirm what time you will be returning the car today?

ClickMe Cars`,
  debt4: ({ name }: MessageData) => `Dear ${name},

As payment has not been made and the car has not been returned to our office, we have now been directed to report the car stolen and provide your details to the police.

This is not something we do lightly as we know a stolen vehicle charge carries a 7 year jail term.

Would you please contact us urgently?

Thanks
ClickMe Cars`,
};

export function draftMessage(data: MessageData): string {
  const daysOverdue = data.subscription.dueDate
    ? calculateDaysOverdue(data.subscription.dueDate)
    : 1;

  if (!data.subscription.dueDate) return "";
  if (daysOverdue === 1) return map.debt1(data);
  if (daysOverdue === 2) return map.debt2(data);
  if (daysOverdue === 3) return map.debt3A(data);
  if (daysOverdue === 4) return map.debt3R(data);
  if (daysOverdue >= 5) return map.debt4(data);
  else return "";
}
