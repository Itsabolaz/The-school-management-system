import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editParents as editParentsApi } from "../../services/apiParents";

export function useEditParents(){
    const queryClient = useQueryClient()
    const { mutate: editParents, isPending: isEditting } = useMutation({
        mutationFn: async ({ parentsObj, parentsId }) => {
          const {data , error} = await editParentsApi({ parentsObj, parentsId });

          if(error) throw error;

          return data;
        },
        onSuccess: () => {
          toast.success("Edit the parents was successfull :)");
          queryClient.invalidateQueries({ active: true });
        },
        onError: (error) => {
          toast.error(error.message);
          console.log(error.message);
        },
      });

      return {editParents , isEditting}
}