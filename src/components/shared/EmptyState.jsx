import React from "react";

const EmptyState = ({
  title = "No Data Found",
  description = "There is no data to display",
  buttonText,
  buttonIcon,
  onClick,
  loading = false,
  iconImage,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      {iconImage}
      <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      {buttonText && (
        <button
          onClick={onClick}
          disabled={loading}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          {buttonIcon && <span className="mr-2">{buttonIcon}</span>}
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
