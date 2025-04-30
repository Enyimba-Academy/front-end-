import React, { useEffect, useRef } from "react";

const HandleClickEvent = ({ children, show, onClickOutside }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, onClickOutside]);

  if (!show) return null;

  return <div ref={ref}>{children}</div>;
};

export default HandleClickEvent;
