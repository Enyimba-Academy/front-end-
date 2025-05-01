import { useState } from "react";

// Reusable component for image with fallback
const ImageWithFallback = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  const fallbackImage = "/placeholder.svg?height=200&width=200";

  // Format image URL if it's from localhost
  const formattedSrc = src?.startsWith("http")
    ? src
    : `http://localhost:4000${src?.startsWith("/") ? "" : "/"}${src}`;

  return (
    <img
      src={error ? fallbackImage : formattedSrc}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
};

// Status badge component
const StatusBadge = ({ status }) => {
  const isActive = status === "Active";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}
    >
      <span
        className={`w-2 h-2 mr-1.5 rounded-full ${
          isActive ? "bg-green-400" : "bg-red-400"
        }`}
      ></span>
      {status}
    </span>
  );
};

// Main component
const SchoolDetails = ({ selectedSchool }) => {
  // Format date helper function
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  if (!selectedSchool) {
    return (
      <div className="p-6 flex items-center justify-center h-full">
        <p className="text-gray-500">Select a school to view details</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          {selectedSchool?.name || "Unnamed School"}
        </h1>
        <StatusBadge
          status={selectedSchool?.is_active ? "Active" : "Inactive"}
        />
      </div>

      <div className="space-y-6">
        {/* School Images */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Logo</h3>
            <div className="w-32 h-32 border rounded-lg overflow-hidden bg-gray-50">
              <ImageWithFallback
                src={selectedSchool?.logo || ""}
                alt="School Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Cover Image
            </h3>
            <div className="w-full h-32 border rounded-lg overflow-hidden bg-gray-50">
              <ImageWithFallback
                src={selectedSchool?.coverImage || ""}
                alt="School Cover"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Description
          </h3>
          {selectedSchool?.description ? (
            <p className="text-gray-700">{selectedSchool.description}</p>
          ) : (
            <p className="text-gray-500 italic">No description available</p>
          )}
        </div>

        {/* School Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Created At
            </h3>
            <p className="text-gray-700">
              {formatDate(selectedSchool?.createdAt)}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Updated At
            </h3>
            <p className="text-gray-700">
              {formatDate(selectedSchool?.updatedAt)}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Slug</h3>
            <p className="text-gray-700 break-words">
              {selectedSchool?.slug || "N/A"}
            </p>
          </div>
        </div>

        {/* Certificates */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Certificates ({selectedSchool?.certificates?.length || 0})
          </h3>
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {selectedSchool?.certificates?.length > 0 ? (
              selectedSchool.certificates.map((certificate) => (
                <div
                  key={certificate.id}
                  className="border rounded-lg p-4 mb-2 hover:bg-gray-50 transition-colors"
                >
                  <p className="font-medium text-gray-800">
                    {certificate.program_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Type: {certificate.program_type}
                  </p>
                  <p className="text-sm text-gray-600">
                    Duration: {certificate.duration} months
                  </p>
                  <p className="text-sm text-gray-600">
                    Issue Date: {formatDate(certificate.issueDate)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No certificates available</p>
            )}
          </div>
        </div>

        {/* Courses */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Courses ({selectedSchool?.courses?.length || 0})
          </h3>
          {selectedSchool?.courses?.length > 0 ? (
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {selectedSchool.courses.map((course, index) => (
                <div
                  key={course.id || index}
                  className="border rounded-lg p-4 mb-2 hover:bg-gray-50 transition-colors"
                >
                  <p className="font-medium text-gray-800">
                    {course.title || "Untitled Course"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No courses available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchoolDetails;
