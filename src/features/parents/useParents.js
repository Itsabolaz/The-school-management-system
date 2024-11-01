import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getParents as getParentsApi } from "../../services/apiParents"


export function useParents() {
    const {parentsId} = useParams()

    const {data: parents , isLoading} = useQuery({
        queryKey: ['parents' , parentsId],
        queryFn: () => getParentsApi(parentsId),
    })

    return {parents , isLoading}
}