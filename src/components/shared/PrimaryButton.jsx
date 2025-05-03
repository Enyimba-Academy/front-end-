import PropTypes from "prop-types";
import { cn } from "../../utils/cn";

export default function PrimaryButton({
  children,
  className,
  type = "button",
  ...props
}) {
  return (
    <button
      className={cn("text-white bg-primary rounded-lg px-4 py-2", className)}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

PrimaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};
