import CustomInput from "@/components/shared/CustomInput";
import CustomTextArea from "@/components/shared/CustomTextArea";
import SelectDropDown from "@/components/shared/SelectDropDown";
import ImageUpload from "@/components/shared/ImageUpload";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { useFormikContext } from "formik";

export default function BasicInformation({ showError, footerButtons }) {
  const { values, handleChange, errors, touched, handleBlur, setFieldValue } =
    useFormikContext();

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
        <ImageUpload label="Course Image" />
        {showError && errors?.image && touched?.image && (
          <ErrorMessage>{errors.image}</ErrorMessage>
        )}
      </div>

      {footerButtons}
    </div>
  );
}
