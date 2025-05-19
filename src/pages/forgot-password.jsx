import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { requestResetSchema } from "@/schema/resetPassword.schema";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";

export default function ForgotPasswordPage() {
  const {
    requestPasswordReset,
    isRequestingPasswordReset,
    requestPasswordResetError,
  } = useAuth();

  const initialValues = {
    email: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await requestPasswordReset(values.email, {
        onSuccess: () => {
          toast.success("Password reset link sent to your email");
          resetForm();
        },
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-red-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/">
          <img
            className="mx-auto h-16 w-auto"
            src="/logo.png"
            alt="Art School Logo"
          />
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Forgot your password?
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {requestPasswordResetError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {requestPasswordResetError.message}
            </div>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={requestResetSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-6">
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
                  <button
                    type="submit"
                    disabled={isRequestingPasswordReset || isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                  >
                    {isRequestingPasswordReset
                      ? "Sending..."
                      : "Send reset link"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="font-medium text-red-600 hover:text-red-500"
            >
              Return to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
