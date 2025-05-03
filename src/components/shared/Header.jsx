import HeadingList from "./HeadingList";
import { useSteps } from "react-step-builder";
import PropTypes from "prop-types";

//stepNames is an array of strings
function Heading({ stepNames, isDisabled }) {
  const { current, jump } = useSteps();

  return (
    <nav className="flex justify-center mx-auto p-2 max-w-fit overflow-auto">
      {stepNames &&
        stepNames.map((name, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === current;

          return (
            <HeadingList
              key={index}
              number={stepNumber}
              title={name}
              active={isActive}
              onClick={() => !isDisabled && jump(stepNumber)}
            />
          );
        })}
    </nav>
  );
}

Heading.propTypes = {
  stepNames: PropTypes.arrayOf(PropTypes.string),
  isDisabled: PropTypes.bool,
};

export default Heading;
