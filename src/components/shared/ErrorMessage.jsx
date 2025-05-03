const ErrorMessage = ({ children }) => {
  return (
    <div className="flex items-center mt-1">
      <p className="ml-1 text-red-500 text-sm">{children}</p>
    </div>
  );
};

export default ErrorMessage;
