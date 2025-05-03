import CustomInput from "@/components/shared/CustomInput";
import CustomTextArea from "@/components/shared/CustomTextArea";
import SelectDropDown from "@/components/shared/SelectDropDown";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import ImageUpload from "@/components/shared/ImageUpload";
import FormFooter from "@/components/shared/FormFooter";
import { Steps, StepsProvider, useSteps } from "react-step-builder";
import HeadingList from "../../../components/shared/HeadingList";
import Heading from "../../../components/shared/Header";
import BasicInformation from "../../../components/admin/courses/BasicInformation";
import { Bell } from "lucide-react";
import SectionsForm from "../../../components/admin/courses/Module";
import FinalStep from "../../../components/admin/courses/FinalStep";

export default function AdminCoursesForm() {
  const [file, setFile] = useState(null);
  const [_, setError] = useState({});
  const { prev } = useSteps();

  const firstValidation = (errors) => {
    return !(errors?.name || errors?.description || errors?.image);
  };

  return (
    <div>
      <header className="bg-white shadow-sm">
        <div className="flex justify-between items-center px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Courses</h1>
            <p className="text-sm text-gray-500">Welcome back, Admin</p>
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

      <Formik
        initialValues={{
          name: "",
          description: "",
          image: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required("Course name is required")
            .max(100, "Course name must be less than 100 characters"),
          description: Yup.string()
            .required("Course description is required")
            .max(500, "Course description must be less than 500 characters"),
          image: Yup.string().required("Course image is required"),
        })}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => {
          const steps = [
            {
              label: "Course Details",
              component: (
                <BasicInformation
                  file={file}
                  setFile={setFile}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  values={values}
                  errors={errors}
                  touched={touched}
                  footerButtons={
                    <FormFooter
                      onCancel={() => {}}
                      values={values}
                      validation={() => {
                        return firstValidation(errors);
                      }}
                      setError={(bool) => setError(bool)}
                    />
                  }
                />
              ),
            },
            {
              label: "Course Content",
              component: (
                <SectionsForm
                  formFooter={
                    <FormFooter
                      onCancel={prev}
                      values={values}
                      validation={() => {
                        return firstValidation(errors);
                      }}
                      setError={(bool) => setError(bool)}
                    />
                  }
                />
              ),
            },
            {
              label: "Course Settings & Visibility",
              component: (
                <FinalStep
                  formFooter={
                    <FormFooter
                      onCancel={prev}
                      values={values}
                      setError={(bool) => setError(bool)}
                    />
                  }
                />
              ),
            },
          ];

          return (
            <Form>
              <StepsProvider>
                <div className="m-auto w-1/2   p-10">
                  <Heading
                    isDisabled
                    stepNames={steps.map((step) => step.label)}
                  />
                  <Steps startsFrom={1}>
                    {steps.map((step) => (
                      <div className="  bg-white p-10">
                        <h1 className="text-2xl font-bold">{step.label}</h1>
                        <div>{step.component}</div>
                      </div>
                    ))}
                  </Steps>
                </div>
              </StepsProvider>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
