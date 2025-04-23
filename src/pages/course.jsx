export default function Course() {
  return (
    <div className="bg-white">
      {/* Course Header Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Course Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Professional Certificate in Photography
            </h1>

            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-red-600 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">3 Months Duration</span>
              </div>

              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-red-600 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">Red-sealed Certificate</span>
              </div>

              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-red-600 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">Online + Live Workshops</span>
              </div>

              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-red-600 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <span className="text-gray-700">
                  Taught by Jane Doe
                  <br />
                  Award Winning Photographer
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors">
                Enroll Now
              </button>
              <button className="flex items-center text-gray-700 hover:text-gray-900">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Download Syllabus
              </button>
            </div>
          </div>

          {/* Right Column - Course Image */}
          <div className="relative">
            <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=400&width=600"
                alt="Photography course"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  Photography
                </h2>
                <h3 className="text-2xl md:text-3xl font-bold">COURSE</h3>
              </div>
            </div>
            <a
              href="#"
              className="inline-flex items-center text-red-600 hover:text-red-700 mt-4"
            >
              Watch Intro Lesson
              <svg
                className="w-4 h-4 ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
          What You'll Learn
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">
              Portfolio Development
            </h3>
            <p className="text-gray-600 text-sm">
              Curate 20+ professional-grade photos.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Software Skills</h3>
            <p className="text-gray-600 text-sm">
              Master Lightroom & Photoshop.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Industry Prep</h3>
            <p className="text-gray-600 text-sm">
              Build client-ready contracts & pricing.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Live Feedback</h3>
            <p className="text-gray-600 text-sm">Weekly 1:1 mentor sessions.</p>
          </div>
        </div>
      </section>

      {/* Course Curriculum Section */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12">
            Course Curriculum
          </h2>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <h3 className="font-semibold">
                  Module 1: Foundations of Photography
                </h3>
              </div>
              <div className="text-sm text-gray-500">
                5 Lessons • 2h 15m • 1 Quiz
              </div>
            </div>

            <div className="p-4 hover:bg-gray-50 flex items-center">
              <svg
                className="w-4 h-4 text-red-600 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="flex-1">Intro to Camera Settings</span>
              <span className="text-sm text-gray-500">15 min</span>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="w-48 h-48 rounded-lg overflow-hidden">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=200&width=200"
              alt="Jane Doe"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <p className="text-red-600 font-medium mb-1">
              Meet your Instructor
            </p>
            <h3 className="text-2xl font-bold mb-2">Jane Doe</h3>
            <p className="text-gray-700 mb-4">
              Award-winning National Geographic photographer with over 15 years
              of experience.
            </p>
            <a href="#" className="text-blue-600 hover:text-blue-800">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-[670px] mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">N400,000</h3>
            <p className="text-gray-600 mb-6">
              6-Month Access • Certificate • Community Access
            </p>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md transition-colors mb-4">
              Enroll Now
            </button>
            <p className="text-sm text-gray-600">30-Day Money-Back Guarantee</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Frequently Asked Questions
        </h2>

        <div className="border-t border-gray-200">
          <details className="py-4 border-b border-gray-200">
            <summary className="flex justify-between items-center cursor-pointer">
              <span className="font-medium">Can I download the videos?</span>
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </summary>
            <p className="mt-2 text-gray-600 pl-4">
              Yes! All content is downloadable.
            </p>
          </details>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-12 md:py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Join 2,300+ students transforming their skills
          </h2>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md transition-colors inline-flex items-center">
            Enroll Now
            <svg
              className="w-4 h-4 ml-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
}
