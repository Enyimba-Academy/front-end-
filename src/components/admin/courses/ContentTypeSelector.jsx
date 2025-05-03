import { useState, useRef, useEffect } from "react";
import {
  Video,
  FileText,
  HelpCircle,
  ListOrdered,
  ChevronDown,
} from "lucide-react";

export default function ContentTypeSelector({ onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const contentTypes = [
    {
      id: "video",
      label: "Video Lecture",
      icon: <Video className="w-5 h-5" />,
    },
    {
      id: "material",
      label: "Course Materials",
      icon: <FileText className="w-5 h-5" />,
    },
    { id: "quiz", label: "Quiz", icon: <HelpCircle className="w-5 h-5" /> },
    {
      id: "assignment",
      label: "Assignment",
      icon: <ListOrdered className="w-5 h-5" />,
    },
  ];

  const handleSelect = (type) => {
    onSelect(type);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 border border-dashed rounded-lg text-center text-gray-500 hover:text-gray-700 hover:border-gray-400 flex items-center justify-center gap-2"
      >
        <span>Add Content</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border rounded-md shadow-lg">
          {contentTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleSelect(type.id)}
              className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50 border-b last:border-b-0"
            >
              <span className="text-red-600">{type.icon}</span>
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
