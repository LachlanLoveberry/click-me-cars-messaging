export type InvoicesSummary = {
  total: number;
  dueDate?: Date;
};

export type MessageData = {
  toll: InvoicesSummary;
  other: InvoicesSummary;
  subscription: InvoicesSummary;
  grandTotal: string;
  name: string;
};

export interface PayeeMessagingState {
  name: string;
  messageData?: {
    toll: InvoicesSummary;
    other: InvoicesSummary;
    subscription: InvoicesSummary;
    grandTotal: string;
  };
  errors: string[];
  mobile?: string;
}

export interface MessageRowProps {
  name: string;
  messageData: {
    toll: InvoicesSummary;
    other: InvoicesSummary;
    subscription: InvoicesSummary;
    grandTotal: string;
  };
  errors: string[];
  mobile?: string;
  index: number;
}

export type InvoiceRow = {
  "Due Date": string;
  "Invoice Number": string;
  "Invoice Reference": string;
  Total: string;
  Mobile: string;
};
