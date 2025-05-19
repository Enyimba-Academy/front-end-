import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAddSchool,
  useGetSchoolById,
} from "../../../hooks/admin/school.hook";

import { useParams } from "react-router";
import ImageUpload from "@/components/shared/ImageUpload";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const validationSchema = Yup.object().shape({
  name: Yup.string().required("School name is required"),
  description: Yup.string().required("School description is required"),

  image: Yup.string().optional(),
  is_deleted: Yup.boolean().optional(),
});

export default function AdminSchoolForm() {
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const { addSchool, isLoading } = useAddSchool();
  const { school, isLoading: isLoadingSchool } = useGetSchoolById(id);

  const initialValues = {
    name: school?.name || "",
    description: school?.description || "",
    image: school?.coverImage || "",
    is_deleted: school?.is_deleted || false,
  };

  const handleSubmit = async (values) => {
    try {
      const schoolData = {
        ...values,

        coverImage: values.image,
      };
      addSchool(schoolData, {
        onSuccess: () => {
          toast.success("School created successfully");
          navigate("/admin/school");
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  if (isLoadingSchool) {
    return (
      <div className="mx-auto my-3 bg-white rounded-lg shadow-sm p-6 w-[50%] space-y-6">
        <Skeleton className="h-8 w-1/3" />
        <div className="space-y-4">
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto my-3 bg-white rounded-lg shadow-sm p-6 w-[50%]">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Add New School
      </h2>

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div
            className={`flex items-center ${
              currentStep >= 1 ? "text-red-600" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 1 ? "bg-red-600 text-white" : "bg-gray-200"
              }`}
            >
              1
            </div>
            <span className="ml-2">School Information</span>
          </div>

          <div
            className={`flex items-center ${
              currentStep >= 2 ? "text-red-600" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 2 ? "bg-red-600 text-white" : "bg-gray-200"
              }`}
            >
              2
            </div>
            <span className="ml-2">Status</span>
          </div>
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form className="space-y-6">
            {currentStep === 1 && (
              <>
                {/* Featured Image Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Featured Image
                  </label>
                  <ImageUpload />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    School Name
                  </label>
                  <Field
                    name="name"
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    placeholder="e.g. School of Photography & Cinematography"
                    value={values.name}
                    onChange={(e) => setFieldValue("name", e.target.value)}
                  />
                  {errors.name && touched.name && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    School Description
                  </label>
                  <Field
                    name="description"
                    as="textarea"
                    rows={4}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    placeholder="Provide a detailed description of the school..."
                    value={values.description}
                    onChange={(e) =>
                      setFieldValue("description", e.target.value)
                    }
                  />
                  {errors.description && touched.description && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.description}
                    </div>
                  )}
                </div>
              </>
            )}

            {currentStep === 2 && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <Field
                  as="select"
                  name="is_active"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Field>
                {errors.is_active && touched.is_active && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.is_active}
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <ArrowLeft className="w-4 h-4 inline mr-2" />
                  Previous
                </button>
              )}
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Next
                  <ArrowRight className="w-4 h-4 inline ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  {isLoading ? "Creating..." : "Create School"}
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
