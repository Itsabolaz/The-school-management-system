import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: login,
    isPending: isLoggingIn,
  } = useMutation({
    mutationFn: async ({ email, password }) => {
      const { data, error } = await loginApi({ email, password });

      if (error) throw error;

      return data;
    },
    onSuccess: async (user) => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      queryClient.setQueryData(["user", user.user]);
      toast.success("Login was successfull");
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isLoggingIn, login };
}
