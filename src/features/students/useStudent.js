import { useQuery } from "@tanstack/react-query";
import { getStudent as getStudentApi } from "../../services/apiStudents";
import { useParams } from "react-router-dom";

export function useStudent(){
    const {studentId} = useParams()

    const {data: student , isLoading} = useQuery({
        queryKey: ['student' , studentId],
        queryFn: () => getStudentApi(studentId),
    })

    return {student , isLoading}
}