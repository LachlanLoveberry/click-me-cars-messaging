import { Center, Loader, Modal, ModalProps } from "@mantine/core";
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
  const { data, isLoading, status, error } = useMessageHistory(mobile);
  console.log(data);

  return (
    <Modal title={`Message history with ${name}`} {...rest}>
      <Center>{isLoading && <Loader />}</Center>
    </Modal>
  );
}
