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

export const useGetSchools = ({
  page = "1",
  limit = "10",
  search,
  sortBy = "updatedAt",
  sortOrder = "desc",
  status,
} = {}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["schools", { page, limit, search, sortBy, sortOrder, status }],
    queryFn: () =>
      schoolService.getSchool({
        page,
        limit,
        search,
        sortBy,
        sortOrder,
        status,
      }),
    onError: (error) => {
      toast.error("Failed to fetch schools");
      console.error("Error fetching schools:", error);
    },
    refetchOnWindowFocus: true,
    staleTime: 0,
    cacheTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
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

export const useUpdateSchool = () => {
  const queryClient = useQueryClient();
  const { mutate: updateSchool, isLoading } = useMutation({
    mutationFn: (id, school) => schoolService.updateSchool(id, school),
    onSuccess: () => {
      toast.success("School updated successfully");
      queryClient.invalidateQueries({ queryKey: ["schools"] });
    },
    onError: () => {
      toast.error("Failed to update school");
    },
  });

  return { updateSchool, isLoading };
};

export const useDeleteSchool = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteSchool, isLoading } = useMutation({
    mutationFn: (id) => schoolService.deleteSchool(id),
    onSuccess: () => {
      toast.success("School deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["schools"] });
    },
    onError: (error) => {
      toast.error("Failed to delete school");
      console.error("Error deleting school:", error);
    },
  });

  return { deleteSchool, isLoading };
};
