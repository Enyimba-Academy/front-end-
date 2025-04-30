import React from "react";

import Portal from "../portal";

const RightModal = ({
  toggleModal,
  children,
  borderRadius,
  bgcolor,
  width,
  height,
  isOpen,
  showClose,
}) => {
  return (
    <Portal>
      <div
        onClick={(e) => {
          e.stopPropagation();
          toggleModal();
        }}
        className={`fixed inset-0 w-full h-full z-[100] flex justify-end items-center cursor-pointer overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "visible" : "invisible"
        } ${
          isOpen ? "delay-0" : "delay-300"
        } bg-[rgba(52,64,84,0.7)] backdrop-blur-[8px]`}
      >
        <div
          className={`cursor-auto transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } rounded-tl-[25px] rounded-bl-[25px] overflow-hidden`}
          style={{
            backgroundColor: bgcolor || "white",
            borderRadius: borderRadius ? `${borderRadius}px` : "0px",
            width: width || "600px",
            height: height || "100%",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <>
            {showClose && (
              <button
                onClick={toggleModal}
                className="absolute top-4 right-6 bg-transparent border-none"
              >
                <img
                  src="/close.svg"
                  alt="cancel button"
                  className="h-[50px] w-[50px]"
                  height="50"
                  width="50"
                />
              </button>
            )}
            {children}
          </>
        </div>
      </div>
    </Portal>
  );
};

export default React.memo(RightModal);
