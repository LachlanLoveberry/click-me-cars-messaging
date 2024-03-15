import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "../sendMessage";

export function useSendMessage() {
  return useMutation({
    mutationFn: sendMessage,
    onSuccess: (data, variables) => {
      const queryKey = ["getMessageHistory", variables.mobile];
    },
  });
}
