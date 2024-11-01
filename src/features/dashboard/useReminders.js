import { useQuery } from "@tanstack/react-query";
import { getReminders } from "../../services/apiReminders";

export function useReminders(){
    const {data: reminders , isLoading} = useQuery({
        queryKey: ['reminders'],
        queryFn: getReminders
    });

    return {reminders , isLoading}
}