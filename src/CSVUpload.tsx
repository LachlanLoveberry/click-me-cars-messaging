import { FileInput } from "@mantine/core";
import "@mantine/core/styles.css";
import { useEffect, useState } from "react";
import { usePapaParse } from "react-papaparse";
import { PayeeData } from "./types";

type InvoiceRow = {
  "Due Date": string;
  "Invoice Number": string;
  "Invoice Reference": string;
  Total: string;
};

type InvoiceData = {
  due: Date;
  id: string;
  ref: string;
  total: number;
};

function removeRedundant(text: string) {
  var lines = text.split("\r\n");

  // Remove the first 6 lines
  lines = lines.slice(6);

  // Remove the cells at index 3-8 from each line
  lines = lines.map((line) => {
    const cells = line.split(",");
    return cells.slice(0, 3).concat(cells.slice(9)).join(",");
  });

  // Filter any lines that are just commas
  lines = lines.filter((line) => !line.endsWith(",,,"));

  // Join the remaining lines back into a string
  return lines.join("\n");
}

const isToll = (data: InvoiceData) => data.ref.toLowerCase().includes("toll");
const isOther = (data: InvoiceData) => data.ref.toLowerCase().includes("toll");

function calculatePayeeData(group: InvoiceData[], name?: string): PayeeData {
  const ppo = group.some((invoice) => invoice.ref.includes("PPO"));
  const ppt = group.some((invoice) => invoice.ref.includes("PPT"));
  var tollTotal = 0;
  var otherTotal = 0;
  if (!ppt)
    group.filter(isToll).forEach((invoice) => (tollTotal += invoice.total));
  if (!ppo)
    group.filter(isOther).forEach((invoice) => (tollTotal += invoice.total));
  const subscriptionTotal =
    group.find((invoice) => invoice.ref.toLowerCase().includes("SB"))?.total ??
    0;

  return {
    name,
    tollTotal,
    otherTotal,
    subscriptionTotal,
  };
}

function getPayeesData(invoiceRows: InvoiceRow[]): PayeeData[] {
  const groups: PayeeData[] = [];
  let currentGroup: InvoiceData[] = [];

  invoiceRows.forEach((row, index) => {
    if (index === 0) return;
    const endOfRow = row["Due Date"].includes("^");

    if (endOfRow) {
      // get all text after carrot on due date
      const name = row["Due Date"].split("^")[1];
      const payeeData = calculatePayeeData(currentGroup, name);
      groups.push(payeeData);
      currentGroup = [];
      return;
    }

    const invoiceData: InvoiceData = {
      due: new Date(row["Due Date"]) ?? "",
      id: row["Invoice Number"],
      ref: row["Invoice Reference"],
      total: parseFloat(row.Total),
    };

    currentGroup.push(invoiceData);
  });

  return groups;
}

type CSVUploadProps = {
  onSuccessfulUpload: (data: PayeeData[]) => void;
  onClear: () => void;
};

export function CSVUpload({ onSuccessfulUpload, onClear }: CSVUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<React.ReactNode | null>(null);
  const { readString } = usePapaParse();

  useEffect(() => {
    if (file) {
      async function parseCSV() {
        const text = await file?.text();

        if (text) {
          const newText = removeRedundant(text);
          const parsed = readString<InvoiceRow[]>(newText, {
            header: true,
            complete: () => {},
          });
          if (error) setError(error);
          else setError(null);
          // @ts-ignore
          const payeesData = getPayeesData(parsed.data.slice(6));
          onSuccessfulUpload(payeesData);
        }
      }
      parseCSV();
    } else onClear();
  }, [file]);

  return (
    <FileInput
      label="Upload Spreadsheet (.csv only)"
      accept="text/csv"
      value={file}
      onChange={setFile}
      clearable
      error={error}
      placeholder="No file selected"
    />
  );
}
