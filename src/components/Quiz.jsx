import { useState } from "react";
import { CheckCircle, Clock, HelpCircle, X as XIcon } from "lucide-react";
import { useSubmitQuizAttempt } from "@/hooks/useQuiz.hook";
import { toast } from "react-toastify";

export const Quiz = ({ quiz, onComplete }) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizResults, setQuizResults] = useState(null);

  const submitQuizAttempt = useSubmitQuizAttempt();

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizCompleted(false);
    setQuizScore(0);
  };

  const handleAnswerSelect = (questionId, answerId) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerId,
    });
  };

  const handleSubmitQuiz = () => {
    if (quiz?.id) {
      submitQuizAttempt.mutate(
        {
          quizId: quiz.id,
          answers: selectedAnswers,
        },
        {
          onSuccess: (result) => {
            setQuizScore(result.score);
            setQuizResults(result);
            setQuizCompleted(true);
            toast.success("Quiz submitted successfully");
            if (onComplete) {
              onComplete(result);
            }
          },
          onError: (error) => {
            console.error("Error submitting quiz:", error);
            toast.error("Failed to submit quiz. Please try again.");
          },
        }
      );
    }
  };

  const handleResetQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
  };

  const goToNextQuestion = () => {
    if (quiz?.questions && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (quizCompleted) {
    return (
      <div className="w-full bg-white rounded-md shadow-sm border border-gray-200 p-6">
        <div className="text-center mb-6">
          <div
            className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 ${
              quizScore >= (quiz.passingScore || 70)
                ? "bg-green-100"
                : "bg-red-100"
            }`}
          >
            {quizScore >= (quiz.passingScore || 70) ? (
              <CheckCircle size={48} className="text-green-600" />
            ) : (
              <XIcon size={48} className="text-red-600" />
            )}
          </div>
          <h3 className="text-2xl font-bold mb-2">
            {quizScore >= (quiz.passingScore || 70)
              ? "Quiz Passed!"
              : "Quiz Failed"}
          </h3>
          <p className="text-gray-600 mb-4">Your score: {quizScore}%</p>
          {quizResults && (
            <div className="text-sm text-gray-500 mb-4">
              <p>
                Correct answers: {quizResults.correct} out of{" "}
                {quizResults.total}
              </p>
            </div>
          )}
          <div className="w-full max-w-xs mx-auto bg-gray-200 h-3 rounded-full overflow-hidden">
            <div
              className={`h-full ${
                quizScore >= (quiz.passingScore || 70)
                  ? "bg-green-600"
                  : "bg-red-600"
              }`}
              style={{ width: `${quizScore}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Passing score: {quiz.passingScore || 70}%
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={handleResetQuiz}
            className="px-6 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
          >
            Review Quiz
          </button>
          <button className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors">
            Continue to Next Lesson
          </button>
        </div>
      </div>
    );
  }

  if (quizStarted && quiz?.questions?.length > 0) {
    const currentQuestion = quiz.questions[currentQuestionIndex];
    return (
      <div className="w-full bg-white rounded-md shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </h3>
          {quiz.timeLimit && (
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2" />
              <span>Time remaining: {quiz.timeLimit} min</span>
            </div>
          )}
        </div>

        <div className="mb-8">
          <h4 className="text-lg font-medium text-gray-700 mb-4">
            {currentQuestion.text}
          </h4>
          <div className="space-y-3">
            {currentQuestion.options?.map((option) => {
              let optionBorder = "border-gray-300";
              let optionBg = "";
              let icon = null;

              if (quizCompleted) {
                const correctOption = currentQuestion.options.find(
                  (opt) => opt.isCorrect
                );
                if (option.id === correctOption?.id) {
                  optionBorder = "border-green-500";
                  optionBg = "bg-green-50";
                  icon = (
                    <CheckCircle size={18} className="text-green-600 ml-2" />
                  );
                } else if (selectedAnswers[currentQuestion.id] === option.id) {
                  optionBorder = "border-red-500";
                  optionBg = "bg-red-50";
                  icon = <XIcon size={18} className="text-red-600 ml-2" />;
                }
              } else if (selectedAnswers[currentQuestion.id] === option.id) {
                optionBorder = "border-red-500";
                optionBg = "bg-red-50";
              }

              return (
                <div
                  key={option.id}
                  onClick={() =>
                    !quizCompleted &&
                    handleAnswerSelect(currentQuestion.id, option.id)
                  }
                  className={`p-3 border rounded-md cursor-pointer hover:bg-gray-50 ${optionBorder} ${optionBg}`}
                  style={{ pointerEvents: quizCompleted ? "none" : "auto" }}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                        selectedAnswers[currentQuestion.id] === option.id
                          ? "bg-red-600 border-transparent"
                          : "border border-gray-400"
                      }`}
                    >
                      {selectedAnswers[currentQuestion.id] === option.id && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span>{option.text}</span>
                    {icon}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between">
          <div>
            {currentQuestionIndex > 0 && (
              <button
                onClick={goToPrevQuestion}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
            )}
          </div>
          <div>
            {currentQuestionIndex < quiz.questions.length - 1 ? (
              <button
                onClick={goToNextQuestion}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-between mb-2 text-sm text-gray-600">
            <span>Progress</span>
            <span>
              {Math.round(
                ((currentQuestionIndex + 1) / quiz.questions.length) * 100
              )}
              %
            </span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-600"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / quiz.questions.length) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  if (quizStarted && (!quiz?.questions || quiz.questions.length === 0)) {
    return (
      <div className="w-full bg-white rounded-md shadow-sm border border-gray-200 p-6 text-center">
        <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4">
          <HelpCircle size={32} className="text-yellow-500" />
        </div>
        <h3 className="text-xl font-medium text-gray-700 mb-2">
          No Questions Available
        </h3>
        <p className="text-gray-500 mb-6">
          This quiz doesn't have any questions yet.
        </p>
        <button
          onClick={handleResetQuiz}
          className="px-6 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
        >
          Return to Quiz Info
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-md shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
          <HelpCircle size={24} className="text-red-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Quiz</h3>
      </div>

      <div className="mb-6 pb-6 border-b border-gray-200">
        <h4 className="text-lg font-medium text-gray-700 mb-2">Instructions</h4>
        <p className="text-gray-600">
          {quiz?.instructions || "Complete this quiz to test your knowledge."}
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-sm text-gray-600">
              Time Limit:{" "}
              {quiz?.timeLimit ? `${quiz.timeLimit} minutes` : "No time limit"}
            </span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-sm text-gray-600">
              Passing Score:{" "}
              {quiz?.passingScore ? `${quiz.passingScore}%` : "70%"}
            </span>
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          <span>Number of questions: {quiz?.questions?.length || 0}</span>
        </div>
      </div>

      <button
        onClick={handleStartQuiz}
        className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
      >
        Start Quiz
      </button>
    </div>
  );
};
