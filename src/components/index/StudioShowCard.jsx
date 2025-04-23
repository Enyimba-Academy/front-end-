import PrimaryButton from "../shared/PrimaryButton";

export default function StudioShowcase() {
  return (
    <div className="relative w-full max-w-7xl mx-auto rounded-xl overflow-hidden">
      {/* Main Image Container */}
      <div className="relative aspect-[16/9] w-full">
        <img
          src="/studio.png"
          alt="Professional video production studio with blue screen backdrop and camera equipment"
          className="w-full h-full object-cover"
        />

        {/* Overlay for better text visibility if needed */}

        {/* Virtual Tour Button */}
        <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-10">
          <PrimaryButton className="flex items-center gap-2  hover:bg-red-700 text-white px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium text-sm sm:text-base whitespace-nowrap">
              Take the Virtual Tour
            </span>
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
