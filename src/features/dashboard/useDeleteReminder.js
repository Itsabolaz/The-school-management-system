import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReminder as deleteReminderApi } from "../../services/apiReminders";
import toast from "react-hot-toast";

export function useDeleteReminder(){
    const queryClient = useQueryClient()
    const {mutate: deleteReminder , isPending: isDeleting} = useMutation({
        mutationFn: async (reminderId) => {
            const {data, error} = await deleteReminderApi(reminderId);

            if(error) throw error;

            return data;
        },
        onSuccess: () => {
            toast.success('Delete reminder was successful')
            queryClient.invalidateQueries({queryKey: ['reminders']})
        },
        onError: (err) => {
            toast.error(err.message)
            console.log(err)
        }
    })

    return {deleteReminder , isDeleting}
}