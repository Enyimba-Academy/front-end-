"use client";
import { Plus, Trash2, Check, X } from "lucide-react";

// Add default values at the beginning of the component to handle undefined data
export default function QuizEditor({ data = {}, onChange }) {
  // Initialize with default values if data is undefined or missing properties
  const quizData = {
    questions: data?.questions || [],
    timeLimit: data?.timeLimit || 30,
    passingScore: data?.passingScore || 70,
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id: `question-${Date.now()}`,
      text: "New Question",
      type: "multiple-choice",
      options: [
        { id: `option-${Date.now()}-1`, text: "Option 1", isCorrect: true },
        { id: `option-${Date.now()}-2`, text: "Option 2", isCorrect: false },
      ],
    };

    onChange({
      ...quizData,
      questions: [...quizData.questions, newQuestion],
    });
  };

  const handleQuestionChange = (questionId, field, value) => {
    onChange({
      ...quizData,
      questions: quizData.questions.map((q) =>
        q.id === questionId ? { ...q, [field]: value } : q
      ),
    });
  };

  const handleDeleteQuestion = (questionId) => {
    onChange({
      ...quizData,
      questions: quizData.questions.filter((q) => q.id !== questionId),
    });
  };

  const handleAddOption = (questionId) => {
    const question = quizData.questions.find((q) => q.id === questionId);
    if (!question) return;

    const newOption = {
      id: `option-${Date.now()}`,
      text: `Option ${question.options.length + 1}`,
      isCorrect: false,
    };

    onChange({
      ...quizData,
      questions: quizData.questions.map((q) =>
        q.id === questionId ? { ...q, options: [...q.options, newOption] } : q
      ),
    });
  };

  const handleOptionChange = (questionId, optionId, field, value) => {
    onChange({
      ...quizData,
      questions: quizData.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((o) =>
                o.id === optionId ? { ...o, [field]: value } : o
              ),
            }
          : q
      ),
    });
  };

  const handleDeleteOption = (questionId, optionId) => {
    onChange({
      ...quizData,
      questions: quizData.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.filter((o) => o.id !== optionId),
            }
          : q
      ),
    });
  };

  const handleSettingChange = (field, value) => {
    onChange({
      ...quizData,
      [field]: value,
    });
  };

  return (
    <div className="mt-4 border-t pt-4">
      <div className="mb-4">
        <h4 className="font-medium mb-2">Quiz Settings</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Time Limit (minutes)
            </label>
            <input
              type="number"
              value={quizData.timeLimit}
              onChange={(e) =>
                handleSettingChange(
                  "timeLimit",
                  Number.parseInt(e.target.value) || 0
                )
              }
              className="w-full px-3 py-2 border rounded-md"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Passing Score (%)
            </label>
            <input
              type="number"
              value={quizData.passingScore}
              onChange={(e) =>
                handleSettingChange(
                  "passingScore",
                  Number.parseInt(e.target.value) || 0
                )
              }
              className="w-full px-3 py-2 border rounded-md"
              min="0"
              max="100"
            />
          </div>
        </div>
      </div>

      <h4 className="font-medium mb-2">Questions</h4>

      {quizData.questions.map((question, qIndex) => (
        <div
          key={question.id}
          className="mb-6 p-4 border rounded-md bg-gray-50"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium">Question {qIndex + 1}</div>
            <button
              onClick={() => handleDeleteQuestion(question.id)}
              className="text-gray-500 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">
              Question Text
            </label>
            <input
              type="text"
              value={question.text}
              onChange={(e) =>
                handleQuestionChange(question.id, "text", e.target.value)
              }
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">
              Question Type
            </label>
            <select
              value={question.type}
              onChange={(e) =>
                handleQuestionChange(question.id, "type", e.target.value)
              }
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="multiple-choice">Multiple Choice</option>
              <option value="true-false">True/False</option>
              <option value="short-answer">Short Answer</option>
            </select>
          </div>

          {(question.type === "multiple-choice" ||
            question.type === "true-false") && (
            <div className="mb-2">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm text-gray-600">Options</label>
                {question.type === "multiple-choice" && (
                  <button
                    onClick={() => handleAddOption(question.id)}
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Option
                  </button>
                )}
              </div>

              {question.options.map((option) => (
                <div key={option.id} className="flex items-center gap-2 mb-2">
                  <button
                    onClick={() =>
                      handleOptionChange(
                        question.id,
                        option.id,
                        "isCorrect",
                        !option.isCorrect
                      )
                    }
                    className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                      option.isCorrect
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300"
                    }`}
                  >
                    {option.isCorrect && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </button>

                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) =>
                      handleOptionChange(
                        question.id,
                        option.id,
                        "text",
                        e.target.value
                      )
                    }
                    className="flex-1 px-3 py-1 border rounded-md"
                  />

                  {question.options.length > 2 &&
                    question.type === "multiple-choice" && (
                      <button
                        onClick={() =>
                          handleDeleteOption(question.id, option.id)
                        }
                        className="text-gray-500 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                </div>
              ))}
            </div>
          )}

          {question.type === "short-answer" && (
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">
                Answer Key (optional)
              </label>
              <input
                type="text"
                value={question.answerKey || ""}
                onChange={(e) =>
                  handleQuestionChange(question.id, "answerKey", e.target.value)
                }
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter the correct answer"
              />
            </div>
          )}
        </div>
      ))}

      <button
        onClick={handleAddQuestion}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
      >
        <Plus className="w-4 h-4" /> Add Question
      </button>
    </div>
  );
}
