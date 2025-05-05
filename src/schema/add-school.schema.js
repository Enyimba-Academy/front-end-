import * as Yup from "yup";

export const addSchoolSchema = Yup.object().shape({
  name: Yup.string()
    .required("Course name is required")
    .max(100, "Course name must be less than 100 characters"),
  description: Yup.string()
    .required("Course description is required")
    .max(500, "Course description must be less than 500 characters"),
  image: Yup.string().required("Course image is required"),

  sections: Yup.array()
    .min(1, "At least one section is required")
    .of(
      Yup.object().shape({
        id: Yup.string().required(),
        title: Yup.string()
          .required("Section title is required")
          .max(100, "Section title must be less than 100 characters"),
        contents: Yup.array()
          .min(1, "Each section must have at least one content item")
          .test(
            "one-quiz-per-section",
            "Each section can only have one quiz",
            function (contents) {
              if (!contents) return true;
              const quizCount = contents.filter(
                (content) => content.type === "quiz"
              ).length;
              return quizCount <= 1;
            }
          )
          .test(
            "one-assignment-per-section",
            "Each section can only have one assignment",
            function (contents) {
              if (!contents) return true;
              const assignmentCount = contents.filter(
                (content) => content.type === "assignment"
              ).length;
              return assignmentCount <= 1;
            }
          )
          .of(
            Yup.object().shape({
              id: Yup.string().required(),
              type: Yup.string()
                .required("Content type is required")
                .oneOf(
                  ["video", "material", "quiz", "assignment"],
                  "Invalid content type"
                ),
              title: Yup.string()
                .required("Content title is required")
                .max(100, "Content title must be less than 100 characters"),
              data: Yup.object()
                .when("type", {
                  is: (type) => type === "quiz",
                  then: Yup.object().shape({
                    questions: Yup.array()
                      .min(1, "Quiz must have at least one question")
                      .of(
                        Yup.object().shape({
                          id: Yup.string().required(),
                          text: Yup.string().required(
                            "Question text is required"
                          ),
                          type: Yup.string()
                            .required("Question type is required")
                            .oneOf(
                              ["multiple-choice", "true-false", "short-answer"],
                              "Invalid question type"
                            ),
                          options: Yup.array().when("type", {
                            is: (type) => type === "multiple-choice",
                            then: Yup.array()
                              .min(
                                2,
                                "Multiple choice questions must have at least 2 options"
                              )
                              .of(
                                Yup.object().shape({
                                  id: Yup.string().required(),
                                  text: Yup.string().required(
                                    "Option text is required"
                                  ),
                                  isCorrect: Yup.boolean().required(
                                    "Must specify if option is correct"
                                  ),
                                })
                              )
                              .test(
                                "has-correct-answer",
                                "Must have exactly one correct answer",
                                (options) => {
                                  return (
                                    options?.filter((opt) => opt.isCorrect)
                                      .length === 1
                                  );
                                }
                              ),
                          }),
                        })
                      ),
                    timeLimit: Yup.number()
                      .required("Time limit is required")
                      .min(1, "Time limit must be at least 1 minute")
                      .max(180, "Time limit cannot exceed 180 minutes"),
                    passingScore: Yup.number()
                      .required("Passing score is required")
                      .min(0, "Passing score must be at least 0")
                      .max(100, "Passing score cannot exceed 100"),
                  }),
                })
                .when("type", {
                  is: (type) => type === "assignment",
                  then: Yup.object().shape({
                    description: Yup.string().required(
                      "Assignment description is required"
                    ),
                    dueDate: Yup.date().nullable(),
                    totalPoints: Yup.number()
                      .required("Total points is required")
                      .min(1, "Total points must be at least 1"),
                    submissionType: Yup.string()
                      .required("Submission type is required")
                      .oneOf(
                        ["file", "text", "link"],
                        "Invalid submission type"
                      ),
                    allowedFileTypes: Yup.array().when("submissionType", {
                      is: (type) => type === "file",
                      then: Yup.array()
                        .min(1, "At least one file type must be allowed")
                        .of(
                          Yup.string().oneOf(
                            ["pdf", "doc", "docx", "txt", "zip"],
                            "Invalid file type"
                          )
                        ),
                    }),
                    maxFileSize: Yup.number().when("submissionType", {
                      is: (type) => type === "file",
                      then: Yup.number()
                        .required("Maximum file size is required")
                        .min(1, "Maximum file size must be at least 1MB")
                        .max(100, "Maximum file size cannot exceed 100MB"),
                    }),
                  }),
                }),
              resources: Yup.array().of(
                Yup.object().shape({
                  id: Yup.string().required(),
                  name: Yup.string().required("Resource name is required"),
                  type: Yup.string().required("Resource type is required"),
                  url: Yup.string().required("Resource URL is required"),
                })
              ),
            })
          ),
      })
    ),
  price: Yup.number().when("isPaid", {
    is: true,
    then: (schema) =>
      schema
        .required("Price is required for paid courses")
        .min(0, "Price must be greater than or equal to 0"),
    otherwise: (schema) => schema.notRequired(),
  }),
  visibility: Yup.string()
    .required("Visibility setting is required")
    .oneOf(["draft", "published", "unlisted"], "Invalid visibility option"),
});
