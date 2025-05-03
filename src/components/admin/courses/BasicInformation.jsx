import CustomInput from "@/components/shared/CustomInput";
import CustomTextArea from "@/components/shared/CustomTextArea";
import SelectDropDown from "@/components/shared/SelectDropDown";
import ImageUpload from "@/components/shared/ImageUpload";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { useFormikContext } from "formik";
import { useGetSchools } from "../../../hooks/admin/school.hook";
import { useMemo } from "react";

export default function BasicInformation({ showError, footerButtons }) {
  const { values, handleChange, errors, touched, handleBlur, setFieldValue } =
    useFormikContext();
  const { schools, isLoading } = useGetSchools({
    filters: true,
  });
  const schoolOptions = useMemo(() => {
    return schools?.data?.map((school) => ({
      label: school?.name,
      value: school?.id,
    }));
  }, [schools]);
  if (isLoading) return <h1>Loading...</h1>;

  console.log("schools", schools);

  return (
    <div className="space-y-6">
      <div>
        <CustomInput
          label="Course Title"
          name="name"
          type="text"
          placeholder="Example: Master Portrait Photography"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={100}
          required
        />
        {errors?.name && <ErrorMessage>{errors.name}</ErrorMessage>}
      </div>

      <div>
        <CustomTextArea
          label="Course Description"
          name="description"
          placeholder="e.g. Photography is a course that teaches you how to take photos"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={500}
          rows={6}
          required
        />
        {errors?.description && (
          <ErrorMessage>{errors.description}</ErrorMessage>
        )}
      </div>

      <div>
        <SelectDropDown
          label="School"
          name="school"
          options={schoolOptions}
          onChange={(value) => setFieldValue("school", value)}
          onBlur={handleBlur}
          required
        />
        {showError && errors?.school && touched?.school && (
          <ErrorMessage>{errors.school}</ErrorMessage>
        )}
      </div>

      <div>
        <ImageUpload label="Course Image" />
        {showError && errors?.image && touched?.image && (
          <ErrorMessage>{errors.image}</ErrorMessage>
        )}
      </div>

      {footerButtons}
    </div>
  );
}
