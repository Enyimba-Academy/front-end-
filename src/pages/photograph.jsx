export default function PhotographySchool() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}

      {/* Hero Section */}
      <section className="relative h-[500px]">
        <div className="absolute inset-0 bg-gray-800">
          <img
            src="/camera.png"
            alt="Photography"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            School of Photography & Cinematography
          </h1>
          <p className="text-xl text-white mb-8">
            Craft Visual Stories That Captivate the World
          </p>
          <a
            href="#programs"
            className="bg-red-600 text-white px-6 py-3 rounded-md font-medium hover:bg-red-700"
          >
            Explore Programs
          </a>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b px-[150px]">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center gap-4">
          <div className="flex space-x-4">
            <div className="relative">
              <select className="appearance-none bg-white border rounded-md px-4 py-2 pr-8 text-sm focus:outline-none">
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

            <div className="relative">
              <select className="appearance-none bg-white border rounded-md px-4 py-2 pr-8 text-sm focus:outline-none">
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

            <div className="relative">
              <select className="appearance-none bg-white border rounded-md px-4 py-2 pr-8 text-sm focus:outline-none">
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

          <div className="relative">
            <input
              type="text"
              placeholder="Search programs..."
              className="w-full md:w-64 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
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
      <section id="programs" className="py-16 bg-primary-light px-[150px]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Programs</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Program 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-xl">
                    Professional Photography
                  </h3>
                  <div className="w-3 h-3 rounded-full bg-red-600"></div>
                </div>
                <p className="text-gray-600 mb-4">
                  Master the art of professional photography with
                  industry-standard equipment and techniques.
                </p>
                <div className="flex justify-between items-center">
                  <a
                    href="/schools/photography/professional"
                    className="text-red-600 font-medium hover:underline"
                  >
                    Learn more
                  </a>
                  <span className="text-sm text-gray-500">12 weeks</span>
                </div>
              </div>
              <div className="p-6 flex justify-between">
                <a
                  href="/course"
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                >
                  Enroll Now
                </a>
                <a
                  href="/download/syllabus/photography"
                  className="text-gray-700 px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-50"
                >
                  Download Syllabus
                </a>
              </div>
            </div>

            {/* Program 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-xl">Cinematography</h3>
                  <div className="w-3 h-3 rounded-full bg-red-600"></div>
                </div>
                <p className="text-gray-600 mb-4">
                  Learn the art of visual storytelling through motion pictures
                  and advanced filming techniques.
                </p>
                <div className="flex justify-between items-center">
                  <a
                    href="/schools/photography/cinematography"
                    className="text-red-600 font-medium hover:underline"
                  >
                    Learn more
                  </a>
                  <span className="text-sm text-gray-500">16 weeks</span>
                </div>
              </div>
              <div className="p-6 flex justify-between">
                <a
                  href="/enroll"
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                >
                  Enroll Now
                </a>
                <a
                  href="/download/syllabus/cinematography"
                  className="text-gray-700 px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-50"
                >
                  Download Syllabus
                </a>
              </div>
            </div>

            {/* Program 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-xl">Digital Imaging</h3>
                  <div className="w-3 h-3 rounded-full bg-red-600"></div>
                </div>
                <p className="text-gray-600 mb-4">
                  Master digital post-production and image manipulation
                  techniques.
                </p>
                <div className="flex justify-between items-center">
                  <a
                    href="/schools/photography/digital-imaging"
                    className="text-red-600 font-medium hover:underline"
                  >
                    Learn more
                  </a>
                  <span className="text-sm text-gray-500">8 weeks</span>
                </div>
              </div>
              <div className="p-6 flex justify-between">
                <a
                  href="/enroll"
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                >
                  Enroll Now
                </a>
                <a
                  href="/download/syllabus/digital-imaging"
                  className="text-gray-700 px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-50"
                >
                  Download Syllabus
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Other Schools */}
      <section className="py-16 px-[150px]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Explore Other Schools
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* School 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md p-6">
              <h3 className="font-bold text-xl mb-4">School of Fine Arts</h3>
              <p className="text-gray-600 mb-6">
                Discover the world of traditional and contemporary art forms.
              </p>
              <a
                href="/schools/fine-arts"
                className="text-red-600 font-medium hover:underline flex items-center"
              >
                Explore School
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </a>
            </div>

            {/* School 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md p-6">
              <h3 className="font-bold text-xl mb-4">School of Digital Arts</h3>
              <p className="text-gray-600 mb-6">
                Master digital creation tools and techniques.
              </p>
              <a
                href="/schools/digital-arts"
                className="text-red-600 font-medium hover:underline flex items-center"
              >
                Explore School
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </a>
            </div>

            {/* School 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md p-6">
              <h3 className="font-bold text-xl mb-4">School of Film</h3>
              <p className="text-gray-600 mb-6">
                Learn the art of storytelling through motion pictures.
              </p>
              <a
                href="/schools/film"
                className="text-red-600 font-medium hover:underline flex items-center"
              >
                Explore School
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
