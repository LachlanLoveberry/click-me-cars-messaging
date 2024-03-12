import { Container } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { CSVUpload } from "./CSVUpload";
import { MessageRow } from "./MessageRow";
import { PayeeData } from "./types";

function App() {
  const [payees, listHandlers] = useListState<PayeeData>();

  return (
    <Container mih="100vh">
      <CSVUpload
        onClear={() => listHandlers.setState([])}
        onSuccessfulUpload={listHandlers.setState}
      />
      {payees.map((data, index) => (
        <MessageRow payeeData={data} index={index} />
      ))}
    </Container>
  );
}

export default App;
