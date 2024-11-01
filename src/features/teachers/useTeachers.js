import { useQuery } from "@tanstack/react-query";
import { getTeachers as getTeachersApi } from "../../services/apiTeachers";
import { useSearchParams } from "react-router-dom";

export function useTeachers() {
  const [searchParams] = useSearchParams();

  // Search by name
  const searchValue = searchParams.get("name");
  const search = searchValue ? { field: "fullName", value: searchValue } : null;

  // Filter by class (grade)
  const filterValue = searchParams.get("class");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "grade", value: filterValue };

  const {data: {teachers , count} = {} , isLoading} = useQuery({
    queryKey: ["teachers", search, filter],
    queryFn: () => getTeachersApi({ search, filter }),
  });
  

  return { teachers, isLoading , count };
}