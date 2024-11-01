import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignUp() {
  const navigate = useNavigate();
  const { mutate: signup, isPending: isSigningUp } = useMutation({
    mutationFn: async ({ email, password, userName }) => {
      const {data , error} = await signupApi({ email, password, userName });

      if(error) throw error;

      return data
    },
    onSuccess: () => {
      toast.success("Sign up was successful.");
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err);
    },
  });

  return { signup, isSigningUp };
}
