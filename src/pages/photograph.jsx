export default function PhotographySchool() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}

      {/* Hero Section */}
      <section className="relative h-[400px] sm:h-[500px] md:h-[600px]">
        <div className="absolute inset-0 bg-gray-800">
          <img
            src="/pick.png"
            alt="Photography"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Enyimba TV & Radio Academy
          </h1>
          <p className="text-lg sm:text-xl text-white mb-8">
            Craft Visual Stories That Captivate the World
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b px-4 sm:px-8 md:px-[150px]">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row flex-wrap justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <select className="appearance-none bg-white border rounded-md px-4 py-2 pr-8 text-sm focus:outline-none w-full sm:w-auto">
                <option>Program Type</option>
                <option>Certificate</option>
                <option>Diploma</option>
                <option>Degree</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            <div className="relative w-full sm:w-auto">
              <select className="appearance-none bg-white border rounded-md px-4 py-2 pr-8 text-sm focus:outline-none w-full sm:w-auto">
                <option>Duration</option>
                <option>3 months</option>
                <option>6 months</option>
                <option>1 year</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            <div className="relative w-full sm:w-auto">
              <select className="appearance-none bg-white border rounded-md px-4 py-2 pr-8 text-sm focus:outline-none w-full sm:w-auto">
                <option>Level</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="relative w-full sm:w-auto mt-4 sm:mt-0">
            <input
              type="text"
              placeholder="Search programs..."
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section
        id="programs"
        className="py-16 bg-primary-light px-4 sm:px-8 md:px-[150px]"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
            Programs
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Program 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-48">
                <img
                  src="/pick.png"
                  alt="Professional Photography"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 sm:p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg sm:text-xl">
                    Professional Photography
                  </h3>
                  <div className="w-3 h-3 rounded-full bg-red-600"></div>
                </div>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">
                  Master the art of professional photography with
                  industry-standard equipment and techniques.
                </p>
                <div className="flex justify-between items-center">
                  <a
                    href="/course"
                    className="text-red-600 font-medium hover:underline text-sm sm:text-base"
                  >
                    Learn more
                  </a>
                  <span className="text-xs sm:text-sm text-gray-500">
                    12 weeks
                  </span>
                </div>
              </div>
              <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
                <a
                  href="/course"
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 text-center"
                >
                  Enroll Now
                </a>
                <a
                  href="/course"
                  className="text-gray-700 px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-50 text-center"
                >
                  Download Syllabus
                </a>
              </div>
            </div>

            {/* Program 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-48">
                <img
                  src="/pick2.png"
                  alt="Cinematography"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 sm:p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg sm:text-xl">
                    Cinematography
                  </h3>
                  <div className="w-3 h-3 rounded-full bg-red-600"></div>
                </div>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">
                  Learn the art of visual storytelling through motion pictures
                  and advanced filming techniques.
                </p>
                <div className="flex justify-between items-center">
                  <a
                    href="/course"
                    className="text-red-600 font-medium hover:underline text-sm sm:text-base"
                  >
                    Learn more
                  </a>
                  <span className="text-xs sm:text-sm text-gray-500">
                    16 weeks
                  </span>
                </div>
              </div>
              <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
                <a
                  href="/course"
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 text-center"
                >
                  Enroll Now
                </a>
                <a
                  href="/course"
                  className="text-gray-700 px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-50 text-center"
                >
                  Download Syllabus
                </a>
              </div>
            </div>

            {/* Program 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-48">
                <img
                  src="/pick3.jpg"
                  alt="Digital Imaging"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 sm:p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg sm:text-xl">
                    Digital Imaging
                  </h3>
                  <div className="w-3 h-3 rounded-full bg-red-600"></div>
                </div>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">
                  Master digital post-production and image manipulation
                  techniques.
                </p>
                <div className="flex justify-between items-center">
                  <a
                    href="/course"
                    className="text-red-600 font-medium hover:underline text-sm sm:text-base"
                  >
                    Learn more
                  </a>
                  <span className="text-xs sm:text-sm text-gray-500">
                    8 weeks
                  </span>
                </div>
              </div>
              <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
                <a
                  href="/course"
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 text-center"
                >
                  Enroll Now
                </a>
                <a
                  href="/course"
                  className="text-gray-700 px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-50 text-center"
                >
                  Download Syllabus
                </a>
              </div>
            </div>

            {/* Program 4 - Broadcasting */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-48">
                <img
                  src="/pick4.png"
                  alt="Broadcasting Certificate"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 sm:p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg sm:text-xl">
                    Broadcasting Certificate
                  </h3>
                  <div className="w-3 h-3 rounded-full bg-red-600"></div>
                </div>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">
                  Build practical broadcasting skills and media literacy for
                  aspiring professionals and media enthusiasts.
                </p>
                <div className="flex justify-between items-center">
                  <a
                    href="/course"
                    className="text-red-600 font-medium hover:underline text-sm sm:text-base"
                  >
                    Learn more
                  </a>
                  <span className="text-xs sm:text-sm text-gray-500">
                    1-4 months
                  </span>
                </div>
              </div>
              <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
                <a
                  href="/course"
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 text-center"
                >
                  Enroll Now
                </a>
                <a
                  href="/course"
                  className="text-gray-700 px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-50 text-center"
                >
                  Download Syllabus
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Other Schools */}
    </div>
  );
}
