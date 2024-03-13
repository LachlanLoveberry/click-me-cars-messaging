import { Container } from "@mantine/core";
import { UseListStateHandlers, useListState } from "@mantine/hooks";
import { ReactNode, createContext } from "react";
import { CSVUpload } from "./CSVUpload";
import { MessageRows } from "./MessageRows";
import { MessageRowState } from "./types";

interface MessageRowContextValue {
  data: MessageRowState[];
  handlers: UseListStateHandlers<MessageRowState>;
}

export const MessageRowContext = createContext<MessageRowContextValue>(
  {} as MessageRowContextValue,
);

function MessageRowContextProvider({ children }: { children: ReactNode }) {
  const [data, handlers] = useListState<MessageRowState>([]);

  return (
    <MessageRowContext.Provider value={{ data, handlers }}>
      {children}
    </MessageRowContext.Provider>
  );
}

function App() {
  return (
    <MessageRowContextProvider>
      <Container mih="100vh">
        <CSVUpload />
        <MessageRows />
      </Container>
    </MessageRowContextProvider>
  );
}

export default App;
