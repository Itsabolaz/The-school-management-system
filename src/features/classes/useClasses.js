import { useQuery } from "@tanstack/react-query";
import { getClasses } from "../../services/apiClasses";

export function useClasses() {
  const { data: { classes , students , count } = {}, isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: getClasses,
  });

  return { classes , students , count, isLoading };
}
