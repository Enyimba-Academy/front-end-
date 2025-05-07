import { EnrollmentStatus } from "../../constant/enrollmentEnum";

export default function StatusBadge({ status }) {
  switch (status) {
    case EnrollmentStatus.ACTIVE:
      return (
        <div className="bg-green-100 text-green-500 px-2 py-1 rounded-full  w-fit">
          Active
        </div>
      );
    case EnrollmentStatus.INACTIVE:
      return (
        <div className="bg-red-500 text-red-50 px-2 py-1 rounded-full text-sm w-fit">
          Inactive
        </div>
      );
    case EnrollmentStatus.PENDING:
      return (
        <div className="bg-gray-500 text-gray-50 px-2 py-1 rounded-full text-sm w-fit">
          Pending
        </div>
      );
    case EnrollmentStatus.APPROVED:
      return (
        <div className="bg-blue-500 text-blue-50 px-2 py-1 rounded-full text-sm w-fit">
          Approved
        </div>
      );

    default:
      return (
        <div className="bg-gray-500 text-gray-50 px-2 py-1 rounded-full text-sm w-fit">
          Unknown
        </div>
      );
  }
}
