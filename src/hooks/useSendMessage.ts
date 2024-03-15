import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "../sendMessage";

export function useSendMessage() {
  return useMutation({
    mutationFn: sendMessage,
    // @ts-ignore
    onSuccess: (data, variables) => {
      // @ts-ignore
      const queryKey = ["getMessageHistory", variables.mobile];
    },
  });
}
