import { Bell, Eye, ChevronRight } from "lucide-react";
import { useState } from "react";
import SearchButton from "@/components/shared/SearchInput";
import SelectDropDown from "@/components/shared/SelectDropDown";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import StatusBadge from "@/components/shared/StatusBadge";
import RightModal from "@/components/shared/RightModal";
import { useGetPayments, useGetRefunds } from "@/hooks/admin/payment.hook";
import moment from "moment";
import Pagination from "@/components/shared/table/Pagination";

const PAYMENT_STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "PENDING", label: "Pending" },
  { value: "COMPLETED", label: "Completed" },
  { value: "FAILED", label: "Failed" },
  { value: "REFUNDED", label: "Refunded" },
  { value: "PARTIALLY_REFUNDED", label: "Partially Refunded" },
  { value: "CANCELLED", label: "Cancelled" },
];

const REFUND_STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "PENDING", label: "Pending" },
  { value: "COMPLETED", label: "Completed" },
  { value: "FAILED", label: "Failed" },
  { value: "CANCELLED", label: "Cancelled" },
];

export default function AdminPayments() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("payments"); // payments or refunds

  const { data: paymentsData, isLoading: isLoadingPayments } = useGetPayments({
    page,
    limit,
    search,
    status: status !== "all" ? status : undefined,
  });

  const { data: refundsData, isLoading: isLoadingRefunds } = useGetRefunds({
    page,
    limit,
    search,
    status: status !== "all" ? status : undefined,
  });

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <header className="bg-white shadow-sm">
        <div className="flex justify-between items-center px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              Payments & Refunds
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

      <main className="p-6">
        <div className="bg-white rounded-lg shadow">
          {/* Tabs */}
          <div className="border-b">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => {
                  setActiveTab("payments");
                  setPage(1);
                  setStatus("all");
                }}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "payments"
                    ? "border-red-600 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Payments
              </button>
              <button
                onClick={() => {
                  setActiveTab("refunds");
                  setPage(1);
                  setStatus("all");
                }}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "refunds"
                    ? "border-red-600 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Refunds
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">
              {activeTab === "payments" ? "Payments" : "Refunds"} (
              {activeTab === "payments"
                ? paymentsData?.data?.total || 0
                : refundsData?.data?.total || 0}
              )
            </h2>
            <div className="flex items-center gap-2">
              <SearchButton
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
              <SelectDropDown
                className="w-fit"
                value={status}
                onChange={(value) => {
                  setStatus(value);
                  setPage(1);
                }}
                options={
                  activeTab === "payments"
                    ? PAYMENT_STATUS_OPTIONS
                    : REFUND_STATUS_OPTIONS
                }
              />
            </div>
          </div>

          {/* Table */}
          <div className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeTab === "payments" ? (
                  isLoadingPayments ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : !paymentsData?.data?.payments?.length ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6">
                        No payments found
                      </TableCell>
                    </TableRow>
                  ) : (
                    paymentsData.data.payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.reference}</TableCell>
                        <TableCell>{formatAmount(payment.amount)}</TableCell>
                        <TableCell>
                          <StatusBadge status={payment.status} />
                        </TableCell>
                        <TableCell>
                          {payment.user?.firstName} {payment.user?.lastName}
                        </TableCell>
                        <TableCell>{payment.course?.title}</TableCell>
                        <TableCell>
                          {moment(payment.createdAt).fromNow()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Eye
                              size={18}
                              color="#667085"
                              className="cursor-pointer"
                              onClick={() => {
                                setSelectedPayment(payment);
                                setShowPaymentDetails(true);
                              }}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )
                ) : isLoadingRefunds ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : !refundsData?.data?.refunds?.length ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      No refunds found
                    </TableCell>
                  </TableRow>
                ) : (
                  refundsData.data.refunds.map((refund) => (
                    <TableRow key={refund.id}>
                      <TableCell>{refund.reference}</TableCell>
                      <TableCell>{formatAmount(refund.amount)}</TableCell>
                      <TableCell>
                        <StatusBadge status={refund.status} />
                      </TableCell>
                      <TableCell>
                        {refund.user?.firstName} {refund.user?.lastName}
                      </TableCell>
                      <TableCell>{refund.course?.title}</TableCell>
                      <TableCell>
                        {moment(refund.createdAt).fromNow()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Eye
                            size={18}
                            color="#667085"
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedPayment(refund);
                              setShowPaymentDetails(true);
                            }}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            {(activeTab === "payments"
              ? paymentsData?.data?.total
              : refundsData?.data?.total) > 0 && (
              <div className="mt-4">
                <Pagination
                  currentPage={page}
                  totalPages={Math.ceil(
                    (activeTab === "payments"
                      ? paymentsData?.data?.total
                      : refundsData?.data?.total) / limit
                  )}
                  setPage={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {showPaymentDetails && (
        <RightModal
          toggleModal={() => setShowPaymentDetails(!showPaymentDetails)}
          isOpen={showPaymentDetails}
        >
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">
              {activeTab === "payments" ? "Payment" : "Refund"} Details
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Reference</h3>
                <p className="mt-1">{selectedPayment?.reference}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Amount</h3>
                <p className="mt-1">{formatAmount(selectedPayment?.amount)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <div className="mt-1">
                  <StatusBadge status={selectedPayment?.status} />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">User</h3>
                <p className="mt-1">
                  {selectedPayment?.user?.firstName}{" "}
                  {selectedPayment?.user?.lastName}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Course</h3>
                <p className="mt-1">{selectedPayment?.course?.title}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Date</h3>
                <p className="mt-1">
                  {moment(selectedPayment?.createdAt).format(
                    "MMMM D, YYYY h:mm A"
                  )}
                </p>
              </div>
            </div>
          </div>
        </RightModal>
      )}
    </div>
  );
}
