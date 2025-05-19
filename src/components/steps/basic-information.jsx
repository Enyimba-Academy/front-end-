import { useFormikContext } from "formik";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import ImageUpload from "../shared/ImageUpload";
import ErrorMessage from "../shared/ErrorMessage";
import levelEnum from "@/constant/levelEnum";
import { useGetSchools } from "@/hooks/admin/school.hook";

export default function BasicInformation({ showErrors, onContinue }) {
  const { values, errors, touched, handleChange, setFieldValue } =
    useFormikContext();
  const { schools } = useGetSchools();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-6">Course Details</h2>
        <p className="text-gray-500 mb-6">
          Provide the basic information about your course.
        </p>
      </div>

      <div>
        <Label htmlFor="name" className="text-base">
          Course Title <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Example: Master Portrait Photography"
          className="mt-1"
        />
        {(showErrors || touched.name) && errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description" className="text-base">
          Course Description <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="description"
          name="description"
          value={values.description}
          onChange={handleChange}
          placeholder="Describe what students will learn in this course"
          className="mt-1"
          rows={5}
        />
        {(showErrors || touched.description) && errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      <div className="w-full flex flex-col gap-2">
        <Label htmlFor="school" className="text-base">
          School <span className="text-red-500">*</span>
        </Label>
        <Select
          id="school"
          name="school"
          value={values.school}
          onValueChange={(value) => setFieldValue("school", value)}
          className="w-full flex-1"
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a school" />
          </SelectTrigger>
          <SelectContent>
            {schools?.schools?.map((school) => (
              <SelectItem key={school?.id} value={school?.id}>
                {school?.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {(showErrors || touched.school) && errors.school && (
          <p className="text-red-500 text-sm mt-1">{errors.school}</p>
        )}
      </div>

      <div className="w-full flex flex-col gap-2">
        <Label htmlFor="level" className="text-base">
          Level <span className="text-red-500">*</span>
        </Label>
        <Select
          id="level"
          name="level"
          value={values.level}
          onValueChange={(value) => setFieldValue("level", value)}
          className="w-full flex-1"
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a level" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(levelEnum).map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {(showErrors || touched.level) && errors.level && (
          <p className="text-red-500 text-sm mt-1">{errors.level}</p>
        )}
      </div>

      <div>
        <ImageUpload label="Course Image" />
        {errors?.image && touched?.image && (
          <ErrorMessage>{errors.image}</ErrorMessage>
        )}
      </div>

      <div className="pt-4 flex justify-end">
        <Button type="button" onClick={onContinue} className="px-6">
          Continue
        </Button>
      </div>
    </div>
  );
}
