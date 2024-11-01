import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadUserImage as uploadUserImageApi } from "../../services/apiAuth";
import toast from 'react-hot-toast'

export function useUploadAvatar(){
    const queryClient = useQueryClient()
    const {mutate: uploadUserImage , isPending: isUploading} = useMutation({
        mutationFn: uploadUserImageApi ,
        onSuccess: () => {
          toast.success('Avatar successfully uploaded :)')
          queryClient.invalidateQueries({ active: true });
        } ,
        onError: (err) => {
            toast.error('Faild to upload avatar!')
            console.log(err)
        }
    })

    return {uploadUserImage , isUploading}
}