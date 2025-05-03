import PrimaryButton from "../../shared/PrimaryButton";
import CustomInput from "../../shared/CustomInput";
import { EyeOff, Link, Eye } from "lucide-react";
import { useState } from "react";
const visibilityOptions = [
  {
    label: "Draft",
    value: "draft",
    icon: EyeOff,
    subLabel: "Only you can see this course",
  },
  {
    label: "Published",
    value: "published",
    icon: Eye,
    subLabel: "Visible to everyone",
  },
  {
    label: "Unlisted",
    value: "unlisted",
    icon: Link,
    subLabel: "Only accessible via link",
  },
];
export default function FinalStep({ formFooter }) {
  const [visibility, setVisibility] = useState("draft");
  const [isPaid, setIsPaid] = useState(false);
  return (
    <div className="space-y-4 mt-4">
      <div className="space-y-4 border-b border-gray-200 pb-4">
        <p className="text-[#1F2937] text-lg font-semibold">Pricing</p>
        <div className="border border-[#E5E7EB] bg-[#F9FAFB] flex justify-between p-2 items-center rounded-md">
          <div className="flex gap-3 justify-center items-center">
            <PrimaryButton
              onClick={() => setIsPaid(false)}
              className={`${
                !isPaid
                  ? "bg-primary text-white"
                  : "bg-transparent border border-gray-300 text-[#1F2937]"
              }`}
            >
              Free
            </PrimaryButton>
            <PrimaryButton
              onClick={() => setIsPaid(true)}
              className={`${
                isPaid
                  ? "bg-primary text-white"
                  : "bg-transparent border border-gray-300 text-[#1F2937]"
              }`}
            >
              Paid
            </PrimaryButton>
          </div>
          <div className="flex gap-3 items-center justify-center text-[#6B7280]">
            <p>Course Price:</p>
            <CustomInput
              disabled={!isPaid}
              type="number"
              placeholder="0"
              name="price"
              className={`w-[120px] bg-transparent self-end ${
                !isPaid ? "bg-gray-200 cursor-not-allowed" : ""
              }`}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 border-b border-gray-200 pb-4">
        <p className="text-[#1F2937] text-lg font-semibold">Visibility</p>
        <div className="flex gap-2 border border-gray-200 rounded-md">
          {visibilityOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => setVisibility(option.value)}
              className={`flex gap-2  flex-col border border-gray-200 rounded-md p-4 flex-1  cursor-pointer ${
                visibility === option.value
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex gap-2 items-center justify-between">
                <p className="text-[#1F2937]  font-medium">{option.label}</p>
                {
                  <option.icon
                    className={`w-[20px] h-[20px] text-[#6B7280] ${
                      visibility === option.value ? "text-[#C80000]" : ""
                    }`}
                  />
                }
              </div>
              <p className="text-[#6B7280] text-sm">{option.subLabel}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4   pb-4">
        <p className="text-[#1F2937] text-lg font-semibold">Course Preview</p>
        <div className="flex gap-2 border border-[#E5E7EB] bg-[#F9FAFB] rounded-md p-4  items-center">
          <div className="flex gap-2 ">
            <div className="w-24 h-24 bg-red-500 rounded-lg"></div>
            <div className="flex flex-col gap-2 items-start">
              <p className="text-[#1F2937] text-lg font-semibold">
                Drone Cinematography 101
              </p>
              <p className="text-[#6B7280] font-normal">
                5 Sections • 12 Lessons
              </p>
              <div className="flex gap-2 items-center">
                <p className="text-primary text-sm font-medium">₦15,000</p>•
                <p className=" text-sm text-green-500">Ready to publish</p>
              </div>
              <p></p>
            </div>
          </div>
        </div>
      </div>
      {formFooter}
    </div>
  );
}
