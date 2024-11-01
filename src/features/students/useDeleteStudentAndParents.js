import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStudentAndParents as deleteStudentAndParentsApi } from "../../services/apiStudents";
import toast from "react-hot-toast";

export function useDeleteStudentAndParents() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteStudentAndParents } =
    useMutation({
      mutationFn: async (studentId) => {
        const {data , error}= await deleteStudentAndParentsApi(studentId)

        if(error) throw error;
        return data;
      },
      onSuccess: () => {
        toast.success("The student was successfully deleted :)");
        queryClient.invalidateQueries({ queryKey: ["students"] });
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error.message)
      },
    });

  return { isDeleting, deleteStudentAndParents };
}
