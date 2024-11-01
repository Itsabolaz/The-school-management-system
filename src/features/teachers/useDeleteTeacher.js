import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteTeacher as deleteTeacherApi } from "../../services/apiTeachers";

export function useDeleteTeacher(){
    const queryClient = useQueryClient()
    const {mutate: deleteTeacher , isPending: isDeleting} = useMutation({
        mutationFn: async (teacherId) => {
          const {data , error} = await deleteTeacherApi(teacherId);

          if(error) throw error;

          return data
        }, 
        onSuccess: () => {
            toast.success("The teacher was successfully deleted :)");
            queryClient.invalidateQueries({ queryKey: ["teachers"] });
          },
          onError: (error) => {
            toast.error(error.message);
            console.log(error.message)
          },
    })

    return {deleteTeacher , isDeleting}
}