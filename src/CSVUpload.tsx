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
  const [errors, setErrors] = useState<Error[]>([]);
  const { readString } = usePapaParse();
  const { handlers } = useContext(MessageRowContext);

  // Handle Submit
  useEffect(() => {
    if (file) {
      async function parseCSV() {
        try {
          const text = await file?.text();
          if (text) {
            const newText = removeRedundantRows(text);
            readString<InvoiceRow>(newText, {
              header: true,
              comments: "#",
              skipEmptyLines: true,
              complete: ({ data, errors }) => {
                if (errors?.length) setErrors(errors);
                else {
                  setErrors([]);
                  const necessaryFields = data.map((invoice) => ({
                    "Due Date": invoice["Due Date"],
                    "Invoice Number": invoice["Invoice Number"],
                    "Invoice Reference": invoice["Invoice Reference"],
                    Total: invoice["Total"],
                    Phone: invoice["Phone"],
                  }));
                  const payeesData = getPayeesData(necessaryFields);
                  const sortedPayeesData = payeesData.sort((a, b) =>
                    a.name.localeCompare(b.name),
                  );
                  const filteredPayeesData = sortedPayeesData.filter(
                    ({ messageData, errors }) => messageData || errors.length,
                  );
                  handlers.setState(filteredPayeesData);
                }
              },
            });
          }
        } catch (error) {
          setErrors((err) => [...err, error as Error]);
        }
      }
      parseCSV();
    } else handlers.setState([]);
  }, [file]);

  return (
    <FileInput
      mt="xl"
      mb="xl"
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
