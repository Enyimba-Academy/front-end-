import { Link } from "react-router-dom";
import PropTypes from "prop-types";
export default function PrimaryLink({ children, className, ...props }) {
  return (
    <Link
      className={`text-white bg-red-600 rounded px-4 py-2 ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

PrimaryLink.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
