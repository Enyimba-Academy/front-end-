"use client";
import { Calendar, Upload, LinkIcon } from "lucide-react";
import CustomTextArea from "../../shared/CustomTextArea";
import CustomInput from "../../shared/CustomInput";
import CustomDatePicker from "../../shared/CustomDatePicker";
import PrimaryButton from "../../shared/PrimaryButton";

export default function AssignmentEditor({ data = {}, onChange }) {
  // Initialize with default values if data is undefined or missing properties
  const assignmentData = {
    description: data?.description || "Assignment description goes here...",
    dueDate: data?.dueDate || null,
    totalPoints: data?.totalPoints || 100,
    submissionType: data?.submissionType || "file",
    allowedFileTypes: data?.allowedFileTypes || ["pdf", "doc", "docx"],
    maxFileSize: data?.maxFileSize || 10,
    gradingCriteria: data?.gradingCriteria || "",
  };

  const handleChange = (field, value) => {
    onChange({ ...assignmentData, [field]: value });
  };

  const handleFileTypeToggle = (fileType) => {
    const updatedFileTypes = assignmentData.allowedFileTypes.includes(fileType)
      ? assignmentData.allowedFileTypes.filter((type) => type !== fileType)
      : [...assignmentData.allowedFileTypes, fileType];

    onChange({ ...assignmentData, allowedFileTypes: updatedFileTypes });
  };

  const handleSubmissionTypeChange = (type) => {
    onChange({ ...assignmentData, submissionType: type });
  };

  return (
    <div className="mt-4 border-t border-gray-200 pt-4">
      <CustomTextArea
        label="Assignment Description"
        value={assignmentData.description}
        onChange={(e) => handleChange("description", e.target.value)}
        rows={6}
        placeholder="Provide detailed instructions for the assignment..."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <CustomDatePicker
          label="Due Date"
          value={assignmentData.dueDate}
          onChange={(e) => handleChange("dueDate", e.target.value)}
        />
        <CustomInput
          label="Total Points"
          value={assignmentData.totalPoints}
          onChange={(e) => handleChange("totalPoints", e.target.value)}
          type="number"
          min="0"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Submission Type
        </label>
        <div className="flex flex-wrap gap-3">
          <PrimaryButton
            type="button"
            onClick={() => handleSubmissionTypeChange("file")}
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${
              assignmentData.submissionType === "file"
                ? "bg-red-50 text-red-600 border border-red-200"
                : "border border-gray-300 text-gray-700 bg-white"
            }`}
          >
            <Upload className="w-4 h-4" /> File Upload
          </PrimaryButton>
          <PrimaryButton
            type="button"
            onClick={() => handleSubmissionTypeChange("text")}
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${
              assignmentData.submissionType === "text"
                ? "bg-red-50 text-red-600 border border-red-200"
                : "border border-gray-300 text-gray-700 bg-white"
            }`}
          >
            <span className="font-mono">T</span> Text Entry
          </PrimaryButton>
          <PrimaryButton
            type="button"
            onClick={() => handleSubmissionTypeChange("link")}
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${
              assignmentData.submissionType === "link"
                ? "bg-red-50 text-red-600 border border-red-200"
                : "border border-gray-300 text-gray-700 bg-white"
            }`}
          >
            <LinkIcon className="w-4 h-4" /> URL Link
          </PrimaryButton>
        </div>
      </div>

      {assignmentData.submissionType === "file" && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Allowed File Types
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                "pdf",
                "doc",
                "docx",
                "jpg",
                "png",
                "zip",
                "ppt",
                "pptx",
                "xls",
                "xlsx",
              ].map((type) => (
                <PrimaryButton
                  key={type}
                  type="button"
                  onClick={() => handleFileTypeToggle(type)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    assignmentData.allowedFileTypes.includes(type)
                      ? "bg-red-50 text-red-600 border border-red-200"
                      : "border border-gray-300 text-gray-700 bg-white"
                  }`}
                >
                  .{type}
                </PrimaryButton>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <CustomInput
              type="number"
              label="Max File Size (MB)"
              value={assignmentData.maxFileSize}
              onChange={(e) =>
                handleChange(
                  "maxFileSize",
                  Number.parseInt(e.target.value) || 1
                )
              }
              className="w-full px-3 py-2 border rounded-md"
              min="1"
              maxLength="100"
            />
          </div>
        </>
      )}

      <div className="mb-4">
        <CustomTextArea
          value={assignmentData.gradingCriteria || ""}
          onChange={(e) => handleChange("gradingCriteria", e.target.value)}
          rows={6}
          label="Grading Criteria"
          placeholder="Describe how this assignment will be graded..."
        />
      </div>
    </div>
  );
}
