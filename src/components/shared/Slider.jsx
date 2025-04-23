import { useState, useRef, useEffect } from "react";

const studentImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=240&width=320",
    alt: "Student working with camera equipment",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=240&width=320",
    alt: "Student in studio space",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=240&width=320",
    alt: "Student artwork display",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=240&width=320",
    alt: "Student collaboration project",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=240&width=320",
    alt: "Student exhibition",
  },
];

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState(1);
  const sliderRef = useRef(null);

  // Determine how many images to show based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleImages(1);
      } else if (window.innerWidth < 1024) {
        setVisibleImages(2);
      } else {
        setVisibleImages(3);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = studentImages.length - visibleImages + 1;

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < totalSlides - 1 ? prevIndex + 1 : prevIndex
    );
  };

  // Update slider position when currentIndex changes
  useEffect(() => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.offsetWidth / visibleImages;
      sliderRef.current.style.transform = `translateX(-${
        currentIndex * slideWidth
      }px)`;
    }
  }, [currentIndex, visibleImages]);

  return (
    <div className="relative max-w-6xl mx-auto px-4">
      {/* Slider Container */}
      <div className="overflow-hidden">
        <div
          ref={sliderRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{ width: `${(100 * studentImages.length) / visibleImages}%` }}
        >
          {studentImages.map((image, index) => (
            <div
              key={index}
              className="px-2"
              style={{ width: `${100 / studentImages.length}%` }}
            >
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="rounded-lg shadow-md w-full h-auto object-cover aspect-video"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        disabled={currentIndex === 0}
        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md z-10 transition-opacity ${
          currentIndex === 0
            ? "opacity-50 cursor-not-allowed"
            : "opacity-100 hover:bg-red-700"
        }`}
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6"></path>
        </svg>
      </button>

      <button
        onClick={goToNext}
        disabled={currentIndex >= totalSlides - 1}
        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md z-10 transition-opacity ${
          currentIndex >= totalSlides - 1
            ? "opacity-50 cursor-not-allowed"
            : "opacity-100 hover:bg-red-700"
        }`}
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6"></path>
        </svg>
      </button>

      {/* Optional: Dots Indicator */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentIndex === index ? "bg-red-600" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
