import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitQuizAttempt } from "../api/quizService";

export const useSubmitQuizAttempt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ quizId, answers }) => submitQuizAttempt(quizId, answers),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["quiz", variables.quizId],
      });
    },
  });
};
