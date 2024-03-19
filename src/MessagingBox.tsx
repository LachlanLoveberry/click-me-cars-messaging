import { Button, Flex, Group, Text, Textarea } from "@mantine/core";
import { useDisclosure, useInterval } from "@mantine/hooks";
import { useState } from "react";
import { MessageHistoryPopup } from "./MessageHisoryPopup";
import { draftMessage } from "./draftMessage";
import { useSendMessage } from "./hooks/useSendMessage";
import { MessageRowProps } from "./types";

export function MessagingBox({
  index,
  messageData,
  mobile,
  name,
}: MessageRowProps) {
  const [message, setMessage] = useState<string>(
    draftMessage({ ...messageData, name }),
  );
  const { mutate, error } = useSendMessage();
  const { start, stop, active } = useInterval(() => {
    mutate({ message, mobile: mobile! });
    stop();
  }, 10_000);
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      <MessageHistoryPopup
        opened={opened}
        name={name}
        mobile={mobile!}
        onClose={close}
      />
      <Group key={index} justify="space-between">
        <Textarea
          error={error ? <Text children={error.message} /> : null}
          autosize
          w="75%"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Flex direction="column" gap="sm">
          {mobile && (
            <>
              <Button
                children="See Messages"
                variant="outline"
                onClick={open}
              />
              <Button children="Send" loading={active} onClick={start} />
            </>
          )}
          {active && (
            <Text onClick={stop} c="blue" td="underline" children="Undo" />
          )}
        </Flex>
      </Group>
    </>
  );
}
