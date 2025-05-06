import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Formik, Form, Field } from "formik";
import { registerSchema } from "@/schema/register.schema";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

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
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { register, isRegistering, registerError } = useAuth();

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
    console.log(values, "values");
    try {
      await register(values, {
        onSuccess: () => {
          toast.success("Registration successful");
          navigate("/onboarding");
        },
      });
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-red-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/">
          <img
            className="mx-auto h-16 w-auto"
            src="/logo.png"
            alt="Art School Logo"
          />
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link
            to="/login"
            className="font-medium text-red-600 hover:text-red-500"
          >
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting, values, handleChange }) => {
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
                          errors.confirmPassword && touched.confirmPassword
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
                      <a href="#" className="text-red-600 hover:text-red-500">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-red-600 hover:text-red-500">
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
                      {isRegistering ? "Creating account..." : "Create account"}
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}
