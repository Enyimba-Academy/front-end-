import React from "react";

import PropTypes from "prop-types";
import Portal from "../portal";

const CenterModal = ({
  toggleModal,
  children,
  bgcolor,
  width,
  height,
  justify,
  mainHeight,
}) => {
  return (
    <Portal>
      <div
        onClick={toggleModal}
        className={`fixed inset-0 w-full z-[100] flex items-center cursor-pointer overflow-auto scrollbar-thin scrollbar-transparent ${
          justify || "justify-center"
        } bg-[rgba(52,64,84,0.7)] backdrop-blur-[8px]`}
        style={{ height: mainHeight || "auto" }}
      >
        <div
          className={`overflow-auto cursor-auto relative animate-[scaleUp_0.1s_ease-in-out]`}
          style={{
            backgroundColor: bgcolor || "white",
            borderRadius: "40px",
            width: width || "auto",
            height: height || "auto",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};

CenterModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  borderRadius: PropTypes.number,
  bgColor: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  justify: PropTypes.string,
  mainHeight: PropTypes.string,
};

export default CenterModal;
