import React from "react";

export const OverflowWrapper = ({ children, minWidth }) => {
  return (
    <div className="overflow-x-auto">
      <div style={{ minWidth: minWidth || "100%" }}>{children}</div>
    </div>
  );
};

export default OverflowWrapper;
