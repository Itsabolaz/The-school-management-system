import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUserData } from "../../services/apiAuth";

export function useUpdateUser(){
    const queryClient = useQueryClient()
    const {mutate: updateUser , isPending: isUpdating} = useMutation({
        mutationFn: updateUserData ,
        onSuccess: () => {
            toast.success('User updated successfully')
            queryClient.invalidateQueries({active: true})
        } ,
        onError : (err) => {
            toast.error('User update was not successful')
            console.log("ERROR: " , err.message)
        }
    })

    return {updateUser , isUpdating}
}