import { useMutation } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success("Log out was successfull :)");
      navigate("/login", { replace: true });
    },
    onError : (err) => {
        toast.error('Logout was not successful');
        console.log('Error' , err)
    }
  });

  return {logout , isLoggingOut}
}
