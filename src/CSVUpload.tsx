import { FileInput, Text } from "@mantine/core";
import "@mantine/core/styles.css";
import { useContext, useEffect, useState } from "react";
import { usePapaParse } from "react-papaparse";
import { MessageRowContext } from "./App";
import { getPayeesData } from "./getPayeeData";
import { removeRedundantRows } from "./removeRedundantRows";
import { InvoiceRow } from "./types";

type CSVUploadProps = {};

export function CSVUpload({}: CSVUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Omit<Error, "name">[]>([]);
  const { readString } = usePapaParse();
  const { handlers } = useContext(MessageRowContext);

  // Handle Submit
  useEffect(() => {
    if (file) {
      async function parseCSV() {
        const text = await file?.text();
        if (text) {
          const newText = removeRedundantRows(text);
          readString<InvoiceRow>(newText, {
            header: true,
            complete: ({ data, errors }) => {
              if (errors?.length) setErrors(errors);
              else {
                setErrors([]);
                const necessaryFields = data.map((invoice) => ({
                  "Due Date": invoice["Due Date"],
                  "Invoice Number": invoice["Invoice Number"],
                  "Invoice Reference": invoice["Invoice Reference"],
                  Total: invoice["Total"],
                  Mobile: invoice["Mobile"],
                }));
                const payeesData = getPayeesData(necessaryFields);
                handlers.setState(payeesData);
              }
            },
          });
        }
      }
      parseCSV();
    } else handlers.setState([]);
  }, [file]);

  useEffect(() => {
    if (errors) console.error(errors);
  }, [errors]);

  return (
    <FileInput
      label="Upload Spreadsheet (.csv only)"
      placeholder="No file selected"
      accept="text/csv"
      value={file}
      onChange={setFile}
      error={
        errors.length
          ? errors.map(({ message }) => <Text c="red" children={message} />)
          : null
      }
      clearable
    />
  );
}
