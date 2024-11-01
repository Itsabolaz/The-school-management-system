import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editStudent as editStudentApi } from "../../services/apiStudents";
import toast from "react-hot-toast";

export function useEditStudent() {
  const queryClient = useQueryClient();
  const { mutate: editStudent, isPending: isEditting } = useMutation({
    mutationFn: async ({ studentId, studentObj }) => {
      const { data, error } = await editStudentApi({ studentId, studentObj });

      if (error) throw error;

      return data;
    },
    onSuccess: () => {
      toast.success("Edit the student was successfull :)");
      queryClient.invalidateQueries({ active: true });
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error.message);
    },
  });

  return { editStudent, isEditting };
}
