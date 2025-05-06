import { ChevronDown } from "lucide-react";

export default function SelectDropDown({
  options,
  placeholder = "Select an option",
  onChange,
  onBlur,
  className = "",
  id,
  name,
  label,
  required,
  value,
}) {
  return (
    <div className="relative mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange?.(e)}
        onBlur={onBlur}
        required={required}
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
