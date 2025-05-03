import { useState, useEffect } from "react";
import { Steps, StepsProvider, useSteps } from "react-step-builder";
import PrimaryButton from "./PrimaryButton";
import PropTypes from "prop-types";

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

  const handleBack = () => {
    if (isFirst) {
      onCancel();
    } else {
      prev();
    }
  };

  const handleNext = () => {
    if (!isSubmitting) {
      const isValid = validation();
      console.log("isValid", isValid);
      if (isValid) {
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
  };

  return (
    <>
      <hr className="mt-4 border-gray-300" />
      <div className="flex justify-between mt-4">
        <div className="flex justify-between w-full">
          <PrimaryButton
            className={"bg-white text-primary border border-primary"}
            onClick={handleBack}
          >
            {isFirst ? "Cancel" : "Back"}
          </PrimaryButton>
          <PrimaryButton
            onClick={handleNext}
            type={"button"}
            disabled={isSubmitting}
          >
            {lastText}
          </PrimaryButton>
        </div>
      </div>
    </>
  );
};

export default FormFooter;

FormFooter.propTypes = {
  handleSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  validation: PropTypes.func,
  setError: PropTypes.func,
  isSubmitting: PropTypes.bool,
  setSubmitting: PropTypes.func,
  saveToDraft: PropTypes.func,
  values: PropTypes.object,
};
