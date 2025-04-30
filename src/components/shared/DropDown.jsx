import React from "react";

const DropDown = ({ items, right = "0", position = "absolute" }) => {
  return (
    <div
      className={`${position} z-50 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
      style={{ right }}
    >
      <div className="py-1" role="menu" aria-orientation="vertical">
        {items?.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DropDown;
