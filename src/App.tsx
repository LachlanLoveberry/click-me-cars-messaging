import { Container } from "@mantine/core";
import { UseListStateHandlers, useListState } from "@mantine/hooks";
import { ReactNode, createContext } from "react";
import { CSVUpload } from "./CSVUpload";
import { MessageRows } from "./MessageRows";
import { PayeeMessagingState } from "./types";

interface MessageRowContextValue {
  data: PayeeMessagingState[];
  handlers: UseListStateHandlers<PayeeMessagingState>;
}

export const MessageRowContext = createContext<MessageRowContextValue>(
  {} as MessageRowContextValue,
);

function MessageRowContextProvider({ children }: { children: ReactNode }) {
  const [data, handlers] = useListState<PayeeMessagingState>([]);

  return (
    <MessageRowContext.Provider value={{ data, handlers }}>
      {children}
    </MessageRowContext.Provider>
  );
}

function App() {
  return (
    <MessageRowContextProvider>
      <Container mih="100vh" maw={720}>
        <CSVUpload />
        <MessageRows />
      </Container>
    </MessageRowContextProvider>
  );
}

export default App;
