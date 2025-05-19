import CourseBuilder from "@/components/course-builder";

export default function AdminCoursesForm() {
  return <CourseBuilder />;
}

// import CustomInput from "@/components/shared/CustomInput";
// import CustomTextArea from "@/components/shared/CustomTextArea";
// import SelectDropDown from "@/components/shared/SelectDropDown";
// import { Form, Formik, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useState } from "react";
// import ImageUpload from "@/components/shared/ImageUpload";
// import FormFooter from "@/components/shared/FormFooter";
// import { Steps, StepsProvider, useSteps } from "react-step-builder";
// import HeadingList from "../../../components/shared/HeadingList";
// import Heading from "../../../components/shared/Header";
// import BasicInformation from "../../../components/admin/courses/BasicInformation";
// import { Bell } from "lucide-react";
// import SectionsForm from "../../../components/admin/courses/Module";
// import FinalStep from "../../../components/admin/courses/FinalStep";
// import { addSchoolSchema } from "../../../schema/add-school.schema";
// import { useCreateCourse } from "../../../hooks/admin/course.hook";

// export default function AdminCoursesForm() {
//   const { mutate: createCourse, isPending } = useCreateCourse();
//   const { prev } = useSteps();
//   const [showError, setShowError] = useState(false);

//   const firstValidation = (errors) => {
//     return !(
//       errors?.name ||
//       errors?.description ||
//       errors?.school ||
//       errors?.image
//     );
//   };

//   const secondValidation = (errors, values, touched) => {
//     return !(
//       (errors?.sections && touched?.sections) ||
//       !values.sections ||
//       values.sections.length === 0
//     );
//   };

//   const thirdValidation = (errors, values, touched) => {
//     return !(
//       (errors?.visibility && touched?.visibility) ||
//       (values.isPaid && errors?.price && touched?.price)
//     );
//   };

//   return (
//     <div>
//       <header className="bg-white shadow-sm">
//         <div className="flex justify-between items-center px-6 py-4">
//           <div>
//             <h1 className="text-xl font-semibold text-gray-800">Courses</h1>
//             <p className="text-sm text-gray-500">Welcome back, Admin</p>
//           </div>
//           <div className="flex items-center space-x-4">
//             <button className="text-gray-500 hover:text-gray-700">
//               <Bell className="h-5 w-5" />
//             </button>
//             <div className="h-8 w-8 rounded-full bg-gray-300 overflow-hidden">
//               <img
//                 src="/placeholder.svg?height=32&width=32"
//                 alt="Profile"
//                 width={32}
//                 height={32}
//                 className="h-full w-full object-cover"
//               />
//             </div>
//           </div>
//         </div>
//       </header>

//       <Formik
//         initialValues={{
//           name: "",
//           description: "",
//           image: "",
//           school: "",
//           sections: [
//             {
//               id: `section-${Math.random().toString(36).substring(2, 15)}`,
//               title: "",
//               contents: [
//                 {
//                   id: `content-${Math.random().toString(36).substring(2, 15)}`,
//                   type: "video",
//                   title: "Video Lecture",
//                   resources: [],
//                 },
//                 {
//                   id: `content-${Math.random().toString(36).substring(2, 15)}`,
//                   type: "material",
//                   title: "Course Materials",
//                   resources: [],
//                 },
//                 {
//                   id: `content-${Math.random().toString(36).substring(2, 15)}`,
//                   type: "quiz",
//                   title: "Quiz",
//                   data: {
//                     questions: [
//                       {
//                         id: `question-${Math.random()
//                           .toString(36)
//                           .substring(2, 15)}`,
//                         text: "New Question",
//                         type: "multiple-choice",
//                         options: [
//                           {
//                             id: `option-${Math.random()
//                               .toString(36)
//                               .substring(2, 15)}`,
//                             text: "Option 1",
//                             isCorrect: true,
//                           },
//                           {
//                             id: `option-${Math.random()
//                               .toString(36)
//                               .substring(2, 15)}`,
//                             text: "Option 2",
//                             isCorrect: false,
//                           },
//                         ],
//                       },
//                     ],
//                     timeLimit: 30,
//                     passingScore: 70,
//                   },
//                 },
//                 {
//                   id: `content-${Math.random().toString(36).substring(2, 15)}`,
//                   type: "assignment",
//                   title: "Assignment",
//                   data: {
//                     description: "Assignment description goes here...",
//                     dueDate: null,
//                     totalPoints: 100,
//                     submissionType: "file",
//                     allowedFileTypes: ["pdf", "doc", "docx"],
//                     maxFileSize: 10,
//                     gradingCriteria: "",
//                   },
//                 },
//               ],
//             },
//           ],
//           price: 0,
//           isPaid: false,
//           visibility: "draft",
//         }}
//         validationSchema={addSchoolSchema}
//         onSubmit={(values) => {
//           createCourse(values);
//         }}
//         enableReinitialize
//         validateOnMount
//       >
//         {({ values, errors, touched, handleSubmit }) => {
//           const steps = [
//             {
//               label: "Course Details",
//               component: (
//                 <BasicInformation
//                   showError={showError}
//                   footerButtons={
//                     <FormFooter
//                       onCancel={() => {}}
//                       setError={(bool) => setShowError(bool)}
//                       validation={() => {
//                         return firstValidation(errors);
//                       }}
//                       values={values}
//                     />
//                   }
//                 />
//               ),
//             },
//             {
//               label: "Course Content",
//               component: (
//                 <SectionsForm
//                   errors={errors}
//                   touched={touched}
//                   formFooter={
//                     <FormFooter
//                       onCancel={prev}
//                       values={values}
//                       setError={(bool) => setShowError(bool)}
//                       validation={() => {
//                         return secondValidation(errors, values, touched);
//                       }}
//                     />
//                   }
//                 />
//               ),
//             },
//             {
//               label: "Course Settings & Visibility",
//               component: (
//                 <FinalStep
//                   errors={errors}
//                   touched={touched}
//                   formFooter={
//                     <FormFooter
//                       onCancel={prev}
//                       values={values}
//                       setError={(bool) => setShowError(bool)}
//                       isSubmitting={isPending}
//                       handleSubmit={handleSubmit}
//                       validation={() => {
//                         return thirdValidation(errors, values, touched);
//                       }}
//                     />
//                   }
//                 />
//               ),
//             },
//           ];

//           return (
//             <Form>
//               <StepsProvider>
//                 <div className="m-auto w-[70%] p-10">
//                   <Heading
//                     isDisabled
//                     stepNames={steps.map((step) => step.label)}
//                   />
//                   <Steps startsFrom={1}>
//                     {steps.map((step) => (
//                       <div className="bg-white p-10">
//                         <h1 className="text-2xl font-bold">{step.label}</h1>
//                         <div>{step.component}</div>
//                       </div>
//                     ))}
//                   </Steps>
//                 </div>
//               </StepsProvider>
//             </Form>
//           );
//         }}
//       </Formik>
//     </div>
//   );
// }
