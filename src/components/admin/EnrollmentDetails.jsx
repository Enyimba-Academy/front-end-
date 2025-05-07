import { EnrollmentStatus } from "../../constant/enrollmentEnum";
import StatusBadge from "../shared/StatusBadge";

export default function EnrollmentDetails({
  selectedEnrollment,
  handleReject,
  handleApprove,
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-xl font-semibold text-gray-800 mb-6">
          Enrollment Details
        </h1>

        {selectedEnrollment && (
          <div className="space-y-4">
            {/* Student Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-lg font-medium text-gray-700 mb-3">
                Student Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="text-sm font-medium">{`${selectedEnrollment.user.firstName} ${selectedEnrollment.user.lastName}`}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-sm font-medium">
                    {selectedEnrollment.user.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="text-sm font-medium">
                    {selectedEnrollment.user.phoneNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="text-sm font-medium capitalize">
                    {selectedEnrollment.user.gender}
                  </p>
                </div>
              </div>
            </div>

            {/* Course Information */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h2 className="text-lg font-medium text-gray-700 mb-3">
                Course Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Course Title</p>
                  <p className="text-sm font-medium">
                    {selectedEnrollment.course.title}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Level</p>
                  <p className="text-sm font-medium">
                    {selectedEnrollment.course.level}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="text-sm font-medium">
                    {selectedEnrollment.course.duration}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-sm font-medium">
                    ₦{selectedEnrollment.course.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Enrollment Status */}
            <div className="bg-green-50 rounded-lg p-4">
              <h2 className="text-lg font-medium text-gray-700 mb-3">
                Enrollment Status
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <StatusBadge status={selectedEnrollment.status} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Progress</p>
                  <p className="text-sm font-medium">
                    {selectedEnrollment.progress}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Enrollment Date</p>
                  <p className="text-sm font-medium">
                    {new Date(
                      selectedEnrollment.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="text-sm font-medium">
                    {new Date(
                      selectedEnrollment.updatedAt
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-purple-50 rounded-lg p-4">
              <h2 className="text-lg font-medium text-gray-700 mb-3">
                Address Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-sm font-medium">
                    {selectedEnrollment.user.address}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">State</p>
                  <p className="text-sm font-medium">
                    {selectedEnrollment.user.state}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Country</p>
                  <p className="text-sm font-medium">
                    {selectedEnrollment.user.country}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {selectedEnrollment?.status === EnrollmentStatus.PENDING && (
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={handleReject}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors cursor-pointer"
            >
              Reject
            </button>
            <button
              onClick={handleApprove}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors cursor-pointer"
            >
              Approve
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
