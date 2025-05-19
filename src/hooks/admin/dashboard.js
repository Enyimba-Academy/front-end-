import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "@/api/admin/dashboard";

export const useGetDashboardData = () => {
  return useQuery({ queryKey: ["dashboard"], queryFn: getDashboardData });
};
