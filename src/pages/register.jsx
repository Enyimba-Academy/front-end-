import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Formik, Form, Field } from "formik";
import { registerSchema } from "@/schema/register.schema";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useCourseById } from "../hooks/usePublic.hook";
import { ImageUrl } from "@/api/api";
const nigerianStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

export default function RegisterPage() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { register, isRegistering } = useAuth();
  const { data: courseData } = useCourseById(courseId);
  const course = courseData?.course;

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    country: "Nigeria",
    state: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    agreeTerms: false,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await register(
        {
          ...values,
          ...(courseId && { courseId }),
        },
        {
          onSuccess: () => {
            toast.success("Registration successful");
            if (courseId) {
              navigate(`/student-profile`);
            } else {
              navigate("/onboarding");
            }
          },
        }
      );
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Registration Form Section */}
          <div className="flex-1">
            <div className="sm:mx-auto sm:w-full">
              <Link to="/">
                <img
                  className="mx-auto h-16 w-auto"
                  src="/logo.png"
                  alt="Art School Logo"
                />
              </Link>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {course ? `Apply for ${course.title}` : "Create your account"}
              </h2>
              {!course && (
                <p className="mt-2 text-center text-sm text-gray-600">
                  Or{" "}
                  <Link
                    to="/login"
                    className="font-medium text-red-600 hover:text-red-500"
                  >
                    sign in to your existing account
                  </Link>
                </p>
              )}
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <Formik
                  initialValues={initialValues}
                  validationSchema={registerSchema}
                  onSubmit={handleSubmit}
                >
                  {({
                    errors,
                    touched,
                    isSubmitting,
                    values,
                    handleChange,
                  }) => {
                    console.log(values);
                    return (
                      <Form className="space-y-6">
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor="firstName"
                              className="block text-sm font-medium text-gray-700"
                            >
                              First name
                            </label>
                            <div className="mt-1">
                              <Field
                                type="text"
                                id="firstName"
                                name="firstName"
                                autoComplete="given-name"
                                className={`appearance-none block w-full px-3 py-2 border ${
                                  errors.firstName && touched.firstName
                                    ? "border-red-300"
                                    : "border-gray-300"
                                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm`}
                              />
                              {errors.firstName && touched.firstName && (
                                <p className="mt-1 text-sm text-red-600">
                                  {errors.firstName}
                                </p>
                              )}
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="lastName"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Last name
                            </label>
                            <div className="mt-1">
                              <Field
                                type="text"
                                id="lastName"
                                name="lastName"
                                autoComplete="family-name"
                                className={`appearance-none block w-full px-3 py-2 border ${
                                  errors.lastName && touched.lastName
                                    ? "border-red-300"
                                    : "border-gray-300"
                                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm`}
                              />
                              {errors.lastName && touched.lastName && (
                                <p className="mt-1 text-sm text-red-600">
                                  {errors.lastName}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email address
                          </label>
                          <div className="mt-1">
                            <Field
                              id="email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              className={`appearance-none block w-full px-3 py-2 border ${
                                errors.email && touched.email
                                  ? "border-red-300"
                                  : "border-gray-300"
                              } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm`}
                            />
                            {errors.email && touched.email && (
                              <p className="mt-1 text-sm text-red-600">
                                {errors.email}
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Password
                          </label>
                          <div className="mt-1 relative">
                            <Field
                              id="password"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              autoComplete="new-password"
                              className={`appearance-none block w-full px-3 py-2 border ${
                                errors.password && touched.password
                                  ? "border-red-300"
                                  : "border-gray-300"
                              } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm`}
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-5 w-5 text-gray-400" />
                              ) : (
                                <Eye className="h-5 w-5 text-gray-400" />
                              )}
                            </button>
                            {errors.password && touched.password && (
                              <p className="mt-1 text-sm text-red-600">
                                {errors.password}
                              </p>
                            )}
                          </div>
                          <p className="mt-1 text-xs text-gray-500">
                            Password must be at least 8 characters and include a
                            number and a special character
                          </p>
                        </div>

                        <div>
                          <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Confirm Password
                          </label>
                          <div className="mt-1 relative">
                            <Field
                              id="confirmPassword"
                              name="confirmPassword"
                              type={showPassword ? "text" : "password"}
                              autoComplete="new-password"
                              className={`appearance-none block w-full px-3 py-2 border ${
                                errors.confirmPassword &&
                                touched.confirmPassword
                                  ? "border-red-300"
                                  : "border-gray-300"
                              } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm`}
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-5 w-5 text-gray-400" />
                              ) : (
                                <Eye className="h-5 w-5 text-gray-400" />
                              )}
                            </button>
                            {errors.password && touched.password && (
                              <p className="mt-1 text-sm text-red-600">
                                {errors.password}
                              </p>
                            )}
                          </div>
                          <p className="mt-1 text-xs text-gray-500">
                            Password must be at least 8 characters and include a
                            number and a special character
                          </p>
                        </div>
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Phone Number
                          </label>
                          <div className="mt-1 relative">
                            <PhoneInput
                              international
                              countryCallingCodeEditable={false}
                              defaultCountry="NG"
                              value={values.phone}
                              onChange={(value) => {
                                handleChange({
                                  target: {
                                    name: "phone",
                                    value: value,
                                  },
                                });
                              }}
                              className={`appearance-none block w-full px-3 py-2 border ${
                                errors.phone && touched.phone
                                  ? "border-red-300"
                                  : "border-gray-300"
                              } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm`}
                            />
                            {errors.phone && touched.phone && (
                              <p className="mt-1 text-sm text-red-600">
                                {errors.phone}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor="country"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Country
                            </label>
                            <div className="mt-1">
                              <Field
                                as="select"
                                id="country"
                                name="country"
                                disabled
                                className={`appearance-none block w-full px-3 py-2 border ${
                                  errors.country && touched.country
                                    ? "border-red-300"
                                    : "border-gray-300"
                                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm cursor-not-allowed`}
                              >
                                <option value="Nigeria">Nigeria</option>
                              </Field>
                              {errors.country && touched.country && (
                                <p className="mt-1 text-sm text-red-600">
                                  {errors.country}
                                </p>
                              )}
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="state"
                              className="block text-sm font-medium text-gray-700"
                            >
                              State
                            </label>
                            <div className="mt-1">
                              <Field
                                as="select"
                                id="state"
                                name="state"
                                className={`appearance-none block w-full px-3 py-2 border ${
                                  errors.state && touched.state
                                    ? "border-red-300"
                                    : "border-gray-300"
                                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm`}
                              >
                                <option value="">Select a state</option>
                                {nigerianStates.map((state) => (
                                  <option key={state} value={state}>
                                    {state}
                                  </option>
                                ))}
                              </Field>
                              {errors.state && touched.state && (
                                <p className="mt-1 text-sm text-red-600">
                                  {errors.state}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Address
                          </label>
                          <div className="mt-1">
                            <Field
                              as="textarea"
                              id="address"
                              name="address"
                              rows={3}
                              placeholder="Enter your full address"
                              className={`appearance-none block w-full px-3 py-2 border ${
                                errors.address && touched.address
                                  ? "border-red-300"
                                  : "border-gray-300"
                              } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm`}
                            />
                            {errors.address && touched.address && (
                              <p className="mt-1 text-sm text-red-600">
                                {errors.address}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor="dateOfBirth"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Date of Birth
                            </label>
                            <div className="mt-1">
                              <Field
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                className={`appearance-none block w-full px-3 py-2 border ${
                                  errors.dateOfBirth && touched.dateOfBirth
                                    ? "border-red-300"
                                    : "border-gray-300"
                                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm`}
                              />
                              {errors.dateOfBirth && touched.dateOfBirth && (
                                <p className="mt-1 text-sm text-red-600">
                                  {errors.dateOfBirth}
                                </p>
                              )}
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="gender"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Gender
                            </label>
                            <div className="mt-1">
                              <Field
                                as="select"
                                id="gender"
                                name="gender"
                                className={`appearance-none block w-full px-3 py-2 border ${
                                  errors.gender && touched.gender
                                    ? "border-red-300"
                                    : "border-gray-300"
                                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm`}
                              >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                              </Field>
                              {errors.gender && touched.gender && (
                                <p className="mt-1 text-sm text-red-600">
                                  {errors.gender}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <Field
                            id="agreeTerms"
                            name="agreeTerms"
                            type="checkbox"
                            className={`h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded ${
                              errors.agreeTerms && touched.agreeTerms
                                ? "border-red-300"
                                : ""
                            }`}
                          />
                          <label
                            htmlFor="agreeTerms"
                            className="ml-2 block text-sm text-gray-900"
                          >
                            I agree to the{" "}
                            <a
                              href="#"
                              className="text-red-600 hover:text-red-500"
                            >
                              Terms of Service
                            </a>{" "}
                            and{" "}
                            <a
                              href="#"
                              className="text-red-600 hover:text-red-500"
                            >
                              Privacy Policy
                            </a>
                          </label>
                        </div>
                        {errors.agreeTerms && touched.agreeTerms && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.agreeTerms}
                          </p>
                        )}

                        <div>
                          <button
                            type="submit"
                            disabled={isRegistering || isSubmitting}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 cursor-pointer"
                          >
                            {isRegistering
                              ? course
                                ? "Applying for course"
                                : "Creating account..."
                              : course
                              ? "Apply for course"
                              : "Create account"}
                          </button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>

          {/* Course Information Section */}
          {course && (
            <div className="lg:w-[400px]">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-8">
                <div className="aspect-video bg-gray-800">
                  <img
                    src={
                      course.image ? `${ImageUrl}${course.image}` : "/pick4.png"
                    }
                    alt={course.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {course.title}
                  </h3>
                  <p className="mt-2 text-gray-600">{course.description}</p>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-red-600 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{course.duration}</span>
                    </div>

                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-red-600 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{course.level}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">
                        N{course.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500">
                        One-time payment
                      </span>
                    </div>
                  </div>

                  {course.sections && (
                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Course Curriculum
                      </h4>
                      <div className="space-y-2">
                        {course.sections.map((section) => (
                          <div key={section.id} className="flex items-start">
                            <svg
                              className="w-4 h-4 text-red-600 mr-2 mt-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm text-gray-600">
                              {section.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
