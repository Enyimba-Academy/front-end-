import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function SelectDropDown({
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  id,
  name,
}) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        value={selectedValue}
        onChange={handleChange}
        className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${className}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
