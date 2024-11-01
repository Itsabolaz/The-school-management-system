import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllStudents } from "../../services/apiStudents";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useStudents() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // Search by name
  const searchValue = searchParams.get("name");
  const search = searchValue
    ? { field: "studentName", value: searchValue }
    : null;

  // Filter by class (grade)
  const filterValue = searchParams.get("class");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "grade", value: filterValue };

  //Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { data: { data: students, count } = {}, isLoading } = useQuery({
    queryKey: ["students", search, filter, page],
    queryFn: () => getAllStudents({ search, filter, page }),
  });

  // prefetch next page
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["students", search, filter, page + 1],
      queryFn: () => getAllStudents({ search, filter, page: page + 1 }),
    });
  }

  // prefetch prev page
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["students", search, filter, page - 1],
      queryFn: () => getAllStudents({ search, filter, page: page - 1 }),
    });
  }

  return { students, isLoading, count };
}
