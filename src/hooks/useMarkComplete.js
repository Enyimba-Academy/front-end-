import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";

const markContentComplete = async ({ contentId, enrollmentId }) => {
  const response = await api.post(`/content/${contentId}/complete`, {
    enrollmentId,
  });
  return response.data.data;
};

export const useMarkComplete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markContentComplete,
    onSuccess: (_, variables) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({
        queryKey: [
          "lessonProgress",
          variables.enrollmentId,
          "enrollment",
          "enrollmentMaterials",
          variables.contentId,
        ],
      });
    },
  });
};
