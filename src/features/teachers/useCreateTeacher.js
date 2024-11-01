import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTeacher as createTeacherApi } from "../../services/apiTeachers"
import toast from 'react-hot-toast'

export function useCreateTeacher(){
    const queryClient = useQueryClient()
    const {isPending : isCreating , mutate:createTeacher } = useMutation({
        mutationFn: async ({ data: newData, image }) => {
            const {data , error} = await createTeacherApi({ data: newData, image });
            if(error) throw error;

            return data;
        },
        onSuccess: () => {
         toast.success('New teacher successfully added :)')
         queryClient.invalidateQueries({queryKey: ['teachers']})
        } ,
        onError: (error) => {
            toast.error('New teacher were not created')
            console.log(error)
        }
    })

    return {isCreating , createTeacher}
}