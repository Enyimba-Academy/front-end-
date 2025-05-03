import PropTypes from "prop-types";

function HeadingList({ number, title, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 cursor-pointer"
    >
      <div
        className={`flex items-center justify-center w-6 h-6 rounded-full ${
          active ? "bg-red-600" : "bg-gray-200"
        }`}
      >
        <span
          className={`text-sm font-medium ${
            active ? "text-white" : "text-gray-600"
          }`}
        >
          {number}
        </span>
      </div>
      <span
        className={`text-sm font-medium ${
          active ? "text-gray-900" : "text-gray-500"
        }`}
      >
        {title}
      </span>
    </div>
  );
}

HeadingList.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default HeadingList;
