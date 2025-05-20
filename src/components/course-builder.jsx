"use client";

import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Bell } from "lucide-react";
import { toast } from "sonner";

import BasicInformation from "@/components/steps/basic-information";
import CourseContent from "@/components/steps/course-content";
import CourseSettings from "@/components/steps/course-settings";
import CoursePreview from "@/components/steps/course-preview";
import StepIndicator from "@/components/ui/step-indicator";
import {
  useCreateCourse,
  useUpdateCourse,
  useGetCourseById,
} from "@/hooks/admin/course.hook";
import { DraftStatus } from "@/constant/draftstatus";
import { useParams, useNavigate } from "react-router-dom";
// Validation schema
const CourseSchema = Yup.object().shape({
  name: Yup.string().required("Course name is required"),
  description: Yup.string().required("Course description is required"),
  image: Yup.mixed().required("Course image is required"),
  school: Yup.string().required("School is required"),
  level: Yup.string().required("Level is required"),
  sections: Yup.array()
    .of(
      Yup.object().shape({
        title: Yup.string().required("Section title is required"),
        contents: Yup.array()
          .of(
            Yup.object().shape({
              title: Yup.string().required("Content title is required"),
              type: Yup.string().required("Content type is required"),
              description: Yup.string(),
              // Specific validation for quiz content
              questions: Yup.array().when("type", {
                is: "quiz",
                then: (schema) =>
                  schema.min(1, "At least one question is required").of(
                    Yup.object().shape({
                      question: Yup.string().required(
                        "Question text is required"
                      ),
                      options: Yup.array().when("quizType", {
                        is: "multiChoice",
                        then: (schema) =>
                          schema.min(2, "At least two options are required"),
                      }),
                    })
                  ),
              }),
              // Specific validation for assignment content
              assignmentDetails: Yup.object().when("type", {
                is: "assignment",
                then: (schema) =>
                  schema.shape({
                    question: Yup.string().required(
                      "Assignment question is required"
                    ),
                    passMark: Yup.number()
                      .min(0, "Pass mark must be at least 0")
                      .max(100, "Pass mark cannot exceed 100"),
                  }),
              }),
            })
          )
          .min(1, "At least one content item is required"),
      })
    )
    .min(1, "At least one section is required"),
  visibility: Yup.string().required("Visibility setting is required"),
  price: Yup.number().when("isPaid", {
    is: true,
    then: (schema) =>
      schema.min(1, "Price must be at least 1").required("Price is required"),
    otherwise: (schema) => schema,
  }),
});

// Create a random ID
const createId = () => `id-${Math.random().toString(36).substring(2, 15)}`;

// Initial empty section
const createEmptySection = () => ({
  id: createId(),
  title: `New Section`,
  contents: [
    {
      id: createId(),
      type: "video",
      title: "Video Lecture",
      description: "",
    },
  ],
});

export default function CourseBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showErrors, setShowErrors] = useState(false);
  const { mutate: createCourse, isPending } = useCreateCourse();
  const { id } = useParams();
  const { mutate: updateCourse, isPending: isUpdating } = useUpdateCourse(id);

  const { data: course, isLoading: isLoadingCourse } = useGetCourseById(id);
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    school: "",
    level: "",
    duration: "",
    image: null,
    sections: [createEmptySection()],
    price: 0,
    isPaid: false,
    visibility: DraftStatus.DRAFT,
  });

  useEffect(() => {
    if (id && course?.data) {
      // Transform API course data to match form structure
      const courseData = course.data;
      setInitialValues({
        name: courseData.title || "",
        description: courseData.description || "",
        school: courseData.school?.id || "",
        level: courseData.level || "",
        duration: courseData.duration || "",
        image: courseData.image || null,
        sections: courseData.sections.map((section) => ({
          id: section.id,
          title: section.title,
          contents: section.contents.map((content) => {
            let contentObj = {
              id: content.id,
              type: content.type.toLowerCase(),
              title: content.title,
              description: "",
            };

            // Add specific content data based on type
            if (
              content.type === "VIDEO" &&
              content.video &&
              content.video.length > 0
            ) {
              contentObj.description = content.video[0].description || "";
              contentObj.url = content.video[0].url || "";
            } else if (
              content.type === "QUIZ" &&
              content.quiz &&
              content.quiz.length > 0
            ) {
              contentObj.questions = content.quiz.map((q) => ({
                id: q.id,
                question: q.question,
                options: q.options || [],
                correctAnswer: q.correctAnswer || 0,
                quizType: q.quizType || "multiChoice",
              }));
            } else if (
              content.type === "ASSIGNMENT" &&
              content.assignment &&
              content.assignment.length > 0
            ) {
              contentObj.assignmentDetails = {
                question: content.assignment[0].question || "",
                passMark: content.assignment[0].passMark || 70,
              };
            } else if (
              content.type === "MATERIAL" &&
              content.material &&
              content.material.length > 0
            ) {
              contentObj.description = content.material[0].description || "";
              contentObj.materialUrl = content.material[0].url || "";
            }

            return contentObj;
          }),
        })),
        price: courseData.price || 0,
        isPaid: courseData.price > 0,
        visibility: courseData.status || DraftStatus.DRAFT,
      });
    }
  }, [id, course]);

  const steps = [
    { id: 1, name: "Course Details" },
    { id: 2, name: "Course Content" },
    { id: 3, name: "Course Settings" },
    { id: 4, name: "Preview" },
  ];

  const handleSubmit = (values) => {
    const formData = {
      ...values,
      // Transform sections if needed for API compatibility
      sections: values.sections.map((section) => ({
        ...section,
        contents: section.contents.map((content) => ({
          ...content,
          type: content.type.toUpperCase(),
        })),
      })),
    };

    if (id) {
      updateCourse(formData, {
        onSuccess: () => {
          toast({
            title: "Course updated",
            description: "Your course has been updated successfully.",
          });
          navigate("/admin/courses");
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error.message,
          });
        },
      });
    } else {
      createCourse(formData, {
        onSuccess: () => {
          toast({
            title: "Course saved",
            description: "Your course has been saved successfully.",
          });
          navigate("/admin/courses");
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error.message,
          });
        },
      });
    }
  };

  // Helper function to check if there are section errors
  const hasSectionErrors = (errors) => {
    if (!errors.sections) return false;

    // Check if sections is a string error
    if (typeof errors.sections === "string") return true;

    // Check if any section has errors
    if (Array.isArray(errors.sections)) {
      return errors.sections.some((sectionError) => {
        if (!sectionError) return false;

        // Check for title errors
        if (sectionError.title) return true;

        // Check for content errors
        if (sectionError.contents) {
          if (typeof sectionError.contents === "string") return true;

          if (Array.isArray(sectionError.contents)) {
            return sectionError.contents.some((contentError) => !!contentError);
          }
        }

        return false;
      });
    }

    return false;
  };

  const validateStep = (values, errors) => {
    setShowErrors(true);

    switch (currentStep) {
      case 1:
        if (!errors.name && !errors.description && values.image) {
          setCurrentStep(2);
          setShowErrors(false);
        }
        break;
      case 2:
        // For course content, the validation is now handled in the CourseContent component
        // The onContinue will only be called if validation passes
        if (hasSectionErrors(errors)) {
          setCurrentStep(2);
          setShowErrors(true);
        } else {
          setCurrentStep(3);
          setShowErrors(false);
        }
        break;
      case 3:
        // Check for visibility and price errors
        if (!errors.visibility && (!values.isPaid || !errors.price)) {
          setCurrentStep(4);
          setShowErrors(false);
        }
        break;
      case 4:
        // Final step - form will be submitted if valid
        handleSubmit(values);
        break;
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setShowErrors(false);
    }
  };

  return (
    <div>
      <header className="bg-white shadow-sm mb-8">
        <div className="flex justify-between items-center px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              {id ? "Edit Course" : "Course Builder"}
            </h1>
            <p className="text-sm text-gray-500">
              {id ? "Update your course" : "Create a new course"}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <Bell className="h-5 w-5" />
            </button>
            <div className="h-8 w-8 rounded-full bg-gray-300 overflow-hidden">
              <img
                src="/placeholder.svg?height=32&width=32"
                alt="Profile"
                width={32}
                height={32}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto">
        <StepIndicator steps={steps} currentStep={currentStep} />

        {isLoadingCourse && id ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={CourseSchema}
            onSubmit={handleSubmit}
            validateOnChange
            enableReinitialize
          >
            {({ values, errors, isSubmitting }) => (
              <Form className="bg-white rounded-lg shadow-sm p-6 mt-6">
                {currentStep === 1 && (
                  <BasicInformation
                    showErrors={showErrors}
                    onContinue={() => validateStep(values, errors)}
                  />
                )}

                {currentStep === 2 && (
                  <CourseContent
                    showErrors={showErrors}
                    onContinue={() => validateStep(values, errors)}
                    onBack={goBack}
                  />
                )}

                {currentStep === 3 && (
                  <CourseSettings
                    showErrors={showErrors}
                    onContinue={() => validateStep(values, errors)}
                    onBack={goBack}
                  />
                )}

                {currentStep === 4 && (
                  <CoursePreview
                    values={values}
                    onSubmit={() => validateStep(values, errors)}
                    onBack={goBack}
                    isSubmitting={isSubmitting || isPending}
                  />
                )}
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
}
