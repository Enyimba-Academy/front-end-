import { CheckCircle2 } from "lucide-react";
import CenterModal from "./CenterModal";
import PrimaryButton from "./PrimaryButton";

export default function ApprovalModal({
  isOpen,
  toggleModal,
  handleApprove,
  handleCancel,
  title,
  message,
  isLoading,
}) {
  return (
    <CenterModal toggleModal={toggleModal} isOpen={isOpen}>
      <div className="p-6 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex items-center gap-3">
          <PrimaryButton
            onClick={handleCancel}
            disabled={isLoading}
            className="px-4 py-2 border bg-white border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </PrimaryButton>
          <PrimaryButton
            onClick={handleApprove}
            disabled={isLoading}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors cursor-pointer"
          >
            {isLoading ? "Loading..." : "Yes, Approve"}
          </PrimaryButton>
        </div>
      </div>
    </CenterModal>
  );
}
