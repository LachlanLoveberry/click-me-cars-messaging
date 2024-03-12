import { Box, Button, Textarea } from "@mantine/core";
import { draftMessage } from "./draftMessage";
import { PayeeData } from "./types";

export type MessageRowProps = {
  payeeData: PayeeData;
  index: number;
};
export function MessageRow({
  index,
  payeeData,
}: React.ComponentProps<typeof Box> & MessageRowProps) {
  return (
    <Box key={index} mb="xl">
      <Textarea children={draftMessage(payeeData)} />
      <Button children={"Send"} onClick={() => setTimeout(() => {}, 30_000)} />
    </Box>
  );
}
