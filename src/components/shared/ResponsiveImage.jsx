import React from "react";

const ResponsiveImage = ({ src, alt = "", height, width, className = "" }) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{ height, width }}
      className={`object-contain ${className}`}
    />
  );
};

export default ResponsiveImage;
