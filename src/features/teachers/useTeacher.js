import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTeacher } from "../../services/apiTeachers";
import { useParams } from "react-router-dom";

export function useTeacher(){
    const {teacherId} = useParams()
    const {data: teacher , isLoading} = useQuery({
        queryKey: ['teacher' , teacherId],
        queryFn: () => getTeacher(teacherId),
    })

    return {teacher , isLoading}
}