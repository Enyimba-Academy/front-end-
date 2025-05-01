import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { schoolService } from "@/api/admin/schoolService";
import { toast } from "react-toastify";

export const useAddSchool = () => {
  const queryClient = useQueryClient();
  const { mutate: addSchool, isLoading } = useMutation({
    mutationFn: schoolService.addSchool,
    onSuccess: () => {
      toast.success("School added successfully");
      queryClient.invalidateQueries({ queryKey: ["schools"] });
    },
    onError: () => {
      toast.error("Failed to add school");
    },
  });

  return { addSchool, isLoading };
};

export const useGetSchools = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["schools"],
    queryFn: schoolService.getSchool,
    onError: (error) => {
      toast.error("Failed to fetch schools");
      console.error("Error fetching schools:", error);
    },
  });

  return {
    schools: data,
    isLoading,
    error,
  };
};
