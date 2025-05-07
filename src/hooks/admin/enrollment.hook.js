import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getEnrollments,
  updateEnrollment,
} from "../../api/admin/enrollmentService";

export const useEnrollments = () => {
  return useQuery({ queryKey: ["enrollments"], queryFn: getEnrollments });
};

export const useUpdateEnrollment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => updateEnrollment(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
    },
  });
};
