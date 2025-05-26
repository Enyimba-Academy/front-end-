import api from "./api";

export const submitQuizAttempt = async (quizId, answers) => {
  // Transform the answers object into the expected array format
  const formattedAnswers = Object.entries(answers).map(
    ([questionId, optionId]) => ({
      questionId,
      optionId,
    })
  );

  const response = await api.post(`/quiz/${quizId}/attempt`, {
    answers: formattedAnswers,
  });
  return response.data.data;
};
