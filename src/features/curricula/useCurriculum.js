import { useQuery } from "@tanstack/react-query";
import { getCurriculum } from "../../services/apiCurricula";
import { useSearchParams } from "react-router-dom";

export function useCurriculum() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("class") || 1;
  const filter = { field: "grade", value: filterValue };

  const { data: curriculum, isLoading } = useQuery({
    queryKey: ["curriculum", filter],
    queryFn: () => getCurriculum(filter),
  });

  return { curriculum, isLoading };
}
