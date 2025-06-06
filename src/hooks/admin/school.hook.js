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

export const useGetSchools = ({ filters, page, search }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["schools", filters, page, search],
    queryFn: () => schoolService.getSchool({ filters, page, search }),
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

export const useGetSchoolById = (id) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["school", id],
    queryFn: () => schoolService.getSchoolById(id),
    enabled: !!id,
  });

  return {
    school: data,
    isLoading,
    error,
  };
};
