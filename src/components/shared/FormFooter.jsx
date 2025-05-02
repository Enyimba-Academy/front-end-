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
      <Divider margin="0.2rem 0" />
      <ButtonWrapper>
        <PrimaryButton
          className={"bg-white border border-primary"}
          type="button"
          onClick={() => {
            saveCurrentStep();
            saveToDraft && saveToDraft(values);
            saveToDraft && toast.success("Saved Successfully");
          }}
        >
          Save to draft
        </PrimaryButton>
        <div>
          <PrimaryButton
            className={"bg-white border border-primary"}
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
      </ButtonWrapper>
    </>
  );
};

export default FormFooter;
