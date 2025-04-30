import { useQuery } from "@tanstack/react-query";
import { getStudents } from "@/api/admin/student";
export function useAdminStudents() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });
  return { data, isLoading, error };
}
