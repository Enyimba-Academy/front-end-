import { Bell, Eye, CheckCircle2, XCircle } from "lucide-react";
import SelectDropDown from "../../components/shared/SelectDropDown";
import SearchButton from "../../components/shared/SearchInput";
import {
  useEnrollments,
  useUpdateEnrollment,
} from "../../hooks/admin/enrollment.hook";
import { useState } from "react";
import StatusBadge from "../../components/shared/StatusBadge";
import RightModal from "../../components/shared/RightModal";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../components/ui/table";

import EnrollmentDetails from "../../components/admin/EnrollmentDetails";
import ApprovalModal from "../../components/shared/ApprovalModal";
import RejectionModal from "../../components/shared/RejectionModal";

import { EnrollmentStatus } from "../../constant/enrollmentEnum";
import { toast } from "react-toastify";

export default function EnrollmentPayments() {
  const { data, isLoading } = useEnrollments();
  const [showEnrollmentDetails, setShowEnrollmentDetails] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [isApproved, setIsApproved] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const { mutate: mutateUpdateEnrollment, isPending } = useUpdateEnrollment();

  const handleApprove = () => {
    mutateUpdateEnrollment(
      {
        id: selectedEnrollment?.id,
        status: EnrollmentStatus.APPROVED,
      },
      {
        onSuccess: () => {
          setIsApproved(false);
          toast.success("Enrollment approved successfully");
          setShowEnrollmentDetails(false);
          setSelectedEnrollment(null);
        },
        onError: (error) => {
          toast.error(error.response.data.message);
        },
      }
    );
  };

  const handleReject = () => {
    mutateUpdateEnrollment(
      {
        id: selectedEnrollment?.id,
        status: EnrollmentStatus.REJECTED,
      },
      {
        onSuccess: () => {
          setIsRejected(false);
          toast.success("Enrollment rejected successfully");
          setShowEnrollmentDetails(false);
          setSelectedEnrollment(null);
        },
        onError: (error) => {
          toast.error(error.response.data.message);
        },
      }
    );
  };

  return (
    <div>
      <header className="bg-white shadow-sm">
        <div className="flex justify-between items-center px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              Enrollment & Payments
            </h1>
            <p className="text-sm text-gray-500">Welcome back, Admin</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <Bell className="h-5 w-5" />
            </button>
            <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">A</span>
            </div>
          </div>
        </div>
      </header>
      <div className="p-6">
        <div className="bg-white rounded-md shadow">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">
              Enrollments ({data?.length || 0})
            </h2>
            {/* <div className="flex items-center gap-2">
              <SearchButton />
              <SelectDropDown
                className="w-fit"
                options={[
                  { value: "all", label: "All" },
                  { value: "pending", label: "Pending" },
                  { value: "approved", label: "Approved" },
                  { value: "rejected", label: "Rejected" },
                ]}
              />
            </div> */}
          </div>

          <div className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : !data?.length ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      No enrollments found
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.map((enrollment) => (
                    <TableRow key={enrollment.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded bg-gray-200 mr-3 overflow-hidden flex items-center justify-center">
                            {enrollment?.user?.avatar ? (
                              <img
                                src={enrollment.user.avatar}
                                alt={`${enrollment.user.firstName} ${enrollment.user.lastName}`}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span className="text-gray-600 text-lg font-medium">
                                {enrollment?.user?.firstName
                                  ?.charAt(0)
                                  ?.toUpperCase()}
                              </span>
                            )}
                          </div>
                          <span>{`${enrollment?.user?.firstName} ${enrollment?.user?.lastName}`}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={enrollment?.status} />
                      </TableCell>
                      <TableCell>{enrollment?.user?.email}</TableCell>
                      <TableCell>{enrollment?.course?.title}</TableCell>
                      <TableCell>{enrollment?.progress}%</TableCell>
                      <TableCell>
                        {new Date(enrollment?.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Eye
                            size={18}
                            color="#667085"
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedEnrollment(enrollment);
                              setShowEnrollmentDetails(true);
                            }}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {showEnrollmentDetails && (
        <RightModal
          toggleModal={() => setShowEnrollmentDetails(!showEnrollmentDetails)}
          isOpen={showEnrollmentDetails}
        >
          <EnrollmentDetails
            selectedEnrollment={selectedEnrollment}
            handleApprove={() => setIsApproved(true)}
            handleReject={() => setIsRejected(true)}
          />
        </RightModal>
      )}

      {isApproved && (
        <ApprovalModal
          isOpen={isApproved}
          toggleModal={() => setIsApproved(!isApproved)}
          handleApprove={handleApprove}
          handleCancel={() => setIsApproved(false)}
          title="Confirm Approval"
          message="Approve this enrollment to allow student payment?"
          isLoading={isPending}
        />
      )}

      {isRejected && (
        <RejectionModal
          isOpen={isRejected}
          toggleModal={() => setIsRejected(!isRejected)}
          handleReject={handleReject}
          handleCancel={() => setIsRejected(false)}
          title="Confirm Rejection"
          message="Reject this enrollment to prevent student payment?"
          isLoading={isPending}
        />
      )}
    </div>
  );
}
