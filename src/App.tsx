import { useEffect, useState } from "react";
import "./App.css";

const useUploadCSV = (file: File | null) => {
  return useEffect(() => {
    if (file) {
      const records = [];
      console.log(records);
    }
  }, [file]);
};

function App() {
  const [value, setValue] = useState<File | null>(null);
  useUploadCSV(value);

  return (
    <Container>
      eahbaerhb
      <FileInput value={value} onChange={setValue} accept="csv" clearable />
    </Container>
  );
}

export default App;
