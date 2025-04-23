import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Download,
  Edit,
  Lightbulb,
  Maximize,
  Pause,
  Play,
  Settings,
} from "lucide-react";

export default function VideoLessonPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [module1Expanded, setModule1Expanded] = useState(true);
  const [module2Expanded, setModule2Expanded] = useState(true);
  const [module3Expanded, setModule3Expanded] = useState(false);
  const [noteText, setNoteText] = useState("");

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
        <div className="flex items-center">
          <button className="mr-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-sm md:text-base font-medium text-gray-900 truncate">
            Professional Certificate in Photography - Module 2: Lighting
            Fundamentals
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center text-red-600 text-sm font-medium">
            <Download size={16} className="mr-1" />
            <span className="hidden sm:inline">Resources</span>
          </button>
          <button className="flex items-center text-gray-600 text-sm font-medium">
            <span className="hidden sm:inline">Help</span>
          </button>
          <div className="relative">
            <button className="flex items-center text-gray-600 text-sm font-medium">
              <Edit size={16} className="mr-1" />
              <span className="hidden sm:inline">Notes</span>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full text-white text-xs flex items-center justify-center">
                2
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Course Navigation */}
        <div className="hidden md:block w-64 border-r border-gray-200 overflow-y-auto bg-white">
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search lessons..."
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <svg
                className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Module 1 */}
          <div className="border-t border-gray-200">
            <button
              onClick={() => setModule1Expanded(!module1Expanded)}
              className="flex items-center justify-between w-full px-4 py-3 text-left"
            >
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-2">
                  <CheckCircle size={14} className="text-white" />
                </div>
                <span className="text-sm font-medium">
                  Module 1: Camera Basics
                </span>
              </div>
              {module1Expanded ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>
            {module1Expanded && (
              <div className="pl-11 pr-4 pb-2">
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle size={14} className="text-green-500 mr-2" />
                    <span>Intro to DSLR (15min)</span>
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle size={14} className="text-green-500 mr-2" />
                    <span>Aperture/Shutter Speed (Video)</span>
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle size={14} className="text-green-500 mr-2" />
                    <span>Quiz 1 (8/10)</span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Module 2 */}
          <div className="border-t border-gray-200">
            <button
              onClick={() => setModule2Expanded(!module2Expanded)}
              className="flex items-center justify-between w-full px-4 py-3 text-left bg-red-50"
            >
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center mr-2">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <span className="text-sm font-medium text-red-600">
                  Module 2: Lighting Fundamentals
                </span>
              </div>
              {module2Expanded ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>
            {module2Expanded && (
              <div className="pl-11 pr-4 pb-2">
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-red-600 font-medium">
                    <Play size={14} className="mr-2" />
                    <span>Natural Light Techniques (Video)</span>
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="w-3.5 h-3.5 rounded-full border border-gray-300 mr-2"></div>
                    <span>Studio Setup Guide (Text)</span>
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="w-3.5 h-3.5 rounded-full border border-gray-300 mr-2"></div>
                    <span>Assignment: Portraits</span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Module 3 */}
          <div className="border-t border-gray-200">
            <button
              onClick={() => setModule3Expanded(!module3Expanded)}
              className="flex items-center justify-between w-full px-4 py-3 text-left"
            >
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center mr-2">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <span className="text-sm font-medium">
                  Module 3: Camera Basics
                </span>
              </div>
              {module3Expanded ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>
            {module3Expanded && (
              <div className="pl-11 pr-4 pb-2">
                {/* Module 3 content would go here */}
              </div>
            )}
          </div>
        </div>

        {/* Center - Video Player and Content */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Video Player */}
          <div className="relative bg-black aspect-video">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=400&width=600"
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-20 h-20 bg-black bg-opacity-50 rounded-full flex items-center justify-center"
              >
                <Play size={40} className="text-white ml-1" />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 flex items-center">
              <button onClick={() => setIsPlaying(!isPlaying)} className="mr-2">
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <span className="text-sm mr-2">14:23 / 32:10</span>
              <div className="flex-1 mx-2 h-1 bg-gray-600 rounded-full">
                <div className="w-[45%] h-full bg-red-600 rounded-full"></div>
              </div>
              <div className="flex items-center space-x-3">
                <button>
                  <Settings size={16} />
                </button>
                <button>
                  <Maximize size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Lesson Content */}
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Natural Light Techniques
            </h2>
            <p className="text-gray-700 mb-8">
              Learn how to harness natural light for stunning photography. This
              lesson covers different types of natural light, optimal shooting
              times, and techniques for managing challenging lighting
              conditions.
            </p>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft size={16} className="mr-1" />
                <span>Previous Lesson</span>
              </button>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center">
                <CheckCircle size={16} className="mr-1" />
                <span>Mark Complete</span>
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <span>Next Lesson</span>
                <ArrowLeft size={16} className="ml-1 transform rotate-180" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Notes and Resources */}
        <div className="hidden lg:block w-72 border-l border-gray-200 overflow-y-auto bg-gray-50">
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-3">Lesson Notes</h3>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Take notes..."
              className="w-full h-40 p-3 border border-gray-300 rounded-md text-sm resize-none"
            ></textarea>
            <button className="mt-2 flex items-center text-red-600 text-sm font-medium">
              <Download size={14} className="mr-1" />
              <span>Export Notes</span>
            </button>
          </div>

          <div className="border-t border-gray-200 p-4">
            <h3 className="font-medium text-gray-900 mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                >
                  <Download size={14} className="mr-2" />
                  <span>Lighting Diagram.pdf</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                >
                  <Download size={14} className="mr-2" />
                  <span>Presets Pack.zip</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="border-t border-gray-200 p-4">
            <h3 className="font-medium text-gray-900 mb-3">Pro Tips</h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-md">
              <div className="flex">
                <Lightbulb
                  size={16}
                  className="text-yellow-500 mr-2 flex-shrink-0 mt-0.5"
                />
                <p className="text-sm text-gray-700">
                  Use golden hour light for warmer tones and softer shadows in
                  your portraits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
