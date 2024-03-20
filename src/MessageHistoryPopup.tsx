import {
  Box,
  Center,
  Flex,
  Loader,
  Modal,
  ModalProps,
  Text,
} from "@mantine/core";
import { useMessageHistory } from "./hooks/useMessageHistory";

interface MessageHistoryPopup extends ModalProps {
  name: string;
  mobile: string;
}

export function MessageHistoryPopup({
  name,
  mobile,
  ...rest
}: MessageHistoryPopup) {
  const { data, isLoading, error } = useMessageHistory(mobile);

  return (
    <Modal title={`Message history with ${name}`} {...rest}>
      {error && <Text c="red">{error.message}</Text>}
      <Center h={96}>{isLoading && <Loader />}</Center>
      {data && (
        <Flex direction="column" gap="md">
          {data.data.map((message, index) => (
            <Box
              key={index}
              style={{
                backgroundColor:
                  message.direction === "outgoing" ? "lightgray" : "lightblue",
                overflow: "hidden",
                padding: 12,
                borderRadius: 12,
                alignSelf:
                  message.direction === "outgoing" ? "flex-start" : "flex-end",
              }}
            >
              <Text>{message.sms_info.body.replace(/\\'/g, "'")}</Text>
              <Text size="xs" c="gray">
                {message.sms_date}
              </Text>
            </Box>
          ))}
        </Flex>
      )}
    </Modal>
  );
}
