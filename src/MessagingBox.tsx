import { Button, Flex, Group, Text, Textarea } from "@mantine/core";
import { useDisclosure, useInterval } from "@mantine/hooks";
import { useState } from "react";
import { MessageHistoryPopup } from "./MessageHisoryPopup";
import { MobileInput } from "./MobileInput";
import { draftMessage } from "./draftMessage";
import { useSendMessage } from "./hooks/useSendMessage";
import { MessageRowProps } from "./types";

export function MessagingBox({
  index,
  messageData,
  mobile: initialMobile,
  name,
}: MessageRowProps) {
  const [message, setMessage] = useState<string>(
    draftMessage({ ...messageData, name }),
  );
  const { mutate, error } = useSendMessage();
  const { start, stop, active } = useInterval(() => {
    mutate({ message, mobile: mobile!.replace(/\s/g, "") });
    stop();
  }, 10_000);
  const [mobile, setMobile] = useState<string | undefined>(initialMobile);
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      {opened && (
        <MessageHistoryPopup
          opened={opened}
          name={name}
          mobile={mobile!.replace(/\s/g, "")}
          onClose={close}
        />
      )}
      <Group key={index} justify="space-between">
        <Textarea
          error={error ? <Text children={error.message} /> : null}
          autosize
          w="65%"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Flex direction="column" gap="sm">
          <MobileInput
            value={mobile}
            // @ts-ignore
            onChange={(e) => setMobile(e.target.value)}
          />
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
