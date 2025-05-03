import CustomInput from "@/components/shared/CustomInput";
import CustomTextArea from "@/components/shared/CustomTextArea";
import SelectDropDown from "@/components/shared/SelectDropDown";
import { Form, Formik, ErrorMessage } from "formik";
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
import { addSchoolSchema } from "../../../schema/add-school.schema";

export default function AdminCoursesForm() {
  const [file, setFile] = useState(null);
  const { prev } = useSteps();
  const [showError, setShowError] = useState(false);

  const firstValidation = (errors) => {
    return !(
      errors?.name ||
      errors?.description ||
      errors?.school ||
      errors?.image
    );
  };

  const secondValidation = (errors, values, touched) => {
    return !(
      (errors?.sections && touched?.sections) ||
      !values.sections ||
      values.sections.length === 0
    );
  };

  const thirdValidation = (errors, values, touched) => {
    return !(
      (errors?.visibility && touched?.visibility) ||
      (values.isPaid && errors?.price && touched?.price)
    );
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
          school: "",
          sections: [],
          price: 0,
          isPaid: false,
          visibility: "draft",
        }}
        validationSchema={addSchoolSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
        enableReinitialize
        validateOnMount
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
          setSubmitting,

          validateField,
        }) => {
          console.log("Formik - Errors:", errors);
          console.log("Formik - Touched:", touched);
          console.log("Formik - Values:", values);
          const steps = [
            {
              label: "Course Details",
              component: (
                <BasicInformation
                  showError={showError}
                  footerButtons={
                    <FormFooter
                      onCancel={() => {}}
                      setError={(bool) => setShowError(bool)}
                      validation={() => {
                        return firstValidation(errors);
                      }}
                      values={values}
                    />
                  }
                />
              ),
            },
            {
              label: "Course Content",
              component: (
                <SectionsForm
                  errors={errors}
                  touched={touched}
                  formFooter={
                    <FormFooter
                      onCancel={prev}
                      values={values}
                      validation={() => {
                        return secondValidation(errors, values, touched);
                      }}
                    />
                  }
                />
              ),
            },
            {
              label: "Course Settings & Visibility",
              component: (
                <FinalStep
                  errors={errors}
                  touched={touched}
                  formFooter={
                    <FormFooter
                      onCancel={prev}
                      values={values}
                      validation={() => {
                        return thirdValidation(errors, values, touched);
                      }}
                    />
                  }
                />
              ),
            },
          ];

          return (
            <Form>
              <StepsProvider>
                <div className="m-auto w-[70%] p-10">
                  <Heading
                    isDisabled
                    stepNames={steps.map((step) => step.label)}
                  />
                  <Steps startsFrom={1}>
                    {steps.map((step) => (
                      <div className="bg-white p-10">
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
