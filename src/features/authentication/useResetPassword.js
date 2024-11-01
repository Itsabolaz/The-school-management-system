import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { resetPassword as resetPasswordApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useResetPassword() {
  const navigate = useNavigate();
  const { mutate: resetPassword, isPending: isResetting } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      toast.success("Password successfully reset :)");
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      toast.error("Faild to reset password!");
      console.log("RESET PASS ERROR: ", err);
    },
  });

  return { resetPassword, isResetting };
}