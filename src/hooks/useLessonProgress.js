import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  markLessonCompleted,
  updateWatchTime,
  getLessonProgress,
} from "../api/lessonProgressService";

export const useMarkLessonCompleted = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ enrollmentId, lessonId }) =>
      markLessonCompleted(enrollmentId, lessonId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["lessonProgress", variables.enrollmentId],
      });
      queryClient.invalidateQueries({
        queryKey: [
          "lessonProgress",
          variables.enrollmentId,
          variables.lessonId,
        ],
      });
    },
  });
};

export const useUpdateWatchTime = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ enrollmentId, lessonId, watchedSeconds }) =>
      updateWatchTime(enrollmentId, lessonId, watchedSeconds),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "lessonProgress",
          variables.enrollmentId,
          variables.lessonId,
        ],
      });
    },
  });
};

export const useGetLessonProgress = (enrollmentId, lessonId) => {
  return useQuery({
    queryKey: ["lessonProgress", enrollmentId, lessonId],
    queryFn: () => getLessonProgress(enrollmentId, lessonId),
    enabled: !!enrollmentId && !!lessonId,
  });
};
