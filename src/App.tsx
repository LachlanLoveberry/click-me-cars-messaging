import { parse } from "csv-parse/sync";
import { useEffect, useState } from "react";
import "./App.css";

const useUploadCSV = (file: File | null) => {
  return useEffect(() => {
    if (file) {
      const input = file?.text();
      const records = parse(input, {
        columns: true,
        skip_empty_lines: true,
      });
      console.log(records);
    }
  }, [file]);
};

function App() {
  const [value, setValue] = useState<File | null>(null);
  useUploadCSV(value);

  return (
    <div>gaerae</div>
    // <Container>
    //   eahbaerhb
    //   <FileInput value={value} onChange={setValue} accept="csv" clearable />
    // </Container>
  );
}

export default App;
