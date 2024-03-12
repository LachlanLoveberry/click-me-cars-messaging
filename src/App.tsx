import { Box, Container, Textarea } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { CSVUpload } from "./CSVUpload";

// TODO: Change format, where to define dates and such and in what format?
export type PayeeData = {
  name?: string;
  tollTotal?: number;
  otherTotal?: number;
  subscriptionTotal?: number;
  daysOverdue?: number;
};

function App() {
  const [payees, listHandlers] = useListState<PayeeData>();
  return (
    <Container mih={"100vh"}>
      <CSVUpload
        onClear={() => listHandlers.setState([])}
        onSuccessfulUpload={listHandlers.setState}
      />
      {payees.map((data, index) => (
        <Box key={index} style={{ marginBottom: 30 }}>
          <Textarea />
        </Box>
      ))}
    </Container>
  );
}

export default App;
