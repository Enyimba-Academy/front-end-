"use client";
import { Calendar, Upload, LinkIcon } from "lucide-react";

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
    <div className="mt-4 border-t pt-4">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Assignment Description
        </label>
        <textarea
          value={assignmentData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          rows={4}
          placeholder="Provide detailed instructions for the assignment..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">Due Date</label>
          <div className="relative">
            <input
              type="date"
              value={assignmentData.dueDate || ""}
              onChange={(e) => handleChange("dueDate", e.target.value)}
              className="w-full px-3 py-2 border rounded-md pl-10"
            />
            <Calendar className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Total Points</label>
          <input
            type="number"
            value={assignmentData.totalPoints}
            onChange={(e) =>
              handleChange("totalPoints", Number.parseInt(e.target.value) || 0)
            }
            className="w-full px-3 py-2 border rounded-md"
            min="0"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Submission Type
        </label>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => handleSubmissionTypeChange("file")}
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${
              assignmentData.submissionType === "file"
                ? "bg-red-50 text-red-600 border border-red-200"
                : "border border-gray-300 text-gray-700"
            }`}
          >
            <Upload className="w-4 h-4" /> File Upload
          </button>
          <button
            type="button"
            onClick={() => handleSubmissionTypeChange("text")}
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${
              assignmentData.submissionType === "text"
                ? "bg-red-50 text-red-600 border border-red-200"
                : "border border-gray-300 text-gray-700"
            }`}
          >
            <span className="font-mono">T</span> Text Entry
          </button>
          <button
            type="button"
            onClick={() => handleSubmissionTypeChange("link")}
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${
              assignmentData.submissionType === "link"
                ? "bg-red-50 text-red-600 border border-red-200"
                : "border border-gray-300 text-gray-700"
            }`}
          >
            <LinkIcon className="w-4 h-4" /> URL Link
          </button>
        </div>
      </div>

      {assignmentData.submissionType === "file" && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
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
                <button
                  key={type}
                  type="button"
                  onClick={() => handleFileTypeToggle(type)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    assignmentData.allowedFileTypes.includes(type)
                      ? "bg-red-50 text-red-600 border border-red-200"
                      : "border border-gray-300 text-gray-700"
                  }`}
                >
                  .{type}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Max File Size (MB)
            </label>
            <input
              type="number"
              value={assignmentData.maxFileSize}
              onChange={(e) =>
                handleChange(
                  "maxFileSize",
                  Number.parseInt(e.target.value) || 1
                )
              }
              className="w-full px-3 py-2 border rounded-md"
              min="1"
              max="100"
            />
          </div>
        </>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Grading Criteria
        </label>
        <textarea
          value={assignmentData.gradingCriteria || ""}
          onChange={(e) => handleChange("gradingCriteria", e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          rows={3}
          placeholder="Describe how this assignment will be graded..."
        />
      </div>
    </div>
  );
}
