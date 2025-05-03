import CustomInput from "@/components/shared/CustomInput";
import CustomTextArea from "@/components/shared/CustomTextArea";
import SelectDropDown from "@/components/shared/SelectDropDown";
import ImageUpload from "@/components/shared/ImageUpload";

export default function BasicInformation({
  file,
  setFile,
  footerButtons,
  values,
  handleChange,
  handleBlur,
}) {
  return (
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
      />
      <CustomTextArea
        label="Course Description"
        name="description"
        placeholder="e.g. Photography is a course that teaches you how to take photos"
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
        maxLength={500}
        rows={6}
      />

      <SelectDropDown
        label="School"
        name="school"
        options={[]}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <div className="w-full">
        <ImageUpload label="Course Image" file={file} setFile={setFile} />
      </div>
      {footerButtons}
    </div>
  );
}
