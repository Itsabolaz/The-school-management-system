import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editReminder as editReminderApi } from "../../services/apiReminders";
import toast from "react-hot-toast";

export function useEditReminder() {
  const queryClient = useQueryClient();
  const { mutate: editReminder, isPending: isEditting } = useMutation({
    mutationFn: async ({ reminderId, updatedReminder }) => {
      const { data, error } = await editReminderApi({ reminderId, updatedReminder });

      if (error) throw error;

      return data;
    },
    onSuccess: () => {
      toast.success("Reminder editted successfully :)");
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err);
    },
  });

  return { editReminder, isEditting };
}