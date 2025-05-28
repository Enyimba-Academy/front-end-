import { EnrollmentStatus } from "../../constant/enrollmentEnum";

export default function StatusBadge({ status }) {
  // Convert status to uppercase for consistent comparison
  const normalizedStatus = status?.toUpperCase();

  switch (normalizedStatus) {
    case "ACTIVE":
      return (
        <div className="bg-green-100 text-green-500 px-2 py-1 rounded-full w-fit">
          Active
        </div>
      );
    case "INACTIVE":
      return (
        <div className="bg-red-500 text-red-50 px-2 py-1 rounded-full text-sm w-fit">
          Inactive
        </div>
      );
    case "PENDING":
      return (
        <div className="bg-gray-500 text-gray-50 px-2 py-1 rounded-full text-sm w-fit">
          Pending
        </div>
      );
    case "APPROVED":
      return (
        <div className="bg-blue-500 text-blue-50 px-2 py-1 rounded-full text-sm w-fit">
          Approved
        </div>
      );
    case "REJECTED":
      return (
        <div className="bg-red-500 text-red-50 px-2 py-1 rounded-full text-sm w-fit">
          Rejected
        </div>
      );
    case "DRAFT":
      return (
        <div className="bg-amber-100 text-amber-600 px-2 py-1 rounded-full text-sm w-fit">
          Draft
        </div>
      );
    case "PUBLISHED":
      return (
        <div className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm w-fit">
          Published
        </div>
      );
    case "ARCHIVED":
      return (
        <div className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-sm w-fit">
          Archived
        </div>
      );
    case "PAID":
      return (
        <div className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-sm w-fit">
          Paid
        </div>
      );
    case "COMPLETED":
      return (
        <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm w-fit">
          Completed
        </div>
      );
    case "DROPPED":
      return (
        <div className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm w-fit">
          Dropped
        </div>
      );
    case "CANCELLED":
      return (
        <div className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm w-fit">
          Cancelled
        </div>
      );
    case "REFUNDED":
      return (
        <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm w-fit">
          Refunded
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
