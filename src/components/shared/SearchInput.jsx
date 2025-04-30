import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchButton({
  placeholder = "Search...",
  onSearch,
  className = "",
}) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch?.(query);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className={`appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${className}`}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <button
        onClick={handleSearch}
        className="absolute inset-y-0 right-0 px-3 flex items-center justify-center focus:outline-none"
        aria-label="Search"
      >
        <Search className="h-4 w-4 text-gray-500" />
      </button>
    </div>
  );
}
