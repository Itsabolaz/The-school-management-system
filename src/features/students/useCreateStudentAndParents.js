import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStudentAndParents as createStudentAndParentsApi } from "../../services/apiStudents";
import toast from 'react-hot-toast'

export function useCreateStudentAndParents(){
    const queryClient = useQueryClient()
    const {isPending : isCreating , mutate: createStudentAndParents} = useMutation({
        mutationFn: async ({ data: newData, image }) => {
            const {data , error} = await createStudentAndParentsApi({ data: newData, image })

            if(error) throw error;

            return data
        },
        onSuccess: () => {
         toast.success('New student and parents successfully added :)')
         queryClient.invalidateQueries({queryKey: ['students']})
        } ,
        onError: (error) => {
            toast.error(error.message)
            console.log(error)
        }
    })

    return {isCreating , createStudentAndParents}
}