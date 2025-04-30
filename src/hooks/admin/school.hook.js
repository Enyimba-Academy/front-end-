import { useMutation, useQueryClient } from "@tanstack/react-query";
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
