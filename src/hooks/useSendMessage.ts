import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";
import { sendMessage } from "../sendMessage";

export function useSendMessage() {
  return useMutation({
    mutationFn: sendMessage,
    // @ts-ignore
    onSuccess: (data, variables) => {
      const queryKey = ["getMessageHistory", variables.mobile];
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey });
      }, 10_000);
    },
  });
}
