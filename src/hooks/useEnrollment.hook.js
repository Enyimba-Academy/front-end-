import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createEnrollment,
  getEnrollment,
  getEnrollmentById,
  updateEnrollment,
} from "../api/enrollmentService";
import { getMyLesson } from "@/api/lessonProgressService";

export const useCreateEnrollment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEnrollment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
    },
  });
};

export const useGetEnrollment = () => {
  return useQuery({
    queryKey: ["enrollments"],
    queryFn: getEnrollment,
  });
};

export const useGetEnrollmentById = (id) => {
  return useQuery({
    queryKey: ["enrollment", id],
    queryFn: () => getEnrollmentById(id),
  });
};

export const useUpdateEnrollment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => updateEnrollment(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollment"] });
    },
  });
};

export const useGetEnrollmentMaterials = (contentId, typeID, lessonId) => {
  return useQuery({
    queryKey: ["enrollmentMaterials", contentId, typeID, lessonId],
    queryFn: () => getMyLesson(contentId, typeID, lessonId),
    enabled: !!contentId && !!typeID && !!lessonId,
  });
};
