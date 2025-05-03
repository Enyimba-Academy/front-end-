import { cn } from "../../utils/cn";

export default function CustomInput({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  maxLength,
  className,
  disabled,
}) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        name={name}
        type={type}
        className={cn(
          className,
          "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        disabled={disabled}
      />
    </div>
  );
}
