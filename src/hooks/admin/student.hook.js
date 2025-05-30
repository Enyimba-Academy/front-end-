import { useQuery } from "@tanstack/react-query";
import { getStudents, getStudentById } from "../../api/admin/student";

export function useAdminStudents({
  page = 1,
  limit = 10,
  search,
  sortBy = "createdAt",
  sortOrder = "desc",
  status,
} = {}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["students", { page, limit, search, sortBy, sortOrder, status }],
    queryFn: () =>
      getStudents({ page, limit, search, sortBy, sortOrder, status }),
    refetchOnWindowFocus: true,
    staleTime: 0,
    cacheTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  return { data, isLoading, error };
}

export function useAdminStudentById(id) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["student", id],
    queryFn: () => getStudentById(id),
    refetchOnWindowFocus: true,
    staleTime: 0,
    cacheTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  return { data, isLoading, error };
}
