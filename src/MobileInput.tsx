import {
  Box,
  Input,
  InputProps,
  PolymorphicComponentProps,
} from "@mantine/core";
import { IMaskInput } from "react-imask";

export function MobileInput(
  props: PolymorphicComponentProps<typeof IMaskInput, InputProps>,
) {
  return (
    <Box>
      <Input.Label>Mobile Number</Input.Label>
      <Input
        component={IMaskInput}
        mask="+61000 000 000"
        placeholder="Your phone"
        {...props}
      />
    </Box>
  );
}
