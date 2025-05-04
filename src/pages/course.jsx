export default function Course() {
  return (
    <div className="bg-white">
      {/* Course Header Section */}
      <section className="lg:px-[150px] mx-auto px-4 py-12 md:py-16 lg:py-20 bg-primary-light/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Course Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Beginner Certificate in Broadcasting
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
                <span className="text-gray-700">
                  1 Month Duration • 6 Credit Hours
                </span>
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
                <span className="text-gray-700">Entry-Level Certificate</span>
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
                <span className="text-gray-700">
                  Online + Practical Workshops
                </span>
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
                  Taught by Industry Experts
                  <br />
                  Experienced Broadcast Professionals
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors">
                Apply Now
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
                src="/pick4.png"
                alt="Broadcasting course"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-2"></h2>
                <h3 className="text-2xl md:text-3xl font-bold"></h3>
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
              Broadcasting Fundamentals
            </h3>
            <p className="text-gray-600 text-sm">
              Master basic workflows and ethical guidelines in broadcasting.
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
            <h3 className="font-semibold text-lg mb-2">Scriptwriting Skills</h3>
            <p className="text-gray-600 text-sm">
              Write and present engaging scripts for various formats.
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
            <h3 className="font-semibold text-lg mb-2">Studio Operations</h3>
            <p className="text-gray-600 text-sm">
              Learn to operate basic studio equipment and tools.
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
            <h3 className="font-semibold text-lg mb-2">Production Skills</h3>
            <p className="text-gray-600 text-sm">
              Create your own radio/TV segments with professional guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Course Curriculum Section */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12">
            Course Curriculum
          </h2>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Week 1 */}
            <details className="border-b border-gray-100">
              <summary className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <h3 className="font-semibold">
                    Week 1: Introduction to Broadcasting
                  </h3>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-4">
                    1.5 Credit Hours
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-500 transform transition-transform duration-200"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </summary>
              <div className="p-4 bg-gray-50">
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>What is Broadcasting? (Radio, TV, Digital)</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Key Milestones: Radio to Streaming</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      Roles in Broadcasting: Producers, Presenters, Engineers
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Programming Types: News, Talk Shows, Drama</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Functions of Radio & TV</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Introduction to Digital Broadcasting</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      Ethical Guidelines in Media (Truth, Responsibility)
                    </span>
                  </li>
                </ul>
                <div className="text-sm text-gray-600">
                  <strong>Assessment:</strong> Quiz + Group discussion: 'Which
                  broadcast platform appeals most to you and why?'
                </div>
              </div>
            </details>

            {/* Week 2 */}
            <details className="border-b border-gray-100">
              <summary className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <h3 className="font-semibold">
                    Week 2: Broadcast Communication & Scriptwriting Skills
                  </h3>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-4">
                    1.5 Credit Hours
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-500 transform transition-transform duration-200"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </summary>
              <div className="p-4 bg-gray-50">
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Voice Training: Tone, Articulation, Breathing</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Public Speaking & On-Air Presence</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Scriptwriting Basics: Headlines, Copywriting</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      Interviewing 101: Open-Ended Questions & Listening
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      Audience Engagement: Who's Watching/Listening and Why
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Cultural Sensitivity & Audience Diversity</span>
                  </li>
                </ul>
                <div className="text-sm text-gray-600">
                  <strong>Assessment:</strong> Record a 90-second bulletin +
                  Class listening critique
                </div>
              </div>
            </details>

            {/* Week 3 */}
            <details className="border-b border-gray-100">
              <summary className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <h3 className="font-semibold">
                    Week 3: Introduction to Equipment & Ethics in Media
                  </h3>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-4">
                    1.5 Credit Hours
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-500 transform transition-transform duration-200"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </summary>
              <div className="p-4 bg-gray-50">
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Studio Tools: Microphones, Cameras, Mixers</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Filming with Smartphones: Framing, Lighting</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Audio Recording: Audacity or Anchor</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Simple Video Editing: iMovie, CapCut Basics</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Studio Safety & Workspace Setup</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      Intro to Media Ethics: Fairness, Privacy, Accuracy
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Communicating Across Cultures</span>
                  </li>
                </ul>
                <div className="text-sm text-gray-600">
                  <strong>Assessment:</strong> Submit a 1-minute edited audio or
                  video clip + short ethics quiz
                </div>
              </div>
            </details>

            {/* Week 4 */}
            <details className="border-b border-gray-100">
              <summary className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs font-bold">4</span>
                  </div>
                  <h3 className="font-semibold">
                    Week 4: Mini Production Project & Final Assessment
                  </h3>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-4">
                    1.5 Credit Hours
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-500 transform transition-transform duration-200"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </summary>
              <div className="p-4 bg-gray-50">
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Ideating a Show: Format, Audience, Content</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      Structuring a Script: Intro, Core Message, Outro
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      Guided Studio Practice: Record a 3-minute segment
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Peer Review & Feedback Techniques</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Preparing for a Live or Recorded Presentation</span>
                  </li>
                </ul>
                <div className="text-sm text-gray-600">
                  <strong>Assessment:</strong> Final Project: Produce a 2–3 min
                  talk show or news segment • Voice Demo Submission • Wrap-up
                  Quiz & Instructor Evaluation
                </div>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-[670px] mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">N150,000</h3>
            <p className="text-gray-600 mb-6">
              1-Month Access • Certificate • Studio Access
            </p>

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
              <span className="font-medium">
                Do I need any prior experience?
              </span>
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
              No prior experience is required. This course is designed for
              absolute beginners who want to start their journey in
              broadcasting.
            </p>
          </details>

          <details className="py-4 border-b border-gray-200">
            <summary className="flex justify-between items-center cursor-pointer">
              <span className="font-medium">What equipment do I need?</span>
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
              You'll need a computer with internet access. For practical
              exercises, a smartphone with a camera and microphone will be
              sufficient. We'll provide access to professional equipment during
              studio sessions.
            </p>
          </details>

          <details className="py-4 border-b border-gray-200">
            <summary className="flex justify-between items-center cursor-pointer">
              <span className="font-medium">Will I get a certificate?</span>
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
              Yes, upon successful completion of the course and all assessments,
              you'll receive a Beginner Certificate in Broadcasting.
            </p>
          </details>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-12 md:py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Start Your Broadcasting Journey Today
          </h2>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md transition-colors inline-flex items-center">
            Apply Now
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
