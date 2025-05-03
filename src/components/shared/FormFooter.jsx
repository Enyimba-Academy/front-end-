import { useState, useEffect } from "react";
import { Steps, StepsProvider, useSteps } from "react-step-builder";
import { toast } from "react-toastify";
import PrimaryButton from "./PrimaryButton";
const FormFooter = ({
  handleSubmit,
  onCancel,
  validation,
  setError,
  isSubmitting,
  setSubmitting,
  saveToDraft,
  values,
}) => {
  const { isFirst, isLast, next, prev, current } = useSteps();

  const [lastText, setLastText] = useState(
    isSubmitting ? "Submitting..." : isLast ? "Submit" : "Next"
  );

  useEffect(() => {
    setLastText(isSubmitting ? "Submitting..." : isLast ? "Submit" : "Next");
  }, [isSubmitting, isLast]);

  const saveCurrentStep = () => {
    localStorage.setItem("currentStep", current);
  };

  return (
    <>
      <hr className="mt-4 border-gray-300" />
      <div className="flex justify-between mt-4">
        <div className="flex justify-between w-full">
          <PrimaryButton
            className={"bg-white text-primary border border-primary"}
            onClick={() => {
              setError(false);
              isFirst || onCancel ? onCancel() : prev();
            }}
          >
            {isFirst ? "Cancel" : "Back"}
          </PrimaryButton>
          <PrimaryButton
            onClick={() => {
              if (!isSubmitting) {
                if (validation()) {
                  setError(false);
                  if (isLast) {
                    setSubmitting(true);
                    setLastText("Submitting...");
                    handleSubmit && handleSubmit();
                  } else {
                    next();
                    saveCurrentStep();
                    saveToDraft && saveToDraft(values);
                  }
                } else {
                  setError(true);
                }
              }
            }}
            type={"button"}
          >
            {lastText}
          </PrimaryButton>
        </div>
      </div>
    </>
  );
};

export default FormFooter;
