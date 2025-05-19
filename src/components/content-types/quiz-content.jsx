"use client";

import { useFormikContext } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { QuestionType } from "@/constant/questionType";

// Create a random ID
const createId = () => `id-${Math.random().toString(36).substring(2, 15)}`;

export function QuizContent({ sectionIndex, contentIndex, content }) {
  const { setFieldValue } = useFormikContext();

  const quizType = content.quizType || QuestionType.MULTIPLE_CHOICE;
  const questions = content.questions || [];

  const handleQuizTypeChange = (value) => {
    setFieldValue(
      `sections[${sectionIndex}].contents[${contentIndex}].quizType`,
      value
    );

    // Reset questions when changing quiz type
    if (value === QuestionType.MULTIPLE_CHOICE) {
      setFieldValue(
        `sections[${sectionIndex}].contents[${contentIndex}].questions`,
        [
          {
            id: createId(),
            question: "New Question",
            options: ["Option A", "Option B", "Option C"],
            correctAnswer: 0,
          },
        ]
      );
    } else if (value === QuestionType.TRUE_FALSE) {
      setFieldValue(
        `sections[${sectionIndex}].contents[${contentIndex}].questions`,
        [
          {
            id: createId(),
            question: "New Question",
            options: ["True", "False"],
            correctAnswer: 0,
          },
        ]
      );
    } else {
      setFieldValue(
        `sections[${sectionIndex}].contents[${contentIndex}].questions`,
        [
          {
            id: createId(),
            question: "New Question",
            answer: "",
          },
        ]
      );
    }
  };

  const createNewQuestion = () => {
    if (quizType === QuestionType.MULTIPLE_CHOICE) {
      return {
        id: createId(),
        question: "New Question",
        options: ["Option A", "Option B", "Option C"],
        correctAnswer: 0,
      };
    } else if (quizType === QuestionType.TRUE_FALSE) {
      return {
        id: createId(),
        question: "New Question",
        options: ["True", "False"],
        correctAnswer: 0,
      };
    } else {
      return {
        id: createId(),
        question: "New Question",
        answer: "",
      };
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label
          htmlFor={`sections[${sectionIndex}].contents[${contentIndex}].quizType`}
          className="text-sm font-medium"
        >
          Quiz Type
        </Label>
        <Select defaultValue={quizType} onValueChange={handleQuizTypeChange}>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select quiz type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={QuestionType.MULTIPLE_CHOICE}>
              Multiple Choice
            </SelectItem>
            <SelectItem value={QuestionType.TRUE_FALSE}>True/False</SelectItem>
            <SelectItem value={QuestionType.SHORT_ANSWER}>
              Short Answer
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Questions</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const newQuestion = createNewQuestion();
              setFieldValue(
                `sections[${sectionIndex}].contents[${contentIndex}].questions`,
                [...questions, newQuestion]
              );
            }}
            className="flex items-center gap-1"
          >
            <Plus className="h-3 w-3" />
            <span>Add Question</span>
          </Button>
        </div>

        {questions.map((question, questionIndex) => (
          <Card key={question.id} className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-4">
                <Label className="text-lg font-medium">
                  Question {questionIndex + 1}
                </Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const updatedQuestions = questions.filter(
                      (_, i) => i !== questionIndex
                    );
                    setFieldValue(
                      `sections[${sectionIndex}].contents[${contentIndex}].questions`,
                      updatedQuestions
                    );
                  }}
                  className="h-8 w-8 text-destructive"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Question</Label>
                  <Input
                    value={question.question}
                    onChange={(e) => {
                      const updatedQuestions = [...questions];
                      updatedQuestions[questionIndex].question = e.target.value;
                      setFieldValue(
                        `sections[${sectionIndex}].contents[${contentIndex}].questions`,
                        updatedQuestions
                      );
                    }}
                  />
                </div>

                {(quizType === QuestionType.MULTIPLE_CHOICE ||
                  quizType === QuestionType.TRUE_FALSE) && (
                  <div className="space-y-4">
                    <Label>Options</Label>
                    <div className="space-y-2">
                      {question.options?.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className="flex items-center gap-2"
                        >
                          <RadioGroup
                            value={question.correctAnswer?.toString()}
                            onValueChange={(value) => {
                              const updatedQuestions = [...questions];
                              updatedQuestions[questionIndex].correctAnswer =
                                Number.parseInt(value);
                              setFieldValue(
                                `sections[${sectionIndex}].contents[${contentIndex}].questions`,
                                updatedQuestions
                              );
                            }}
                            className="flex-shrink-0"
                          >
                            <RadioGroupItem
                              value={optionIndex.toString()}
                              id={`option-${questionIndex}-${optionIndex}`}
                            />
                          </RadioGroup>
                          <Input
                            value={option}
                            onChange={(e) => {
                              const updatedQuestions = [...questions];
                              updatedQuestions[questionIndex].options[
                                optionIndex
                              ] = e.target.value;
                              setFieldValue(
                                `sections[${sectionIndex}].contents[${contentIndex}].questions`,
                                updatedQuestions
                              );
                            }}
                            className="flex-1"
                            disabled={quizType === QuestionType.TRUE_FALSE}
                          />
                          {quizType === QuestionType.MULTIPLE_CHOICE &&
                            question.options &&
                            question.options.length > 2 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  const updatedQuestions = [...questions];
                                  updatedQuestions[
                                    questionIndex
                                  ].options.splice(optionIndex, 1);
                                  setFieldValue(
                                    `sections[${sectionIndex}].contents[${contentIndex}].questions`,
                                    updatedQuestions
                                  );
                                }}
                                className="h-8 w-8 text-destructive"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            )}
                        </div>
                      ))}
                      {quizType === QuestionType.MULTIPLE_CHOICE && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const updatedQuestions = [...questions];
                            updatedQuestions[questionIndex].options.push(
                              `Option ${(question.options?.length || 0) + 1}`
                            );
                            setFieldValue(
                              `sections[${sectionIndex}].contents[${contentIndex}].questions`,
                              updatedQuestions
                            );
                          }}
                          className="mt-2"
                        >
                          Add Option
                        </Button>
                      )}
                    </div>
                  </div>
                )}

                {quizType === QuestionType.SHORT_ANSWER && (
                  <div>
                    <Label>Answer</Label>
                    <Input
                      value={question.answer || ""}
                      onChange={(e) => {
                        const updatedQuestions = [...questions];
                        updatedQuestions[questionIndex].answer = e.target.value;
                        setFieldValue(
                          `sections[${sectionIndex}].contents[${contentIndex}].questions`,
                          updatedQuestions
                        );
                      }}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4 border-t pt-4">
        <h4 className="font-medium">Quiz Settings</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Time Limit (minutes)</Label>
            <Input
              type="number"
              min="1"
              value={content.timeLimit || 30}
              onChange={(e) => {
                setFieldValue(
                  `sections[${sectionIndex}].contents[${contentIndex}].timeLimit`,
                  Number(e.target.value)
                );
              }}
            />
          </div>
          <div>
            <Label>Passing Score (%)</Label>
            <Input
              type="number"
              min="0"
              max="100"
              value={content.passingScore || 70}
              onChange={(e) => {
                setFieldValue(
                  `sections[${sectionIndex}].contents[${contentIndex}].passingScore`,
                  Number(e.target.value)
                );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
