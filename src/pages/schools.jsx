import Slider from "../components/shared/Slider";

export default function Schools() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}

      {/* Hero Section */}
      <section className="bg-primary-light py-16 px-[60px]">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Shape Your Future in Art & Innovation
            </h1>
            <p className="text-gray-600 mb-8">
              Explore 12+ industry-leading programs designed for creators, by
              creators.
            </p>

            <div className="relative">
              <input
                type="text"
                placeholder="What do you want to learn?"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
              <button className="absolute right-1 top-1 bg-red-600 text-white p-2 rounded-full hover:bg-red-700">
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
          <div className="flex gap-4">
            <img
              src="/camera.png"
              alt="Artist"
              className="rounded-lg shadow-md w-[180px] h-[180px]"
            />
            <img
              src="/camera.png"
              alt="Photographer"
              className="rounded-lg shadow-md w-[180px] h-[180px]"
            />
            <img
              src="/camera.png"
              alt="Filmmaker"
              className="rounded-lg shadow-md w-[180px] h-[180px]"
            />
          </div>
        </div>
      </section>

      {/* Program Filters */}
      <section className="py-8 border-b px-[150px]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                All Programs
              </button>
              <button className="bg-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium border hover:bg-gray-50">
                Professional Certificate
              </button>
              <button className="bg-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium border hover:bg-gray-50">
                Professional Diploma
              </button>
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <select className="appearance-none bg-white border rounded-full px-4 py-2 pr-8 text-sm focus:outline-none">
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
                <select className="appearance-none bg-white border rounded-full px-4 py-2 pr-8 text-sm focus:outline-none">
                  <option>Skill Level</option>
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
          </div>
        </div>
      </section>

      {/* Schools Section */}
      <section className="py-16 px-[150px]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Schools</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* School Card 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative">
                <img
                  src="/photography.jpg"
                  alt="Photography"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                  MOST POPULAR
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">
                  Photography & Cinematography
                </h3>
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-4 h-4 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm ml-2">
                    (120 reviews)
                  </span>
                </div>
                <a
                  href="/photography"
                  className="text-red-600 text-sm font-medium hover:underline"
                >
                  View Courses →
                </a>
              </div>
            </div>

            {/* School Card 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative">
                <img
                  src="/sound.jpg"
                  alt="Sound Engineering"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                  NEW
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Sound Engineering</h3>
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-4 h-4 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm ml-2">
                    (98 reviews)
                  </span>
                </div>
                <a
                  href="/schools/sound-engineering"
                  className="text-red-600 text-sm font-medium hover:underline"
                >
                  View Courses →
                </a>
              </div>
            </div>

            {/* School Card 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative">
                <img
                  src="/digital-art.jpg"
                  alt="Digital Art"
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Digital Art & Design</h3>
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-4 h-4 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm ml-2">
                    (85 reviews)
                  </span>
                </div>
                <a
                  href="/schools/digital-art"
                  className="text-red-600 text-sm font-medium hover:underline"
                >
                  View Courses →
                </a>
              </div>
            </div>

            {/* School Card 4 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative">
                <img
                  src="/cinematography.jpg"
                  alt="Cinematography"
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">
                  Photography & Cinematography
                </h3>
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-4 h-4 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm ml-2">
                    (110 reviews)
                  </span>
                </div>
                <a
                  href="/photography"
                  className="text-red-600 text-sm font-medium hover:underline"
                >
                  View Courses →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Deep Dive */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Program Deep Dive
          </h2>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button className="px-6 py-2 border-b-2 border-red-600 text-gray-800 font-medium">
              Photography
            </button>
            <button className="px-6 py-2 border-b-2 border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300">
              Web Technologies
            </button>
            <button className="px-6 py-2 border-b-2 border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300">
              App Technologies
            </button>
            <button className="px-6 py-2 border-b-2 border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300">
              Social Media
            </button>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {/* Accordion Item 1 */}
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <button className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-red-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  <span className="font-medium">
                    Professional Certificate in Photography
                  </span>
                </div>
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
            </div>

            {/* Accordion Item 2 */}
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <button className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-red-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  <span className="font-medium">
                    Professional Diploma in Photography
                  </span>
                </div>
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
            </div>

            {/* Accordion Item 3 */}
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <button className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-red-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                    ></path>
                  </svg>
                  <span className="font-medium">Audio Production</span>
                </div>
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery of Genius */}
      <section className="py-16">
        <Slider />
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-light px-[150px]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Frame Your Future?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Limited seats available for 2023. Apply before time runs out!
          </p>
          <a
            href="/apply"
            className="bg-red-600 text-white px-8 py-3 rounded-md font-medium hover:bg-red-700 inline-block"
          >
            Apply Now
          </a>
        </div>
      </section>
    </div>
  );
}
