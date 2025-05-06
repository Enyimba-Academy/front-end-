import { useState } from "react";
import {
  Camera,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Upload,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useOnboarding } from "../hooks/useOnboarding.hook";
import { toast } from "react-toastify";
import levelEnum from "../constant/levelEnum";

export default function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { createOnboarding, isCreatingOnboarding } = useOnboarding();
  const totalSteps = 4;

  const initialValues = {
    profileImage: "",
    bio: "",
    interests: [],
    experience: "",
    goals: [],
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
  };

  const handleNext = (values, { setSubmitting }) => {
    console.log("Form values:", values);

    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      // Final step - submit the form
      createOnboarding(
        {
          interests: JSON.stringify(values.interests),
          goals: JSON.stringify(values.goals),
          ...values,
        },
        {
          onSuccess: () => {
            toast.success("Onboarding complete");
            navigate("/student-profile");
          },
          onError: (error) => {
            console.error("Onboarding error:", error);
            toast.error("Failed to complete onboarding");
          },
        }
      );
    }

    setSubmitting(false);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  // Determine which validation schema to use based on current step
  const getValidationSchema = () => {
    switch (step) {
      case 1:
        return Yup.object().shape({
          bio: Yup.string().required("Bio is required"),
        });
      case 2:
        return Yup.object().shape({
          interests: Yup.array().min(1, "Select at least one interest"),
        });
      case 3:
        return Yup.object().shape({
          experience: Yup.string().required("Experience level is required"),
        });
      case 4:
        return Yup.object().shape({
          goals: Yup.array().min(1, "Select at least one goal"),
        });
      default:
        return Yup.object();
    }
  };

  return (
    <div className="min-h-screen bg-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/">
            <img
              className="h-10 w-auto"
              src="/logo.png"
              alt="Art School Logo"
            />
          </Link>
          <div className="text-sm">
            <button
              onClick={() => navigate("/")}
              className="text-gray-500 hover:text-gray-700"
            >
              Skip for now
            </button>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="relative">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: `${(step / totalSteps) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-600 transition-all duration-500"
            ></div>
          </div>
          <div className="flex justify-between">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step > index + 1
                    ? "bg-red-600 text-white"
                    : step === index + 1
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step > index + 1 ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  index + 1
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-md rounded-lg p-6 md:p-8">
          <Formik
            initialValues={initialValues}
            validationSchema={getValidationSchema()}
            onSubmit={handleNext}
            enableReinitialize
          >
            {({ values, errors, touched, setFieldValue, isSubmitting }) => (
              <Form>
                {/* Step 1: Personal Information */}
                {step === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Tell us about yourself
                    </h2>
                    <div className="space-y-6">
                      <div className="flex flex-col items-center">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100 mb-4">
                          {values.profileImage ? (
                            <img
                              src={values.profileImage}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <Camera className="w-10 h-10" />
                            </div>
                          )}
                          <label
                            htmlFor="profile-upload"
                            className="absolute bottom-0 right-0 bg-red-600 text-white p-2 rounded-full cursor-pointer"
                          >
                            <Upload className="w-4 h-4" />
                          </label>
                          <input
                            id="profile-upload"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setFieldValue("profileImage", reader.result);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </div>
                        <p className="text-sm text-gray-500">
                          Upload a profile picture (optional)
                        </p>
                      </div>

                      <div>
                        <label
                          htmlFor="bio"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Bio*
                        </label>
                        <Field
                          as="textarea"
                          id="bio"
                          name="bio"
                          rows={4}
                          placeholder="Tell us a bit about yourself, your background, and what you're passionate about..."
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        />
                        {errors.bio && touched.bio && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.bio}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Interests */}
                {step === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      What are you interested in?
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Select all that apply. This helps us personalize your
                      experience.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        "Photography",
                        "Cinematography",
                        "Sound Engineering",
                        "Digital Art",
                        "Graphic Design",
                        "Animation",
                        "Web Design",
                        "UI/UX Design",
                        "3D Modeling",
                        "Game Design",
                        "Illustration",
                        "Visual Effects",
                      ].map((interest) => (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => {
                            const newInterests = values.interests.includes(
                              interest
                            )
                              ? values.interests.filter((i) => i !== interest)
                              : [...values.interests, interest];
                            setFieldValue("interests", newInterests);
                          }}
                          className={`py-2 px-4 rounded-md text-sm font-medium ${
                            values.interests.includes(interest)
                              ? "bg-red-600 text-white"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                          }`}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                    {errors.interests && touched.interests && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.interests}
                      </p>
                    )}
                  </div>
                )}

                {/* Step 3: Experience Level */}
                {step === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      What's your experience level?
                    </h2>
                    <p className="text-gray-600 mb-6">
                      This helps us recommend the right courses and content for
                      your skill level.
                    </p>

                    <div className="space-y-4">
                      {Object.values(levelEnum).map((level) => (
                        <div
                          key={level}
                          onClick={() => setFieldValue("experience", level)}
                          className={`p-4 border rounded-md cursor-pointer ${
                            values.experience === level
                              ? "border-red-600 bg-red-50 ring-2 ring-red-600"
                              : "border-gray-300 hover:border-red-300"
                          }`}
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                values.experience === level
                                  ? "border-red-600"
                                  : "border-gray-400"
                              }`}
                            >
                              {values.experience === level && (
                                <div className="w-3 h-3 rounded-full bg-red-600"></div>
                              )}
                            </div>
                            <span className="ml-3 font-medium">{level}</span>
                          </div>
                          <p className="mt-2 ml-8 text-sm text-gray-500">
                            {level === "Beginner"
                              ? "I'm just starting out and learning the basics."
                              : level === "Intermediate"
                              ? "I have some experience and understand fundamental concepts."
                              : level === "Advanced"
                              ? "I'm skilled and looking to refine my expertise."
                              : "I work in the industry and want to expand my skillset."}
                          </p>
                        </div>
                      ))}
                    </div>
                    {errors.experience && touched.experience && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.experience}
                      </p>
                    )}
                  </div>
                )}

                {/* Step 4: Goals */}
                {step === 4 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      What are your goals?
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Select all that apply. This helps us tailor your learning
                      journey.
                    </p>

                    <div className="space-y-3">
                      {[
                        "Learn a new creative skill",
                        "Change career paths",
                        "Get a promotion or better job",
                        "Start a creative business",
                        "Improve existing skills",
                        "Build a professional portfolio",
                        "Network with other creatives",
                        "Personal enrichment",
                      ].map((goal) => (
                        <div
                          key={goal}
                          onClick={() => {
                            const newGoals = values.goals.includes(goal)
                              ? values.goals.filter((g) => g !== goal)
                              : [...values.goals, goal];
                            setFieldValue("goals", newGoals);
                          }}
                          className={`p-3 border rounded-md cursor-pointer flex items-center ${
                            values.goals.includes(goal)
                              ? "border-red-600 bg-red-50 ring-1 ring-red-600"
                              : "border-gray-300 hover:border-red-300"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded border flex items-center justify-center ${
                              values.goals.includes(goal)
                                ? "bg-red-600 border-red-600"
                                : "border-gray-400"
                            }`}
                          >
                            {values.goals.includes(goal) && (
                              <svg
                                className="w-3 h-3 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          <span className="ml-3">{goal}</span>
                        </div>
                      ))}
                    </div>
                    {errors.goals && touched.goals && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.goals}
                      </p>
                    )}

                    <div className="mt-8 bg-blue-50 border border-blue-200 rounded-md p-4">
                      <h3 className="text-sm font-medium text-blue-800">
                        Almost there!
                      </h3>
                      <p className="mt-1 text-sm text-blue-700">
                        After completing this step, you'll be ready to start
                        exploring courses tailored to your interests and goals.
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={step === 1}
                    className={`flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium ${
                      step === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || isCreatingOnboarding}
                    className="flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    {step === totalSteps
                      ? isCreatingOnboarding
                        ? "Completing..."
                        : "Complete"
                      : "Next"}
                    {step !== totalSteps && (
                      <ChevronRight className="w-4 h-4 ml-1" />
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
