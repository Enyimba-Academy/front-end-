import { Bell, Eye, CheckCircle2, XCircle } from "lucide-react";
import StyledTable from "../../components/shared/Table";
import SelectDropDown from "../../components/shared/SelectDropDown";
import SearchButton from "../../components/shared/SearchInput";
import {
  useEnrollments,
  useUpdateEnrollment,
} from "../../hooks/admin/enrollment.hook";
import { useMemo, useState } from "react";
import StatusBadge from "../../components/shared/StatusBadge";
import RightModal from "../../components/shared/RightModal";

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
  const tableData = useMemo(() => {
    return data?.map((enrollment) => ({
      name: `${enrollment?.user?.firstName} ${enrollment?.user?.lastName}`,
      status: <StatusBadge status={enrollment?.status} />,

      email: enrollment?.user?.email,
      course: enrollment?.course?.title,
      progress: enrollment?.progress,
      createdAt: new Date(enrollment?.createdAt).toLocaleDateString(),
      action: (
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
      ),
    }));
  }, [data]);

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
  console.log(selectedEnrollment);
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
      {" "}
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
            <div className="h-8 w-8 rounded-full bg-gray-300 overflow-hidden">
              <img
                src="/placeholder.svg?height=32&width=32"
                alt="Profile"
                width={32}
                height={32}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>
      <div className="p-6">
        <StyledTable
          labels={[
            "Name",
            "Status",
            "Email",
            "Course",
            "Progress",
            "Created At",
            "Action",
          ]}
          title={`Enrollments (${tableData?.length || 0})`}
          bodyRows={tableData || []}
          actionLabel={"Action"}
          isTableLoading={isLoading}
        />
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
