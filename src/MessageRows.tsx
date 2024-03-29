import { Card, Text, Title } from "@mantine/core";
import { useContext } from "react";
import { MessageRowContext } from "./App";
import { MessagingBox } from "./MessagingBox";

export function MessageRows() {
  const { data } = useContext(MessageRowContext);
  return (
    <>
      {data.map((state, index) => {
        return (
          <Card mb="xl" shadow="md" key={index}>
            <Title order={4} mb="md">
              {state.name}
            </Title>
            {state.errors?.map((error, index) => (
              <Text key={index} mb="xs" c="red" children={error} />
            ))}
            <MessagingBox
              mobile={state.mobile}
              key={index}
              messageData={state.messageData}
              errors={state.errors}
              index={index}
              name={state.name}
            />
          </Card>
        );
      })}
    </>
  );
}
