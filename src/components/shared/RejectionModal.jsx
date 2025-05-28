import CenterModal from "./CenterModal";
import { XCircle } from "lucide-react";
import PrimaryButton from "./PrimaryButton";

export default function RejectionModal({
  isOpen,
  toggleModal,
  handleReject,
  handleCancel,
  title,
  message,
  isLoading,
  buttonText = "Yes, Reject",
}) {
  return (
    <CenterModal toggleModal={toggleModal} isOpen={isOpen}>
      <div className="p-6 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
          <XCircle className="w-8 h-8 text-yellow-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex items-center gap-3">
          <PrimaryButton
            onClick={handleCancel}
            disabled={isLoading}
            className={
              "px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer bg-white"
            }
          >
            Cancel
          </PrimaryButton>
          <PrimaryButton
            onClick={handleReject}
            disabled={isLoading}
            className={
              "bg-red-600 disabled:bg-red-400 disabled:cursor-not-allowed"
            }
          >
            {isLoading ? "Loading..." : buttonText}
          </PrimaryButton>
        </div>
      </div>
    </CenterModal>
  );
}
