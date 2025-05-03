import { Calendar } from "lucide-react";

export default function CustomDatePicker({ label, value, onChange }) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium mb-2  text-gray-700">
          {label}
        </label>
      )}
      <div>
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border rounded-md pl-10  focus:outline-none focus:ring-red-500 focus:border-red-500"
        />
      </div>
    </div>
  );
}
