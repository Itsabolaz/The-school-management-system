import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendRecoveryEmail as sendRecoveryEmailApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSendRecoveryEmail() {
  const queryClient = useQueryClient();
  const { mutate: sendRecoveryEmail, isPending: isSending } = useMutation({
    mutationFn: sendRecoveryEmailApi,
    onSuccess: () => {
      toast.success("send login link via email was successfull :)");
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => {
      toast.error("Faild to send login link via email!");
      console.log(err);
    },
  });

  return { sendRecoveryEmail, isSending };
}
