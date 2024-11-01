import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewReminder as addNewReminderApi } from "../../services/apiReminders";
import toast from "react-hot-toast";

export function useAddReminder() {
  const queryClient = useQueryClient();
  const { mutate: addNewReminder, isPending: isAdding } = useMutation({
    mutationFn: async (newReminder) => {
      const { data, error } = await addNewReminderApi(newReminder);

      if (error) throw error;

      return data;
    },
    onSuccess: () => {
      toast.success("New reminder added successfully");
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err);
    },
  });

  return { addNewReminder, isAdding };
}
