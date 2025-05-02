import { useState } from "react";
import {
  ImageIcon,
  MapPin,
  Phone,
  Upload,
  X,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { toast } from "react-toastify";
import {
  useAddSchool,
  useGetSchoolById,
} from "../../../hooks/admin/school.hook";
import { useUploadImage } from "../../../hooks/image";
import { useParams } from "react-router";
const validationSchema = Yup.object().shape({
  name: Yup.string().required("School name is required"),
  description: Yup.string().required("School description is required"),
  logo: Yup.string().optional(),
  coverImage: Yup.string().optional(),
  is_active: Yup.boolean().optional(),
  slug: Yup.string().optional(),
  certificates: Yup.array().of(
    Yup.object().shape({
      program_name: Yup.string().required("Program name is required"),
      program_type: Yup.string().required("Program type is required"),
      duration: Yup.number()
        .required("Duration is required")
        .positive("Duration must be positive"),
    })
  ),
});

export default function AdminSchoolForm() {
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [schoolLogo, setSchoolLogo] = useState(null);
  const [featuredImage, setFeaturedImage] = useState(null);
  const { addSchool, isLoading } = useAddSchool();
  const { school, isLoading: isLoadingSchool, error } = useGetSchoolById(id);
  const { isUploading, progress, mutate: uploadImage } = useUploadImage();
  const [logoUrl, setLogoUrl] = useState(null);
  const [featuredUrl, setFeaturedUrl] = useState(null);
  console.log(school?.name);
  const initialValues = {
    name: school?.name || "",
    description: school?.description || "",
    logo: school?.logo || "",
    coverImage: school?.coverImage || "",
    is_active: school?.is_active || true,
    slug: school?.slug || "",
    certificates: school?.certificates || [
      {
        program_name: "",
        program_type: "",
        duration: "",
      },
    ],
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSchoolLogo(reader.result);
        };
        reader.readAsDataURL(file);

        // Upload the image to the server
        uploadImage(
          { file, folder: "school" },
          {
            onSuccess: (data) => {
              setLogoUrl(data.file.path);
              console.log(data.file);
            },
            onError: (error) => {
              toast.error("Failed to upload logo");
            },
          }
        );
      } catch (error) {
        console.error("Error uploading logo:", error);
        setSchoolLogo(null);
        toast.error("Failed to upload logo");
      }
    }
  };

  const handleFeaturedImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFeaturedImage(reader.result);
        };
        reader.readAsDataURL(file);

        // Upload the image to the server
        uploadImage(
          { file, folder: "school" },
          {
            onSuccess: (data) => {
              setFeaturedUrl(data.file.path);
              console.log(data);
            },
            onError: (error) => {
              console.log(error);
            },
          }
        );
      } catch (error) {
        console.error("Error uploading featured image:", error);
        setFeaturedImage(null);
      }
    }
  };

  const handleSubmit = async (values) => {
    try {
      const schoolData = {
        ...values,
        logo: logoUrl,
        coverImage: featuredUrl,
      };
      await addSchool(schoolData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);
  console.log(logoUrl, featuredUrl);
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
            <span className="ml-2">Programs</span>
          </div>
          <div
            className={`flex items-center ${
              currentStep >= 3 ? "text-red-600" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 3 ? "bg-red-600 text-white" : "bg-gray-200"
              }`}
            >
              3
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                  {/* School Logo Upload */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      School Logo
                    </label>
                    <div className="flex items-center justify-center w-full">
                      {schoolLogo ? (
                        <div className="relative w-full h-32">
                          <img
                            src={schoolLogo}
                            alt="School logo preview"
                            className="h-full object-contain"
                          />
                          <button
                            type="button"
                            onClick={() => setSchoolLogo(null)}
                            className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                            disabled={isUploading}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">
                              <span className="font-semibold">
                                Click to upload logo
                              </span>
                            </p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            disabled={isUploading}
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Featured Image Upload */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Featured Image
                    </label>
                    <div className="flex items-center justify-center w-full">
                      {featuredImage ? (
                        <div className="relative w-full h-32">
                          <img
                            src={featuredImage}
                            alt="Featured image preview"
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => setFeaturedImage(null)}
                            className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                            disabled={isUploading}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">
                              <span className="font-semibold">
                                Click to upload image
                              </span>
                            </p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFeaturedImageUpload}
                            disabled={isUploading}
                          />
                        </label>
                      )}
                    </div>
                  </div>
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
                    value={school?.name || ""}
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
                    value={school?.description || ""}
                  />
                  {errors.description && touched.description && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.description}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      School Director
                    </label>
                    <Field
                      name="director"
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                      placeholder="e.g. Jane Doe"
                    />
                    {errors.director && touched.director && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.director}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <Field
                      name="email"
                      type="email"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                      placeholder="e.g. photography@artschool.com"
                      value={school?.email || ""}
                    />
                    {errors.email && touched.email && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        name="phone"
                        type="tel"
                        className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        placeholder="e.g. +234 123 456 7890"
                        value={school?.phone || ""}
                      />
                    </div>
                    {errors.phone && touched.phone && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        name="location"
                        type="text"
                        className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        placeholder="e.g. Lagos, Nigeria"
                        value={school?.location || ""}
                      />
                    </div>
                    {errors.location && touched.location && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.location}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    School Programs
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      const newPrograms = [
                        ...values.certificates,
                        { program_name: "", program_type: "", duration: "" },
                      ];
                      setFieldValue("certificates", newPrograms);
                    }}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                  >
                    Add Program
                  </button>
                </div>

                <div className="space-y-4">
                  {values.certificates?.map((_, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-md p-4"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium text-gray-700">
                          Program {index + 1}
                        </h4>
                        {values.certificates.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const newPrograms = values.certificates.filter(
                                (_, i) => i !== index
                              );
                              setFieldValue("certificates", newPrograms);
                            }}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Program Name
                          </label>
                          <Field
                            name={`certificates.${index}.program_name`}
                            type="text"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                            placeholder="e.g. Professional Certificate in Photography"
                          />
                          {errors.certificates?.[index]?.program_name &&
                            touched.certificates?.[index]?.program_name && (
                              <div className="text-red-500 text-sm mt-1">
                                {errors.certificates[index].program_name}
                              </div>
                            )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Program Type
                          </label>
                          <Field
                            as="select"
                            name={`certificates.${index}.program_type`}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                          >
                            <option value="">Select program type</option>
                            <option value="certificate">Certificate</option>
                            <option value="diploma">Diploma</option>
                            <option value="degree">Degree</option>
                            <option value="workshop">Workshop</option>
                          </Field>
                          {errors.certificates?.[index]?.program_type &&
                            touched.certificates?.[index]?.program_type && (
                              <div className="text-red-500 text-sm mt-1">
                                {errors.certificates[index].program_type}
                              </div>
                            )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Duration
                          </label>
                          <Field
                            name={`certificates.${index}.duration`}
                            type="number"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                            placeholder="e.g. 3"
                          />
                          {errors.certificates?.[index]?.duration &&
                            touched.certificates?.[index]?.duration && (
                              <div className="text-red-500 text-sm mt-1">
                                {errors.certificates[index].duration}
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
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
                  disabled={isUploading}
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
                  disabled={isUploading}
                >
                  Next
                  <ArrowRight className="w-4 h-4 inline ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  disabled={isUploading}
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
