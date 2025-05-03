export default function CustomTextArea({
  label,
  name,
  value,
  onChange,
  onBlur,
  maxLength,
  placeholder,
  rows = 4,
}) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        maxLength={maxLength}
        rows={rows}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
        placeholder={placeholder}
      />
    </div>
  );
}
