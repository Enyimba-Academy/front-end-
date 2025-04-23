import PropTypes from "prop-types";

export default function PrimaryButton({ children, className, ...props }) {
  return (
    <button
      className={`text-white bg-primary rounded px-4 py-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

PrimaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
