import Decimal from "decimal.js";
import { InvoiceRow, InvoicesSummary, PayeeMessagingState } from "./types";
import { getTotal } from "./utils/getTotal";
import { isYesterdayOrOlder } from "./utils/isYesterdayOrOlder";

const isToll = (data: InvoiceRow) => {
  const ref = data["Invoice Reference"].toLowerCase();

  return ref.includes("toll") || ref.includes("infringement");
};
const isOtherDue = (data: InvoiceRow) => {
  const ref = data["Invoice Reference"].toLowerCase().replace(/\s/g, "");
  return (
    ref.includes("dc") ||
    ref.includes("damagecover") ||
    ref.includes("makegood") ||
    ref.includes("mg")
  );
};

const isOtherIgnore = (data: InvoiceRow) => {
  // @ts-ignore
  const ref = data["Invoice Reference"].toLowerCase().replace(/\s/g, "");
  return false;
};

const isSubscription = (data: InvoiceRow) => {
  const ref = data["Invoice Reference"];
  const regrex = /\b[A-Za-z]{1,2} \d{1,2}-\d{1,2}\b/g;
  const tested = regrex.test(ref);
  return tested;
};

function calculateMessage(
  group: InvoiceRow[],
  name: string,
): PayeeMessagingState {
  const errors: string[] = [];
  const ppo = !!group.find((row) =>
    row["Invoice Reference"].toLowerCase().includes("ppo"),
  );
  const ppt = !!group.find((row) =>
    row["Invoice Reference"].toLowerCase().includes("ppt"),
  );
  const toll: InvoicesSummary = { total: 0 };
  const other: InvoicesSummary = { total: 0 };
  const subscription: InvoicesSummary = { total: 0 };

  let mobile = group.find((invoice) => invoice.Phone)?.Phone;
  mobile = mobile
    ?.replace(/australia/gi, "")
    .replace(/\s/g, "")
    .replace(/\+/g, "");

  group.forEach((invoice) => {
    const due = new Date(invoice["Due Date"]);

    const total = getTotal(invoice.Total);

    const dueIsValidDate = !isNaN(due.getTime());
    if (!dueIsValidDate) {
      errors.push(
        `${invoice["Invoice Number"]} - could not process the due date`,
      );
      return;
    }
    if (!total) {
      errors.push(`${invoice["Invoice Number"]} - could not process the total`);
      return;
    }

    const isOverdue = isYesterdayOrOlder(due);
    if (isOverdue) {
      if (isToll(invoice)) {
        if (!ppt) {
          toll.total += total;
          if (toll.dueDate) toll.dueDate = undefined;
          else toll.dueDate = due;
        }
      } else if (isOtherDue(invoice)) {
        if (!ppo) {
          other.total += total;
          if (other.dueDate) other.dueDate = undefined;
          else other.dueDate = due;
        }
      } else if (isSubscription(invoice)) {
        subscription.total += total;
        if (!subscription.dueDate || due < subscription.dueDate)
          subscription.dueDate = due;
      } else if (isOtherIgnore(invoice)) {
      } else {
        errors.push(
          `${
            invoice["Invoice Number"] || invoice["Invoice Reference"]
          } - overdue but not recognised as a toll, subscription or other invoice.`,
        );
      }
    }
  });

  const subscriptionIsOverdue =
    subscription.dueDate && isYesterdayOrOlder(subscription.dueDate);

  const grandTotal = new Decimal(toll.total)
    .plus(other.total)
    .plus(subscription.total)
    .toNumber();
  if (!subscriptionIsOverdue && grandTotal > 0)
    errors.push("Invoice(s) overdue but subscription is not");
  if (grandTotal) {
    return {
      name,
      mobile,
      errors,
      messageData: {
        toll: { total: toll.total.toFixed(2), dueDate: toll.dueDate },
        other: { total: other.total.toFixed(2), dueDate: other.dueDate },
        subscription: {
          total: subscription.total.toFixed(2),
          dueDate: subscription.dueDate,
        },
        grandTotal: grandTotal.toFixed(2),
      },
    };
  } else
    return {
      name,
      mobile,
      errors,
    };
}

export function getPayeesData(
  invoiceRows: InvoiceRow[],
): PayeeMessagingState[] {
  const groups: PayeeMessagingState[] = [];
  let currentGroup: InvoiceRow[] = [];

  invoiceRows.forEach((row) => {
    const endOfRow =
      row["Due Date"].includes("Total ") &&
      row["Invoice Number"] === "" &&
      row["Invoice Reference"] === "";

    if (endOfRow) {
      const name = row["Due Date"].split("Total ")[1];
      const res = calculateMessage(currentGroup, name);
      groups.push(res);
      currentGroup = [];
      return;
    }
    currentGroup.push(row);
  });

  return groups;
}
