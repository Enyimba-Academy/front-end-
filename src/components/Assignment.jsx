import { FileText, Clock } from "lucide-react";

const UploadIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    />
  </svg>
);

export const Assignment = ({ assignment }) => {
  return assignment ? (
    <div className="w-full bg-white rounded-md shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
          <FileText size={24} className="text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Assignment</h3>
      </div>

      <div className="mb-6 pb-6 border-b border-gray-200">
        <h4 className="text-lg font-medium text-gray-700 mb-2">Instructions</h4>
        <p className="text-gray-600">
          {assignment?.instructions ||
            "Complete this assignment to apply what you've learned."}
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-center mb-2">
          <Clock className="w-5 h-5 text-gray-500 mr-2" />
          <span className="text-sm text-gray-600">
            Due Date: {assignment?.dueDate || "No due date"}
          </span>
        </div>
        <div className="flex items-center">
          <UploadIcon className="w-5 h-5 text-gray-500 mr-2" />
          <span className="text-sm text-gray-600">
            Submission Type: {assignment?.submissionType || "File upload"}
          </span>
        </div>
        {assignment?.allowedFileTypes && (
          <div className="mt-2 text-sm text-gray-600">
            <span>
              Allowed file types:{" "}
              {Array.isArray(assignment?.allowedFileTypes)
                ? assignment.allowedFileTypes.join(", ")
                : assignment.allowedFileTypes}
            </span>
          </div>
        )}
        {assignment?.maxFileSize && (
          <div className="mt-1 text-sm text-gray-600">
            <span>Maximum file size: {assignment?.maxFileSize}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors">
          Submit Assignment
        </button>
        <button className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors">
          Download Instructions
        </button>
      </div>
    </div>
  ) : null;
};
