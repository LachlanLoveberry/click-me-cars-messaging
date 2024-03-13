export type InvoicesSummary = {
  total: number;
  dueDate?: Date;
};

export type MessageData = {
  name: string;
  mobile: string;
  toll: InvoicesSummary;
  other: InvoicesSummary;
  subscription: InvoicesSummary;
};

export type MessageRowProps = {
  messageData: MessageData;
  errors?: string[];
  index: number;
};

export type PayeeMessagingState = {
  messageData: MessageData | { name: string };
  errors?: string[];
};

export type InvoiceRow = {
  "Due Date": string;
  "Invoice Number": string;
  "Invoice Reference": string;
  Total: string;
  Mobile: string;
};
