"use client";

import { useState } from "react";
import { ChevronDown, X, Filter } from "lucide-react";

export default function FilterComponent({
  filters,
  onApplyFilters,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});

  const handleToggleFilter = (filterId, value) => {
    setActiveFilters((prev) => {
      const current = prev[filterId] || [];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];

      return {
        ...prev,
        [filterId]: updated,
      };
    });
  };

  const handleClearFilters = () => {
    setActiveFilters({});
  };

  const handleApplyFilters = () => {
    onApplyFilters(activeFilters);
    setIsOpen(false);
  };

  const activeFilterCount = Object.values(activeFilters).flat().length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`appearance-none flex items-center w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${className}`}
      >
        <Filter className="h-4 w-4 text-gray-500 mr-2" />
        <span className="flex-1 text-left">
          {activeFilterCount > 0 ? `Filters (${activeFilterCount})` : "Filter"}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="p-3 max-h-80 overflow-y-auto">
            {filters.map((filter) => (
              <div key={filter.id} className="mb-4">
                <h3 className="font-medium text-sm mb-2">{filter.label}</h3>
                <div className="space-y-2">
                  {filter.options.map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 rounded"
                        checked={(activeFilters[filter.id] || []).includes(
                          option
                        )}
                        onChange={() => handleToggleFilter(filter.id, option)}
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between p-3 border-t border-gray-200">
            <button
              onClick={handleClearFilters}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Clear all
            </button>
            <button
              onClick={handleApplyFilters}
              className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {activeFilterCount > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([filterId, values]) => {
            const filterName =
              filters.find((f) => f.id === filterId)?.label || filterId;

            return values.map((value) => (
              <div
                key={`${filterId}-${value}`}
                className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-sm"
              >
                <span className="mr-1 font-medium">{filterName}:</span>
                <span>{value}</span>
                <button
                  onClick={() => handleToggleFilter(filterId, value)}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ));
          })}
        </div>
      )}
    </div>
  );
}
