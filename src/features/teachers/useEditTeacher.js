import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editTeacher as editTeacherApi } from "../../services/apiTeachers";

export function useEditTeacher() {
  const queryClient = useQueryClient();
  const { mutate:editTeacher , isPending: isEditting } = useMutation({
    mutationFn: async ({ teacherId, teacherObj }) => {
      const {data , error} = await editTeacherApi({ teacherId, teacherObj });

      if(error) throw error;

      return data;
    },
    onSuccess: () => {
      toast.success("Edit the teacher was successfull!");
      queryClient.invalidateQueries({ active: true });
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error.message);
    },
  });

  return { editTeacher, isEditting };
}
